# 本番環境用フォルダ

- フォルダ構造

```
C:.
├─app
│  │  favicon.ico
│  │  globals.css
│  │  layout.tsx
│  │  page.tsx
│  │
│  ├─source
│  │      page.tsx
│  │
│  └─view
│          page.tsx
│
├─components
│  ├─atoms
│  │  ├─buttons
│  │  │      Button.stories.ts
│  │  │      Button.tsx
│  │  │      PullTab.tsx
│  │  │
│  │  ├─Inputs
│  │  │      BaseInput.tsx
│  │  │      ColorInput.tsx
│  │  │      SliderInput.tsx
│  │  │
│  │  └─labels
│  │          Badge.stories.ts
│  │          Badge.tsx
│  │          TextLabel.stories.ts
│  │          TextLabel.tsx
│  │
│  ├─molecules
│  │  ├─forms
│  │  ├─frames
│  │  │      Card.stories.ts
│  │  │      Card.tsx
│  │  │
│  │  └─header
│  │          DialogHeader.tsx
│  │          Header.stories.ts
│  │          Header.tsx
│  │
│  ├─organisms
│  │  ├─homeSite
│  │  │  ├─core
│  │  │  │  ├─application
│  │  │  │  │      useHomeSiteMain.ts
│  │  │  │  │
│  │  │  │  ├─params
│  │  │  │  └─types
│  │  │  └─ui
│  │  │          HomeSiteMain.tsx
│  │  │
│  │  ├─sourceSite
│  │  │  ├─core
│  │  │  │  ├─application
│  │  │  │  │      useSourceSiteMain.ts
│  │  │  │  │
│  │  │  │  ├─params
│  │  │  │  └─types
│  │  │  └─ui
│  │  │          SourceSiteMain.tsx
│  │  │
│  │  └─viewSite
│  │      ├─core
│  │      │  ├─application
│  │      │  │      useViewSiteMain.ts
│  │      │  │
│  │      │  │
│  │      │  ├─params
│  │      │  │      cycleBlockLayer.ts
│  │      │  │      googleMapLayer.ts
│  │      │  │      konjakuLayer.ts
│  │      │  │      osmLayer.ts
│  │      │  │      plateauLayer.ts
│  │      │  │      terrainLayer.ts
│  │      │  │      toeiBusLayer.ts
│  │      │  │      tokyoMetroLineLayer.ts
│  │      │  │      useLayersMain.ts
│  │      │  │
│  │      │  └─types
│  │      │          cardListType.ts
│  │      │          layerType.ts
│  │      │
│  │      └─ui
│  │              DetailInfoDialogApp.tsx
│  │              DisplayInfoApp.tsx
│  │              HeaderApp.tsx
│  │              LayerListBarApp.tsx
│  │              MapApp.tsx
│  │              MovieDialogApp.tsx
│  │              ViewSiteMain.tsx
│  │
│  └─templates
│      ├─homeSite
│      │      HomeSite.tsx
│      │
│      ├─sourceSite
│      │      SourceSite.tsx
│      │
│      └─viewSite
│              ViewSite.tsx
│
├─domain
│  ├─interfaces
│  │      IGetTime.ts
│  │      ISiteRouter.ts
│  │      ITimeDataStore.ts
│  │
│  ├─params
│  │      atoms.ts
│  │      components.ts
│  │      molecules.ts
│  │      siteRootName.ts
│  │
│  └─types
│          atomsType.ts
│          moleculesType.ts
│          siteRootNameType.ts
│
└─infrastructure
    ├─adapters
    │      getTimeDataAdapter.ts
    │      httpReqAdapter.ts
    │      routeAdapter.ts
    │      storeAdapter.ts
    │
    ├─axios
    │  │  api.ts
    │  │
    │  └─req
    │          reqBusData.ts
    │          reqCycleData.ts
    │          reqRailwayData.ts
    │
    ├─dateTime
    │      getTimeData.ts
    │
    ├─router
    │      siteRouter.ts
    │
    └─stores
            dialogStateStore.ts
            manageLayerStateStore.ts
            timeDataStore.ts

```
