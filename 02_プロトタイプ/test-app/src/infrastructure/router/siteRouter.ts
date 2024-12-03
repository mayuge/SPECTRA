import type { SiteRootNameType } from "@/domain/types/siteRootNameType"

const useRouter = () => {
  const routeTo = (siteRootName: SiteRootNameType) => {
    window.location.href = siteRootName // メニューページに遷移する
  }
  return {
    routeTo,
  }
}
export default useRouter
