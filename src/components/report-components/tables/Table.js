import React, { Component } from 'react'

import { getReadablePercent } from 'SRC/utils/utils'
import CSSModules from 'react-css-modules'
import styles from './style.css'

class MyTable extends Component {
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
          <table styleName="table1" style={{ marginBottom: '5px' }}>
            <thead>
              <tr styleName="tr">
                <th styleName="th">{header[0]}</th>
                <th styleName="th">{header[1]}</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(record => (
                  <tr styleName="tr" key={record.key}>
                    <td styleName="td">{record.render ? record.render(record) : record.name}</td>
                    <td styleName="td">{getReadablePercent(record.value)}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <table styleName="table1" style={{ marginBottom: '15px' }}>
            <tfoot>
              <tr styleName="tr">
                <td styleName="td">{footer[0]}</td>
                <td styleName="td">{getReadablePercent(footer[1])}</td>
              </tr>
            </tfoot>
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

MyTable.propTypes = {
  title: React.PropTypes.string,
  header: React.PropTypes.arrayOf(React.PropTypes.string),
  data: React.PropTypes.array,
  footer: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]))
}

MyTable.defaultProps = {
}

export default CSSModules(MyTable, styles)
