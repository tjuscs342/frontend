import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExtractUserSetAction from '../../containers/ExtractUserSetAction'

// import HorizontalMultiSelector from 'SRC/components/input-components/horizontal-multi-selector/HorizontalMultiSelector'
// import MatrixMultiSelector from 'SRC/components/input-components/matrix-multi-selector/MatrixMultiSelector'
// import CascadingSelector from 'SRC/components/input-components/cascading-selector/CascadingSelector'

import { formConfig } from 'SRC/configs/user-set-form-config'
import { createReactComponentBaseMap } from 'SRC/configs/user-set-form-config-parser'
import { createCustomizedComponent } from './KeywordService'

class Keyword extends Component {
  render() {
    const { state, formActions } = this.props
    const childrenMap = createReactComponentBaseMap(
      'keywords',
      formConfig.keywords,
      state,
      formActions,
      createCustomizedComponent
    )
    return (
      <div>{[...childrenMap.values()]}</div>
    )
  }
}

Keyword.propTypes = {
  state: React.PropTypes.object,
  formActions: React.PropTypes.object
}

function mapState(state) {
  return {
    state: state.pushPromotion.userSet.extract.keywords.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(ExtractUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(Keyword)
