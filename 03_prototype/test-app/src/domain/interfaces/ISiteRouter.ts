import type { SiteRootNameType } from "@/domain/types/siteRootNameType"
export interface ISiteRouter {
  routeTo: (siteRootName: SiteRootNameType) => void
}
