export interface IJrEastInfoState {
  chuoInfo: string
  chuoKaisokuInfo: string
  soubuInfo: string
  yamanoteInfo: string
  keihinTohokuInfo: string
  musasinoInfo: string
  setChuoInfo: (info: string) => void
  getChuoInfo: () => string
  setChuoKaisokuInfo: (info: string) => void
  getChuoKaisokuInfo: () => string
  setSoubuInfo: (info: string) => void
  getSoubuInfo: () => string
  setYamanoteInfo: (info: string) => void
  getYamanoteInfo: () => string
  setKeihinTouhokuInfo: (info: string) => void
  getKeihinTouhokuInfo: () => string
  setMusasinoInfo: (info: string) => void
  getMusasinoInfo: () => string
}
