import { create } from "zustand"
import type { ITokyoMetroInfoState } from '@/domain/interfaces/ITokyoMetroInfoState'

const useTokyoMetroInfoStore = create<ITokyoMetroInfoState>()((set, get) => ({
  //東京メトロ各線運行状況
  marunouchiInfo: "情報を取得できませんでした",
  ginzaInfo: "情報を取得できませんでした",
  marunouchiBranchInfo: "情報を取得できませんでした",
  hibiyaInfo: "情報を取得できませんでした",
  tozaiInfo: "情報を取得できませんでした",
  chiyodaInfo: "情報を取得できませんでした",
  yurakuchoInfo: "情報を取得できませんでした",
  hanzomonInfo: "情報を取得できませんでした",
  nanbokuInfo: "情報を取得できませんでした",
  hukutoshinInfo:"情報を取得できませんでした",

  //丸ノ内線運行状況のセッター/ゲッター
  setMarunouchiInfo: (info: string) => set(() => ({ marunouchiInfo: info })),
  getMarunouchiInfo: () => get().marunouchiInfo,
  //丸ノ内線運行状況のセッター/ゲッター
  setGinzaInfo: (info: string) => set(() => ({ ginzaInfo: info })),
  getGinzaInfo: () => get().ginzaInfo,
  //丸ノ内線運行状況のセッター/ゲッター
  setMarunouchiBranchInfo: (info: string) => set(() => ({ marunouchiBranchInfo: info })),
  getMarunouchiBranchInfo: () => get().marunouchiBranchInfo,
  //丸ノ内線運行状況のセッター/ゲッター
  setHibiyaInfo: (info: string) => set(() => ({ hibiyaInfo: info })),
  getHibiyaInfo: () => get().hibiyaInfo,
  //丸ノ内線運行状況のセッター/ゲッター
  setTozaiInfo: (info: string) => set(() => ({ tozaiInfo: info })),
  getTozaiInfo: () => get().tozaiInfo,
  //丸ノ内線運行状況のセッター/ゲッター
  setChiyodaInfo: (info: string) => set(() => ({ chiyodaInfo: info })),
  getChiyodaInfo: () => get().chiyodaInfo,
  //丸ノ内線運行状況のセッター/ゲッター
  setYurakuchoInfo: (info: string) => set(() => ({ yurakuchoInfo: info })),
  getYurackuchoInfo: () => get().yurakuchoInfo,
  //丸ノ内線運行状況のセッター/ゲッター
  setHanzomonInfo: (info: string) => set(() => ({ hanzomonInfo: info })),
  getHanzomonInfo: () => get().hanzomonInfo,
  //丸ノ内線運行状況のセッター/ゲッター
  setNanbokuInfo: (info: string) => set(() => ({ nanbokuInfo: info })),
  getNanbokuInfo: () => get().nanbokuInfo,

  setHukutoshinInfo:(info: string) => set(() => ({ hukutoshinInfo: info })),
  getHukutoshinInfo: () => get().hukutoshinInfo,
}))

export default useTokyoMetroInfoStore
