import useGetTimeData from "@/infrastructure/dateTime/getTimeData"
import type { IGetTimeData } from "@/domain/interfaces/IGetTime"

export const useGetTimeDataAdapter = (): IGetTimeData => useGetTimeData()
