### 20251015

```
.
├── backend
│   ├── Dockerfile
│   ├── controller
│   │   ├── chat
│   │   │   └── chat_controller.py
│   │   ├── city
│   │   │   └── city_controller.py
│   │   ├── cycle
│   │   │   └── cycle_controller.py
│   │   ├── osm
│   │   └── train
│   │       └── train_controller.py
│   ├── env.txt
│   ├── infrastructure
│   │   ├── database
│   │   │   ├── city
│   │   │   │   └── city_repository.py
│   │   │   └── train
│   │   │       ├── __pycache__
│   │   │       │   ├── train_repository.cpython-311.pyc
│   │   │       │   └── train_repository.cpython-312.pyc
│   │   │       └── train_repository.py
│   │   └── request
│   │       ├── cycle
│   │       │   └── cycle_repository.py
│   │       └── osm
│   ├── main.py
│   ├── pyproject.toml
│   └── uv.lock
├── compose.yaml
├── frontend
│   ├── README.md
│   ├── build-storybook.log
│   ├── eslint.config.mjs
│   ├── next-env.d.ts
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── image
│   │   │   ├── app
│   │   │   │   ├── logoBlack.svg
│   │   │   │   └── logoWhite.svg
│   │   │   ├── companyLogo
│   │   │   │   ├── 0824_s.webp
│   │   │   │   ├── 0826_s.webp
│   │   │   │   ├── 0828_s.webp
│   │   │   │   ├── 0829_s.webp
│   │   │   │   ├── 0831_s.webp
│   │   │   │   ├── 0833_s.webp
│   │   │   │   ├── 0837_s.webp
│   │   │   │   ├── default.webp
│   │   │   │   ├── hokusou.webp
│   │   │   │   ├── jrCentral.webp
│   │   │   │   ├── jrEast.webp
│   │   │   │   ├── jrHokkaido.webp
│   │   │   │   ├── jrKyusyu.webp
│   │   │   │   ├── jrSikoku.webp
│   │   │   │   ├── jrWest.webp
│   │   │   │   ├── keikyu.webp
│   │   │   │   ├── keio.webp
│   │   │   │   ├── keisei.webp
│   │   │   │   ├── odakyu.webp
│   │   │   │   ├── rinkai.webp
│   │   │   │   ├── saitamakousoku.webp
│   │   │   │   ├── seibu.webp
│   │   │   │   ├── sinkeisei.webp
│   │   │   │   ├── sotetsu.webp
│   │   │   │   ├── tamaMonoRail.webp
│   │   │   │   ├── tobu.webp
│   │   │   │   ├── tokyoLogo.webp
│   │   │   │   ├── tokyoMetro.webp
│   │   │   │   ├── tokyoMonoRail.webp
│   │   │   │   ├── toukyu.webp
│   │   │   │   ├── trainLogo.webp
│   │   │   │   ├── tukuba.webp
│   │   │   │   └── yurikamome.webp
│   │   │   └── cycle
│   │   │       ├── darkRedBike.webp
│   │   │       ├── darkYellowBike.webp
│   │   │       ├── successRedBike.webp
│   │   │       ├── successYellowBike.webp
│   │   │       ├── warningRedBike.webp
│   │   │       └── warningYellowBike.webp
│   │   ├── map
│   │   │   └── style.json
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── src
│   │   ├── app
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── atoms
│   │   │   │   ├── buttons
│   │   │   │   │   ├── Button.stories.ts
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── ImageButton.tsx
│   │   │   │   │   ├── PullTab.stories.ts
│   │   │   │   │   └── PullTab.tsx
│   │   │   │   ├── inputs
│   │   │   │   │   └── Textarea.tsx
│   │   │   │   └── labels
│   │   │   │       ├── Badge.stories.ts
│   │   │   │       ├── Badge.tsx
│   │   │   │       ├── TextLabel.stories.ts
│   │   │   │       └── TextLabel.tsx
│   │   │   ├── molecules
│   │   │   │   ├── forms
│   │   │   │   ├── frames
│   │   │   │   │   └── Chat.tsx
│   │   │   │   └── header
│   │   │   │       ├── DialogHeader.tsx
│   │   │   │       ├── Header.stories.ts
│   │   │   │       └── Header.tsx
│   │   │   ├── organisms
│   │   │   │   └── homeSite
│   │   │   │       ├── core
│   │   │   │       │   ├── application
│   │   │   │       │   │   ├── map
│   │   │   │       │   │   │   └── useMapApp.ts
│   │   │   │       │   │   ├── menu
│   │   │   │       │   │   │   ├── useDialogApp.ts
│   │   │   │       │   │   │   └── useLayerControlApp.ts
│   │   │   │       │   │   └── useHomeSiteMain.ts
│   │   │   │       │   └── layers
│   │   │   │       │       ├── baseTrainLineLayer.ts
│   │   │   │       │       ├── baseTrainStationLayer.ts
│   │   │   │       │       ├── chatGeojsonLayer.ts
│   │   │   │       │       ├── docomoBikeShareStationLayer.ts
│   │   │   │       │       ├── helloCycleStationLayer.ts
│   │   │   │       │       ├── meshPolygonLayer.ts
│   │   │   │       │       └── terrainLayer.ts
│   │   │   │       └── ui
│   │   │   │           ├── HeaderApp.tsx
│   │   │   │           ├── HomeSiteMain.stories.ts
│   │   │   │           ├── HomeSiteMain.tsx
│   │   │   │           ├── map
│   │   │   │           │   └── MapApp.tsx
│   │   │   │           └── menu
│   │   │   │               ├── DialogApp.tsx
│   │   │   │               └── LayerControlApp.tsx
│   │   │   └── templates
│   │   │       └── homeSite
│   │   │           └── HomeSite.tsx
│   │   ├── domain
│   │   │   ├── interfaces
│   │   │   │   ├── IChatState.ts
│   │   │   │   ├── IDialogState.ts
│   │   │   │   ├── IDisplayLayerState.ts
│   │   │   │   ├── IGeojsonState.ts
│   │   │   │   ├── IReqChatApi.ts
│   │   │   │   ├── IReqCycleApi.ts
│   │   │   │   └── IReqTrainApi.ts
│   │   │   ├── params
│   │   │   │   ├── atoms.ts
│   │   │   │   ├── companyLogoParams.ts
│   │   │   │   ├── components.ts
│   │   │   │   ├── molecules.ts
│   │   │   │   ├── siteRootName.ts
│   │   │   │   └── trainLineParams.ts
│   │   │   └── types
│   │   │       ├── atomsType.ts
│   │   │       ├── chatType.ts
│   │   │       ├── geoJsonType.ts
│   │   │       ├── moleculesType.ts
│   │   │       └── siteRootNameType.ts
│   │   └── infrastructure
│   │       ├── adapters
│   │       │   ├── httpClientAdapters.ts
│   │       │   └── storeAdapters.ts
│   │       ├── axios
│   │       │   ├── api.ts
│   │       │   ├── chat
│   │       │   │   └── reqChatApi.ts
│   │       │   ├── cycle
│   │       │   │   └── reqCycleApi.ts
│   │       │   └── train
│   │       │       └── reqTrainApi.ts
│   │       └── stores
│   │           ├── useChatStateStore.ts
│   │           ├── useDialogStateStore.ts
│   │           ├── useDisplayLayerStore.ts
│   │           └── useGeojsonStore.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── yarn.lock
├── migration
│   ├── N03-20250101.geojson
│   ├── UrbanArea_Japan_2022.geojson
│   ├── migration用URLリンク.md
│   ├── unkohonsu2024_rosen_eki.geojson
│   └── unkohonsu2024_rosen_kukan.geojson
├── pipeline.py
├── tree.md
└── 環境構築.md
```
