import { useReqTrainApiAdapter } from "@/infrastructure/adapters/httpAdapter"

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
  return {
    getScreenshot,
    getAllStation,
    getStationByName,
    getAllTrainLine,
    getTrainLineByName,
  }
}

export default useMapApp
