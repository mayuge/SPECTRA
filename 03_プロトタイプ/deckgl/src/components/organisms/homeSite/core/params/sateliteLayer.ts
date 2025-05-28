import { TileLayer } from "@deck.gl/geo-layers"
import { BitmapLayer } from "@deck.gl/layers"

// 衛星画像
export const satelliteLayer = new TileLayer({
  id: "satellite-layer",
  data: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
  minZoom: 0,
  maxZoom: 19,
  tileSize: 512,
  visible: false,
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
