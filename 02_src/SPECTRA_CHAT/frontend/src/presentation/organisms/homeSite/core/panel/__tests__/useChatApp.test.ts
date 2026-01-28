import { vi, describe, test, expect, beforeEach } from "vitest"

import type { ChatType } from "@/domain/types/chatType"

import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { ILoadingState } from "@/domain/interfaces/ILoadingState"

import useChatApp from "@/presentation/organisms/homeSite/core/panel/useChatApp"

const mockMessageList: ChatType[] = [
  {
    type: "request",
    message: "静岡県を取得",
    isdata: false,
  },
  {
    type: "response",
    message: "静岡県のGeoJSONデータです。",
    isdata: true,
  },
]

const mockChatState: IChatState = {
  getChatMessageList: vi.fn().mockReturnValue(mockMessageList),
  addChatMessage: vi.fn(),
  getDataMessageLength: vi.fn(),
  getChatHistory: vi.fn(),
}

const mockMapLayer: IMapLayer = {
  addGeoJsonLayer: vi.fn(),
  toggleLayer: vi.fn(),
  backToLayer: vi.fn(),
  frontToLayer: vi.fn(),
  setLayerOpacity: vi.fn(),
  setLayerColor: vi.fn(),
}

const mockGeojsonState: IGeojsonState = {
  setGeojson: vi.fn(),
  getLastGeojson: vi.fn(),
  getGeojsonByIndex: vi.fn(),
  setColor: vi.fn(),
  getGeojsonColorbyIndex: vi.fn(),
}

const mockLoadingState: ILoadingState = {
  startLoading: vi.fn(),
  stopLoading: vi.fn(),
  getIsLoading: vi.fn(),
}

describe("useChatApp.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const {
      toggleResponseLayer,
      frontToResponseLayer,
      backToResponseLayer,
      setColorByIndex,
      setOpacityByIndex,
      getResponseIndex,
    } = useChatApp(mockChatState, mockMapLayer, mockGeojsonState, mockLoadingState)

    toggleResponseLayer(1)
    frontToResponseLayer(1)
    backToResponseLayer(1)
    setColorByIndex(1, "#808080")
    setOpacityByIndex(1, 0.5)
    getResponseIndex(0)
  })
  describe("正常系:toggleResponseLayer", () => {
    test("toggleLayerが正しい引数で呼ばれる", () => {
      expect(mockMapLayer.toggleLayer).toBeCalledWith("geojson-layer-1")
    })
  })
  describe("正常系:frontToResponseLayer", () => {
    test("frontToLayerが正しい引数で呼ばれる", () => {
      expect(mockMapLayer.frontToLayer).toBeCalledWith("geojson-layer-1")
    })
  })
  describe("正常系:backToResponseLayer", () => {
    test("backToLayerが正しい引数で呼ばれる", () => {
      expect(mockMapLayer.backToLayer).toBeCalledWith("geojson-layer-1")
    })
  })
  describe("正常系:setColorByIndex", () => {
    test("setLayerColorが正しい引数で呼ばれる", () => {
      expect(mockMapLayer.setLayerColor).toBeCalledWith("geojson-layer-1", "#808080")
    })
  })
  describe("正常系:setOpacityByIndex", () => {
    test("setLayerOpacityが正しい引数で呼ばれる", () => {
      expect(mockMapLayer.setLayerOpacity).toBeCalledWith("geojson-layer-1", 0.5)
    })
  })
  describe("正常系:getResponseIndex", () => {
    test("getChatMessageListが呼ばれる", () => {
      expect(mockChatState.getChatMessageList).toHaveReturnedWith(mockMessageList)
    })
    test("正しい通し番号が返る", () => {
      const { getResponseIndex } = useChatApp(
        mockChatState,
        mockMapLayer,
        mockGeojsonState,
        mockLoadingState
      )
      // mockMessageList[0] = request, isdata: false → 条件に合わない
      // mockMessageList[1] = response, isdata: true → 条件に合う
      // getResponseIndex(1)は counter=1, return 0 を期待
      expect(getResponseIndex(1)).toBe(0)
    })
  })
})
