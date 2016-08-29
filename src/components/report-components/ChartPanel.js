import React, { Component } from 'react'

import _row from 'antd/lib/row'
import _col from 'antd/lib/col'
import _tooltip from 'antd/lib/tooltip'
import Column from './charts/Column'
import Pie from './charts/Pie'
import Ring from './charts/Ring'
import Stack from './charts/Stack'
import Polar from './charts/Polar2'
import CityMap from './charts/CityMap'
import ProvinceMap from './charts/ProvinceMap'
import WordCloud from './charts/WordCloud'
import getDescriptions from 'SRC/utils/getDescriptions.js'
// import EmptyChart from './charts/EmptyChart'

const type2ChartMap = {
  column: Column,
  pie: Pie,
  stack: Stack,
  ring: Ring,
  polar: Polar,
  map_province: ProvinceMap,
  map_city: CityMap,
  word_cloud: WordCloud
}

const type2IconMap = {
  column: <i className="fa fa-bar-chart" aria-hidden="true"></i>,
  pie: <i className="fa fa-pie-chart" aria-hidden="true"></i>,
  stack: <i className="fa fa-align-left" aria-hidden="true"></i>,
  ring: <i className="fa fa-circle-o-notch" aria-hidden="true"></i>,
  polar: <i className="fa fa-yelp" aria-hidden="true"></i>,
  map_province: <i className="fa fa-life-ring" aria-hidden="true"></i>,
  map_city: <i className="fa fa-dot-circle-o" aria-hidden="true"></i>,
  word_cloud: <i className="fa fa-cloud" aria-hidden="true"></i>
}

class ChartPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeChartType: 'column'
    }
    this.switchChartType = this.switchChartType.bind(this)
    this.handleImageDownload = this.handleImageDownload.bind(this)
    this.getCanvas = this.getCanvas.bind(this)
  }
  componentWillMount() {
    this.setState({
      activeChartType: this.props.chartTypes[0]
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.chartTypes.join('') !== nextProps.chartTypes.join('')) {
      this.setState({
        activeChartType: nextProps.chartTypes[0]
      })
    }
  }

  getCanvas() {
    return this.refs.chart.getCanvas()
  }
  switchChartType(activeChartType) {
    this.setState({
      activeChartType
    })
  }
  handleImageDownload() {
    this.refs.chart.handleImageDownload()
  }
  render() {
    const { data, baseName, compareName, propName, chartTypes, typeName } = this.props
    const { activeChartType } = this.state
    const Chart = type2ChartMap[activeChartType]
    const { description, updatePeriod, limitation } = getDescriptions(typeName, propName)
    return (
      <section>
        <header style={{ margin: '15px 0' }}>
          <_row>
            <_col span={4}>
              <div
                className="inline fs14 fc-dark"
                style={{ marginLeft: '30px' }}
                >
                {propName}
                <span>
                {description || updatePeriod || limitation ?
                  <_tooltip
                    title={
                      <div>
                        <div>{description}</div>
                        {updatePeriod ? <div>更新周期:{updatePeriod}</div> : ''}
                        {limitation ? <div>时效:{limitation}</div> : ''}
                      </div>
                    }
                    >
                    <i className="fa fa-question-circle" aria-hidden="true" style={{ padding: '0 10px 0 5px', color: '#D4D4D4' }}></i>
                  </_tooltip>
                  : ''
                }
                </span>
              </div>
            </_col>
            <_col span={20}>
              <div className="text-right">
                {
                  activeChartType !== 'column' ? null :
                    <div className="inline-mid" style={{ marginRight: '20px' }}>
                      <div className="inline-mid" style={{ marginRight: '20px' }}>
                        <span className="inline-mid chart-legend" style={{ background: '#5FB9FF' }} />
                        <span className="inline-mid">{baseName}</span>
                      </div>
                      <div className="inline-mid inline-mid">
                        <span className="inline-mid chart-legend" style={{ background: '#84DEE1' }} />
                        <span className="inline-mid">{compareName}</span>
                      </div>
                    </div>
                }
                <div className="inline-mid btn-group" style={{ margin: '0 20px' }}>
                  {
                    chartTypes.map(chartType => (
                      <div
                        key={chartType}
                        className={chartType === activeChartType ? 'btn btn-theme13' : 'btn btn-theme12'}
                        style={{ padding: '2px 4px', width: '30px' }}
                        onClick={this.switchChartType.bind(null, chartType)}
                        >
                        {type2IconMap[chartType] || chartType}
                      </div>
                    ))
                  }
                </div>
                <div className="inline-mid fc-blue pointer">
                  <i className="fa fa-camera fs16 inline-mid" onClick={this.handleImageDownload} style={{ marginRight: '5px' }} />
                  <span className="inline-mid">下载图表</span>
                </div>
              </div>
            </_col>
          </_row>
        </header>
        <section style={{ height: '420px' }}>
          {
            activeChartType === 'polar' ? <Chart /> :
              <Chart
                data={data}
                ref="chart"
                propName={propName}
                baseName={baseName}
                compareName={compareName}
                />
          }
        </section>
      </section>
    )
  }
}

ChartPanel.propTypes = {
  data: React.PropTypes.array,
  propName: React.PropTypes.string,
  baseName: React.PropTypes.string,
  compareName: React.PropTypes.string,
  chartTypes: React.PropTypes.arrayOf(React.PropTypes.oneOf([
    'column', 'pie', 'stack', 'ring', 'polar', 'map_province', 'map_city', 'word_cloud'
  ])),
  typeName: React.PropTypes.string
}

ChartPanel.defaultProps = {
  data: [{
    name: '',
    value: []
  }, {
    name: '',
    value: []
  }],
  chartTypes: ['column', 'pie', 'stack', 'ring', 'polar', 'map_province', 'map_city', 'word_cloud']
}

export default ChartPanel
