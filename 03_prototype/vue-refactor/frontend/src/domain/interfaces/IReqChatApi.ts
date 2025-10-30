import type { Feature, Geometry } from "geojson"

export interface IReqChatApi {
  sendChatMessage: (message: string) => Promise<Feature<Geometry, { [key: string]: any }>>
}
