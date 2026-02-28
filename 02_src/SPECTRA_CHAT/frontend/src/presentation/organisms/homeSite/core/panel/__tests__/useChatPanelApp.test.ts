import { vi, describe, test, expect, beforeEach } from "vitest"

import type { IDialogState } from "@/domain/interfaces/IDialogState"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"
import type { IReqSuggestApi } from "@/domain/interfaces/IReqSuggestApi"
import type { IMapLayer } from "@/domain/interfaces/IMapLayer"
import type { IChatState } from "@/domain/interfaces/IChatState"
import type { IGeojsonState } from "@/domain/interfaces/IGeojsonState"
import type { ILoadingState } from "@/domain/interfaces/ILoadingState"
import type { IGeoProcessing } from "@/domain/interfaces/IGeoprocessing"

import type { ChatType } from "@/domain/types/chatType"

import { MAIN_PANEL } from "@/domain/params/dialogName"
import { PULLTAB_LEFT_ICON, PULLTAB_RIGHT_ICON } from "@/domain/params/iconText"
import { CHAT_SUGGEST_LIST } from "@/domain/params/chatSuggest"

import useChatPanelApp from "@/presentation/organisms/homeSite/core/panel/useChatPanelApp"
import { mock } from "node:test"

const mockChatMessage: ChatType = {
  type: "request",
  message: "埼玉県を取得してください。",
  isdata: false,
}

const mockGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",

        coordinates: [
          [
            [139.491806, 35.856398],
            [139.491806, 35.856398],
            [139.491806, 35.856398],
            [139.491806, 35.856398],
          ],
        ],
      },
      properties: {
        name: "Mock Area",
      },
    },
  ],
}

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
  getSuggestData: vi.fn().mockResolvedValue(mockGeojson),
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
  getChatMessageList: vi.fn().mockReturnValue(mockChatMessage),
  addChatMessage: vi.fn(),
  getDataMessageLength: vi.fn(),
  getChatHistory: vi.fn(),
}

const mockGeojsonState: IGeojsonState = {
  setGeojson: vi.fn(),
  getLastGeojson: vi.fn().mockReturnValue(mockGeojson),
  getGeojsonByIndex: vi.fn(),
  setColor: vi.fn(),
  getGeojsonColorbyIndex: vi.fn(),
}

const mockLoadingState: ILoadingState = {
  startLoading: vi.fn(),
  stopLoading: vi.fn(),
  getIsLoading: vi.fn().mockReturnValue(false),
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
  describe("正常系:isBlankChat", () => {
    test("チャットが空でなければfalseを返す", () => {
      const { isBlankChat } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      expect(isBlankChat()).toBe(false)
    })
    test("チャットが空ならtrueを返す", () => {
      const { isBlankChat } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      // mockChatState.getChatMessageListの戻り値を空配列に設定
      ;(mockChatState.getChatMessageList as ReturnType<typeof vi.fn>).mockReturnValueOnce([])
      expect(isBlankChat()).toBe(true)
    })
  })

  describe("正常系:suggestButtonClicked", () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })
    test("getIsLoadingがtrueなら、returnして終了。getSuggestDataが呼ばれないことを確認", async () => {
      // mockLoadingState.getIsLoadingの戻り値をtrueに設定
      ;(mockLoadingState.getIsLoading as ReturnType<typeof vi.fn>).mockReturnValueOnce(true)
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockReqSuggestApi.getSuggestData).not.toBeCalled()
    })
    test("startLoadingが呼ばれることを確認", async () => {
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockLoadingState.startLoading).toBeCalled()
    })
    test("openMainPanelが呼ばれることを確認", async () => {
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockDialogState.setDialogState).toBeCalledWith(MAIN_PANEL, true)
    })
    test("addChatMessageが呼ばれることを確認", async () => {
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockChatState.addChatMessage).toBeCalledWith({
        type: "request",
        message: CHAT_SUGGEST_LIST[0].text,
        isdata: false,
      })
    })
    test("getSuggestDataが呼ばれることを確認", async () => {
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockReqSuggestApi.getSuggestData).toBeCalledWith(CHAT_SUGGEST_LIST[0].url)
    })
    test("正しい引数でsetGeojsonが呼ばれることを確認", async () => {
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )

      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockGeojsonState.setGeojson).toBeCalledWith(mockGeojson)
    })
    test("addGeojsonLayerが呼ばれることを確認", async () => {
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockMapLayer.addGeoJsonLayer).toBeCalledWith(mockGeojson)
    })

    test("addChatMessageがresponseタイプで呼ばれることを確認", async () => {
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockChatState.addChatMessage).toBeCalledWith({
        type: "response",
        message: `【表示結果】${CHAT_SUGGEST_LIST[0].text}`,
        isdata: true,
      })
    })

    test("stopLoadingが呼ばれることを確認", async () => {
      const { suggestButtonClicked } = useChatPanelApp(
        mockDialogState,
        mockReqChatApi,
        mockReqSuggestApi,
        mockMapLayer,
        mockChatState,
        mockGeojsonState,
        mockLoadingState,
        mockGeoProcessing
      )
      await suggestButtonClicked(CHAT_SUGGEST_LIST[0])
      expect(mockLoadingState.stopLoading).toBeCalled()
    })
  })
})
