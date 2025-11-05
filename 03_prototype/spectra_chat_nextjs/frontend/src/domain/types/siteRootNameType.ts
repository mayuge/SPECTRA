import type {
  HOME_SITE_ROOT_NAME,
  VIEW_SITE_ROOT_NAME,
  SOURCE_SITE_ROOT_NAME,
} from "@/domain/params/siteRootName.ts"
export type SiteRootNameType =
  | typeof HOME_SITE_ROOT_NAME
  | typeof VIEW_SITE_ROOT_NAME
  | typeof SOURCE_SITE_ROOT_NAME
