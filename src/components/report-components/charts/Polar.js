import React, { Component } from 'react'

import ReactHighcharts from 'react-highcharts'
import { getReadablePercent } from 'SRC/utils/utils'

import highchartsOffineExporting from 'highcharts-offline-exporting'
import highchartsExporting from 'highcharts-exporting'
import highchartsMore from 'highcharts-more'

import Immutable from 'immutable'

const defaultConfig = {
  chart: { polar: true, type: 'column' },
  title: { text: null },
  pane: {
    startAngle: 0,
    endAngle: 360
  },
  legend: { enabled: false },
  colors: ['#FFA900', '#A8D241', '#4093dd', '#a17ee8', '#00daa5', '#ff6d2d', '#00d7fc', '#fa6bec', '#666ded', '#666'],
  credits: { enabled: false },
  yAxis: {
    gridLineInterpolation: 'circle',
    lineWidth: 0,
    min: 0,
    max: 1,
    labels: { enabled: false }
  },
  exporting: {
    buttons: {
      contextButton: { enabled: false }
    }
  },
  tooltip: {
    formatter: function() { // eslint-disable-line
      return `${this.x}: ${getReadablePercent(this.y)}`
    }
  }
}

class Polar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: true
    }
    highchartsExporting(ReactHighcharts.Highcharts)
    highchartsOffineExporting(ReactHighcharts.Highcharts)
    highchartsMore(ReactHighcharts.Highcharts)
    this.handleImageDownload = this.handleImageDownload.bind(this)
  }
  handleImageDownload() {
    this.setState({
      type: !this.state.type
    })
    // const { baseName, compareName, propName } = this.props
    // this.refs.chart.getChart().exportChartLocal({
    //   filename: `${baseName}-${compareName}-${propName}-column`
    // })
  }
  render() {
    const { baseName, compareName } = this.props
    const { baseData, compareData } = this.props.data.toJS()
    const categories = baseData.map(record => record.name)
    const data = this.state.type ? baseData : compareData
    const config = Object.assign({}, defaultConfig, {
      xAxis: {
        tickInterval: 1,
        // min: 0,
        // max: baseData.length,
        categories,
        gridLineWidth: 1,
        minorGridLineWidth: 1,
        minorTickInterval: 1,
        labels: {
          formatter: function() { // eslint-disable-line
            return this.value
          }
        }
        // categories: baseData.map(record => record.name)
      },
      plotOptions: {
        series: {
          stacking: 'normal',
          pointInterval: 1,
          pointPadding: 0,
          groupPadding: 0,
          pointPlacement: 'on',
          colorByPoint: true,
          dataLabels: {
            enabled: false,
            format: '{y}%'
          }
        }
      },
      series: data[0].data.map((none, index) => (
        {
          name: `data${index}`,
          type: 'column',
          data: data.map(record => record.data[index])
        }
      ))
    })
    return (
      <div>
        <div className="text-right" style={{ height: 0, overflow: 'visible' }}>
          <i className="fa fa-camera fa-2x" onClick={this.handleImageDownload} style={{ zIndex: 100, position: 'relative' }} />
        </div>
        <ReactHighcharts
          ref="chart"
          config={config}
          />
      </div>
    )
  }
}

Polar.propTypes = {
  data: React.PropTypes.object,
  propName: React.PropTypes.string,
  baseName: React.PropTypes.string,
  compareName: React.PropTypes.string
}

Polar.defaultProps = {
  data: Immutable.fromJS({
    baseData: [
      {
        name: '中餐',
        data: [0.1]
      }, {
        name: '东南亚',
        data: [0.3]
      }, {
        name: '西餐',
        data: [0.4]
      }
    ],
    compareData: [
      {
        name: '中餐',
        data: [0.2]
      }, {
        name: '东南亚',
        data: [0.5]
      }, {
        name: '西餐',
        data: [0.8]
      }
    ]
  })
}

export default Polar
