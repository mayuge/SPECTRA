import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/walkMode/plateauLayer"
import { lineBusCard } from "@/components/organisms/viewSite/core/params/walkMode/busLineLayer"
import { cyclePolygonCard } from "@/components/organisms/viewSite/core/params/walkMode/cyclePolygonLayer"
import { terrainCard } from "@/components/organisms/viewSite/core/params/walkMode/terrainLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/walkMode/osmLayer"
import { googleCard } from "@/components/organisms/viewSite/core/params/walkMode/googleMapLayer"
import { trainLineCard } from "@/components/organisms/viewSite/core/params/walkMode/trainLineLayer"
import { konjakuCard } from "@/components/organisms/viewSite/core/params/walkMode/konjakuLayer"
import { sateliteMapCard } from "@/components/organisms/viewSite/core/params/walkMode/sateliteMapLayer"
import { helloCyclePointCard } from "@/components/organisms/viewSite/core/params/walkMode/helloCyclePointLayer"
import { docomoBikeSharePointCard } from "@/components/organisms/viewSite/core/params/walkMode/docomoBikeSharePointLayer"
import { busPointCard } from "@/components/organisms/viewSite/core/params/walkMode/busPointLayer"
import { trainPointCard } from "@/components/organisms/viewSite/core/params/walkMode/trainPointLayer"
import { busPolygonCard } from "@/components/organisms/viewSite/core/params/walkMode/busPolygonLayer"
import { slopePolygonCard } from "@/components/organisms/viewSite/core/params/walkMode/slopePolygonLayer"

export const walkModeCardLayerList: CardListType[] = [
  trainPointCard,
  busPointCard,
  docomoBikeSharePointCard,
  helloCyclePointCard,
  plateauCard,
  trainLineCard,
  lineBusCard,
  busPolygonCard,
  cyclePolygonCard,
  slopePolygonCard,
  sateliteMapCard,
  osmCard,
  googleCard,
]

export default walkModeCardLayerList
