import { MVTLayer } from "@deck.gl/geo-layers"
import { TileLayer } from "@deck.gl/geo-layers"
import { BitmapLayer } from "@deck.gl/layers"

export const osmLayer = new TileLayer({
  id: "osm-layer",
  data: "https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
  minZoom: 0,
  maxZoom: 19,
  tileSize: 512,
  renderSubLayers: (props: any) => {
    const {
      bbox: { west, south, east, north },
    } = props.tile
    return new BitmapLayer({
      id: `${props.id}-bitmap`,
      image: props.data,
      bounds: [west, south, east, north],
      transparentColor: [0, 0, 0, 0],
      tintColor: [255, 255, 255],
    })
  },
})

export const gsiLayer = new MVTLayer({
  id: "gsi-bvmap",
  data: "https://cyberjapandata.gsi.go.jp/xyz/experimental_bvmap/{z}/{x}/{y}.pbf",
  minZoom: 4,
  maxZoom: 16,
  pickable: true,
  getFillColor: (f: any) => {
    const k = f.properties.ftCode

    // 建物を規模・種類ごとにグレースケール
    if (k === 3101) return [220, 220, 220, 255] // 普通建物
    if (k === 3102) return [200, 200, 200, 255] // 堅ろう建物
    if (k === 3103) return [180, 180, 180, 255] // 高層建物
    if (k === 3111) return [210, 210, 210, 255] // 普通無壁舎
    if (k === 3112) return [190, 190, 190, 255] // 堅ろう無壁舎

    // 水域
    if (k >= 5000 && k < 6000) return [150, 210, 255, 255]
    // 公園・緑地・森林・運動場など
    if ((k >= 7000 && k < 9000) || (k >= 9100 && k < 9200)) return [140, 200, 140, 255]
    // 道路は塗らない
    return [255, 255, 255, 255] // その他地面
  },
  getLineColor: (f: any) => {
    const k = f.properties.ftCode

    // 水域の縁取りを薄め青
    if (k >= 5000 && k < 6000) return [50, 130, 200, 255]
    // 建物縁を薄いグレーで統一
    if (k >= 3100 && k < 3200) return [150, 150, 150, 255]
    // 行政界などその他は薄め
    return [160, 160, 160, 200]
  },
  getLineWidth: (f: any) => {
    const k = f.properties.ftCode
    // 水域の縁取り
    if (k >= 5000 && k < 6000) return 0.25
    // 建物縁
    if (k >= 3100 && k < 3200) return 0.5
    // その他細め
    return 0.25
  },
  lineWidthMinPixels: 1,
  onTileError: () => null,
})
