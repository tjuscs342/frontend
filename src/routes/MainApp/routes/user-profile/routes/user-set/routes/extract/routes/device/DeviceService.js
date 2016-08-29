import React, { Component } from 'react'
import VerticalMultiSelector from 'SRC/components/input-components/selector/VerticalMultiSelectorQuick'
import CommaSeperatedInputArea from 'SRC/components/input-components/input/CommaSeperatedInputArea'
const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
const _button = require('antd/lib/button')

class SystemVersionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
    this.handleCollapse = this.handleCollapse.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleCollapse() {
    this.setState({
      visible: !this.state.visible
    })
  }
  handleSubmit(index, values) {
    this.props.formActions.formSet(
      'deviceProperties',
      'systemVersionDetail',
      [index, values]
    )
  }
  render() {
    const { config, formState } = this.props
    const { visible } = this.state
    return (
      <div>
        <div className="fix-left-column-wrapper" style={{ paddingLeft: '130px' }}>
          <_row style={{ marginBottom: '15px' }}>
            <_col span={16}>
              <VerticalMultiSelector
                disableLabel
                placeholder={config.name[0]}
                values={formState.formConfig[config.api] || []}
                selectedValues={formState.systemVersionDetail[0]}
                onSelect={this.handleSubmit.bind(null, 0)}
                />
            </_col>
            <_col span={4} offset={1}>
              {
                visible ? null : <_button onClick={this.handleCollapse}>手动输入</_button>
              }
            </_col>
          </_row>
          {
            !visible ? null :
              <_row>
                <_col span={16}>
                  <CommaSeperatedInputArea
                    disableLabel
                    placeholder={config.name[1]}
                    values={formState.systemVersionDetail[1]}
                    onInput={this.handleSubmit.bind(null, 1)}
                    />
                </_col>
                <_col span={4} offset={1}>
                  <_button onClick={this.handleCollapse}>取消</_button>
                </_col>
              </_row>
          }
        </div>
      </div>
    )
  }
}

export const createCustomizedComponent = {
  systemVersionDetail: (formConfig, formState, formActions) => (
    <SystemVersionDetail
      key={'systemVersionDetail'}
      config={formConfig.systemVersionDetail}
      formState={formState}
      formActions={formActions}
      />
  )
}
