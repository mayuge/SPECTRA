import { vi, describe, test, expect, beforeEach } from "vitest"

import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"

import useChatApp from "@/presentation/organisms/homeSite/core/panel/useChatApp"

const mockChatState: IChatState = {
  getChatMessageList: vi.fn(),
  addChatMessage: vi.fn(),
  getDataMessageLength: vi.fn(),
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
  setColor: vi.fn(),
  getGeojsonColorbyIndex: vi.fn(),
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
    } = useChatApp(mockChatState, mockMapLayer, mockGeojsonState)

    toggleResponseLayer(1)
    frontToResponseLayer(1)
    backToResponseLayer(1)
    setColorByIndex(1, "#808080")
    setOpacityByIndex(1, 0.5)
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
})
