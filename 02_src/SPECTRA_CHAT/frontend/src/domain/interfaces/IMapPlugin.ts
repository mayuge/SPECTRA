export interface IMapPlugin {
  compassPlugin: () => void
  locatePlugin: () => void
  scalePlugin: () => void
  fullscreenPlugin: () => void
  imgExportPlugin: () => void
  terrainPlugin: () => void
  setAllPlugins: () => void
}
