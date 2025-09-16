export interface IModeState {
  homeModeSelected: boolean
  personModeSelected: boolean
  groupModeSelected: boolean
  fileModeSelected: boolean
  setHomeModeSelected: () => void
  setPersonModeSelected: () => void
  setGroupModeSelected: () => void
  setFileModeSelected: () => void
  getHomeModeSelected: () => boolean
  getPersonModeSelected: () => boolean
  getGroupModeSelected: () => boolean
  getFileModeSelected: () => boolean
}
