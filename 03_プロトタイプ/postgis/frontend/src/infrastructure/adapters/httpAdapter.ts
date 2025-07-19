import type { IReqTrainApi } from "@/domain/interfaces/IReqTrainApi"
import useReqTrainApi from "@/infrastructure/axios/train/reqTrainApi"

export const useReqTrainApiAdapter = (): IReqTrainApi => useReqTrainApi()
