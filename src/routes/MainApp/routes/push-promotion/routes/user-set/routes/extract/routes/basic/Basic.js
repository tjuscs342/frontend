import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExtractUserSetAction from '../../containers/ExtractUserSetAction'

// import HorizontalMultiSelector from 'SRC/components/input-components/horizontal-multi-selector/HorizontalMultiSelector'

import { formConfig } from 'SRC/configs/user-set-form-config'
import { createReactComponentBaseMap } from 'SRC/configs/user-set-form-config-parser'
// import { createCustomizedComponent } from './BasicService'

class Basic extends Component {
  render() {
    const { state, formActions } = this.props
    const childrenMap = createReactComponentBaseMap(
      'basicProperties',
      formConfig.basicProperties,
      state,
      formActions
      // createCustomizedComponent
    )
    return (
      <div>{[...childrenMap.values()]}</div>
    )
  }
}

Basic.propTypes = {
  state: React.PropTypes.object,
  actions: React.PropTypes.object,
  formActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.pushPromotion.userSet.extract.basicProperties.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(ExtractUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Basic)
