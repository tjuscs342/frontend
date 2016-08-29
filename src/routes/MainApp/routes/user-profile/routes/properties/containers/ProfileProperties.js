import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CSSModules from 'react-css-modules'
import styles from './style.css'

import * as ProfilePropertiesAction from './ProfilePropertiesAction'
import * as PersistentActions from 'SRC/action'
import { getMenuItems, getTagConfigFromState, isAllPropertiesSelected, calTotalPrice, convertFormState } from './ProfilePropertiesService'
import { SUBMIT_STATUS } from './ProfilePropertiesConstant'
import userSetId from 'SRC/constants/user-set-id' // Default CompareSetId

const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
const _modal = require('antd/lib/modal')
const _spin = require('antd/lib/spin')
import HorizontalMultiSelectorWithAll from 'SRC/components/input-components/selector/HorizontalMultiSelectorWithAll'
import UserSetSelectorMainNav from 'SRC/components/header/extract-user-set-nav/UserSetSelectorMainNav'
import SelectorState from 'SRC/components/user-set-selector-state/SelectorState'
import CheckBox from 'SRC/components/input-components/check-box/CheckBox'
import classNames from 'classnames'

class ProfileProperties extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
  }
  componentWillMount() {
    this.props.actions.fetchAllProperties()
    this.props.actions.submitStatusChange(SUBMIT_STATUS.empty)
  }
  componentWillReceiveProps(nextProps) {
    const { submitStatus, id } = nextProps.state
    if (submitStatus === SUBMIT_STATUS.done) {
      this.props.actions.submitStatusChange(SUBMIT_STATUS.empty)
      // 跳转页面
      this.props.persistentActions.persistentSet('compareSetId', userSetId.defaultToId)
      this.context.router.push({
        pathname: '/user-profile/report/normal',
        query: { id }
      })
    }
  }
  handleSelectAll(checked) {
    if (checked) {
      this.props.actions.selectAll()
    } else {
      this.props.actions.formClear()
    }
  }
  handleSubmit() {
    const tags = convertFormState(this.props.state)
    console.log(`id = ${this.props.state.id}; tags = ${tags}`)
    this.props.actions.submitAllProperties(this.props.state.id, tags)
  }
  render() {
    const { propertyCategory } = this.props.params
    const nextPropertyCategory = `${+propertyCategory + 1}`
    const { state, actions } = this.props
    const { config, form, id, submitStatus } = state

    const menuItems = getMenuItems(config, id)

    const tagsConfigs = getTagConfigFromState(state, actions)

    const selectedAllChecked = isAllPropertiesSelected(state)

    let selectEmpty = true
    for (const value of Object.keys(form)) {
      if (form[value].length > 0) {
        selectEmpty = false
      }
    }

    return (
      <div className="full-height">
        <_row className="full-height">
          <_col span={18} className="full-height">
            <div className="fix-top-row-wrapper" style={{ paddingTop: '120px' }}>
              <div className="fix-top-row" style={{ height: '120px', paddingTop: '30px' }}>
                <div>
                  <p className="fs14 fc-dark inline text-center" style={{ width: '120px', marginBottom: '15px' }}>付费属性选择</p>
                  <CheckBox onChange={this.handleSelectAll} checked={selectedAllChecked}>全部选择</CheckBox>
                </div>
                <div style={{ paddingLeft: '120px' }}>
                  <UserSetSelectorMainNav
                    style={{ height: '33px', lineHeight: '30px', overflow: 'auto' }}
                    selectedMenu={propertyCategory}
                    menuItems={menuItems}
                    />
                </div>
              </div>
              <div className="full-height" style={{ overflow: 'auto', paddingLeft: '120px' }}>
                {
                  propertyCategory >= config.length ? null :
                    <section className="border-style" style={{ borderWidth: '1px', maxWidth: '800px', paddingTop: '15px', marginBottom: '15px' }}>
                      <HorizontalMultiSelectorWithAll
                        label={config[propertyCategory].name}
                        icon="tag"
                        values={(config[propertyCategory] || {}).valuePool || []}
                        selectedValues={form[propertyCategory] || []}
                        onSelect={actions.formSet.bind(null, propertyCategory)}
                        />
                    </section>
                }
                {
                  nextPropertyCategory >= config.length ? null :
                    <section className="border-style" style={{ borderWidth: '1px', maxWidth: '800px', paddingTop: '15px' }}>
                      <HorizontalMultiSelectorWithAll
                        label={config[nextPropertyCategory].name}
                        icon="tag"
                        values={(config[nextPropertyCategory] || {}).valuePool || []}
                        selectedValues={form[nextPropertyCategory] || []}
                        onSelect={actions.formSet.bind(null, nextPropertyCategory)}
                        />
                    </section>
                }
              </div>
            </div>
          </_col>
          <_col span={6} className="full-height">
            <SelectorState
              tagsConfigs={tagsConfigs}
              onClear={actions.formClear}
              showCategory
              >
              <div>
                {
                  // <p className="fs14 fc-dark" styleName="zigzag"><span styleName="dollar">$</span><span styleName="price">费用总计: {calTotalPrice(state).toFixed(2)} 元</span></p>
                }
                <div
                  className={classNames({ 'not-allowed': selectEmpty })}
                  styleName="submit-btn"
                  style={!selectEmpty ? { background: '#2FA4FF' } : { background: '#D4D4D4' }}
                  onClick={!selectEmpty ? this.handleSubmit : ''}
                  >
                  下一步　生成画像
                </div>
              </div>
            </SelectorState>
          </_col>
        </_row>
        <_modal
          title={undefined}
          wrapClassName="vertical-center-modal"
          visible={submitStatus === SUBMIT_STATUS.submit}
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
      </div>
    )
  }
}

ProfileProperties.propTypes = {
  params: React.PropTypes.object,
  state: React.PropTypes.object,
  actions: React.PropTypes.object,
  persistentActions: React.PropTypes.object
}

ProfileProperties.contextTypes = {
  router: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.userProfile.properties.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(ProfilePropertiesAction, dispatch),
    persistentActions: bindActionCreators(PersistentActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(ProfileProperties, styles))
