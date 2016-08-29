import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ProfileReportAction from './ProfileReportAction'
import * as PersistentActions from 'SRC/action'
import userSetId from 'SRC/constants/user-set-id'
import { getReadablePercent } from 'SRC/utils/utils'

import CollapsePanel from 'SRC/components/component-lib/collapse-panel/CollapsePanel'
import * as Scroll from 'SRC/components/scroll'
const ScrollWrapper = Scroll.Wrapper

import { getPageElements, saveReportData } from './ProfileReportService'

// const _row = require('antd/lib/row')
// const _col = require('antd/lib/col')
import ProfileReportHeader from 'SRC/components/header/profile-report-header/ProfileReportHeader'

// import { generateNavBar } from './ProfileReportService'

class ProfileReport extends Component {
  constructor(props) {
    super(props)
    this.handleCompareUserSetChange = this.handleCompareUserSetChange.bind(this)
    this.handlePropertyChange = this.handlePropertyChange.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleReportDownload = this.handleReportDownload.bind(this)
  }
  componentWillMount() {
    const { id, storageKey } = this.props.location.query
    // 处理对比集, 存到session storage
    let toid = this.props.persistentState.compareSetId
    if (toid === undefined) {
      toid = userSetId.defaultToId
      this.props.persistentActions.persistentSet('compareSetId', toid)
    }

    // 处理下钻数据, 从localStorage中获取并转存到session storage中
    const rawDiamond = localStorage.getItem(storageKey)
    const diamond = this.props.persistentState.diamond
    if (rawDiamond) {
      localStorage.removeItem(storageKey)
      this.props.persistentActions.persistentSet('diamond', rawDiamond)
    } else if (!diamond && diamond !== '') {
      this.props.persistentActions.persistentSet('diamond', '')
    }

    // 数据初始化, fetch所有相关信息
    this.props.actions.initialize(id, toid)
  }
  componentWillReceiveProps(nextProps) {
    // 检查对比集是否切换
    const oldCompareUserSet = this.props.state.get('compareUserSet')
    const newCompareUserSet = nextProps.state.get('compareUserSet')
    if (!oldCompareUserSet || !newCompareUserSet || oldCompareUserSet.get('id') !== newCompareUserSet.get('id')) {
      this.refs.scrollWrapper.scrollToTop()
    }
    // 加载当前展示ReportPanel数据
    const { activeProperty } = nextProps.state.toJS()
    if (activeProperty) {
      this.props.actions.loadReportData(activeProperty)
    }
  }
  handleCompareUserSetChange(newCompareUserSet) {
    this.props.persistentActions.persistentSet('compareSetId', newCompareUserSet.key)
    this.props.actions.setCompareUserSet(newCompareUserSet)
  }
  handleScroll(sectionKey) {
    // console.log(sectionKey)
    const { key2PropMap } = this.props.state.toJS()
    const newProperty = key2PropMap.get(sectionKey)
    if (newProperty) {
      this.props.actions.setActiveProperty(newProperty)
      this.props.actions.loadReportData(newProperty)
    }
  }
  handlePropertyChange(newProperty) {
    // const { baseUserSet, compareUserSet } = this.props.state
    this.props.actions.setActiveProperty(newProperty)
    this.refs.scrollWrapper.scrollTo(newProperty.key)
    // this.props.actions.loadReportData(baseUserSet.id, compareUserSet.id, newProperty.key)
  }
  handleReportDownload() {
    const state = this.props.state
    const downloadAllProcess = state.get('downloadAllProcess')
    if (!downloadAllProcess) {
      this.props.actions.loadAllReport()
    } else if (downloadAllProcess === 1) {
      saveReportData(
        // eslint-disable-next-line
        `${state.get('baseUserSet').get('name')}-${state.get('compareUserSet').get('name')}-${new Date().toISOString().slice(0, 10).replace(/-/g,"/")}.csv`,
        state.get('reportDataSource'),
        state.get('key2PropMap')
      )
    }
  }
  render() {
    const { activeProperty, compareUserSet, propertiesValuePool, userSetValuePool, downloadAllProcess, title } = this.props.state.toJS()
    return (
      <div className="fix-top-row-wrapper" style={{ paddingTop: '50px' }}>
        <div className="fix-top-row bottom-border" style={{ height: '50px', lineHeight: '50px' }}>
          <div className="fixed-position fs16 fc-dark" style={{ width: '100%' }}>
            <p className="text-center">
              {title}
            </p>
            <div className="text-right" style={{ position: 'relative', top: '-50px' }}>
              <div className="inline-mid fc-blue pointer" style={{ marginRight: '20px' }} onClick={this.handleReportDownload}>
                <i className="fa fa-download fs16 inline-mid" style={{ marginRight: '5px' }} />
                <span className="inline-mid fs14">
                  {
                    downloadAllProcess === null || downloadAllProcess === 1 ?
                    '下载报告' :
                    `下载中... (${getReadablePercent(downloadAllProcess, { decimal: 0 })})`
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="full-height" style={{ position: 'relative' }}>
          <div className="fixed-position" style={{ zIndex: '100', width: '100%' }}>
            <CollapsePanel
              maxHeight="400px"
              defalutCollpase
              style={{
                overflow: 'hidden',
                width: '100%',
                background: 'rgba(236, 243, 247, 0.92)',
                boxShadow: '1px 1px 8px 0px rgba(0,0,0,0.2)'
              }}
              >
              <ProfileReportHeader
                selectedUserSet={compareUserSet}
                selectedProperty={activeProperty}
                userSetValuePool={userSetValuePool}
                propertiesValuePool={propertiesValuePool}
                onUserSetChange={this.handleCompareUserSetChange}
                onPropertyChange={this.handlePropertyChange}
                />
            </CollapsePanel>
          </div>
          <div className="bg-grey full-height">
            <ScrollWrapper
              name="report-scroll-wrapper"
              ref="scrollWrapper"
              onScroll={this.handleScroll}
              height="100%"
              style={{ paddingTop: '20px' }}
              >
              {getPageElements(this.props.state)}
            </ScrollWrapper>
          </div>
        </div>
      </div>
    )
  }
}

ProfileReport.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  state: React.PropTypes.object,
  persistentState: React.PropTypes.object,
  actions: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

ProfileReport.contextTypes = {
  router: React.PropTypes.object
}

function mapState(state) {
  return {
    persistentState: state.persistentStore.toJS(),
    state: state.userProfile.report
  }
}

function mapDispatch(dispatch) {
  return {
    persistentActions: bindActionCreators(PersistentActions, dispatch),
    actions: bindActionCreators(ProfileReportAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(ProfileReport)
