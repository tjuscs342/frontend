import React, { Component } from 'react'

import ReactHighcharts from 'react-highcharts'
import { getReadablePercent } from 'SRC/utils/utils'

import highchartsOffineExporting from 'highcharts-offline-exporting'
import highchartsExporting from 'highcharts-exporting'

const defalutConfig = {
  chart: { type: 'bar', animation: false },
  title: { text: null },
  legend: { enabled: false },
  colors: ['#5FB9FF', '#84DEE1', '#FFA900', '#A8D241', '#4093dd', '#a17ee8', '#00daa5', '#ff6d2d', '#00d7fc', '#fa6bec', '#666ded', '#666'],
  credits: { enabled: false },
  yAxis: {
    visible: false
  },
  exporting: {
    buttons: {
      contextButton: { enabled: false }
    }
  },
  tooltip: {
    formatter: function() { // eslint-disable-line
      return `${this.series.name}: ${getReadablePercent(this.y)}`
    }
  }
}

class Stack extends Component {
  constructor(props) {
    super(props)
    highchartsExporting(ReactHighcharts.Highcharts)
    highchartsOffineExporting(ReactHighcharts.Highcharts)
    this.handleImageDownload = this.handleImageDownload.bind(this)
  }
  handleImageDownload() {
    const { propName, baseName, compareName } = this.props
    this.refs.chart.getChart().exportChartLocal({
      filename: `${baseName}-${compareName}-${propName}-stack`
    })
    // this.refs.chart.getChart().exportChart()
    // console.log(this.refs.chart.getChart().getSVG())
  }
  render() {
    const datas = this.props.data
    const config = Object.assign({}, defalutConfig, {
      xAxis: {
        categories: datas.map(data => data.name),
        lineWidth: 0,
        tickWidth: 0
      },
      plotOptions: {
        series: {
          stacking: 'percent',
          dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            align: 'center',
            format: '{series.name}',
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
            }
          }
        }
      },
      series: datas[0].value.map((r, index) => (
        {
          name: r.name,
          data: [r.value, datas[1].value[index].value]
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

Stack.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.number.isRequired
    })).isRequired
  })),
  propName: React.PropTypes.string
}

Stack.defaultProps = {
  data: [{
    name: '',
    value: []
  }, {
    name: '',
    value: []
  }]
}

export default Stack
