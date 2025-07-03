import { TileLayer } from "@deck.gl/geo-layers"
import { BitmapLayer } from "@deck.gl/layers"

// タイルのプロパティの型定義
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
