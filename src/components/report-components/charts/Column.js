import React, { Component } from 'react'

import ReactHighcharts from 'react-highcharts'
// import { getReadablePercent } from 'SRC/utils/utils'

import highchartsOffineExporting from 'highcharts-offline-exporting'
import highchartsExporting from 'highcharts-exporting'
import { svg2canvas } from 'SRC/utils/utils'
// import highchartsCustomEvents from 'highcharts-custom-events/js/customEvents'

const defaultConfig = {
  // 图表相关
  // type:图表类型 height： 图表高度
  chart: { type: 'column', height: 400 },
  // 表头相关
  title: { text: null },
  // 图表说明
  legend: { enabled: false, verticalAlign: 'top' },
  // 颜色相关 为每组数据绑定颜色
  colors: ['#5FB9FF', '#84DEE1'],
  // hightcharts.com 的隐藏和显示
  credits: { enabled: false },
  // y轴相关
  yAxis: {
    // 最小显示值 原点
    min: 0,
    // 最大显示值
    ceiling: 100,
    // y轴名称
    title: { text: null },
    // 网格线宽度
    gridLineWidth: 0,
    lineWidth: 1,
    lineColor: '#e0e0e0',
    labels: {
      // y轴的lable
      format: '{value}%'
    }
  },
  exporting: {
    buttons: {
      // 导出按钮
      contextButton: { enabled: false }
    }
  },
  // 鼠标悬浮tip
  tooltip: {
    formatter: function() { // eslint-disable-line
      return `${this.series.name}: ${this.y.toFixed(2)}%`
    }
  }
}

class Column extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hiddenCategorySet: new Set()
    }
    highchartsExporting(ReactHighcharts.Highcharts)
    highchartsOffineExporting(ReactHighcharts.Highcharts)
    // highchartsCustomEvents(ReactHighcharts.Highcharts)
    this.handleImageDownload = this.handleImageDownload.bind(this)
    this.setHiddenCategory = this.setHiddenCategory.bind(this)
    this.clearHiddenCategory = this.clearHiddenCategory.bind(this)
    this.getCanvas = this.getCanvas.bind(this)
  }
  setHiddenCategory(category) {
    const hiddenCategorySet = this.state.hiddenCategorySet
    if (hiddenCategorySet.has(category)) {
      hiddenCategorySet.delete(category)
    } else {
      hiddenCategorySet.add(category)
    }
    this.setState({
      hiddenCategorySet
    })
  }
  getCanvas() {
    const width = this.refs.container.offsetWidth
    const height = this.refs.container.offsetHeight
    return svg2canvas(
      this.refs.chart.getChart().getSVG({
        chart: { width, height }
      }),
      { width, height }
    )
  }
  clearHiddenCategory() {
    this.setState({
      hiddenCategorySet: new Set()
    })
  }
  handleImageDownload() {
    const { data, propName } = this.props
    this.refs.chart.getChart().exportChartLocal({
      filename: `${data[0].name}-${data[1].name}-${propName}-column`
    }, {
      legend: { enabled: true, verticalAlign: 'top' }
    })
    // this.refs.chart.getChart().exportChart()
    // console.log(this.refs.chart.getChart().getSVG())
  }
  render() {
    const datas = this.props.data.slice(0, 2)
    const { hiddenCategorySet } = this.state
    const categories = !datas[0] ? [] : datas[0].value.map(xy => xy.name)
    const config = Object.assign({}, defaultConfig, {
      xAxis: {
        categories: !datas[0] ? [] : datas[0].value.map(xy => xy.name),
        tickLength: 0,
        lineColor: '#e0e0e0'
      },
      // plotOptions: {
      //   column: {
      //     events: {
      //       click: (event) => {
      //         // console.log(event, event.target, event.point)
      //         // this.setHiddenCategory(event.point.category)
      //       }
      //     }
      //   }
      // },
      series: datas.map(data => (
        {
          name: data.name,
          data: data.value.map(xy => (!hiddenCategorySet.has(xy.name) ? xy.value * 100 : 0))
        }
      ))
    })
    return (
      <div ref="container">
        <ReactHighcharts
          ref="chart"
          config={config}
          />
        <div style={{ padding: '0 8px 0 45px', height: 0, zIndex: 10, position: 'relative', bottom: '100px' }}>
          {
            categories.map((label, i) => (
              <span
                key={label + i}
                className="text-center inline"
                style={{ width: `${100 / categories.length}%`, height: '100px'/*, background: 'rgba(45, 0, 255, 0.04)'*/ }}
                onClick={this.setHiddenCategory.bind(null, label)}
                />
            ))
          }
        </div>
      </div>
    )
  }
}

Column.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      value: React.PropTypes.number.isRequired
    })).isRequired
  })),
  propName: React.PropTypes.string
}

Column.defaultProps = {
  data: [{
    name: '',
    value: []
  }, {
    name: '',
    value: []
  }]
}

export default Column
