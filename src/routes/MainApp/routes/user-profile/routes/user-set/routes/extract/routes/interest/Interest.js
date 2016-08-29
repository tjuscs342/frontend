import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExtractUserSetAction from '../../containers/ExtractUserSetAction'
// import * as InterestAction from './InterestAction'

// import VerticalMultiSelector from 'SRC/components/input-components/vertical-multi-selector/VerticalMultiSelector'
// import HorizontalMultiSelector from 'SRC/components/input-components/horizontal-multi-selector/HorizontalMultiSelector'
// import MatrixMultiSelector from 'SRC/components/input-components/matrix-multi-selector/MatrixMultiSelector'

import { formConfig } from 'SRC/configs/user-set-form-config'
import { createReactComponentBaseMap, loadAsyncFormConfig } from 'SRC/configs/user-set-form-config-parser'
import { createCustomizedComponent } from './InterestService'

class Interest extends Component {
  constructor(props) {
    super(props)
    loadAsyncFormConfig(formConfig.interestProperties, 'interestProperties', this.props.formActions)
  }
  render() {
    const { state, formActions } = this.props
    const childrenMap = createReactComponentBaseMap(
      'interestProperties',
      formConfig.interestProperties,
      state,
      formActions,
      createCustomizedComponent // eslint-disable-line no-undef
    )
    return (
      <div>{[...childrenMap.values()]}</div>
    )
  }
}

Interest.propTypes = {
  state: React.PropTypes.object,
  formActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.userProfile.userSet.extract.interestProperties.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(ExtractUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Interest)
