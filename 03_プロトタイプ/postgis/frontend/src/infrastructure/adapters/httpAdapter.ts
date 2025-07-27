import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
import type { IReqChatApi } from "@/domain/interfaces/IReqChatApi"

import useReqTrainApi from "@/infrastructure/axios/train/reqTrainApi"
import useReqChatApi from "@/infrastructure/axios/chat/reqChatApi"

export const useReqTrainApiAdapter = (): IReqTrainApi => useReqTrainApi()
export const useReqChatApiAdapter = (): IReqChatApi => useReqChatApi()
