import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/plateauLayer"
import { lineBusCard } from "@/components/organisms/viewSite/core/params/busLineLayer"
import { cyclePolygonCard } from "@/components/organisms/viewSite/core/params/cyclePolygonLayer"
import { terrainCard } from "@/components/organisms/viewSite/core/params/terrainLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/googleMapLayer"
import { trainLineCard } from "@/components/organisms/viewSite/core/params/trainLineLayer"
import { konjakuCard } from "@/components/organisms/viewSite/core/params/konjakuLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/sateliteMapLayer"
import { helloCyclePointCard } from "@/components/organisms/viewSite/core/params/helloCyclePointLayer"
import { docomoBikeSharePointCard } from "@/components/organisms/viewSite/core/params/docomoBikeSharePointLayer"
import { busPointCard } from "@/components/organisms/viewSite/core/params/busPointLayer"
import { trainPointCard } from "@/components/organisms/viewSite/core/params/trainPointLayer"
import { busPolygonCard } from "@/components/organisms/viewSite/core/params/busPolygonLayer"
import { slopePolygonCard } from "@/components/organisms/viewSite/core/params/slopePolygonLayer"

export const cardLayerList: CardListType[] = [
  trainPointCard,
  busPointCard,
  trainLineCard,
  lineBusCard,
  docomoBikeSharePointCard,
  helloCyclePointCard,
  plateauCard,
  busPolygonCard,
  cyclePolygonCard,
  slopePolygonCard,
  osmCard,
  googleCard,
  sateliteMapCard,
  // konjakuCard,
  // terrainCard,
]

export default cardLayerList
