import { useReqTrainApiAdapter } from "@/infrastructure/adapters/httpClientAdapters"

const useMapApp = () => {
  const { getAllStation, getStationByName, getAllTrainLine, getTrainLineByName } =
    useReqTrainApiAdapter()

  const getScreenshot = (deckRef: any) => {
    if (!deckRef.current) return
    try {
      // DeckGLのキャンバスを直接取得
      const canvas = deckRef.current.deck.canvas
      const result = canvas.toDataURL("image/jpeg", 1.0)

      // ダウンロードリンクを作成
      const link = document.createElement("a")
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-")
      link.download = `map-screenshot-${timestamp}.jpg`
      link.href = result
      link.click()
    } catch (error) {
      console.error("スクリーンショットの作成に失敗しました:", error)
    }
  }

  const getCurrentLocation = (mapRef: any) => {
    if (!navigator.geolocation) return alert("ブラウザが位置情報に対応していません")

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          pitch: mapRef.current.getPitch(),
          bearing: mapRef.current.getBearing(),
        })
      },
      (err) => {
        alert("位置情報の取得に失敗しました")
        console.error(err)
      }
    )
  }

  return {
    getScreenshot,
    getCurrentLocation,
    getAllStation,
    getStationByName,
    getAllTrainLine,
    getTrainLineByName,
  }
}

export default useMapApp
