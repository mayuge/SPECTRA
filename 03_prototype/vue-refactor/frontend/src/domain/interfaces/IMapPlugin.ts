export interface IMapPlugin {
  compassPlugin: (mapInstance: any) => void
  locatePlugin: (mapInstance: any) => void
  scalePlugin: (mapInstance: any) => void
  fullscreenPlugin: (mapInstance: any) => void
  imgExportPlugin: (mapInstance: any) => void
  terrainPlugin: (mapInstance: any) => void
  setAllPlugins: (mapInstance: any) => void
}
