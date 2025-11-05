export interface IDisplayLayerState {
  layersObj: Record<string, boolean>
  toggleDisplayLayer: (name: string) => void
  addDisplayLayer: (name: string, visible?: boolean) => void
  getDisplayLayer: (name: string) => boolean | undefined
}
