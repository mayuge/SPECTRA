import { create } from "zustand"
import { IToeiTrainInfoState } from "@/domain/interfaces/IToeiTrainInfoState"

const useToeiTrainInfoStore = create<IToeiTrainInfoState>()((set, get) => ({
  //東京メトロ各線運行状況
  asakusaInfo: "情報を取得できませんでした",
  mitaInfo: "情報を取得できませんでした",
  shinjukuInfo: "情報を取得できませんでした",
  oedoInfo: "情報を取得できませんでした",
  arakawaInfo: "情報を取得できませんでした",
  nipporiToneriInfo: "情報を取得できませんでした",

  //浅草線運行状況のセッター/ゲッター
  setAsakusaInfo: (info: string) => set(() => ({ asakusaInfo: info })),
  getAsakusaInfo: () => get().asakusaInfo,
  //三田線運行状況のセッター/ゲッター
  setMitaInfo: (info: string) => set(() => ({ mitaInfo: info })),
  getMitaInfo: () => get().mitaInfo,
  //新宿線運行状況のセッター/ゲッター
  setShinjukuInfo: (info: string) => set(() => ({ shinjukuInfo: info })),
  getShinjukuInfo: () => get().shinjukuInfo,
  //大江戸線運行状況のセッター/ゲッター
  setOedoInfo: (info: string) => set(() => ({ oedoInfo: info })),
  getOedoInfo: () => get().oedoInfo,
  //荒川線運行状況のセッター/ゲッター
  setArakawaInfo: (info: string) => set(() => ({ arakawaInfo: info })),
  getArakawaInfo: () => get().arakawaInfo,
  //日暮里舎人ライナー運行状況のセッター/ゲッター
  setNipporitoneriInfo: (info: string) => set(() => ({ nipporiToneriInfo: info })),
  getNipporitoneriInfo: () => get().nipporiToneriInfo,
}))

export default useToeiTrainInfoStore
