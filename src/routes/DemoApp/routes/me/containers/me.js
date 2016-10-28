/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './me.css'
import * as meAction from './meAction.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col } from 'antd'

class me extends Component {
  componentWillMount() {
    this.props.actions.loadUserInfo()
  }
  render() {
    const labelStyle = {
      textAlign: 'right',
      fontSize: '1.5rem'
    }
    const valueStyle = {
      textAlign: 'left',
      fontSize: '1.5rem'
    }
    const rowStyle = {
      marginBottom: '1rem'
    }
    const userInfo = this.props.state.userInfo
    return (
      <div>
        <Row gutter={10} style={rowStyle}>
          <Col span={8} style={labelStyle}>
            <span>用户名</span><span>:</span>
          </Col>
          <Col span={15} style={valueStyle}>
            <span>{userInfo.userName}</span>
          </Col>
        </Row>
        <Row gutter={10} style={rowStyle}>
          <Col span={8} style={labelStyle}>
            <span>性别</span><span>:</span>
          </Col>
          <Col span={15} style={valueStyle}>
            <span>{userInfo.sex}</span>
          </Col>
        </Row>
        <Row gutter={10} style={rowStyle}>
          <Col span={8} style={labelStyle}>
            <span>年龄</span><span>:</span>
          </Col>
          <Col span={15} style={valueStyle}>
            <span>{userInfo.age}</span>
          </Col>
        </Row>
        <Row gutter={10} style={rowStyle}>
          <Col span={8} style={labelStyle}>
            <span>电话</span><span>:</span>
          </Col>
          <Col span={15} style={valueStyle}>
            <span>{userInfo.phone}</span>
          </Col>
        </Row>
        <Row gutter={10} style={rowStyle}>
          <Col span={8} style={labelStyle}>
            <span>婚姻状态</span><span>:</span>
          </Col>
          <Col span={15} style={valueStyle}>
            <span>{userInfo.marryTimes}</span>
          </Col>
        </Row>
        <Row gutter={10} style={rowStyle}>
          <Col span={8} style={labelStyle}>
            <span>级别</span><span>:</span>
          </Col>
          <Col span={15} style={valueStyle}>
            <span>{userInfo.userPower}</span>
          </Col>
        </Row>

      </div>
    )
  }
}
me.propTypes = {
  actions: React.PropTypes.object,
  state: React.PropTypes.object
}
function mapState(state) {
  return {
    state: state.me.toJS()
  }
}
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(meAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(me, styles))
