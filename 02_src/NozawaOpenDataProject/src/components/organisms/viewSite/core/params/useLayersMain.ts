import type { CardListType } from "@/components/organisms/viewSite/core/types/cardListType"
import { plateauCard } from "@/components/organisms/viewSite/core/params/plateauLayer"
import { toeiBusCard } from "@/components/organisms/viewSite/core/params/toeiBusLayer"
import { cycleBlockCard } from "@/components/organisms/viewSite/core/params/cycleBlockLayer"
import { terrainCard } from "@/components/organisms/viewSite/core/params/terrainLayer"
import { osmCard } from "@/components/organisms/viewSite/core/params/osmLayer"
import { konjakuCard } from "@/components/organisms/viewSite/core/params/konjakuLayer"


export const cardLayerList: CardListType[] = [toeiBusCard, plateauCard, cycleBlockCard, terrainCard, osmCard, konjakuCard ]

export default cardLayerList
