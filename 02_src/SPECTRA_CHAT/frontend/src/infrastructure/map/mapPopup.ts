import maplibregl from "maplibre-gl"
import useMapInstance from "@/infrastructure/map/mapInstance"

import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"

import trainParams from "@/domain/params/trainParams.json"

/**
 * 地図上のポップアップを管理するカスタムフック
 * @returns 鉄道駅・路線・任意レイヤーのホバーポップアップ追加関数
 */
const useMapPopup = (): IMapPopup => {
  const { getMapInstance } = useMapInstance() as IMapInstance

  /**
   * 指定された会社のロゴパスを取得
   * @param companyName 会社名
   * @returns ロゴのファイル名（存在しない場合は trainLogo）
   */
  const getCompanyLogoPath = (companyName: string): string => {
    return trainParams[companyName]?.path ?? "trainLogo"
  }

  /**
   * 指定された会社と路線名から路線色を取得
   * @param companyName 会社名
   * @param lineName 路線名
   * @returns CSSカラー文字列
   */
  const getLineColor = (companyName: string, lineName: string): string => {
    return trainParams[companyName]?.[lineName] ?? "#808080"
  }

  /**
   * 汎用ポップアップを追加
   * @param layerId MapLibre GL のレイヤーID
   */
  const addHoverPopup = (layerId: string): void => {
    const map = getMapInstance()
    if (!map) return

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "1000px",
    })

    map.on("mousemove", layerId, (event) => {
      const feature = event.features?.[0]
      if (!feature) return

      const featureProperties = feature.properties ?? {}

      const htmlRows = Object.entries(featureProperties)
        .map(
          ([key, value]) =>
            `<tr>
              <th style="border:1px solid #ccc; padding:2px 4px; background:#f5f5f5;">${key}</th>
              <td style="border:1px solid #ccc; padding:2px 4px;">${value}</td>
            </tr>`
        )
        .join("")

      popup
        .setLngLat(event.lngLat)
        .setHTML(
          `<table style="font-size:12px; border-collapse:collapse; background:white;">${htmlRows}</table>`
        )
        .addTo(map)
    })

    map.on("mouseleave", layerId, () => popup.remove())
  }

  /**
   * 鉄道駅レイヤー用のホバーポップアップを追加
   * @param layerId MapLibre GL のレイヤーID
   */
  const addTrainStationHoverPopup = (layerId: string): void => {
    const map = getMapInstance()
    if (!map) return

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "1000px",
    })

    map.on("mousemove", layerId, (event) => {
      const feature = event.features?.[0]
      if (!feature) return

      const featureProperties = feature.properties ?? {}
      const companyName = featureProperties.事業者名
      const lineName = featureProperties.路線名
      const stationName = featureProperties.駅名
      const totalTrainCount =
        Number(featureProperties.発数1 ?? 0) +
        Number(featureProperties.発数2 ?? 0) +
        Number(featureProperties.着数1 ?? 0) +
        Number(featureProperties.着数2 ?? 0)

      const companyLogoPath = getCompanyLogoPath(companyName)
      const lineColor = getLineColor(companyName, lineName)

      popup
        .setLngLat(event.lngLat)
        .setHTML(
          `
          <iframe
            src="https://maps.google.co.jp/maps?output=embed&q=${companyName}${stationName}駅"
            width="250px"
            height="150px"
            style="border:0"
            frameborder="0"
            allowfullscreen="false"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div class="flex items-center gap-2 mt-2">
            <div class="h-14 w-2 rounded-full" style="background-color:${lineColor}"></div>
            <img class="w-6 h-6" src="/image/companyLogo/${companyLogoPath}.webp" />
            <div class="flex flex-col leading-tight">
              <div class="font-bold text-base">${stationName}</div>
              <div class="text-xs text-gray-500">${companyName} ${lineName}</div>
              <div class="text-xs text-gray-500">運行本数：${totalTrainCount}本</div>
            </div>
          </div>
        `
        )
        .addTo(map)
    })

    map.on("mouseleave", layerId, () => popup.remove())
  }

  /**
   * 鉄道路線レイヤー用のホバーポップアップを追加
   * @param layerId MapLibre GL のレイヤーID
   */
  const addTrainLineHoverPopup = (layerId: string): void => {
    const map = getMapInstance()
    if (!map) return

    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "1000px",
    })

    map.on("mousemove", layerId, (event) => {
      const feature = event.features?.[0]
      if (!feature) return

      const featureProperties = feature.properties ?? {}
      const companyName = featureProperties.事業者名
      const lineName = featureProperties.路線名
      const totalTrainCount =
        Number(featureProperties.順方向運行本数2024 ?? 0) +
        Number(featureProperties.逆方向運行本数2024 ?? 0)

      const companyLogoPath = getCompanyLogoPath(companyName)
      const lineColor = getLineColor(companyName, lineName)

      popup
        .setLngLat(event.lngLat)
        .setHTML(
          `
          <div class="flex items-center gap-2 mt-2">
            <div class="h-14 w-2 rounded-full" style="background-color:${lineColor}"></div>
            <img class="w-6 h-6" src="/image/companyLogo/${companyLogoPath}.webp" />
            <div class="flex flex-col leading-tight">
              <div class="font-bold text-base">${lineName}</div>
              <div class="text-xs text-gray-500">${companyName} ${lineName}</div>
              <div class="text-xs text-gray-500">運行本数：${totalTrainCount}本</div>
            </div>
          </div>
        `
        )
        .addTo(map)
    })

    map.on("mouseleave", layerId, () => popup.remove())
  }

  return {
    addHoverPopup,
    addTrainStationHoverPopup,
    addTrainLineHoverPopup,
  }
}

export default useMapPopup
