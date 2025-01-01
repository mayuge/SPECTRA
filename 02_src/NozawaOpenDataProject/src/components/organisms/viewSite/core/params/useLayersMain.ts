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
import { toeiSubwayCard } from "@/components/organisms/viewSite/core/params/toeiSubwayLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/sateliteMapLayer"

export const cardLayerList: CardListType[] = [
  tokyoMetroPointCard,
  toeiSubwayCard,
  tokyoMetroLineCard,
  toeiBusCard,
  plateauCard,
  cycleBlockCard,
  terrainCard,
  sateliteMapCard,
  googleCard,
  osmCard,
  konjakuCard,
]

export default cardLayerList
