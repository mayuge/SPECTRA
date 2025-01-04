import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/plateauLayer"
import { toeiBusCard } from "@/components/organisms/viewSite/core/params/toeiBusLayer"
import { cycleBlockCard } from "@/components/organisms/viewSite/core/params/cycleBlockLayer"
import { terrainCard } from "@/components/organisms/viewSite/core/params/terrainLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/googleMapLayer"
import { trainLineCard } from "@/components/organisms/viewSite/core/params/trainLineLayer"
import { tokyoMetroPointCard } from "@/components/organisms/viewSite/core/params/tokyoMetroPointLayer"
import { konjakuCard } from "@/components/organisms/viewSite/core/params/konjakuLayer"

import { toeiSubwayPointCard } from "@/components/organisms/viewSite/core/params/toeiSubwayPointLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/sateliteMapLayer"
import { helloCyclePointCard } from "@/components/organisms/viewSite/core/params/helloCyclePointLayer"
import { toeiBusPointCard } from "@/components/organisms/viewSite/core/params/toeiBusPointLayer"

export const cardLayerList: CardListType[] = [
  helloCyclePointCard,
  toeiBusPointCard,
  toeiSubwayPointCard,
  tokyoMetroPointCard,
  trainLineCard,
  // toeiBusCard,
  plateauCard,
  osmCard,
  // cycleBlockCard,

  terrainCard,
  sateliteMapCard,
  googleCard,
  konjakuCard,
]

export default cardLayerList
