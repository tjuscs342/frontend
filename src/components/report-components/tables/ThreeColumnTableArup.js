import React, { Component } from 'react'

import Table from './Table'
import ArupTable from './ArupTable'

class ThreeColumnTableArup extends Component {
  render() {
    const { data, propName } = this.props
    return (
      <div>
        <div>
          <div className="inline" style={{ width: '50%', padding: '0 5px 0 0' }}>
            <Table
              title={data[0].name}
              header={[propName, '占比']}
              data={data[0].value}
              footer={[data[0].unknown.name, data[0].unknown.value]}
              />
          </div>
          <div className="inline" style={{ width: '50%', padding: '0 0 0 5px' }}>
            <Table
              title={data[1].name}
              header={[propName, '占比']}
              data={data[1].value}
              footer={[data[1].unknown.name, data[1].unknown.value]}
              />
          </div>
        </div>
        <div>
          <ArupTable
            title={data[2].name}
            header={['用户集', '付费ARUP', '全量ARUP', '付费用户比']}
            data={data[2].value}
            />
        </div>
      </div>
    )
  }
}

ThreeColumnTableArup.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  propName: React.PropTypes.string
}

ThreeColumnTableArup.defaultProps = {
  data: [{
    name: '',
    value: [],
    unknown: {
      key: 'unknown',
      name: '未知',
      value: 'N/A'
    }
  }, {
    name: '',
    value: [],
    unknown: {
      key: 'unknown',
      name: '未知',
      value: 'N/A'
    }
  }],
  propName: ''
}

export default ThreeColumnTableArup
