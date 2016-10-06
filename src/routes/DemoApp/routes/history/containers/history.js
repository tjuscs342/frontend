/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './history.css'
import * as historyAction from './historyAction.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Table, Popover, Button } from 'antd'
import { vocationType, replyType } from 'SRC/utils/constMaps.js'

const columns = [
  {
    title: '开始时间',
    dataIndex: 'startDate',
    render: (text) => (
      <span>
        {text.substr(0, 10)}
      </span>
    )
  }, {
    title: '假期类型',
    dataIndex: 'applyType',
    render: (text) => (
      <span>{vocationType[text]}</span>
    )
  }, {
    title: '点击详情',
    dataIndex: 'result',
    render: (text, record) => {
      const content = (
        <div>
          <p>开始时间：{record.startDate.substr(0, 10)}</p>
          <p>结束时间：{record.endDate.substr(0, 10)}</p>
          <p>请假原因：{record.reason}</p>
          <p>主管批复：{record.remark}</p>
        </div>
      )
      return (
        <Popover placement="left" content={content} title={`审批结果:${replyType[text]}`} trigger="click">
          <Button>{replyType[text]}</Button>
        </Popover>
      )
    }
  }
]

class history extends Component {
  componentDidMount() {
    this.props.actions.loadTable(this.context.userName)
  }
  render() {
    const pagination = {
      defaultPageSize: 5,
      pageSize: 5,
      total: this.props.state.table.length,
      showSizeChanger: false,
    }
    return (
      <div>
        <Table columns={columns} dataSource={this.props.state.table} pagination={pagination} style={{ overflow: 'scroll' }} loading={this.props.state.loading} />
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
