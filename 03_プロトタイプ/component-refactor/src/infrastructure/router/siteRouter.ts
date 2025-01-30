import type { SiteRootNameType } from "@/domain/types/siteRootNameType"
import type { ISiteRouter } from "@/domain/interfaces/ISiteRouter"

const useSiteRouter = (): ISiteRouter => {
  const routeTo = (siteRootName: SiteRootNameType) => {
    window.location.href = siteRootName // メニューページに遷移する
  }
  return {
    routeTo,
  }
}
export default useSiteRouter
