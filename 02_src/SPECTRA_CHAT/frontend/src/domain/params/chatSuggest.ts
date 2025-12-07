import type { SuggestType } from "@/domain/types/suggestType.ts"

export const CHAT_SUGGEST_LIST: SuggestType[] = [
  { text: "千葉県", url: `${import.meta.env.VITE_PREFECTURE_URL}千葉県` },
  { text: "横浜市", url: `${import.meta.env.VITE_CITY_URL}横浜市` },
  {
    text: "東京都千代田区霞が関１丁目",
    url: `${import.meta.env.VITE_GEOCODING_URL}東京都千代田区霞が関１丁目`,
  },
  { text: "渋谷駅", url: `${import.meta.env.VITE_TRAIN_STATION_DETAIL_URL}渋谷` },
  { text: "すべての駅", url: `${import.meta.env.VITE_TRAIN_STATION_URL}` },
  {
    text: "さいたま市にある駅",
    url: `${import.meta.env.VITE_CITY_URL}さいたま市/overlaps/unkohonsu2024_rosen_eki`,
  },
  { text: "駅から徒歩10分圏内", url: `${import.meta.env.VITE_TRAIN_STATION_BUFFER}800` },
  { text: "山手線", url: `${import.meta.env.VITE_TRAIN_LINE_DETAIL_URL}山手線` },
  { text: "すべての鉄道路線", url: `${import.meta.env.VITE_TRAIN_LINE_URL}` },
  {
    text: "1日の運行本数が1000本以上の駅",
    url: `${import.meta.env.VITE_TRAIN_STATION_FREQUENCY}1000`,
  },
  {
    text: "1日の運行本数が500本以上の鉄道路線",
    url: `${import.meta.env.VITE_TRAIN_LINE_FREQUENCY}500`,
  },
  {
    text: "スーパーマーケットから500m圏内",
    url: `${import.meta.env.VITE_SUPERMARKET_BUFFER_URL}500`,
  },
  { text: "シェアサイクルポート", url: `${import.meta.env.VITE_CYCLE_URL}` },
  { text: "ハローサイクリング", url: `${import.meta.env.VITE_HELLO_CYCLE_STATION_URL}` },
  { text: "ドコモバイクシェア", url: `${import.meta.env.VITE_DOCOMO_BIKE_SHARE_STATION_URL}` },
  { text: "都営バス バス停", url: `${import.meta.env.VITE_BUS_POINT_TOKYO_URL}` },
  { text: "都営バス 路線", url: `${import.meta.env.VITE_BUS_LINE_TOKYO_URL}` },
]
