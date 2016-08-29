import React, { Component } from 'react'

const _spin = require('antd/lib/spin')

class EmptyChart extends Component {
  constructor(props) {
    super(props)
    this.handleImageDownload = this.handleImageDownload.bind(this)
  }
  handleImageDownload() {
    // console.log(this.refs.chart.getChart())
  }
  render() {
    return (
      <div>
        <div>
          <span>正在加载, 请耐心等待</span><_spin />
        </div>
      </div>
    )
  }
}

EmptyChart.propTypes = {
  propName: React.PropTypes.string
}

EmptyChart.defaultProps = {
  propName: '未知属性'
}

export default EmptyChart
