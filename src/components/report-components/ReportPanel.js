import React, { Component } from 'react'

import ChartPanel from './ChartPanel'
import TablePanel from './TablePanel'

import Loading from 'SRC/components/component-lib/loading/theme2/Loading'

import html2canvas from 'html2canvas'

class ReportPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: undefined,
      dataID: '0'
    }
    this.getCanvas = this.getCanvas.bind(this)
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    const oldCompareUserSet = this.props.compareUserSet
    const newCompareUserSet = nextProps.compareUserSet
    if (!this.state.chartData || !oldCompareUserSet || !newCompareUserSet || oldCompareUserSet.key !== newCompareUserSet.key) {
      // console.log(this.props.property.name, !this.state.chartData, !oldCompareUserSet, !newCompareUserSet, oldCompareUserSet.key !== newCompareUserSet.key)
      this.setState({
        data: this.parseDataSource(nextProps.dataSource),
        dataID: nextProps.dataSource ? nextProps.dataSource.dataID : '0'
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    // 非常重要!! 性能瓶颈!!
    // 只在数据刷新的时候才会重新Render
    return this.state.dataID !== nextState.dataID
  }
  getCanvas() {
    if (this.refs.table) {
      html2canvas(this.refs.table, {
        onrendered: (canvas) => {
          this.refs.canvas.appendChild(canvas)
        }
      })
    }
  }
  parseDataSource(rawDataSource) {
    if (!rawDataSource) return undefined
    return rawDataSource.data
  }
  handleDownload() {
    this.refs.chart.getCanvas()
  }
  render() {
    const { property, baseUserSet, compareUserSet } = this.props
    // 空数据
    if (!this.state.data) {
      return (
        <div style={{ height: '500px' }}>
          <div className="vertical-center text-center">
            <Loading />
          </div>
        </div>
      )
    }
    if (typeof this.state.data === 'string') {
      return (
        <div style={{ height: '500px' }}>
          <div className="vertical-center text-center fs16 fc-light">
            <p style={{ marginBottom: '15px' }}>呃．．．抱歉，出错了</p>
            <p>请稍后再试．．．</p>
          </div>
        </div>
      )
    }
    return (
      <div ref="container">
        <div ref="canvas" />
        <header style={{ padding: '15px 2% 0 2%' }}>
          <div
            className="fs16 fc-dark border-style-blue"
            style={{ borderWidth: 0, borderLeftWidth: '3px', padding: '2px 0 2px 10px' }}
            >
            <div className="bottom-border">
              {`${property.type}`}
            </div>
          </div>
        </header>
        <section style={{ padding: '0 2%' }}>
          <ChartPanel
            ref="chart"
            data={this.state.data.slice(0, 2)}
            baseName={baseUserSet.name}
            compareName={compareUserSet.name}
            typeName={property.type}
            propName={property.name}
            chartTypes={
              property.display.charts
              // property.display.table !== 'table4' ?
              //   ['column', 'pie', 'stack', 'ring', 'polar', 'map_province', 'map_city'] :
              //   ['word_cloud']
            }
            />
        </section>
        <section ref="table" style={{ padding: '0 2%' }}>
          <TablePanel
            data={this.state.data}
            propName={property.name}
            tableType={property.display.table}
            />
        </section>
      </div>
    )
  }
}

ReportPanel.propTypes = {
  dataSource: React.PropTypes.shape({
    dataID: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.array
    ])
  }),
  property: React.PropTypes.object,
  baseUserSet: React.PropTypes.object,
  compareUserSet: React.PropTypes.object
}

export default ReportPanel
