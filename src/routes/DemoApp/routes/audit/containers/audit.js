/* vim: set filetype=javascript.jsx */
import React, { PropTypes, Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './audit.css'
import * as auditAction from './auditAction.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Input, Icon, Button, Modal } from 'antd'
import { Link } from 'react-router'
import { vocationType, replyType, colorMap } from 'SRC/utils/constMaps.js'

class audit extends Component {
  constructor(props) {
    super(props)
    this.handleAudit = this.handleAudit.bind(this)
    this.state = {
      filterText: ''
    }
  }
  componentWillMount() {
    this.props.actions.loadAuditList()
  }
  handleAudit(text, applicationId) {
    this.props.actions.audit(text, this.refs[applicationId].refs.input.value, applicationId)
    Modal.success({
      width: '90%',
      title: '审批成功'
    })
  }
  render() {
    let dataList = this.props.state.table
    if (this.state.filterText) {
      const filterText = this.state.filterText
      dataList = dataList.filter(data =>
        vocationType[data.applyType].search(filterText) !== -1 ||
        data.reason.search(filterText) !== -1 ||
        data.applyDate.substr(0, 10).search(filterText) !== -1 ||
        data.startDate.substr(0, 10).search(filterText) !== -1 ||
        data.endDate.substr(0, 10).search(filterText) !== -1 ||
        data.userName.search(filterText) !== -1 ||
        replyType[data.result].search(filterText) !== -1 ||
        (data.remark && data.remark.search(filterText) !== -1)
      )
    }
    dataList.sort((a, b) => {
      return a.result === b.result ?
        b.applicationId - a.applicationId
      :
        a.result - b.result
    })
    return (
      <div style={{ height: '100%', overflow: 'auto', padding: 10 }}>
        <h3 className="textCenter">下属申请审批</h3>
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
            <div style={{ background: '#eaedf7', minHeight: 340, marginTop: 20, borderRadius: 10, padding: 10, fontSize: 15 }}>
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
                <span style={{ color: '#aaaaaa' }}>申请人: </span>
                {data.userName}
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
                <span style={{ color: '#aaaaaa' }}>申请类型: </span>
                {vocationType[data.applyType]}
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
              </div>
              {
                data.result !== 1 ?
                  <div
                    style={{
                      marginTop: 10
                    }}
                    >
                    <span style={{ color: '#aaaaaa' }}>批复: </span>
                    {data.remark}
                  </div>
                :
                  <div
                    style={{
                      marginTop: 10
                    }}
                    >
                    <span style={{ color: '#aaaaaa' }}>批复：</span>
                    <Input
                      ref={data.applicationId}
                      type="textarea"
                      rows={2}
                      placeholder="批准与否都可填写"
                      />
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginTop: 10
                      }}
                      >
                      <Button
                        style={{ backgroundColor: '#5cb85c', color: 'white' }}
                        onClick={() => this.handleAudit('agree', data.applicationId)}
                        >
                        同意
                      </Button>
                      <Button
                        style={{ backgroundColor: '#d43f3a', color: 'white' }}
                        onClick={() => this.handleAudit('disagree', data.applicationId)}
                        >
                        拒绝
                      </Button>
                    </div>
                  </div>
              }
            </div>
          ))
        }
      </div>
    )
  }
}

audit.propTypes = {
  state: React.PropTypes.object,
  actions: React.PropTypes.object
}
function mapState(state) {
  return {
    state: state.audit.toJS()
  }
}
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(auditAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(audit, styles))
