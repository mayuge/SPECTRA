import useTimeDataStore from "@/infrastructure/stores/timeDataStore"
import type { ITimeDataStore } from "@/domain/interfaces/ITimeDataStore"

import useDialogStateStore from "@/infrastructure/stores/dialogStateStore"
import type { IDialogState } from "@/domain/interfaces/IDialogState"
import useManageLayerStateStore from "@/infrastructure/stores/manageLayerStateStore"

import useTokyoMetroInfoStore from "@/infrastructure/stores/tokyoMetroInfoStore"
import type { ITokyoMetroInfoState } from '@/domain/interfaces/ITokyoMetroInfoState'

import useToeiTrainInfoStore from "@/infrastructure/stores/toeiTrainInfoStore"
import type { IToeiTrainInfoState } from "@/domain/interfaces/IToeiTrainInfoState"

import useJrEastInfoStore from "@/infrastructure/stores/jrEastInfoStore"
import type { IJrEastInfoState } from "@/domain/interfaces/IJrEastInfoState"

export const useTimeDataStoreAdapter = (): ITimeDataStore => useTimeDataStore()
export const useDialogStoreAdapter = ():IDialogState => useDialogStateStore()
export const useManageLayerAdapter = () => useManageLayerStateStore()
export const useTokyoMetroStoreAdapter = ():ITokyoMetroInfoState => useTokyoMetroInfoStore()
export const useToeiTrainInfoStoreAdapter = ():IToeiTrainInfoState => useToeiTrainInfoStore()
export const useJrEastInfoStoreAdapter = ():IJrEastInfoState => useJrEastInfoStore()
