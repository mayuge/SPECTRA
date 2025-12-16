import { vi, describe, test, expect, beforeEach } from "vitest"

import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
import type { IMapPlugin } from "@/domain/interfaces/IMapPlugin"

import useMapApp from "@/presentation/organisms/homeSite/core/map/useMapApp"

const mockMapInstance: IMapInstance = {
  getMapInstance: vi.fn(),
}

const mockMapPlugin: IMapPlugin = {
  compassPlugin: vi.fn(),
  locatePlugin: vi.fn(),
  scalePlugin: vi.fn(),
  fullscreenPlugin: vi.fn(),
  imgExportPlugin: vi.fn(),
  terrainPlugin: vi.fn(),
  setAllPlugins: vi.fn(),
}

describe("useMapApp.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const { onMountedCallback } = useMapApp(mockMapInstance, mockMapPlugin)
    onMountedCallback()
  })

  describe("正常系：onMoutedCallback", () => {
    test("getMapInstanceが呼ばれる", () => {
      expect(mockMapInstance.getMapInstance).toHaveBeenCalled()
    })

    test("setAllPluginsが呼ばれる", () => {
      expect(mockMapPlugin.setAllPlugins).toHaveBeenCalled()
    })
  })
})
