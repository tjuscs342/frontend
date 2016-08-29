import React, { Component } from 'react'
const _tooltip = require('antd/lib/tooltip')

const labelSizeMap = new Map([
  ['small', '90px'],
  ['normal', '110px'],
  ['large', '130px']
])

class Wrapper extends Component {
  render() {
    const { disableLabel, label, children, icon, labelSize, limitation, description, updatePeriod } = this.props
    const width = labelSizeMap.get(labelSize) || (icon ? '110px' : '90px')
    return (
      <div style={{ marginBottom: '15px' }}>
        {
          disableLabel ?
            <div>{this.props.children}</div>
            :
            <div className="fix-left-column-wrapper" style={{ paddingLeft: width }}>
              <div className="fix-left-column text-left h25 fs14" style={{ paddingRight: '0px', width, marginLeft: '10px' }}>
                {
                  !icon ?
                    <span style={{ paddingLeft: '15px' }}>
                      {label}
                    </span>
                    :
                    <span style={{ paddingLeft: '15px' }}>
                      {label}
                      {description || updatePeriod || limitation ?
                        <_tooltip
                          title={
                            <div>
                              <div>{description}</div>
                              {updatePeriod ? <div>更新周期:{updatePeriod}</div> : ''}
                              {limitation ? <div>时效:{limitation}</div> : ''}
                            </div>
                          }
                          >
                          <i className="fa fa-question-circle" aria-hidden="true" style={{ padding: '0 10px 0 5px', color: '#D4D4D4' }}></i>
                        </_tooltip>
                        : ''
                      }
                    </span>

                    // <span><i className="fa fa-tag" aria-hidden="true" style={{ padding: '0 10px', color: '#2FA4FF' }}></i>{label}</span>
                }
              </div>
              <div>{this.props.children}</div>
            </div>
        }
      </div>
    )
  }
}

export default Wrapper
