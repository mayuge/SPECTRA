import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/plateauLayer"
import { toeiBusCard } from "@/components/organisms/viewSite/core/params/toeiBusLayer"
import { cycleBlockCard } from "@/components/organisms/viewSite/core/params/cycleBlockLayer"
import { terrainCard } from "@/components/organisms/viewSite/core/params/terrainLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/googleMapLayer"
import { trainLineCard } from "@/components/organisms/viewSite/core/params/trainLineLayer"
import { konjakuCard } from "@/components/organisms/viewSite/core/params/konjakuLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/sateliteMapLayer"
import { helloCyclePointCard } from "@/components/organisms/viewSite/core/params/helloCyclePointLayer"
import { docomoBikeSharePointCard } from "@/components/organisms/viewSite/core/params/docomoBikeSharePointLayer"
import { toeiBusPointCard } from "@/components/organisms/viewSite/core/params/toeiBusPointLayer"
import { trainPointCard } from "@/components/organisms/viewSite/core/params/trainPointLayer"

export const cardLayerList: CardListType[] = [
  docomoBikeSharePointCard,
  helloCyclePointCard,
  toeiBusPointCard,
  trainPointCard,
  trainLineCard,
  // toeiBusCard,
  plateauCard,
  osmCard,
  // cycleBlockCard,
  // terrainCard,
  sateliteMapCard,
  googleCard,
  // konjakuCard,
]

export default cardLayerList
