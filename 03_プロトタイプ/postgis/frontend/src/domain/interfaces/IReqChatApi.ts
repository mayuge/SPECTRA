import type { AllGeoJsonType } from "@/domain/types/geoJsonType"
export interface IReqChatApi {
  //sendChatMessage: (message: string) => Promise<AllGeoJsonType[]>
  sendChatMessage: (message: string) => Promise<any>
}
