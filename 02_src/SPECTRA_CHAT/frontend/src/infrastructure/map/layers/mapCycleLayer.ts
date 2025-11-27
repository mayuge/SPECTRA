import maplibregl, {
  type GeoJSONSourceSpecification,
  type LineLayerSpecification,
  type SymbolLayerSpecification,
} from "maplibre-gl"

import useMapInstance from "@/infrastructure/map/mapInstance"
import useMapPopup from "@/infrastructure/map/mapPopup"
import useMapLayer from "@/infrastructure/map/mapLayer"

import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IMapCustomLayer } from "@/domain/interfaces/IMapCustomLayer"
import type { FeatureCollection } from "geojson"

import trainParams from "@/domain/params/trainParams.json"

import { ref } from "vue"

import {
  TRAIN_STATION_LAYER,
  TRAIN_LINE_LAYER,
  HELLO_CYCLE_LAYER,
  DOCOMO_BIKE_SHARE_LAYER,
} from "@/domain/params/customLayerName"

/**
 * カスタムレイヤー管理のインフラストラクチャ
 * @returns
 */
const useMapCustomLayer = (): IMapCustomLayer => {
  const cycleLayerVisibility = ref<boolean>(true)
  const trainLayerVisibility = ref<boolean>(true)
  const mapInstance = useMapInstance() as IMapInstance
  const mapPopup = useMapPopup() as IMapPopup
  const mapLayer = useMapLayer() as IMapLayer

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
        canvasElement.id = layerId
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
          // 非表示なら描画しない
          if (canvasElement.style.display === "none") {
            return
          }
          const pitch = map.getPitch()

          // 水平に近い → 完全非表示
          if (pitch > 65) {
            canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)
            return
          }

          canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height)

          if (map.getZoom() < minimumZoomToShow) {
            return
          }

          const rawBounds = map.getBounds()
          //表示範囲の縮小率
          const shrinkPercentage = 0.99

          const shrunkBounds = {
            southwest: {
              lng:
                rawBounds.getSouthWest().lng +
                (rawBounds.getNorthEast().lng - rawBounds.getSouthWest().lng) * shrinkPercentage,
              lat:
                rawBounds.getSouthWest().lat +
                (rawBounds.getNorthEast().lat - rawBounds.getSouthWest().lat) * shrinkPercentage,
            },
            northeast: {
              lng:
                rawBounds.getNorthEast().lng -
                (rawBounds.getNorthEast().lng - rawBounds.getSouthWest().lng) * shrinkPercentage,
              lat:
                rawBounds.getNorthEast().lat -
                (rawBounds.getNorthEast().lat - rawBounds.getSouthWest().lat) * shrinkPercentage,
            },
            contains: (coordinate: { lng: number; lat: number }) => {
              return (
                coordinate.lng >= rawBounds.getSouthWest().lng &&
                coordinate.lng <= rawBounds.getNorthEast().lng &&
                coordinate.lat >= rawBounds.getSouthWest().lat &&
                coordinate.lat <= rawBounds.getNorthEast().lat
              )
            },
          }

          //各ステーションの描画処理
          geojson.features.forEach((feature) => {
            //@ts-ignore
            const coordinates = feature.geometry.coordinates as [number, number]

            const coordinateObject = {
              lng: coordinates[0],
              lat: coordinates[1],
            }

            // 表示範囲外はスキップ
            if (!shrunkBounds.contains(coordinateObject)) {
              return
            }

            const properties = feature.properties ?? {}
            const availableBikes = Number(properties.num_bikes_available ?? 0)
            const availableDocks = Number(properties.num_docks_available ?? 0)
            const totalCapacity = availableBikes + availableDocks

            // データが無意味な場合はスキップ
            if (totalCapacity === 0) {
              return
            }

            // ステーション名
            const stationName = properties.name

            // 投影座標
            const projectedPosition = map.project(coordinates)

            const pieChartRadius = 12
            const iconDisplaySize = pieChartRadius * 1.2

            //円グラフ描画
            let currentStartAngle = -Math.PI / 2
            const pieChartSegments = [
              { value: availableBikes, color: "#00ff00" },
              { value: availableDocks, color: "#808080" },
            ]

            pieChartSegments.forEach((segment) => {
              const segmentAngle = (segment.value / totalCapacity) * Math.PI * 2
              const nextEndAngle = currentStartAngle + segmentAngle

              canvasContext.beginPath()
              canvasContext.moveTo(projectedPosition.x, projectedPosition.y)
              canvasContext.arc(
                projectedPosition.x,
                projectedPosition.y,
                pieChartRadius,
                currentStartAngle,
                nextEndAngle
              )
              canvasContext.closePath()
              canvasContext.fillStyle = segment.color
              canvasContext.fill()

              currentStartAngle = nextEndAngle
            })

            //アイコン描画

            if (iconImage.complete) {
              canvasContext.drawImage(
                iconImage,
                projectedPosition.x - iconDisplaySize / 2,
                projectedPosition.y - iconDisplaySize / 2,
                iconDisplaySize,
                iconDisplaySize
              )
            }

            //ステーション名（右横）
            canvasContext.font = "10px 'Noto Sans JP'"
            canvasContext.fillStyle = "#333333"
            canvasContext.textAlign = "left"
            canvasContext.textBaseline = "middle"

            canvasContext.fillText(
              stationName,
              projectedPosition.x + pieChartRadius + 6,
              projectedPosition.y
            )

            //ステーション名（右横・白縁取り付き）
            canvasContext.font = "10px 'Noto Sans JP'"
            canvasContext.textAlign = "left"
            canvasContext.textBaseline = "middle"

            // 白い縁取り
            canvasContext.lineWidth = 3
            canvasContext.strokeStyle = "#ffffff"
            canvasContext.strokeText(
              stationName,
              projectedPosition.x + pieChartRadius + 6,
              projectedPosition.y
            )

            // 文字本体
            canvasContext.fillStyle = "#333333"
            canvasContext.fillText(
              stationName,
              projectedPosition.x + pieChartRadius + 6,
              projectedPosition.y
            )

            //貸出 / 返却情報（アイコン下）

            canvasContext.font = "9px 'Noto Sans JP'"
            canvasContext.textAlign = "center"
            canvasContext.textBaseline = "top"

            // --- 貸出（緑
            const rentalText = `貸出可能: ${availableBikes}台`
            const rentalTextY = projectedPosition.y + pieChartRadius + 6

            // 白い縁取り
            canvasContext.lineWidth = 3
            canvasContext.strokeStyle = "#ffffff"
            canvasContext.strokeText(rentalText, projectedPosition.x, rentalTextY)

            // 緑の文字本体
            canvasContext.fillStyle = "#00aa00"
            canvasContext.fillText(rentalText, projectedPosition.x, rentalTextY)

            // --- 返却（グレー） --- //
            const returnText = `返却可能: ${availableDocks}台`
            const returnTextY = projectedPosition.y + pieChartRadius + 18

            // 白い縁取り
            canvasContext.strokeStyle = "#ffffff"
            canvasContext.strokeText(returnText, projectedPosition.x, returnTextY)

            // グレーの文字本体
            canvasContext.fillStyle = "#666666"
            canvasContext.fillText(returnText, projectedPosition.x, returnTextY)
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
    //ref値をトグルする
    cycleLayerVisibility.value = !cycleLayerVisibility.value
  }

  /**
   * 駅・鉄道路線レイヤーをトグルする
   */
  const toggleTrainLayer = () => {
    const { toggleLayer } = mapLayer
    toggleLayer(TRAIN_STATION_LAYER)
    toggleLayer(TRAIN_LINE_LAYER)
    //ref値をトグルする
    trainLayerVisibility.value = !trainLayerVisibility.value
  }

  const getCycleLayerVisibility = (): boolean => {
    //cycleレイヤーの表示・非表示状態を返す
    return cycleLayerVisibility.value
  }

  const getTrainLayerVisibility = (): boolean => {
    //trainレイヤーの表示・非表示状態を返す
    return trainLayerVisibility.value
  }

  return {
    addTrainStationLayer,
    addTrainLineLayer,
    addHelloCycleLayer,
    addDocomoBikeShareLayer,
    toggleCycleLayer,
    toggleTrainLayer,
    getCycleLayerVisibility,
    getTrainLayerVisibility,
  }
}

export default useMapCustomLayer
