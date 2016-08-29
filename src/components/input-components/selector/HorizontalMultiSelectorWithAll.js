import React from 'react'
import AbstractSelector from './AbstractSelector'

const _button = require('antd/lib/button')
import CheckBox from 'SRC/components/input-components/check-box/CheckBox'

import Wrapper from '../input-component-wrapper/Wrapper'
import CSSModules from 'react-css-modules'
import styles from './style.css'

class HorizontalMultiSelectorWithAll extends AbstractSelector {
  render() {
    const { label, icon, disableLabel, multiple, allowSelectAll, values, labelSize } = this.props
    const { selectedItemsMap } = this.state
    return (
      <Wrapper disableLabel={disableLabel} label={label} icon={icon} labelSize={labelSize}>
        <div className="fix-left-column-wrapper" style={{ paddingLeft: multiple ? '80px' : 0 }}>
          <div className="fix-left-column" style={{ width: '80px' }}>
            {
              !multiple && allowSelectAll ? null :
                <CheckBox
                  style={{ height: '29px', lineHeight: '29px' }}
                  onChange={this.handleSelectAll}
                  checked={selectedItemsMap.size === values.length}
                  >
                  全部选择
                </CheckBox>
            }
          </div>
          <div>
            {
              values.map((el) => (
                <_button
                  styleName={selectedItemsMap.has(el.key) ? 'btn-active' : 'btn'}
                  key={el.key}
                  onClick={this.handleSelect.bind(null, el)}
                  >
                  {`${el.name}`}
                </_button>
              ))
            }
          </div>
        </div>
      </Wrapper>
    )
  }
}

HorizontalMultiSelectorWithAll.defaultProps = {
  multiple: true,
  allowSelectAll: true
}

export default CSSModules(HorizontalMultiSelectorWithAll, styles)
