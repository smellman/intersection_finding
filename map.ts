import { Map } from 'maplibre-gl'

const map = new Map({
  container: 'map',
  style: 'https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json',
  center: [139.243587, 35.625171],
  zoom: 15
})

export default map