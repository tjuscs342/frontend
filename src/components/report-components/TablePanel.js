import React, { Component } from 'react'

import TwoColumnTable from './tables/TwoColumnTable'
import ThreeColumnTable from './tables/ThreeColumnTable'
import TwoColumnTableDiff from './tables/TwoColumnTableDiff'
import ThreeColumnTableArup from './tables/ThreeColumnTableArup'
// import { getReadablePercent } from 'SRC/utils/utils'

// import html2canvas from 'html2canvas'

const type2ChartMap = {
  table1: TwoColumnTable,
  table3: ThreeColumnTable,
  table4: TwoColumnTableDiff,
  table5: ThreeColumnTableArup
}

class TablePanel extends Component {
  constructor(props) {
    super(props)
    this.getCanvas = this.getCanvas.bind(this)
  }
  getCanvas() {
  }
  render() {
    const { tableType, data, propName } = this.props
    const Table = type2ChartMap[tableType]
    if (!Table) return (<div>未知Table类型</div>)
    return (
      <section ref="container" style={{ paddingBottom: '30px' }}>
        <Table data={data} propName={propName} />
      </section>
    )
  }
}

TablePanel.propTypes = {
  data: React.PropTypes.array,
  propName: React.PropTypes.string,
  tableType: React.PropTypes.oneOf([
    'table1', 'table3', 'table4', 'table5'
  ])
}

TablePanel.defaultProps = {
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
  tableType: 'table1'
}

export default TablePanel
