export interface IToeiTrainInfoState {
  asakusaInfo: string
  mitaInfo: string
  shinjukuInfo: string
  oedoInfo: string
  arakawaInfo: string
  nipporiToneriInfo: string
  setAsakusaInfo: (info: string) => void
  getAsakusaInfo: () => string
  setMitaInfo: (info: string) => void
  getMitaInfo: () => string
  setShinjukuInfo: (info: string) => void
  getShinjukuInfo: () => string
  setOedoInfo: (info: string) => void
  getOedoInfo: () => string
  setArakawaInfo: (info: string) => void
  getArakawaInfo: () => string
  setNipporitoneriInfo: (info: string) => void
  getNipporitoneriInfo: () => string
}
