import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExtractUserSetAction from '../../containers/ExtractUserSetAction'

// import HorizontalMultiSelector from 'SRC/components/input-components/horizontal-multi-selector/HorizontalMultiSelector'
// import MatrixMultiSelector from 'SRC/components/input-components/matrix-multi-selector/MatrixMultiSelector'

import { formConfig } from 'SRC/configs/user-set-form-config'
import { createReactComponentBaseMap } from 'SRC/configs/user-set-form-config-parser'
// import { createCustomizedComponent } from './BoundService'

class Bound extends Component {
  render() {
    const { state, formActions } = this.props
    const childrenMap = createReactComponentBaseMap(
      'boundProperties',
      formConfig.boundProperties,
      state,
      formActions
      // createCustomizedComponent
    )
    return (
      <div>{[...childrenMap.values()]}</div>
    )
  }
}

Bound.propTypes = {
  state: React.PropTypes.object,
  formActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.pushPromotion.userSet.extract.boundProperties.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(ExtractUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Bound)
