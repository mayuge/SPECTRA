import type { IGetTimeData } from "@/domain/interfaces/IGetTime"
const useGetTimeData = (): IGetTimeData => {
  // 現在の時刻を HH:MM 形式で取得
  const getNowTime = (): string => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, "0")
    const minutes = String(now.getMinutes()).padStart(2, "0")
    return `${hours}:${minutes}`
  }
  return { getNowTime }
}
export default useGetTimeData
