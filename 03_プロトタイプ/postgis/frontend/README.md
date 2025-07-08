# フォルダ構成

```
C:.
├─app
│      favicon.ico
│      globals.css
│      layout.tsx
│      page.tsx
│
├─components
│  ├─atoms
│  │  ├─buttons
│  │  │      Button.stories.ts
│  │  │      Button.tsx
│  │  │      ImageButton.tsx
│  │  │      PullTab.stories.ts
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
│  │  │      SearchInput.tsx
│  │  │
│  │  ├─frames
│  │  │      Card.stories.ts
│  │  │      Card.tsx
│  │  │      InfoCard.tsx
│  │  │      LegendCard.tsx
│  │  │      TitleInfoCard.tsx
│  │  │
│  │  └─header
│  │          DialogHeader.tsx
│  │          Header.stories.ts
│  │          Header.tsx
│  │
│  ├─organisms
│  │  └─homeSite
│  │      ├─core
│  │      │  ├─application
│  │      │  ├─params
│  │      │  │      plateauLayer.ts
│  │      │  │
│  │      │  └─types
│  │      └─ui
│  │              DialogApp.tsx
│  │              HomeSiteMain.stories.ts
│  │              HomeSiteMain.tsx//基本的なview部分の作成
│  │              MapApp.tsx
│  │
│  └─templates
│      └─homeSite
│              HomeSite.tsx
│
├─domain
│  ├─interfaces
│  │      IDialogState.ts
│  │
│  ├─params
│  │      atoms.ts
│  │      companyLogoParams.ts
│  │      components.ts
│  │      molecules.ts
│  │      siteRootName.ts
│  │      trainLineParams.ts
│  │
│  └─types
│          atomsType.ts
│          moleculesType.ts
│          siteRootNameType.ts
│
└─infrastructure
    ├─adapters
    │      storeAdapters.ts
    │
    └─stores
            dialogStateStore.ts
```
