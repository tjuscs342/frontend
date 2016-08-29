import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExtractUserSetAction from '../../containers/ExtractUserSetAction'

// import HorizontalMultiSelector from 'SRC/components/input-components/horizontal-multi-selector/HorizontalMultiSelector'
// import MatrixMultiSelector from 'SRC/components/input-components/matrix-multi-selector/MatrixMultiSelector'
// import CascadingSelector from 'SRC/components/input-components/cascading-selector/CascadingSelector'

import { formConfig } from 'SRC/configs/user-set-form-config'
import { createReactComponentBaseMap, loadAsyncFormConfig } from 'SRC/configs/user-set-form-config-parser'
import { createCustomizedComponent } from './ScenarioService'

class Scenarios extends Component {
  constructor(props) {
    super(props)
    loadAsyncFormConfig(formConfig.scenarios, 'scenarios', this.props.formActions)
  }
  render() {
    const { state, formActions } = this.props
    const childrenMap = createReactComponentBaseMap(
      'scenarios',
      formConfig.scenarios,
      state,
      formActions,
      createCustomizedComponent,
      {
        cascadingSelectorConfig: state.formConfig.cascadingSelectorConfig
      }
    )
    return (
      <div>{[...childrenMap.values()]}</div>
    )
  }
}

Scenarios.propTypes = {
  state: React.PropTypes.object,
  formActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.pushPromotion.userSet.extract.scenarios.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(ExtractUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Scenarios)
