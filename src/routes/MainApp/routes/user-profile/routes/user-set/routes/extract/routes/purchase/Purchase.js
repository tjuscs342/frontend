import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExtractUserSetAction from '../../containers/ExtractUserSetAction'

// import HorizontalMultiSelector from 'SRC/components/input-components/horizontal-multi-selector/HorizontalMultiSelector'
// import MatrixMultiSelector from 'SRC/components/input-components/matrix-multi-selector/MatrixMultiSelector'

import { formConfig } from 'SRC/configs/user-set-form-config'
import { createReactComponentBaseMap, loadAsyncFormConfig } from 'SRC/configs/user-set-form-config-parser'
import { createCustomizedComponent } from './PurchaseService'

class Purchase extends Component {
  constructor(props) {
    super(props)
    loadAsyncFormConfig(formConfig.purchaseProperties, 'purchaseProperties', this.props.formActions)
  }
  render() {
    const { state, formActions } = this.props
    const childrenMap = createReactComponentBaseMap(
      'purchaseProperties',
      formConfig.purchaseProperties,
      state,
      formActions,
      createCustomizedComponent
    )
    return (
      <div>{[...childrenMap.values()]}</div>
    )
  }
}

Purchase.propTypes = {
  state: React.PropTypes.object,
  formActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.userProfile.userSet.extract.purchaseProperties.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(ExtractUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Purchase)
