import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UserProfileAction from './MyUserProfileAction'
import * as PersistentActions from 'SRC/action'
import { throttle } from 'SRC/utils/utils'

const _table = require('antd/lib/table')
import SearchInput from 'SRC/components/input-components/input/SearchInput'

import { getColumns } from './MyUserProfileService'

import CSSModules from 'react-css-modules'
import styles from './style.css'

class MyUserProfile extends Component {
  constructor(props) {
    super(props)
    this.props.actions.loadTableData()
    this.handleSearch = this.handleSearch.bind(this)
    this.deleteLine = this.deleteLine.bind(this)
    this.handleSetOperation = throttle(this.handleSetOperation.bind(this), 300, { trailing: false })
    this.recount = throttle(this.recount.bind(this), 300, { trailing: false })
  }
  // componentWillMount() { }
  // componentWillReceiveProps(nextProps) { }
  handleSearch(value) {
    this.props.actions.setSearchKey(value)
  }
  deleteLine(id) {
    this.props.actions.deleteLine(id)
  }
  handleSetOperation(type) {
    this.props.actions.setSelectedOperation(type)
  }
  recount(oldLine) {
    this.props.actions.recount(oldLine)
  }
  render() {
    const { persistentActions } = this.props
    const { table, searchKey, couldOperate } = this.props.state
    return (
      <div className="full-height bg-grey" style={{ padding: '25px 3%' }}>
        <div styleName="search">
          <SearchInput
            onSearch={this.handleSearch}
            style={{ height: '30px' }}
            />
        </div>
        <div styleName="btn-group">
          <div
            className={couldOperate.collection ? 'btn-theme10' : 'btn-theme7'}
            onClick={couldOperate ? this.handleSetOperation.bind(null, 'union') : ''}
            >
            取合集
          </div>
          <div
            className={couldOperate.throng ? 'btn-theme10' : 'btn-theme7'}
            onClick={couldOperate ? this.handleSetOperation.bind(null, 'throng') : ''}
            >
            取交集
          </div>
          <div
            className={couldOperate.diff ? 'btn-theme10' : 'btn-theme7'}
            onClick={couldOperate ? this.handleSetOperation.bind(null, 'diff') : ''}
            >
            取差集
          </div>
          <span>交叉顺序为用户集点选顺序</span>
        </div>
        <div styleName="table" className="bg-white">
          <_table
            columns={getColumns(persistentActions, this.deleteLine, this.props.state, this.props.actions, this.recount)}
            dataSource={table.filter(record => (record.name.indexOf(searchKey) >= 0))}
            rowKey={(record) => (record.id)}
            pagination={{
              total: table.length,
              showQuickJumper: true,
              showSizeChanger: true,
              showTotal: (total) => `共${total}条`,
              defaultPageSize: 10,
              pageSizeOptions: ['5', '10', '20', '30', '40']
            }}
            />
        </div>
      </div>
    )
  }
}

MyUserProfile.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  state: React.PropTypes.object,
  actions: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.myDataSet.userProfile.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(UserProfileAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(MyUserProfile, styles))
