/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './history.css'
import * as historyAction from './historyAction.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Input, Icon } from 'antd'
import { vocationType, replyType, colorMap } from 'SRC/utils/constMaps.js'

class history extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filterText: ''
    }
  }
  componentWillMount() {
    this.props.actions.loadTable()
  }
  render() {
    let dataList = this.props.state.table
    if (this.state.filterText) {
      const filterText = this.state.filterText
      dataList = dataList.filter(data =>
        vocationType[data.applyType].search(filterText) !== -1 ||
        data.reason.search(filterText) !== -1 ||
        data.startDate.search(filterText) !== -1 ||
        data.endDate.search(filterText) !== -1 ||
        replyType[data.result].search(filterText) !== -1
      )
    }
    dataList.sort((a, b) => b.applicationId - a.applicationId)
    return (
      <div style={{ height: '100%', overflow: 'auto', padding: 10 }}>
        <h3 className="textCenter">历史记录</h3>
        <div style={{ marginTop: 20, marginBottom: 10 }}>
          <Icon style={{ color: '#2db7f5' }} type="search" /> 筛选:
          <Input
            placeholder="任意关键字"
            value={this.state.filterText}
            style={{ width: 100, marginLeft: 10 }}
            onChange={(e) =>
              this.setState({ filterText: e.target.value })
            }
            />
        </div>
        {
          dataList.map(data => (
            <div style={{ background: '#eaedf7', minHeight: 200, marginBottom: 20, borderRadius: 10, padding: 10, fontSize: 15 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  borderBottom: '1px solid #dcdddd',
                  paddingBottom: 10
                }}
                >
                <div>{data.startDate.substr(0, 10)}</div>
                <div>至</div>
                <div>{data.endDate.substr(0, 10)}</div>
              </div>
              <div
                style={{
                  marginTop: 10
                }}
                >
                <span style={{ color: '#aaaaaa' }}>申请类型: </span>
                {vocationType[data.applyType]}
              </div>
              <div
                style={{
                  marginTop: 10
                }}
                >
                <span style={{ color: '#aaaaaa' }}>申请时间: </span>
                {data.applyDate.substr(0, 10)}
              </div>
              <div
                style={{
                  marginTop: 10
                }}
                >
                <span style={{ color: '#aaaaaa' }}>申请原因: </span>
                {data.reason}
              </div>
              <div
                style={{
                  marginTop: 10
                }}
                >
                <span style={{ color: '#aaaaaa' }}>申请状态: </span>
                <span style={{ color: colorMap[data.result] }}>{replyType[data.result]}</span>
                {
                  replyType[data.result] === '审核中' ?
                    <span className="fs10">（<Link to={`/ask?modifyId=${data.applicationId}&type=${data.applyType}`}>修改</Link>）</span>
                  :
                    ''
                }
              </div>
              {
                data.remark ?
                  <div
                    style={{
                      marginTop: 10
                    }}
                    >
                    <span style={{ color: '#aaaaaa' }}>批复: </span>
                    {data.remark}
                  </div>
                :
                  ''
              }
            </div>
          ))
        }
      </div>
    )
  }
}
history.propTypes = {
  actions: React.PropTypes.object,
  state: React.PropTypes.object
}
history.contextTypes = {
  userName: React.PropTypes.string
}
function mapState(state) {
  return {
    state: state.history.toJS()
  }
}
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(historyAction, dispatch)
  }
}
export default connect(mapState, mapDispatch)(CSSModules(history, styles))
