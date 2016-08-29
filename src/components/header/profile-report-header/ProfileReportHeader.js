import React, { Component } from 'react'
import { Link } from 'react-router'

import Selector from './TwoLevelSelector'

import CSSModules from 'react-css-modules'
import styles from './style.css'

class ProfileReportNav extends Component {
  constructor(props) {
    super(props)
    this.handleUserSetSelection = this.handleUserSetSelection.bind(this)
    this.handlePropertySelection = this.handlePropertySelection.bind(this)
  }
  handleUserSetSelection(value) {
    this.props.onUserSetChange(value)
  }
  handlePropertySelection(value) {
    this.props.onPropertyChange(value)
  }
  render() {
    const { selectedUserSet, selectedProperty, propertiesValuePool, userSetValuePool } = this.props
    return (
      <div style={{ padding: '25px 5% 0' }}>
        <section style={{ marginBottom: '30px' }}>
          <div className="fix-left-column-wrapper">
            <div className="fix-left-column fs14 text-center fc-dark" style={{ paddingTop: '3px' }}>
              对比集选择
            </div>
            <Selector
              selectedItem={selectedUserSet}
              selectedCategoryKey={selectedUserSet.source === 'predefined' ? 'predefined' : 'customized'}
              valuePool={userSetValuePool}
              onSelect={this.handleUserSetSelection}
              />
          </div>
        </section>
        <section style={{ marginBottom: '20px' }}>
          <div className="fix-left-column-wrapper">
            <div className="fix-left-column fs14 text-center fc-dark" style={{ paddingTop: '3px' }}>
              属性跳转
            </div>
            <Selector
              selectedItem={selectedProperty}
              selectedCategoryKey={(selectedProperty || {}).type}
              valuePool={propertiesValuePool}
              onSelect={this.handlePropertySelection}
              />
          </div>
        </section>
      </div>
    )
  }
}

ProfileReportNav.propTypes = {
  selectedUserSet: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired
  }),
  selectedProperty: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired
  }),
  onUserSetChange: React.PropTypes.func,
  onPropertyChange: React.PropTypes.func,
  propertiesValuePool: React.PropTypes.array,
  userSetValuePool: React.PropTypes.array
}
ProfileReportNav.defaultProps = {
  selectedUserSet: { key: '' },
  selectedProperty: { key: '' },
  onUserSetChange: (v) => (v),
  onPropertyChange: (v) => (v)
}

export default CSSModules(ProfileReportNav, styles)
