import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExtractUserSetAction from './ExtractUserSetAction'

import UserSetSelectorMainNav from 'SRC/components/header/extract-user-set-nav/UserSetSelectorMainNav'
import SelectorState from 'SRC/components/user-set-selector-state/SelectorState'
import Input from 'SRC/components/input-components/input/Input'
const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
const _spin = require('antd/lib/spin')
const _modal = require('antd/lib/modal')
const _message = require('antd/lib/message')

import { formConfig } from 'SRC/configs/user-set-form-config'
import { getTagConfigFromState, convertFormState } from './ExtractUserSetService'
import { getChineseUnitNumber } from 'SRC/utils/utils'

import CSSModules from 'react-css-modules'
import styles from './ExtractUserSet.css'

const menuItems = [
  {
    key: 'scenario',
    name: '应用场景',
    link: '/user-profile/user-set/extract/scenario'
  }, {
    key: 'basic',
    name: '基础属性',
    link: '/user-profile/user-set/extract/basic'
  }, {
    key: 'region',
    name: '地域属性',
    link: '/user-profile/user-set/extract/region'
  }, {
    key: 'bound',
    name: '绑定行为',
    link: '/user-profile/user-set/extract/bound'
  }, {
    key: 'device',
    name: '设备属性',
    link: '/user-profile/user-set/extract/device'
  }, {
    key: 'interest',
    name: '兴趣属性',
    link: '/user-profile/user-set/extract/interest'
  }, {
    key: 'purchase',
    name: '购买属性',
    link: '/user-profile/user-set/extract/purchase'
  }, {
    key: 'keyword',
    name: '关键词搜索',
    link: '/user-profile/user-set/extract/keyword'
  }
]

const categoryNameMap = new Map([
  ['scenarios', '应用场景'],
  ['basicProperties', '基础属性'],
  ['regionProperties', '地域属性'],
  ['boundProperties', '绑定行为'],
  ['deviceProperties', '设备属性'],
  ['interestProperties', '兴趣属性'],
  ['purchaseProperties', '购买属性'],
  ['keywords', '关键词搜索']
])

