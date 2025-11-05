import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"
import type { IReqCycleApi } from "@/domain/interfaces/IReqCycleApi"

import useReqTrainApi from "@/infrastructure/axios/train/reqTrainApi"
import useReqCycleApi from "@/infrastructure/axios/cycle/reqCycleApi"
import useReqChatApi from "@/infrastructure/axios/chat/reqChatApi"

export const useReqTrainApiAdapter = (): IReqTrainApi => useReqTrainApi()
export const useReqChatApiAdapter = (): IReqChatApi => useReqChatApi()
export const useReqCycleApiAdapter = (): IReqCycleApi => useReqCycleApi()
