import { vi, describe, test, expect, beforeEach } from "vitest"

import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"
import type { IReqSuggestApi } from "@/domain/interfaces/IReqSuggestApi"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { ILoadingState } from "@/domain/interfaces/ILoadingState"
import type { IGeoProcessing } from "@/domain/interfaces/IGeoprocessing"

import { MAIN_PANEL } from "@/domain/params/dialogName"
import { PULLTAB_LEFT_ICON, PULLTAB_RIGHT_ICON } from "@/domain/params/iconText"

import useChatPanelApp from "@/presentation/organisms/homeSite/core/panel/useChatPanelApp"

const mockDialogState: IDialogState = {
  getPanelWidth: vi.fn(),
  startResize: vi.fn(),
  stopResize: vi.fn(),
  toggleDialogState: vi.fn(),
  setDialogState: vi.fn(),
  getDialogState: vi.fn(),
}

const mockReqChatApi: IReqChatApi = {
  sendChatMessage: vi.fn(),
}
const mockReqSuggestApi: IReqSuggestApi = {
  getSuggestData: vi.fn(),
}

const mockMapLayer: IMapLayer = {
  addGeoJsonLayer: vi.fn(),
  toggleLayer: vi.fn(),
  backToLayer: vi.fn(),
  frontToLayer: vi.fn(),
  setLayerOpacity: vi.fn(),
  setLayerColor: vi.fn(),
}

const mockChatState: IChatState = {
  getChatMessageList: vi.fn(),
  addChatMessage: vi.fn(),
  getDataMessageLength: vi.fn(),
  getChatHistory: vi.fn(),
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

const mockGeoProcessing: IGeoProcessing = {
  intersectGeojson: vi.fn(),
  intersectFeature: vi.fn(),
}

describe("useChatPanelApp.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const { getMainPanelOpen, toggleMainPanel } = useChatPanelApp(
      mockDialogState,
      mockReqChatApi,
      mockReqSuggestApi,
      mockMapLayer,
      mockChatState,
      mockGeojsonState,
      mockLoadingState,
      mockGeoProcessing
    )
    getMainPanelOpen()
    toggleMainPanel()
  })

  describe("正常系:getMainPanelOpen", () => {
    test("getDialogStateが正しい引数で呼ばれる", () => {
      expect(mockDialogState.getDialogState).toBeCalledWith(MAIN_PANEL)
    })
  })
  describe("正常系:toggleMainPanel", () => {
    test("toggleDialogStateが正しい引数で呼ばれる", () => {
      const { toggleMainPanel } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      toggleMainPanel()
      expect(mockDialogState.toggleDialogState).toBeCalledWith(MAIN_PANEL)
    })
  })
  describe("正常系:getPullTabIcon", () => {
    test("getDialogStateが正しい引数で呼ばれる", () => {
      const { getPullTabIcon } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      getPullTabIcon()
      expect(mockDialogState.getDialogState).toBeCalledWith(MAIN_PANEL)
    })
    test("正しいアイコン名が返り、トグルする", () => {
      const { getPullTabIcon } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      // mockDialogState.getDialogStateの戻り値をtrueに設定
      ;(mockDialogState.getDialogState as ReturnType<typeof vi.fn>).mockReturnValueOnce(true)
      expect(getPullTabIcon()).toBe(PULLTAB_LEFT_ICON)
      // mockDialogState.getDialogStateの戻り値をfalseに設定
      ;(mockDialogState.getDialogState as ReturnType<typeof vi.fn>).mockReturnValueOnce(false)
      expect(getPullTabIcon()).toBe(PULLTAB_RIGHT_ICON)
    })
  })
})
