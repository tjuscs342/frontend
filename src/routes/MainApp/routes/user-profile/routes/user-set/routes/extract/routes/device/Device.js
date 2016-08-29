import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExtractUserSetAction from '../../containers/ExtractUserSetAction'
// import * as DeviceAction from './DeviceAction'

import { formConfig } from 'SRC/configs/user-set-form-config'
import { createReactComponentBaseMap, loadAsyncFormConfig } from 'SRC/configs/user-set-form-config-parser'
import { createCustomizedComponent } from './DeviceService'

class Device extends Component {
  constructor(props) {
    super(props)
    loadAsyncFormConfig(formConfig.deviceProperties, 'deviceProperties', this.props.formActions)
  }
  render() {
    const { state, formActions } = this.props
    const childrenMap = createReactComponentBaseMap(
      'deviceProperties',
      formConfig.deviceProperties,
      state,
      formActions,
      createCustomizedComponent // eslint-disable-line no-undef
    )
    return (
      <div>{[...childrenMap.values()]}</div>
    )
  }
}

Device.propTypes = {
  state: React.PropTypes.object,
  formActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.userProfile.userSet.extract.deviceProperties.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(ExtractUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Device)
