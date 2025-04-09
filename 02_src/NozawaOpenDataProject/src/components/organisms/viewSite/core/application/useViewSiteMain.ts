import {
  useReqRailwayDataAdapter,
  useReqCycleDataAdapter,
} from "@/infrastructure/adapters/httpReqAdapter"
import {
  useModeStateStoreAdapter,
  useTokyoMetroStoreAdapter,
  useToeiTrainInfoStoreAdapter,
  useDialogStoreAdapter,
  useManageLayerAdapter,
  useTimeDataStoreAdapter,
  useCycleStoreAdapter,
} from "@/infrastructure/adapters/storeAdapter"
import { useSiteRouteAdapter } from "@/infrastructure/adapters/routeAdapter"
import { useGetTimeDataAdapter } from "@/infrastructure/adapters/getTimeDataAdapter"
import { HOME_SITE_ROOT_NAME } from "@/domain/params/siteRootName"
import cycleModeCardLayerList from "@/components/organisms/viewSite/core/params/cycleMode/useCycleLayersMain"
import walkModeCardLayerList from "@/components/organisms/viewSite/core/params/walkMode/useWalkLayersMain"
import busModeCardLayerList from "@/components/organisms/viewSite/core/params/busMode/useBusLayersMain"
import trainModeCardLayerList from "@/components/organisms/viewSite/core/params/trainMode/useTrainLayersMain"
import type { GeoJSONSourceSpecification } from "maplibre-gl"

