import { create } from "zustand"
import type { IJrEastInfoState } from "@/domain/interfaces/IJrEastInfoState"

const useJrEastInfoStore = create<IJrEastInfoState>()((set, get) => ({
  //JR各線運行状況
  chuoInfo: "情報を取得できませんでした",
  chuoKaisokuInfo: "情報を取得できませんでした",
  soubuInfo: "情報を取得できませんでした",
  yamanoteInfo: "情報を取得できませんでした",
  keihinTohokuInfo: "情報を取得できませんでした",
  musasinoInfo: "情報を取得できませんでした",

  //中央線運行状況のセッター/ゲッター
  setChuoInfo: (info: string) => set(() => ({ chuoInfo: info })),
  getChuoInfo: () => get().chuoInfo,
  //中央快速線運行状況のセッター/ゲッター
  setChuoKaisokuInfo: (info: string) => set(() => ({ chuoKaisokuInfo: info })),
  getChuoKaisokuInfo: () => get().chuoKaisokuInfo,
  //総武線運行状況のセッター/ゲッター
  setSoubuInfo: (info: string) => set(() => ({ soubuInfo: info })),
  getSoubuInfo: () => get().soubuInfo,
  //山手線運行状況のセッター/ゲッター
  setYamanoteInfo: (info: string) => set(() => ({ yamanoteInfo: info })),
  getYamanoteInfo: () => get().yamanoteInfo,
  //京浜東北線運行状況のセッター/ゲッター
  setKeihinTouhokuInfo: (info: string) => set(() => ({ keihinTohokuInfo: info })),
  getKeihinTouhokuInfo: () => get().keihinTohokuInfo,
  //武蔵野線運行状況のセッター/ゲッター
  setMusasinoInfo: (info: string) => set(() => ({ chuoInfo: info })),
  getMusasinoInfo: () => get().chuoInfo,
}))

export default useJrEastInfoStore
