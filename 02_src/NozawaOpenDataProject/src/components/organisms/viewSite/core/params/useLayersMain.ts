import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/plateauLayer"
import { toeiBusCard } from "@/components/organisms/viewSite/core/params/toeiBusLayer"
import { cycleBlockCard } from "@/components/organisms/viewSite/core/params/cycleBlockLayer"
import { terrainCard } from "@/components/organisms/viewSite/core/params/terrainLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/googleMapLayer"
import { tokyoMetroLineCard } from "@/components/organisms/viewSite/core/params/tokyoMetroLineLayer"
import { tokyoMetroPointCard } from "@/components/organisms/viewSite/core/params/tokyoMetroPointLayer"
import { konjakuCard } from "@/components/organisms/viewSite/core/params/konjakuLayer"
import { toeiSubwayLineCard } from "@/components/organisms/viewSite/core/params/toeiSubwayLineLayer"
import { toeiSubwayPointCard } from "@/components/organisms/viewSite/core/params/toeiSubwayPointLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/sateliteMapLayer"
import { helloCyclePointCard } from "@/components/organisms/viewSite/core/params/helloCyclePointLayer"

export const cardLayerList: CardListType[] = [
  helloCyclePointCard,
  toeiSubwayPointCard,
  tokyoMetroPointCard,
  toeiSubwayLineCard,
  tokyoMetroLineCard,
  // toeiBusCard,
  plateauCard,
  osmCard,
  cycleBlockCard,
  terrainCard,
  sateliteMapCard,
  googleCard,
  konjakuCard,
]

export default cardLayerList
