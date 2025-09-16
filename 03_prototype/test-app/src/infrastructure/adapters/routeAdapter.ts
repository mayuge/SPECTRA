import type { ISiteRouter } from "@/domain/interfaces/ISiteRouter"
import useSiteRouter from "@/infrastructure/router/siteRouter"
export const useSiteRouteAdapter = (): ISiteRouter => useSiteRouter()