class ExtractUserSet extends Component {
  constructor(props) {
    super(props)
    // handle the visibility of count modal
    this.state = {
      visible: false,
      modal: ''
    }
    this.showModel = this.showModel.bind(this)
    this.hideModel = this.hideModel.bind(this)
    this.handlePreSubmit = this.handlePreSubmit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount() {
    const data = convertFormState(this.props.state, formConfig)
    this.props.formActions.fetchUserSetSizeQuick(JSON.stringify(data))
  }
  componentWillReceiveProps(nextProps) {
    const submitStatus = nextProps.state.general.get('submitStatus')
    if (submitStatus) {
      if (submitStatus === 'fail') {
        _message.error('提交错误！请联系管理员', 5)
        this.props.formActions.clearSubmitState()
      } else if (submitStatus === 'succ') {
        const id = nextProps.state.general.get('userSetId')
        this.props.formActions.formClear()
        this.props.formActions.clearSubmitState()
        // 跳转页面
        this.context.router.push({
          // pathname: 'user-profile/properties/0',
          // query: { id }
          pathname: 'my-data-set/user-profile'
        })
      }
    }
    if (this.props.state.general.get('lastUpdate') !== nextProps.state.general.get('lastUpdate')) {
      const data = convertFormState(nextProps.state, formConfig)
      this.props.formActions.fetchUserSetSizeQuick(JSON.stringify(data))
    }
  }
  // handle the visibility of count modal
  showModel(modal) {
    this.setState({
      visible: true,
      modal
    })
  }
  hideModel() {
    this.setState({
      visible: false
    })
  }
  handlePreSubmit() {
    const data = convertFormState(this.props.state, formConfig)
    const tagsConfigs = getTagConfigFromState(this.props.state, formConfig, this.props.formActions)
    data.description = []
    Object.keys(tagsConfigs).forEach(key => {
      data.description = data.description.concat(tagsConfigs[key].map(x => x.label))
    })
    console.log(JSON.stringify(data))

    this.showModel('presubmit')
    this.props.formActions.clearSubmitState()
    this.props.formActions.fetchUserSetSize(JSON.stringify(data))
  }
  handleSubmit() {
    const data = convertFormState(this.props.state, formConfig)
    // Form Validation
    if (!data.name) {
      this.props.formActions.formSet('extractUserSet', 'name', null)
      return
    }
    // Get Decription
    const tagsConfigs = getTagConfigFromState(this.props.state, formConfig, this.props.formActions)
    data.description = []
    Object.keys(tagsConfigs).forEach(key => {
      data.description = data.description.concat(tagsConfigs[key].map(x => x.label))
    })
    console.log('Data Uploaded', JSON.stringify(data))
    this.showModel('submit')
    this.props.formActions.clearSubmitState()
    this.props.formActions.submitUserSetData(JSON.stringify(data))
  }
  render() {
    const selectedMenu = this.props.location.pathname.split('/')[4] || 'scenario'
    const tagsConfigs = getTagConfigFromState(this.props.state, formConfig, this.props.formActions)
    const count = this.props.state.general.get('count')
    const userSetSize = this.props.state.general.get('userSetSize')
    Object.keys(tagsConfigs).forEach(key => {
      tagsConfigs[key] = {
        name: categoryNameMap.get(key),
        tagsConfig: tagsConfigs[key]
      }
    })
    return (
      <div className="full-height">
        <_row className="full-height">
          <_col span={18} className="full-height">
            <div className="fix-top-row-wrapper" style={{ paddingTop: '143px' }}>
              <div className="fix-top-row" style={{ height: '143px' }}>
                <div className="fix-left-column-wrapper" style={{ paddingLeft: '120px', marginTop: '10px', height: '120px' }}>
                  <div className="fix-left-column text-center fs14 fc-dark" style={{ width: '120px' }}>
                    <p style={{ height: '95px', lineHeight: '95px' }}>用户集名称</p>
                    <p style={{ height: '30px', lineHeight: '30px' }}>用户集条件</p>
                  </div>
                  <Input
                    style={{ height: '95px', lineHeight: '95px', width: '300px' }}
                    disableLabel
                    required
                    placeholer="请输入"
                    value={this.props.state.general.get('name')}
                    onInput={this.props.formActions.formSet.bind(null, 'extractUserSet', 'name')}
                    validator={(value) => (value !== null)}
                    />
                  <UserSetSelectorMainNav
                    style={{ height: '33px', lineHeight: '30px', overflow: 'auto' }}
                    selectedMenu={selectedMenu}
                    menuItems={menuItems}
                    />
                </div>
              </div>
              <div className="full-height" style={{ overflow: 'auto', padding: '24px 0 0 100px' }}>
                {this.props.children}
              </div>
            </div>
          </_col>
          <_col span={6} className="full-height">
            <SelectorState
              tagsConfigs={tagsConfigs}
              onClear={this.props.formActions.formClear}
              showCategory
              >
              <div>
                <div className="fs14 fc-dark" style={{ marginBottom: '10px' }}>
                  <span>预估用户数：</span><span>{userSetSize === null ? '计算中...' : getChineseUnitNumber(userSetSize, 1)}</span>
                </div>
                {
                  // <div className="btn-theme3" styleName="submit-btn" onClick={this.handlePreSubmit}>获取用户数</div>
                  // <div className="btn-theme1" styleName="submit-btn" onClick={this.handleSubmit}>下一步 选择属性</div>
                }
                <div className="btn-theme1" styleName="submit-btn" onClick={this.handleSubmit}>提交</div>
              </div>
            </SelectorState>
          </_col>
        </_row>
        {
          // 提交跳转对话框
          this.state.modal !== 'submit' ? null :
            <_modal
              title={undefined}
              wrapClassName="vertical-center-modal"
              visible={this.state.visible}
              onCancel={this.hideModel}
              maskClosable={false}
              footer={undefined}
              >
              <div style={{ height: '200px', fontSize: '24px' }}>
                <div className="vertical-center text-center">
                  <span style={{ marginRight: '20px' }}>正在提交, 请耐心等待</span><_spin />
                </div>
              </div>
            </_modal>
        }
        {
          // 获取用户数结果页面
          this.state.modal !== 'presubmit' ? null :
            <_modal
              title="获取用户数结果"
              wrapClassName="vertical-center-modal"
              visible={this.state.visible}
              onCancel={this.hideModel}
              maskClosable={false}
              footer={(
                <div className="text-center">
                  <div className="btn-theme1" onClick={this.hideModel}>知道了</div>
                </div>
              )}
              >
              <div>
                {
                  // count === null 正在计算当前用户数
                  count === null ? <_spin /> :
                    <div>
                      <p>{count === -1 ? 'Fail' : 'Succ'}</p>
                      <p>{getReadableNumber(count)}</p>
                    </div>
                }
              </div>
            </_modal>
        }
      </div>
    )
  }
}

ExtractUserSet.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  state: React.PropTypes.object,
  formActions: React.PropTypes.object
}

ExtractUserSet.contextTypes = {
  router: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.userProfile.userSet.extract
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(ExtractUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(ExtractUserSet, styles))
