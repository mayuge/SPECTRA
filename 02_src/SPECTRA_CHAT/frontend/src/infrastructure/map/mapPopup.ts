import maplibregl from "maplibre-gl"
import useMapInstance from "@/infrastructure/map/mapInstance"

import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPopup } from "@/domain/interfaces/IMapPopup"

import trainParams from "@/domain/params/trainParams.json"

const useMapPopup = (): IMapPopup => {
  const { getMapInstance } = useMapInstance() as IMapInstance

  const addHoverPopup = (layerId: string) => {
    const map = getMapInstance()
    if (!map) return
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "1000px",
    })

    map.on("mousemove", layerId, (e) => {
      const feature = e.features?.[0]
      if (!feature) return

      const props = feature.properties ?? {}

      const rows = Object.entries(props)
        .map(
          ([key, value]) =>
            `<tr>
         <th style="border:1px solid #ccc; padding:2px 4px; background:#f5f5f5;">${key}</th>
         <td style="border:1px solid #ccc; padding:2px 4px;">${value}</td>
       </tr>`
        )
        .join("")

      popup
        .setLngLat(e.lngLat)
        .setHTML(
          `<table style="font-size:12px; border-collapse:collapse; background:white;">
      ${rows}
   </table>`
        )
        .addTo(map)
    })

    map.on("mouseleave", layerId, () => {
      popup.remove()
    })
  }

  const addTrainStationHoverPopup = (layerId: string) => {
    const map = getMapInstance()
    if (!map) return
    const popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "1000px",
    })

    map.on("mousemove", layerId, (e) => {
      const feature = e.features?.[0]
      if (!feature) return

      const props = feature.properties ?? {}

      popup
        .setLngLat(e.lngLat)
        .setHTML(
          `
        <iframe
            src="https://maps.google.co.jp/maps?output=embed&q=${props.事業者名}${props.駅名}駅"
            width="250px"
            height="150px"
            overflow:"hidden"
            frameborder="0"
            allowfullscreen="false"
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            style="border:0"
          ></iframe>
          <div class="flex items-center gap-2 mt-2">
        
        <!-- 路線色バー -->
        <div
          class="h-14 w-2 rounded-full"
          style="background-color:${trainParams[props.事業者名]?.[props.路線名] ?? "#808080"}"
        ></div>

        <!-- 会社ロゴ -->
        <img
          class="w-6 h-6"
          src="/image/companyLogo/${trainParams[props.事業者名].path}.webp"
        />

        <!-- 駅名 -->
        <div class="flex flex-col leading-tight">
            <div class="font-bold text-base">
            ${props.駅名}
            </div>
            <div class="text-xs text-gray-500">
            ${props.事業者名} ${props.路線名}
            </div>
            <div class="text-xs text-gray-500">
            運行本数：${props.発数1 + props.発数2 + props.着数1 + props.着数2}本
            </div>
        </div>

      </div>
          
`
        )
        .addTo(map)
    })

    map.on("mouseleave", layerId, () => {
      popup.remove()
    })
  }

  return {
    addTrainStationHoverPopup,
    addHoverPopup,
  }
}
export default useMapPopup
