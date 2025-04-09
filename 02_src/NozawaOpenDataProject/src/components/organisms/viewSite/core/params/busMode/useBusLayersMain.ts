import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/busMode/plateauLayer"
import { lineBusCard } from "@/components/organisms/viewSite/core/params/busMode/busLineLayer"
import { cyclePolygonCard } from "@/components/organisms/viewSite/core/params/busMode/cyclePolygonLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/busMode/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/busMode/googleMapLayer"
import { trainLineCard } from "@/components/organisms/viewSite/core/params/busMode/trainLineLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/busMode/sateliteMapLayer"
import { busPointCard } from "@/components/organisms/viewSite/core/params/busMode/busPointLayer"
import { trainPointCard } from "@/components/organisms/viewSite/core/params/busMode/trainPointLayer"
import { busPolygonCard } from "@/components/organisms/viewSite/core/params/busMode/busPolygonLayer"
import { slopePolygonCard } from "@/components/organisms/viewSite/core/params/busMode/slopePolygonLayer"

export const busModeCardLayerList: CardListType[] = [
  trainPointCard,
  busPointCard,
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

export default busModeCardLayerList
