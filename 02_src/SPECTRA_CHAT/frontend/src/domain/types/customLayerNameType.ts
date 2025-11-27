import {
  TRAIN_STATION_LAYER,
  TRAIN_LINE_LAYER,
  DOCOMO_BIKE_SHARE_LAYER,
  HELLO_CYCLE_LAYER,
  TOEI_BUS_POINT_LAYER,
  TOEI_BUS_LINE_LAYER,
} from "@/domain/params/customLayerName"
export type CustomLayerNameType =
  | typeof TRAIN_STATION_LAYER
  | typeof TRAIN_LINE_LAYER
  | typeof HELLO_CYCLE_LAYER
  | typeof DOCOMO_BIKE_SHARE_LAYER
  | typeof TOEI_BUS_POINT_LAYER
  | typeof TOEI_BUS_LINE_LAYER
