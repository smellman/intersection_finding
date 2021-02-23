import { Map, GeoJSONSource, MapboxGeoJSONFeature } from 'maplibre-gl'
import * as turf from '@turf/turf'

const map = new Map({
  container: 'map',
  style: 'https://tile.openstreetmap.jp/styles/maptiler-basic-ja/style.json',
  center: [139.243587, 35.625171],
  zoom: 15
})

map.on('load', () => {
  let intersections = turf.featureCollection([]) as any
  map.addSource('intersections', {
    type: 'geojson',
    data: intersections
  })

  map.addLayer({
    'id': 'selectable-road',
    'type': 'line',
    'source': 'openmaptiles',
    'source-layer': 'transportation',
    'paint': {
      'line-color': 'rgba(0, 0, 0, 0)'
    }
  })

  map.addLayer({
    'id': 'intersections',
    'type': 'circle',
    'source': 'intersections',
    'paint': {
      'circle-radius': 5,
      'circle-color': '#007cbf'
    }
  })

  map.on('click', (e) => {
    const features = map.queryRenderedFeatures({layers: ['selectable-road']})
    console.log(features)
    const points = []
    features.forEach((cur, i) => {
      features.forEach((target, j) => {
        if (i == j) {
          return
        }
        const point = turf.lineIntersect(cur, target)
        if (point.features.length > 0) {
          points.push(point.features[0])
        }
      })
    })
    intersections = turf.featureCollection(points)
    const source = map.getSource('intersections') as GeoJSONSource
    source.setData(intersections)
  })
})

export default map