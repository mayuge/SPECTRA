export interface IReqTrainApi {
  getAllStation: () => Promise<any>
  getStationByName: (stationName: string) => Promise<any>
}
