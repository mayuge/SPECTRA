export interface ITimeDataStore {
  timeData: string
  setTimeData: (value: string) => void
  getTimeData: () => string
}
