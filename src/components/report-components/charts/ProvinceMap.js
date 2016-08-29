import React from 'react'
import AbstractMap from './AbstractMap'

import highchartsOffineExporting from 'highcharts-offline-exporting'
import highchartsExporting from 'highcharts-exporting'
import ReactHighmaps from 'react-highcharts/dist/ReactHighmaps'

import dataURLtoBlob from 'blueimp-canvas-to-blob'
import { saveAs } from 'filesaver.js'

import { getReadablePercent, svg2img } from 'SRC/utils/utils'

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
    map: {
      states: {
        hover: {
          color: '#EEDD66'
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function() { // eslint-disable-line
          if (this.point.value === null) return null
          return `${this.point['cn-name']}`
        }
      }
    }
  },
  colorAxis: {
    min: 0,
    minColor: '#E6E7E8',
    maxColor: '#99cc33',
    labels: {
      formatter: function() { // eslint-disable-line
        return `${100 * this.value}%`
      }
    },
    marker: {
      color: 'white'
    }
  },
  tooltip: {
    formatter: function() { // eslint-disable-line
      return `${this.point['cn-name']}: ${getReadablePercent(this.point.value)}`
    }
  }
}

class ProvinceMap extends AbstractMap {
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
    const filename = `${baseName}-${compareName}-${propName}-provinceMap.png`
    saveAs(dataURLtoBlob(myCanvas.toDataURL()), filename)
  }
  render() {
    const datas = this.props.data
    const { provinceMapData } = this.state
    const configs = datas.map(data => (
      Object.assign({}, defaultConfig, {
        title: {
          text: data.name,
          verticalAlign: 'bottom',
          style: {
            color: '#888'
          }
        },
        series: [{
          type: 'map',
          mapData: provinceMapData,
          data: data.value.map(xy => ({ name: xy.name, value: xy.value })),
          joinBy: ['cn-name', 'name']
        }]
      })
    ))
    return (
      <div>
        <div className="text-right" style={{ height: 0, overflow: 'visible' }}>
          <i className="fa fa-camera fa-2x" onClick={this.handleImageDownload} style={{ zIndex: 100, position: 'relative' }} />
        </div>
        <div ref="container">
          {
            !provinceMapData ? null :
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

ProvinceMap.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.number.isRequired
    })).isRequired
  })),
  propName: React.PropTypes.string
}

ProvinceMap.defaultProps = {
  data: [{
    name: '',
    value: []
  }, {
    name: '',
    value: []
  }]
}

export default ProvinceMap
