import { Jaro } from "next/font/google"
import path from "path"

export const companyLogoParams = {
  //東京メトロ
  東京地下鉄: {
    path: "tokyoMetro",
  },
  //都営地下鉄
  東京都: {
    path: "tokyoLogo",
  },
  //JR
  JR北海道: {
    path: "jrHokkaido",
  },
  JR東日本: {
    path: "jrEast",
  },
  JR東海: {
    path: "jrCentral",
  },
  JR西日本: {
    path: "jrWest",
  },
  JR四国: {
    path: "jrSikoku",
  },
  JR九州: {
    path: "jrKyusyu",
  },
  //西武線
  西武鉄道: {
    path: "seibu",
  },
  //多摩モノレール
  多摩都市モノレール: {
    path: "tamaMonoRail",
  },
  //京王線
  京王電鉄: {
    path: "keio",
  },
  //小田急線
  小田急電鉄: {
    path: "odakyu",
  },
  //東急
  東急電鉄: {
    path: "toukyu",
  },
  //東武
  東武鉄道: {
    path: "tobu",
  },
  埼玉高速鉄道: {
    path: "saitamakousoku",
  },
  //相鉄
  相模鉄道: {
    path: "sotetsu",
  },
  //京急・京成・新京成
  京浜急行電鉄: {
    path: "keikyu",
  },
  京成電鉄: {
    path: "keisei",
  },
  新京成電鉄: {
    path: "sinkeisei",
  },
  北総鉄道: {
    path: "hokusou",
  },
  首都圏新都市鉄道: {
    path: "tukuba",
  },

  //京葉高速鉄道
  //東京モノレール
  東京モノレール: {
    path: "tokyoMonoRail",
  },
  //千葉都市モノレール
  //金沢シーサイドライン:
  //りんかい線
  ゆりかもめ: {
    path: "yurikamome",
  },
  東京臨海高速鉄道: {
    path: "rinkai",
  },
  //江の島線:
  //横浜市営地下鉄ブルーライン
  //横浜市営地下鉄グリーンライン
}

export type CompanyKey = keyof typeof companyLogoParams
