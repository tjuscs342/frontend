import React, { Component } from 'react'

import { getReadablePercent } from 'SRC/utils/utils'
import CSSModules from 'react-css-modules'
import styles from './style.css'

class ArupTable extends Component {
  render() {
    const { title, header, data, footer } = this.props
    return (
      <div>
        <div
          className="bg-grey fs14 fc-dark border-style"
          style={{ padding: '5px 30px', background: '#EDF1F3', borderWidth: '1px', borderBottomWidth: 0 }}
          >
          {title}
        </div>
        <div className="border-style" style={{ padding: '15px 5% 0', borderWidth: '1px' }} styleName="table">
          <table styleName="table5" style={{ marginBottom: '15px' }}>
            <thead>
              <tr styleName="tr">
                {
                  header.map(h => (
                    <th styleName="th" key={h}>{h}</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                data.map(record => (
                  <tr styleName="tr" key={record.key}>
                    <td styleName="td">{record.render ? record.render(record) : record.name}</td>
                    <td styleName="td">{record.pay}</td>
                    <td styleName="td">{record.total}</td>
                    <td styleName="td">{record.proportion}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

// const valueType = React.PropTypes.shape({
//   key: React.PropTypes.string.isRequired,
//   name: React.PropTypes.string.isRequired,
//   value: React.PropTypes.oneOfType([
//     React.PropTypes.string,
//     React.PropTypes.number
//   ]).isRequired
// })

ArupTable.propTypes = {
  title: React.PropTypes.string,
  header: React.PropTypes.arrayOf(React.PropTypes.string),
  data: React.PropTypes.array
}

ArupTable.defaultProps = {
}

export default CSSModules(ArupTable, styles)
