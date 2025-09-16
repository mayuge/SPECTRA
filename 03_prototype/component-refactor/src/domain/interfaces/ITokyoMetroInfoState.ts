export interface ITokyoMetroInfoState {
  marunouchiInfo: string
  ginzaInfo: string
  marunouchiBranchInfo: string
  hibiyaInfo: string
  tozaiInfo: string
  chiyodaInfo: string
  yurakuchoInfo: string
  hanzomonInfo: string
  nanbokuInfo: string
  hukutoshinInfo: string

  setMarunouchiInfo: (info: string) => void
  getMarunouchiInfo: () => string
  setGinzaInfo: (info: string) => void
  getGinzaInfo: () => string
  setMarunouchiBranchInfo: (info: string) => void
  getMarunouchiBranchInfo: () => string
  setHibiyaInfo: (info: string) => void
  getHibiyaInfo: () => string
  setTozaiInfo: (info: string) => void
  getTozaiInfo: () => string
  setChiyodaInfo: (info: string) => void
  getChiyodaInfo: () => string
  setYurakuchoInfo: (info: string) => void
  getYurakuchoInfo: () => string
  setHanzomonInfo: (info: string) => void
  getHanzomonInfo: () => string
  setNanbokuInfo: (info: string) => void
  getNanbokuInfo: () => string
  setHukutoshinInfo: (info: string) => void
  getHukutoshinInfo: () => string
}
