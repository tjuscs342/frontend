import React, { Component } from 'react'

// import { getReadablePercent } from 'SRC/utils/utils'
import CSSModules from 'react-css-modules'
import styles from './style.css'

class MyTable extends Component {
  render() {
    const { title, data } = this.props
    const data1 = data.slice(0, data.length / 2)
    const data2 = data.slice(data.length / 2)
    return (
      <div>
        <div
          className="bg-grey fs14 fc-dark border-style text-center"
          style={{ padding: '5px 30px', background: '#EDF1F3', borderWidth: '1px', borderBottomWidth: 0 }}
          >
          {title}
        </div>
        <div className="border-style" style={{ padding: '15px 5% 0', borderWidth: '1px' }} styleName="table">
          <table styleName="table3" style={{ marginBottom: '15px' }}>
            <tbody>
              {
                data1.map((record, i) => (
                  <tr styleName="tr" key={record.key}>
                    <td styleName="td">
                      <div style={{ width: '100%', position: 'relative' }}>
                        {record.render ? record.render(record) : record.name}
                        <div style={{ position: 'absolute', top: 0, left: '10px' }}>
                          <span
                            className="inline"
                            style={{ background: '#2FA4FF', color: 'white', borderRadius: '3px', width: '20px' }}
                            >
                            {record.value}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td styleName="td">
                      <div style={{ width: '100%', position: 'relative' }}>
                        {data2[i].render ? data2[i].render(data2[i]) : data2[i].name}
                        <div style={{ position: 'absolute', top: 0, left: '10px' }}>
                          <span
                            className="inline"
                            style={{ background: '#2FA4FF', color: 'white', borderRadius: '3px', width: '20px' }}
                            >
                            {data2[i].value}
                          </span>
                        </div>
                      </div>
                    </td>
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

MyTable.propTypes = {
  title: React.PropTypes.string,
  data: React.PropTypes.array
}

MyTable.defaultProps = {
}

export default CSSModules(MyTable, styles)
