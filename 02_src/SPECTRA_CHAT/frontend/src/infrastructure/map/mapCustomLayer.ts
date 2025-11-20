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
      const iconPath = (companyData as any).path ?? "default"
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

    const iconImage = new Image()
    iconImage.src = iconUrl

    const canvasLayer: maplibregl.CustomLayerInterface = {
      id: layerId,
      type: "custom",
      renderingMode: "2d",
      onAdd: (map, gl) => {
        const canvasElement = document.createElement("canvas")
        canvasElement.width = map.getCanvas().width
        canvasElement.height = map.getCanvas().height
        canvasElement.style.position = "absolute"
        canvasElement.style.top = "0"
        canvasElement.style.left = "0"
        map.getCanvasContainer().appendChild(canvasElement)

        const canvasContext = canvasElement.getContext("2d")
        if (!canvasContext) return

        const drawCanvas = () => {
          // レイヤーが非表示の場合は描画しない

          canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)

          if (map.getZoom() < minimumZoomToShow) return

          const bounds = map.getBounds()

          geojson.features.forEach((feature) => {
            const coordinates = feature.geometry.coordinates as [number, number]
            if (!bounds.contains(coordinates)) return

            const properties = feature.properties ?? {}
            const numberOfBikesAvailable = Number(properties.num_bikes_available ?? 0)
            const numberOfDocksAvailable = Number(properties.num_docks_available ?? 0)
            const totalNumberOfUnits = numberOfBikesAvailable + numberOfDocksAvailable
            if (totalNumberOfUnits === 0) return

            const screenPosition = map.project(coordinates)
            const radius = 15

            let startAngle = -0.5 * Math.PI
            const segmentValues = [numberOfBikesAvailable, numberOfDocksAvailable]
            const segmentColors = ["#00ff00", "#808080"]
            segmentValues.forEach((segmentValue, index) => {
              const endAngle = startAngle + (segmentValue / totalNumberOfUnits) * 2 * Math.PI
              canvasContext.beginPath()
              canvasContext.moveTo(screenPosition.x, screenPosition.y)
              canvasContext.arc(screenPosition.x, screenPosition.y, radius, startAngle, endAngle)
              canvasContext.closePath()
              canvasContext.fillStyle = segmentColors[index]
              canvasContext.fill()
              startAngle = endAngle
            })

            if (iconImage.complete) {
              const iconSize = radius * 0.6
              canvasContext.drawImage(
                iconImage,
                screenPosition.x - iconSize,
                screenPosition.y - iconSize,
                iconSize * 2,
                iconSize * 2
              )
            }
          })
        }

        iconImage.onload = () => {
          drawCanvas()
          map.triggerRepaint()
        }

        map.on("move", drawCanvas)
        map.on("moveend", drawCanvas)
      },
      render: () => {},
    }

    map.addLayer(canvasLayer)
  }

  const helloCycleLayer = async (geojson: FeatureCollection) => {
    createCycleCanvasLayer(HELLO_CYCLE_LAYER, geojson, "/image/cycle/yellowBike.webp", 13)
    mapPopup.addHoverPopup(HELLO_CYCLE_LAYER)
  }

  const docomoBikeShareLayer = async (geojson: FeatureCollection) => {
    createCycleCanvasLayer(DOCOMO_BIKE_SHARE_LAYER, geojson, "/image/cycle/redBike.webp", 13)
    mapPopup.addHoverPopup(DOCOMO_BIKE_SHARE_LAYER)
  }

  const toggleCycleLayer = () => {
    const { getMapInstance } = mapInstance as IMapInstance
    const map = getMapInstance()
    if (!map) return
    ;[HELLO_CYCLE_LAYER, DOCOMO_BIKE_SHARE_LAYER].forEach((layerId) => {
      const layer = map.getLayer(layerId)
      if (!layer) return

      if (layer.type === "custom") {
        // canvas 要素を取得して display を切り替え
        const canvasContainer = map.getCanvasContainer()
        const canvasElement = Array.from(canvasContainer.children).find(
          (el) => (el as HTMLCanvasElement).id === layerId
        ) as HTMLCanvasElement | undefined

        if (canvasElement) {
          canvasElement.style.display = canvasElement.style.display === "none" ? "block" : "none"
          map.triggerRepaint()
        }
      } else {
        // 通常の Mapbox/MapLibre レイヤー
        const currentVisibility = map.getLayoutProperty(layerId, "visibility") ?? "visible"
        const newVisibility = currentVisibility === "visible" ? "none" : "visible"
        map.setLayoutProperty(layerId, "visibility", newVisibility)
      }
    })
  }

  return {
    trainStationLayer: addTrainStationLayer,
    trainLineLayer: addTrainLineLayer,
    helloCycleLayer,
    docomoBikeShareLayer,
    toggleCycleLayer,
  }
}

export default useMapCustomLayer
