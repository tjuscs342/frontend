import React, { Component } from 'react'
import wordcloud from 'wordcloud'

import dataURLtoBlob from 'blueimp-canvas-to-blob'
import { saveAs } from 'filesaver.js'

const colors = [
  '#509e2f', '#41b6e6', '#abad23', '#005f61', '#651d32'
]

class WordCloud extends Component {
  constructor(props) {
    super(props)
    this.updateWordCloud = this.updateWordCloud.bind(this)
    this.handleImageDownload = this.handleImageDownload.bind(this)
  }
  componentDidMount() {
    this.updateWordCloud()
  }
  componentWillUpdate() {
    this.updateWordCloud()
  }
  updateWordCloud() {
    if (this.props.data.length === 0) return

    const data = this.props.data[0].value
    const { logScale } = this.props
    // Adjust canvas scope
    const canvas = this.refs.canvas
    canvas.width = this.refs.canvas.offsetWidth
    canvas.height = this.refs.canvas.offsetHeight
    // Find the max & min value, Used for font size normalization
    let maxValue = Number.MIN_VALUE
    let minValue = Number.MAX_VALUE
    data.forEach(record => {
      if (record.value < minValue) minValue = record.value
      if (record.value > maxValue) maxValue = record.value
    })

    if (logScale) {
      maxValue = Math.log10(maxValue)
      minValue = Math.log10(minValue)
    }

    wordcloud(canvas, {
      list: data.map(record => [
        record.name,
        ((logScale ? Math.log10(record.value) : record.value) - minValue) / (maxValue - minValue)
      ]),
      // gridSize: Math.round(16 * this.refs.canvas.offsetWidth / 1024),
      weightFactor: (size) => (80 * size + 2),
      fontFamily: 'Finger Paint, cursive, sans-serif',
      color: (word, weight, fontSize, distance, theta) => { // eslint-disable-line
        return colors[Math.floor(Math.random() * colors.length)]
      },
      rotateRatio: 0,
      backgroundColor: 'white',
      shuffle: false,
      drawOutOfBound: false,
      shape: 'circle',
      ellipticity: 0.4
    })
  }
  handleImageDownload() {
    const { baseName, compareName, propName } = this.props
    const canvas = this.refs.canvas
    const filename = `${baseName}-${compareName}-${propName}-wordCloud.png`
    saveAs(dataURLtoBlob(canvas.toDataURL()), filename)
  }
  render() {
    return (
      <div>
        <canvas id="canvas" ref="canvas" style={{ width: '100%', height: '400px' }} />
      </div>
    )
  }
}

WordCloud.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    value: React.PropTypes.array
  })),
  logScale: React.PropTypes.bool,
  baseName: React.PropTypes.string,
  compareName: React.PropTypes.string,
  propName: React.PropTypes.string
}

WordCloud.defaultProps = {
  logScale: true,
  data: [{
    name: 'Top 50',
    value: [{
      key: 'SIM卡联系人(com.qualcomm.simcontacts)',
      name: 'SIM卡联系人',
      value: 0.98317
    }, {
      key: '银联在线支付服务(com.unionpay.uppay)',
      name: '银联在线支付服务',
      value: 0.72189
    }, {
      key: 'MiPlay(com.xiaomi.miplay)',
      name: 'MiPlay',
      value: 0.52448
    }, {
      key: 'UpnpService(com.xiaomi.upnp)',
      name: 'UpnpService',
      value: 0.52448
    }, {
      key: '携程旅行(ctrip.android.view)',
      name: '携程旅行',
      value: 0.45739
    }, {
      key: '虚拟按键大师(com.jjapp.quicktouch.inland)',
      name: '虚拟按键大师',
      value: 0.44656
    }, {
      key: '遥控精灵(com.tiqiaa.icontrol)',
      name: '遥控精灵',
      value: 0.43843
    }, {
      key: '小米万能遥控(com.duokan.phone.remotecontroller)',
      name: '小米万能遥控',
      value: 0.39012
    }, {
      key: 'Google话语提示(com.google.android.marvin.talkback)',
      name: 'Google话语提示',
      value: 0.33545
    }, {
      key: '和阅读(com.aspire.mm.readplugin)',
      name: '和阅读',
      value: 0.3025
    }]
  }]
}

export default WordCloud
