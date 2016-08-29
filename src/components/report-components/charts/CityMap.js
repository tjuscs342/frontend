import React from 'react'
import AbstractMap from './AbstractMap'

// Dealing with legacy code
import proj4 from 'proj4' // Highmaps is depended on proj4
window.proj4 = proj4 // window.proj4 was called within Highmaps components

import highchartsOffineExporting from 'highcharts-offline-exporting'
import highchartsExporting from 'highcharts-exporting'
import ReactHighmaps from 'react-highcharts/dist/ReactHighmaps'

import dataURLtoBlob from 'blueimp-canvas-to-blob'
import { saveAs } from 'filesaver.js'

import { getReadablePercent, svg2img } from 'SRC/utils/utils'
import ColorAxis from '../modules/ColorAxis'

const defaultConfig = {
  credits: {
    enabled: false
  },
  exporting: {
    buttons: {
      contextButton: { enabled: false }
    }
  },
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: 'bottom'
    },
    enableMouseWheelZoom: false
  },
  legend: {
    enabled: true,
    layout: 'vertical',
    verticalAlign: 'middle',
    align: 'right'
  },
  plotOptions: {
    series: {
      animation: false
    },
    map: {
      states: {
        hover: {
          color: '#EEDD66'
        }
      }
    },
    mappoint: {
      showInLegend: false,
      dataLabels: {
        enabled: true,
        crop: true
      },
      marker: {
        enabled: true,
        radius: 5
      },
      tooltip: {
        headerFormat: '',
        pointFormatter: function() { // eslint-disable-line
          return `${this.name}: ${getReadablePercent(this.value)}`
        }
      }
    }
  }
}

class CityMap extends AbstractMap {
  constructor(props) {
    super(props)
    highchartsExporting(ReactHighmaps.Highcharts)
    highchartsOffineExporting(ReactHighmaps.Highcharts)
    this.handleImageDownload = this.handleImageDownload.bind(this)
  }
  handleImageDownload() {
    // 绘图
    const width = this.refs.container.offsetWidth
    const height = this.refs.container.offsetHeight
    const myCanvas = document.createElement('canvas')
    myCanvas.width = width
    myCanvas.height = height
    const myCanvasContext = myCanvas.getContext('2d')

    // Set the background color
    myCanvasContext.beginPath()
    myCanvasContext.rect(0, 0, width, height)
    myCanvasContext.fillStyle = 'white'
    myCanvasContext.fill()

    const svg1 = this.refs.chart1.getChart().getSVG()
    const img1 = svg2img(svg1, { width: width / 2, height })
    const svg2 = this.refs.chart2.getChart().getSVG()
    const img2 = svg2img(svg2, { width: width / 2, height })
    myCanvasContext.drawImage(img1, 0, 0)
    myCanvasContext.drawImage(img2, width / 2, 0)

    // this.refs.canvas.appendChild(myCanvas)
    // 保存
    const { propName, baseName, compareName } = this.props
    const filename = `${baseName}-${compareName}-${propName}-cityMap.png`
    saveAs(dataURLtoBlob(myCanvas.toDataURL()), filename)
  }
  render() {
    const datas = this.props.data
    const { provinceMapData, geoStore } = this.state
    const max = Math.max(...datas[0].value.map(xy => xy.value), ...datas[1].value.map(xy => xy.value))
    const configs = !geoStore ? null : datas.map(data => {
      const colorAxis = new ColorAxis({
        min: 0,
        max,
        // type: 'logarithmic',
        stops: [
          [0, '#E6E7E8'],
          [1, '#99cc33']
        ]
      })
      return Object.assign({}, defaultConfig, {
        title: {
          text: data.name,
          verticalAlign: 'bottom',
          style: {
            color: '#888'
          }
        },
        colorAxis: {
          min: 0,
          max,
          minColor: '#E6E7E8',
          maxColor: '#99cc33',
          labels: {
            formatter: function() { // eslint-disable-line
              return `${100 * this.value}%`
            }
          }
        },
        series: [
          {
            type: 'map',
            mapData: provinceMapData
          }, {
            type: 'mappoint',
            name: data.name,
            mapData: provinceMapData,
            data: data.value.map((xy) => {
              const res = geoStore.get(xy.name) // 城市经纬度坐标
              if (res) {
                Object.assign(res, {
                  value: xy.value,
                  color: colorAxis.toColor(xy.value)
                })
                return res
              }
              return null
            }).filter(el => !!el)
          }
        ]
      })
    })
    return (
      <div>
        <div className="text-right" style={{ height: 0, overflow: 'visible' }}>
          <i className="fa fa-camera fa-2x" onClick={this.handleImageDownload} style={{ zIndex: 100, position: 'relative' }} />
        </div>
        <div ref="container">
          {
            !provinceMapData || !geoStore ? null :
              <div>
                <ReactHighmaps
                  ref="chart1"
                  config={configs[0]}
                  className="inline"
                  style={{ width: '50%' }}
                  />
                <ReactHighmaps
                  ref="chart2"
                  config={configs[1]}
                  className="inline"
                  style={{ width: '50%' }}
                  />
              </div>
          }
        </div>
      </div>
    )
  }
}

CityMap.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.number.isRequired
    })).isRequired
  })),
  propName: React.PropTypes.string
}

CityMap.defaultProps = {
  data: [{
    name: '',
    value: []
  }, {
    name: '',
    value: []
  }]
}

export default CityMap
