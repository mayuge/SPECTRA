import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/trainMode/plateauLayer"
import { lineBusCard } from "@/components/organisms/viewSite/core/params/trainMode/busLineLayer"
import { cyclePolygonCard } from "@/components/organisms/viewSite/core/params/trainMode/cyclePolygonLayer"
import { terrainCard } from "@/components/organisms/viewSite/core/params/trainMode/terrainLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/trainMode/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/trainMode/googleMapLayer"
import { trainLineCard } from "@/components/organisms/viewSite/core/params/trainMode/trainLineLayer"
import { konjakuCard } from "@/components/organisms/viewSite/core/params/trainMode/konjakuLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/trainMode/sateliteMapLayer"
import { helloCyclePointCard } from "@/components/organisms/viewSite/core/params/trainMode/helloCyclePointLayer"
import { docomoBikeSharePointCard } from "@/components/organisms/viewSite/core/params/trainMode/docomoBikeSharePointLayer"
import { busPointCard } from "@/components/organisms/viewSite/core/params/trainMode/busPointLayer"
import { trainPointCard } from "@/components/organisms/viewSite/core/params/trainMode/trainPointLayer"
import { busPolygonCard } from "@/components/organisms/viewSite/core/params/trainMode/busPolygonLayer"
import { slopePolygonCard } from "@/components/organisms/viewSite/core/params/trainMode/slopePolygonLayer"

export const trainModeCardLayerList: CardListType[] = [
  trainPointCard,
  busPointCard,
  docomoBikeSharePointCard,
  helloCyclePointCard,
  trainLineCard,
  lineBusCard,
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

export default trainModeCardLayerList
