import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/plateauLayer"
import { toeiBusCard } from "@/components/organisms/viewSite/core/params/toeiBusLayer"
import { cycleBlockCard } from "@/components/organisms/viewSite/core/params/cycleBlockLayer"
import { terrainCard } from "@/components/organisms/viewSite/core/params/terrainLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/googleMapLayer"
import { tokyoMetroCard } from "@/components/organisms/viewSite/core/params/tokyoMetroLineLayer"
import { konjakuCard } from "@/components/organisms/viewSite/core/params/konjakuLayer"

export const cardLayerList: CardListType[] = [
  tokyoMetroCard,
  toeiBusCard,
  plateauCard,
  cycleBlockCard,
  terrainCard,
  googleCard,
  osmCard,
  konjakuCard,
]

export default cardLayerList
