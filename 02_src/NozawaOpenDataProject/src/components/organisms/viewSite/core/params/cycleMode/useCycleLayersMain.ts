import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/cycleMode/plateauLayer"
import { lineBusCard } from "@/components/organisms/viewSite/core/params/cycleMode/busLineLayer"
import { cyclePolygonCard } from "@/components/organisms/viewSite/core/params/cycleMode/cyclePolygonLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/cycleMode/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/cycleMode/googleMapLayer"
import { trainLineCard } from "@/components/organisms/viewSite/core/params/cycleMode/trainLineLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/cycleMode/sateliteMapLayer"
import { busPointCard } from "@/components/organisms/viewSite/core/params/cycleMode/busPointLayer"
import { trainPointCard } from "@/components/organisms/viewSite/core/params/cycleMode/trainPointLayer"
import { busPolygonCard } from "@/components/organisms/viewSite/core/params/cycleMode/busPolygonLayer"
import { slopePolygonCard } from "@/components/organisms/viewSite/core/params/cycleMode/slopePolygonLayer"
import { helloCyclePointCard } from "@/components/organisms/viewSite/core/params/cycleMode/helloCyclePointLayer"

export const cycleModeCardLayerList: CardListType[] = [
  trainPointCard,
  //helloCyclePointCard,
  busPointCard,
  trainLineCard,
  lineBusCard,
  plateauCard,
  busPolygonCard,
  cyclePolygonCard,
  slopePolygonCard,
  googleCard,
  osmCard,
  sateliteMapCard,
  // konjakuCard,
  // terrainCard,
]

export default cycleModeCardLayerList
