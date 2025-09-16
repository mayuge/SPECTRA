export interface IModeState {
  walkModeSelected: boolean
  cycleModeSelected: boolean
  busModeSelected: boolean
  trainModeSelected: boolean
  setWalkModeSelected: () => void
  setCycleModeSelected: () => void
  setBusModeSelected: () => void
  setTrainModeSelected: () => void
  getWalkModeSelected: () => boolean
  getCycleModeSelected: () => boolean
  getBusModeSelected: () => boolean
  getTrainModeSelected: () => boolean
}
