import React, { Component } from 'react'

import ReactHighcharts from 'react-highcharts'
import { getReadablePercent } from 'SRC/utils/utils'

import highchartsOffineExporting from 'highcharts-offline-exporting'
import highchartsExporting from 'highcharts-exporting'
// import pieTitlePlugin from '../modules/pie-title-plugin'
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
  tooltip: {
    formatter: function() { // eslint-disable-line
      return `${this.series.name}: ${getReadablePercent(this.y)}`
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        softConnector: false
      },
      size: '60%'
    }
  }
}

class Pie extends Component {
  constructor(props) {
    super(props)
    highchartsExporting(ReactHighcharts.Highcharts)
    highchartsOffineExporting(ReactHighcharts.Highcharts)
    // pieTitlePlugin(ReactHighcharts.Highcharts)
    this.handleImageDownload = this.handleImageDownload.bind(this)
  }
  handleImageDownload() {
    const { propName, data } = this.props
    const filename = `${data[0].name}-${data[1].name}-${propName}-pie`
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
    const configs = datas.map(data => (
      Object.assign({}, defaultConfig, {
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
        series: [
          {
            name: data.name,
            data: data.value.map(r => ({ name: r.name, y: r.value }))
          }
        ]
      })
    ))
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
    name: '',
    value: []
  }, {
    name: '',
    value: []
  }]
}

export default Pie