const useViewSiteMain = () => {
  const { routeTo } = useSiteRouteAdapter()
  //現在の時刻を取得する
  const { getNowTime } = useGetTimeDataAdapter()
  //更新時刻のセッター・ゲッター
  const { setTimeData, getTimeData } = useTimeDataStoreAdapter()
  //サイクルステーションの状態を取得
  const {
    setHelloCycleGeoJson,
    setDocomoBikeShareGeoJson,
    getHelloCycleGeoJson,
    getDocomoBikeShareGeoJson,
  } = useCycleStoreAdapter()

  //交通モード取得
  const {
    getWalkModeSelected,
    getCycleModeSelected,
    getBusModeSelected,
    getTrainModeSelected,
    setTrainModeSelected,
    setBusModeSelected,
    setCycleModeSelected,
    setWalkModeSelected,
  } = useModeStateStoreAdapter()
  //サイクルデータ取得
  const {
    reqHelloCycleStationInfo,
    reqHelloCycleStationStatus,
    reqDocomoBikeShareStationInfo,
    reqDocomoBikeShareStationStatus,
  } = useReqCycleDataAdapter()
  //API呼び出し
  const { reqTokyoMetroRealTimeInfo, reqToeiTrainRealTimeInfo } = useReqRailwayDataAdapter()
  //ダイアログ開閉
  const {
    getModeDialogOpen,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    setModeDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
  } = useDialogStoreAdapter()
  const {
    changeLayerOrder,
    getLayers,
    setCardList,
    getCardList,
    getIsDisplayLayer,
    setIsDisplayLayer,
    setOpacity,
  } = useManageLayerAdapter()

  const {
    setGinzaInfo,
    getGinzaInfo,
    setMarunouchiBranchInfo,
    getMarunouchiBranchInfo,
    setChiyodaInfo,
    getChiyodaInfo,
    setHibiyaInfo,
    getHibiyaInfo,
    setMarunouchiInfo,
    getMarunouchiInfo,
    setTozaiInfo,
    getTozaiInfo,
    setYurakuchoInfo,
    getYurakuchoInfo,
    setHanzomonInfo,
    getHanzomonInfo,
    setNanbokuInfo,
    getNanbokuInfo,
    setHukutoshinInfo,
    getHukutoshinInfo,
  } = useTokyoMetroStoreAdapter()

  const {
    setOedoInfo,
    getOedoInfo,
    setMitaInfo,
    getMitaInfo,
    setAsakusaInfo,
    getAsakusaInfo,
    setShinjukuInfo,
    getShinjukuInfo,
    setArakawaInfo,
    getArakawaInfo,
    setNipporitoneriInfo,
    getNipporitoneriInfo,
  } = useToeiTrainInfoStoreAdapter()

  /**
   * ボタンがクリックされた場合
   **/
  const buttonClicked = () => {}
  /**
   * 選択されたモードを取得し、セットする
   **/
  const getSelectedMode = () => {
    if (getWalkModeSelected()) {
      setCardList(walkModeCardLayerList)
    } else if (getCycleModeSelected()) {
      setCardList(cycleModeCardLayerList)
    } else if (getBusModeSelected()) {
      setCardList(busModeCardLayerList)
    } else if (getTrainModeSelected()) {
      setCardList(trainModeCardLayerList)
    }
  }
  /**
   * 選択されたモードのテキスト取得
   **/
  const getSelectedModeText = () => {
    if (getWalkModeSelected()) {
      return "徒歩"
    } else if (getCycleModeSelected()) {
      return "シェアサイクル"
    } else if (getBusModeSelected()) {
      return "バス"
    } else if (getTrainModeSelected()) {
      return "鉄道"
    }
  }

  /**
   * コールバック関数をまとめて呼び出す
   */
  const useViewSiteCallback = async () => {
    await tokyoMetroRealTimeInfoCallback()

    const docomoGeoJson = await docomoBikeShareInfoCallback()
    setDocomoBikeShareGeoJson(docomoGeoJson)

    const helloCycleGeoJson = await helloCycleInfoCallback()
    setHelloCycleGeoJson(helloCycleGeoJson)

    //console.log(getHelloCycleGeoJson())
    //console.log(getDocomoBikeShareGeoJson())

    await toeiTrainRealTimeInfoCallback()
    setTimeData(getNowTime())
    getSelectedMode()
  }

  /**
   * 東京メトロリアルタイム運行情報
   */
  const tokyoMetroRealTimeInfoCallback = async () => {
    const res = await reqTokyoMetroRealTimeInfo()
    setGinzaInfo(res[0]["odpt:trainInformationText"]["ja"])
    setMarunouchiInfo(res[1]["odpt:trainInformationText"]["ja"])
    setMarunouchiBranchInfo(res[2]["odpt:trainInformationText"]["ja"])
    setHibiyaInfo(res[3]["odpt:trainInformationText"]["ja"])
    setTozaiInfo(res[4]["odpt:trainInformationText"]["ja"])
    setChiyodaInfo(res[5]["odpt:trainInformationText"]["ja"])
    setYurakuchoInfo(res[6]["odpt:trainInformationText"]["ja"])
    setHanzomonInfo(res[7]["odpt:trainInformationText"]["ja"])
    setNanbokuInfo(res[8]["odpt:trainInformationText"]["ja"])
    setHukutoshinInfo(res[9]["odpt:trainInformationText"]["ja"])
  }

  const toeiTrainRealTimeInfoCallback = async () => {
    const res = await reqToeiTrainRealTimeInfo()
    setAsakusaInfo(res[0]["odpt:trainInformationText"]["ja"])
    setMitaInfo(res[1]["odpt:trainInformationText"]["ja"])
    setShinjukuInfo(res[2]["odpt:trainInformationText"]["ja"])
    setOedoInfo(res[3]["odpt:trainInformationText"]["ja"])
    setArakawaInfo(res[4]["odpt:trainInformationText"]["ja"])
    setNipporitoneriInfo(res[5]["odpt:trainInformationText"]["ja"])
  }

  /**
   * ハローサイクリングステーション情報について位置情報とポート情報をくっつける
   */

  const helloCycleInfoCallback = async (): Promise<GeoJSONSourceSpecification> => {
    try {
      const station = await reqHelloCycleStationInfo()
      const status = await reqHelloCycleStationStatus()

      const stationWithStatus = station.map((station: any) => {
        const statusData = status.find((s: any) => s.station_id === station.station_id)
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [station.longitude, station.latitude], // 緯度経度を指定
          },
          properties: {
            ...station,
            ...statusData,
          },
        }
      })

      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stationWithStatus,
        },
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
      }
      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      }
    }
  }
  /**
   * ドコモバイクシェアステーション情報について位置情報とポート情報をくっつける
   */
  const docomoBikeShareInfoCallback = async (): Promise<GeoJSONSourceSpecification> => {
    try {
      const station = await reqDocomoBikeShareStationInfo()
      const status = await reqDocomoBikeShareStationStatus()

      const stationWithStatus = station.map((station: any) => {
        const statusData = status.find((s: any) => s.station_id === station.station_id)
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [station.longitude, station.latitude], // 緯度経度を指定
          },
          properties: {
            ...station,
            ...statusData,
          },
        }
      })

      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stationWithStatus,
        },
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message)
      }
      return {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      }
    }
  }

  // ホームサイトに遷移する関数
  const routeToHomeSite = () => {
    routeTo(HOME_SITE_ROOT_NAME)
  }
  //すべてのダイアログを開ける
  const openAllDialogs = () => {
    setLayerBarOpen(true)
    setDetailInfoDialogOpen(true)
  }
  //モードダイアログを開ける
  const openModeDialog = () => {
    setModeDialogOpen(true)
  }

  return {
    useViewSiteCallback,
    helloCycleInfoCallback,
    docomoBikeShareInfoCallback,
    buttonClicked,
    routeToHomeSite,
    getLayerBarOpen,
    getDetailInfoDialogOpen,
    getModeDialogOpen,
    getSelectedModeText,
    openModeDialog,
    setModeDialogOpen,
    setLayerBarOpen,
    setDetailInfoDialogOpen,
    openAllDialogs,
    changeLayerOrder,
    getLayers,
    getCardList,
    getIsDisplayLayer,
    setIsDisplayLayer,
    setOpacity,
    getTimeData,
    getGinzaInfo,
    getChiyodaInfo,
    getHanzomonInfo,
    getHibiyaInfo,
    getMarunouchiInfo,
    getMarunouchiBranchInfo,
    getYurakuchoInfo,
    getTozaiInfo,
    getNanbokuInfo,
    getHukutoshinInfo,
    getAsakusaInfo,
    getShinjukuInfo,
    getMitaInfo,
    getOedoInfo,
    getArakawaInfo,
    getNipporitoneriInfo,
    getTrainModeSelected,
    getBusModeSelected,
    getCycleModeSelected,
    getWalkModeSelected,
    setTrainModeSelected,
    setBusModeSelected,
    setCycleModeSelected,
    setWalkModeSelected,
  }
}
export default useViewSiteMain
