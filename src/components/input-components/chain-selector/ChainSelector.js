import React, { Component } from 'react'

// const _row = require('antd/lib/row')
// const _col = require('antd/lib/col')
const _button = require('antd/lib/button')
import ChainRelationSelector from './ChainRelationSelector'

// import CSSModules from 'react-css-modules'
// import styles from './ChainRelationSelector.css'

class ChainSelector extends Component {
  constructor(props) {
    super(props)
    this.handleClear = this.handleClear.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSelectRelation = this.handleSelectRelation.bind(this)
  }
  componentWillMount() {
    this.pseudoFormAction = {
      formSet: (formCategory, formKey, values) => {
        this.handleSelect({
          formCategory,
          formKey,
          values
        })
      }
    }
  }
  componentWillReceiveProps(nextProps) {

  }
  handleClear() {
  }
  handleAdd() {
    this.props.onSelect({
      type: 'CHAIN_SELECTOR_ADD'
    })
  }
  handleDelete() {
    this.props.onSelect({
      type: 'CHAIN_SELECTOR_DELETE'
    })
  }
  handleSelectRelation(index, relation) {
    this.props.onSelect({
      type: 'CHAIN_SELECTOR_SELECT_RELATION',
      index,
      relation
    })
  }
  handleSelect(action) {
    this.props.onSelect({
      type: 'CHAIN_SELECTOR_UPDATE',
      action
    })
  }
  render() {
    const { hanging, formConfig, contextConfig, relationSelector, formState, createReactComponentBaseMap, createCustomizedComponent } = this.props
    const pseudoFormAction = this.pseudoFormAction

    const children = formState.map((state, index) => {
      const childrenMap = createReactComponentBaseMap(
        `${index}`,
        formConfig,
        state,
        pseudoFormAction,
        createCustomizedComponent,
        Object.assign({}, contextConfig, { index })
      )
      // Special Style Setting
      let childrenArray
      if (hanging) {
        childrenArray = [...childrenMap.values()].map((ele, i) => (
          <div key={i} style={{ paddingLeft: i === 0 ? '0px' : '120px' }}>
            {ele}
          </div>
        ))
      } else {
        childrenArray = [...childrenMap.values()]
      }
      return (
        <div key={index}>
          <div
            className="border-style"
            style={{
              maxWidth: '900px',
              minWidth: '500px',
              borderWidth: '1px',
              padding: '25px 50px 0 0'
            }}
            >
            {childrenArray}
          </div>
          {
            index === formState.length - 1 ? null :
              <ChainRelationSelector
                multiple={false}
                label={relationSelector.name}
                values={relationSelector.valuePool}
                selectedValues={state.relationWithNext}
                onSelect={this.handleSelectRelation.bind(null, index)}
                />
          }
        </div>
      )
    })
    return (
      <section>
        <div style={{ marginBottom: '40px' }}>{children}</div>
        <div>
          <div
            key="add"
            className="btn-theme1"
            onClick={this.handleAdd}
            style={{
              width: '200px',
              marginRight: '15px',
              fontSize: '14px'
            }}
            >
            添加
          </div>
          <div
            key="delete"
            className="btn-theme2"
            onClick={this.handleDelete}
            style={{
              width: '140px',
              fontSize: '14px'
            }}
            >
            删除最后一项
          </div>
        </div>
      </section>
    )
  }
}

ChainSelector.propTypes = {
  createCustomizedComponent: React.PropTypes.object.isRequired,
  createReactComponentBaseMap: React.PropTypes.func.isRequired,
  formConfig: React.PropTypes.object.isRequired,
  contextConfig: React.PropTypes.object,
  formState: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  relationSelector: React.PropTypes.object.isRequired,
  formCategory: React.PropTypes.string.isRequired,
  onSelect: React.PropTypes.func,
  hanging: React.PropTypes.bool
}
ChainSelector.defaultProps = {
  hanging: false,
  contextConfig: {},
  onSelect: (value) => (value)
}

export default ChainSelector
