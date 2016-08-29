import React, { Component } from 'react'

import CSSModules from 'react-css-modules'
import styles from './style.css'
import SubMenu from 'SRC/components/header/sub-nav/SubNav'

class HorizontalMultiSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryKey: ''
    }
    this.handleSelectCategory = this.handleSelectCategory.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedCategoryKey: nextProps.selectedCategoryKey
    })
  }
  handleSelectCategory(value) {
    this.setState({ selectedCategoryKey: value.key })
  }
  handleSelect(value) {
    if (value.onClick) value.onClick()
    this.props.onSelect(value)
  }
  render() {
    const { selectedItem, valuePool } = this.props
    const { selectedCategoryKey } = this.state
    return (
      <div>
        <div style={{ postion: 'relative', marginBottom: '10px' }}>
          <div style={{ position: 'relative', bottom: '-1px' }}>
            {
              valuePool.map((el) => (
                <div
                  key={el.key}
                  className={`border-style-blue inline text-center pointer fs14 ${selectedCategoryKey === el.key ? 'fc-dark' : 'fc-light'}`}
                  styleName="nav-menu"
                  style={{
                    minWidth: '110px',
                    borderWidth: 0,
                    paddingBottom: '5px',
                    marginBottom: '5px',
                    borderBottomWidth: '2px',
                    borderBottomColor: selectedCategoryKey === el.key ? '' : 'transparent'
                  }}
                  onClick={this.handleSelectCategory.bind(null, el)}
                  >
                  {el.render ? el.render(el) : el.name}
                </div>
              ))
            }
          </div>
          <div className="bottom-border" style={{ position: 'relative', bottom: '4px' }} />
        </div>
        <div>
          {
            valuePool.map(category => (
              category.key !== selectedCategoryKey ? null :
                category.valuePool.map((el) => (
                  <div
                    key={el.key}
                    className={`${selectedItem.key === el.key ? 'btn-theme1 fs12' : 'btn fc-light fs12'}`}
                    onClick={this.handleSelect.bind(null, el)}
                    style={{
                      minWidth: '100px',
                      padding: '3px 5px',
                      marginBottom: '10px'
                    }}
                    >
                    {el.render ? el.render(el) : el.name}
                  </div>
                ))
            ))
          }
        </div>
      </div>
    )
  }
}


HorizontalMultiSelector.propTypes = {
  selectedItem: React.PropTypes.shape({
    key: React.PropTypes.string.isRequired
  }),
  valuePool: React.PropTypes.arrayOf(React.PropTypes.shape({
    key: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    valuePool: React.PropTypes.arrayOf(React.PropTypes.shape({
      key: React.PropTypes.string.isRequired,
      name: React.PropTypes.string.isRequired
    }))
  })),
  onSelect: React.PropTypes.func
}
HorizontalMultiSelector.defaultProps = {
  selectedItem: { key: '' },
  valuePool: [],
  onSelect: (value) => (value)
}

export default CSSModules(HorizontalMultiSelector, styles)
