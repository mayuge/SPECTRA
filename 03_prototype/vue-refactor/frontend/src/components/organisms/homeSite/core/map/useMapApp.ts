import type { ICreateMap } from "@/domain/interfaces/ICreateMap"
const useMapApp = (createMap: ICreateMap) => {
  const { getMapInstance } = createMap
  const onMountedCallback = () => {
    getMapInstance()
  }
  return {
    onMountedCallback,
  }
}
export default useMapApp
