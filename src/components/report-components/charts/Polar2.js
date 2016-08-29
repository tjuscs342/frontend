import React, { Component } from 'react'

import ReactHighcharts from 'react-highcharts'

import { getReadablePercent } from 'SRC/utils/utils'

import highchartsOffineExporting from 'highcharts-offline-exporting'
import highchartsExporting from 'highcharts-exporting'
import saveCharts from '../modules/combine-two-chart'

const defaultConfig = {
  chart: { type: 'pie', animation: false },
  legend: { verticalAlign: 'top' },
  colors: ['#5FB9FF', '#84DEE1', '#FFA900', '#A8D241', '#4093dd', '#a17ee8', '#00daa5', '#ff6d2d', '#00d7fc', '#fa6bec', '#666ded', '#666'],
  credits: { enabled: false },
  exporting: {
    buttons: {
      contextButton: { enabled: false }
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        connectorWidth: 0
      },
      tooltip: {
        headerFormat: '',
        pointFormatter: function() { // eslint-disable-line
          return `${this.name}: ${getReadablePercent(this.y)}`
        }
      },
      size: 250
    }
  }
}

class Pie extends Component {
  constructor(props) {
    super(props)
    highchartsExporting(ReactHighcharts.Highcharts)
    highchartsOffineExporting(ReactHighcharts.Highcharts)
    this.handleImageDownload = this.handleImageDownload.bind(this)
  }
  handleImageDownload() {
    const { propName, data } = this.props
    const filename = `${data[0].name}-${data[1].name}-${propName}-polar`
    saveCharts(
      this.refs.chart1.getChart(),
      this.refs.chart2.getChart(),
      {
        filename,
        width: this.refs.container.offsetWidth,
        height: this.refs.container.offsetHeight
      }
    )
  }
  render() {
    const datas = this.props.data
    const configs = datas.map(data => {
      const numOfSlice = data.value.length
      return Object.assign({}, defaultConfig, {
        title: {
          align: 'center',
          verticalAlign: 'bottom',
          y: -10,
          text: data.name,
          style: {
            fontSize: '16px',
            color: '#888'
          }
        },
        series: [{
          data: data.value.map(r => ({ name: r.name, y: 1, color: 'transparent' })),
          borderColor: '#bcbcbc',
          dataLabels: { distance: 5 },
          enableMouseTracking: false
        },
        ...data.value.map((r, i) => (
          {
            size: 250 * r.value,
            startAngle: 360 / numOfSlice * i,
            endAngle: 360 / numOfSlice * (i + 1),
            dataLabels: { color: 'transparent' },
            data: [{ name: r.name, y: r.value, color: defaultConfig.colors[i % defaultConfig.colors.length] }]
          }
        ))
        ]
      })
    })
    return (
      <div>
        <div className="text-right" style={{ height: 0, overflow: 'visible' }}>
          <i className="fa fa-camera fa-2x" onClick={this.handleImageDownload} style={{ zIndex: 100, position: 'relative' }} />
        </div>
        <div ref="container">
          <ReactHighcharts
            ref="chart1"
            config={configs[0]}
            className="inline"
            style={{ width: '50%' }}
            />
          <ReactHighcharts
            ref="chart2"
            config={configs[1]}
            className="inline"
            style={{ width: '50%' }}
            />
        </div>
      </div>
    )
  }
}

Pie.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.number.isRequired
    })).isRequired
  })),
  propName: React.PropTypes.string
}

Pie.defaultProps = {
  data: [{
    name: 'base',
    value: [{
      name: '中餐',
      value: 0.1
    }, {
      name: '东南亚',
      value: 0.3
    }, {
      name: '西餐',
      value: 0.4
    }]
  }, {
    name: 'compare',
    value: [{
      name: '中餐',
      value: 0.1
    }, {
      name: '东南亚',
      value: 0.3
    }, {
      name: '西餐',
      value: 0.4
    }, {
      name: '中餐1',
      value: 0.2
    }, {
      name: '东南亚1',
      value: 0.5
    }, {
      name: '西餐1',
      value: 0.6
    }]
  }]
}

export default Pie
