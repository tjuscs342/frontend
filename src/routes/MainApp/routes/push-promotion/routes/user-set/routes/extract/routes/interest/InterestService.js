import React from 'react'
import MatrixMultiSelector from 'SRC/components/input-components/selector/MatrixMultiSelector'

import { getReadableNumber } from 'SRC/utils/utils'

export const createCustomizedComponent = {
  interest: (formConfig, formState, formActions) => {
    const config = formConfig.interest
    const interestList = formState.formConfig[config.api]
    return (
      <MatrixMultiSelector
        key={'interest'}
        columnHeader={config.columnHeader}
        disableHeader={config.disableHeader}
        columnNum={config.columnNum}
        rowKeys={interestList.map(x => x.key)}
        rows={interestList.map(x => (
          [x.name, getReadableNumber(x.count), '__selector__']
        ))}
        values={config.valuePool}
        selectedValues={formState.interest}
        onSelect={formActions.formSet.bind(null, 'interestProperties', 'interest')}
        style={{ width: '800px' }}
        />
    )
  }
}
