import React, { Component } from 'react'

import Table from './DiffTable'

class TwoColumnTable extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <div className="inline" style={{ width: '50%', padding: '0 5px 0 0' }}>
          <Table
            title={data[0].name}
            header={['APP名', '用户数', '信息增益']}
            data={data[0].value}
            tagColor="red"
            />
        </div>
        <div className="inline" style={{ width: '50%', padding: '0 0 0 5px' }}>
          <Table
            title={data[1].name}
            header={['APP名', '用户数', '信息增益']}
            data={data[1].value}
            tagColor="green"
            />
        </div>
      </div>
    )
  }
}

TwoColumnTable.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object),
  propName: React.PropTypes.string
}

TwoColumnTable.defaultProps = {
  data: [{
    name: '',
    value: []
  }, {
    name: '',
    value: []
  }],
  propName: ''
}

export default TwoColumnTable
