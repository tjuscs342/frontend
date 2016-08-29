import React, { Component } from 'react'

import ReactHighcharts from 'react-highcharts'
import { getReadablePercent } from 'SRC/utils/utils'

import highchartsOffineExporting from 'highcharts-offline-exporting'
import highchartsExporting from 'highcharts-exporting'
import pieTitlePlugin from '../modules/pie-title-plugin'

const defaultConfig = {
  chart: { type: 'pie', animation: false },
  title: { text: null },
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
      title: {
        align: 'center',
        verticalAlign: 'bottom',
        y: 60,
        format: '{name}',
        style: {
          fontSize: '16px',
          color: 'grey'
        }
      },
      dataLabels: {
        distance: -25
      },
      size: '60%',
      innerSize: '50%'
    }
  }
}

class Ring extends Component {
  constructor(props) {
    super(props)
    highchartsExporting(ReactHighcharts.Highcharts)
    highchartsOffineExporting(ReactHighcharts.Highcharts)
    pieTitlePlugin(ReactHighcharts.Highcharts)
    this.handleImageDownload = this.handleImageDownload.bind(this)
  }
  handleImageDownload() {
    const { propName, baseName, compareName } = this.props
    this.refs.chart.getChart().exportChartLocal({
      filename: `${baseName}-${compareName}-${propName}-ring`
    })
    // console.log(this.refs.chart.getChart())
  }
  render() {
    const datas = this.props.data
    const config = Object.assign({}, defaultConfig, {
      series: datas.map((data, index) => ({
        name: data.name,
        center: index === 0 ? ['20%'] : ['80%'],
        data: data.value.map(r => ({ name: r.name, y: r.value }))
      }))
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

Ring.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.number.isRequired
    })).isRequired
  })),
  propName: React.PropTypes.string
}

Ring.defaultProps = {
  data: [{
    name: '',
    value: []
  }, {
    name: '',
    value: []
  }]
}

export default Ring
