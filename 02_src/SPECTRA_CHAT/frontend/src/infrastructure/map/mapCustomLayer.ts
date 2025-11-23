import maplibregl, {
  type GeoJSONSourceSpecification,
  type LineLayerSpecification,
  type SymbolLayerSpecification,
} from "maplibre-gl"
import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapPopup from "@/infrastructure/map/mapPopup"

import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { FeatureCollection } from "geojson"

import trainParams from "@/domain/params/trainParams.json"
import {
  TRAIN_STATION_LAYER,
  TRAIN_LINE_LAYER,
  HELLO_CYCLE_LAYER,
  DOCOMO_BIKE_SHARE_LAYER,
} from "@/domain/params/customLayerName"

const useMapCustomLayer = (): IMapCustomLayer => {
  const mapInstance = useMapInstance() as IMapInstance
  const mapPopup = useMapPopup() as IMapPopup

  const loadCompanyIcons = async (map: maplibregl.Map) => { 
    const promises = Object.entries(trainParams).map(async ([companyName, companyData]) => {
      const iconPath = (companyData as any).path ?? "trainLogo"
      const iconId = `${companyName}-icon`
      const iconUrl = `/image/companyLogo/${iconPath}.webp`

      if (map.hasImage(iconId)) return

      try {
        const response = await fetch(iconUrl)
        const blob = await response.blob()
        const bitmap = await createImageBitmap(blob)

        map.addImage(iconId, bitmap, { pixelRatio: 2 })
      } catch (error) {
        console.error(`❌ Failed to load icon for ${companyName}:`, error)
      }
    })

    await Promise.all(promises)
  }

  const addTrainStationLayer = async (geojson: FeatureCollection) => {
    const map = mapInstance.getMapInstance()
    if (!map) return

    const sourceId = TRAIN_STATION_LAYER
    const layerId = TRAIN_STATION_LAYER

    const geojsonSource: GeoJSONSourceSpecification = { type: "geojson", data: geojson }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, geojsonSource)
    } else {
      ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
    }

    if (map.getLayer(layerId)) return

    await loadCompanyIcons(map)

    const symbolLayer: SymbolLayerSpecification = {
      id: layerId,
      type: "symbol",
      source: sourceId,
      layout: {
        visibility: "visible",
        "icon-image": ["concat", ["get", "事業者名"], "-icon"],
        "icon-size": 0.24,
        "icon-allow-overlap": true,
        "text-field": ["get", "駅名"],
        "text-font": ["Noto Sans CJK JP Bold"],
        "text-size": 8,
        "text-anchor": "top",
        "text-offset": [0, 1],
        "text-allow-overlap": false,
      },
      paint: {
        "text-color": "#505050",
        "text-halo-color": "#ffffff",
        "text-halo-width": 1,
      },
    }

    map.addLayer(symbolLayer)
    mapPopup.addTrainStationHoverPopup(layerId)
  }

  const addTrainLineLayer = (geojson: FeatureCollection) => {
    const map = mapInstance.getMapInstance()
    if (!map) return

    const sourceId = TRAIN_LINE_LAYER
    const layerId = TRAIN_LINE_LAYER

    const geojsonSource: GeoJSONSourceSpecification = { type: "geojson", data: geojson }

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, geojsonSource)
    } else {
      ;(map.getSource(sourceId) as maplibregl.GeoJSONSource).setData(geojson)
    }

    if (map.getLayer(layerId)) return

    const lineLayer: LineLayerSpecification = {
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-cap": "round", "line-join": "round", visibility: "visible" },
      paint: {
        "line-color": [
          "case",
          ["has", ["get", "事業者名"], ["literal", trainParams]],
          [
            "coalesce",
            ["get", ["get", "路線名"], ["get", ["get", "事業者名"], ["literal", trainParams]]],
            "#808080",
          ],
          "#808080",
        ],
        "line-width": ["interpolate", ["linear"], ["zoom"], 10, 1, 15, 10],
      },
    }

    map.addLayer(lineLayer)
    mapPopup.addTrainLineHoverPopup(layerId)
  }

  const createCycleCanvasLayer = (
    layerId: string,
    geojson: FeatureCollection,
    iconUrl: string,
    minimumZoomToShow: number = 15
  ) => {
    const map = mapInstance.getMapInstance()
    if (!map) return

    // すでにレイヤーが存在する場合は何もしない（重複追加を防ぐ）
    if (map.getLayer(layerId)) return

    const iconImage = new Image()
    iconImage.src = iconUrl

    const canvasLayer: maplibregl.CustomLayerInterface = {
      id: layerId,
      type: "custom",
      renderingMode: "2d",

      onAdd: (map) => {
        const canvasElement = document.createElement("canvas")
        canvasElement.id = layerId // ★ これがトグルに必須
        canvasElement.width = map.getCanvas().width
        canvasElement.height = map.getCanvas().height
        canvasElement.style.position = "absolute"
        canvasElement.style.top = "0"
        canvasElement.style.left = "0"
        canvasElement.style.pointerEvents = "none" // ★ マップ操作を邪魔しない
        map.getCanvasContainer().appendChild(canvasElement)

        const canvasContext = canvasElement.getContext("2d")
        if (!canvasContext) return

        const resizeCanvas = () => {
          canvasElement.width = map.getCanvas().width
          canvasElement.height = map.getCanvas().height
        }

        const drawCanvas = () => {
          // レイヤー非表示なら描画しない
          if (canvasElement.style.display === "none") return

          canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)

          if (map.getZoom() < minimumZoomToShow) return

          const bounds = map.getBounds()

          geojson.features.forEach((feature) => {
            //@ts-ignore
            const coordinates = feature.geometry.coordinates as [number, number]
            if (!bounds.contains(coordinates)) return

            const props = feature.properties ?? {}
            const bikes = Number(props.num_bikes_available ?? 0)
            const docks = Number(props.num_docks_available ?? 0)
            const total = bikes + docks
            if (total === 0) {
              return
            }

            const pos = map.project(coordinates)
            const radius = 18
            const iconSize = radius * 1.2
            // 円グラフ
            let startAngle = -Math.PI / 2
            const segments = [bikes, docks]
            const colors = ["#00ff00", "#808080"]

            segments.forEach((value, i) => {
              const endAngle = startAngle + (value / total) * Math.PI * 2
              canvasContext.beginPath()
              canvasContext.moveTo(pos.x, pos.y)
              canvasContext.arc(pos.x, pos.y, radius, startAngle, endAngle)
              canvasContext.closePath()
              canvasContext.fillStyle = colors[i]
              canvasContext.fill()
              startAngle = endAngle
            })

            // アイコン
            if (iconImage.complete) {
              canvasContext.drawImage(
                iconImage,
                pos.x - iconSize / 2,
                pos.y - iconSize / 2,
                iconSize,
                iconSize
              )
            }
          })
        }

        // 画像読み込み後に描画
        iconImage.onload = () => {
          drawCanvas()
          map.triggerRepaint()
        }

        map.on("move", drawCanvas)
        map.on("moveend", drawCanvas)
        map.on("resize", () => {
          resizeCanvas()
          drawCanvas()
        })
      },

      render: () => {},
    }

    map.addLayer(canvasLayer)
  }

  const addHelloCycleLayer = async (geojson: FeatureCollection) => {
    createCycleCanvasLayer(HELLO_CYCLE_LAYER, geojson, "/image/cycle/yellowBike.webp")
    mapPopup.addHoverPopup(HELLO_CYCLE_LAYER)
  }

  const addDocomoBikeShareLayer = async (geojson: FeatureCollection) => {
    createCycleCanvasLayer(DOCOMO_BIKE_SHARE_LAYER, geojson, "/image/cycle/redBike.webp")
    mapPopup.addHoverPopup(DOCOMO_BIKE_SHARE_LAYER)
  }

  const toggleCycleLayer = () => {
    const map = mapInstance.getMapInstance()
    if (!map) return
    ;[HELLO_CYCLE_LAYER, DOCOMO_BIKE_SHARE_LAYER].forEach((layerId) => {
      const canvasContainer = map.getCanvasContainer()

      // 追加した canvas を取得
      const canvasElement = Array.from(canvasContainer.children).find(
        (el) => (el as HTMLCanvasElement).id === layerId
      ) as HTMLCanvasElement | undefined

      if (!canvasElement) return

      // display 切り替え
      const isHidden = canvasElement.style.display === "none"
      canvasElement.style.display = isHidden ? "block" : "none"

      // 再描画
      map.triggerRepaint()
    })
  }

  return {
    addTrainStationLayer,
    addTrainLineLayer,
    addHelloCycleLayer,
    addDocomoBikeShareLayer,
    toggleCycleLayer,
  }
}

export default useMapCustomLayer
