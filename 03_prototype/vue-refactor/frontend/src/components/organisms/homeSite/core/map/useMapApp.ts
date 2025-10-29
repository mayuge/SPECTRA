import type { IMapInstance } from "@/domain/interfaces/IMapInstance"
const useMapApp = (mapInstance: IMapInstance) => {
  const { getMapInstance } = mapInstance
  const onMountedCallback = () => {
    getMapInstance()
  }
  return {
    onMountedCallback,
  }
}
export default useMapApp
