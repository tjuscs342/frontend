import React from 'react'
import MatrixMultiSelector from 'SRC/components/input-components/selector/MatrixMultiSelector'

import { getReadableNumber } from 'SRC/utils/utils'

export const createCustomizedComponent = {
  purchaseAbility: (formConfig, formState, formActions) => {
    const config = formConfig.purchaseAbility
    const purchaseAbilityList = formState.formConfig[config.api]
    return (
      <MatrixMultiSelector
        key={'purchaseAbility'}
        columnHeader={config.columnHeader}
        disableHeader={config.disableHeader}
        columnNum={config.columnNum}
        rowKeys={purchaseAbilityList.map(x => x.key)}
        rows={purchaseAbilityList.map(x => (
          [x.name, getReadableNumber(x.count), '__selector__']
        ))}
        values={config.valuePool}
        selectedValues={formState.purchaseAbility}
        onSelect={formActions.formSet.bind(null, 'purchaseProperties', 'purchaseAbility')}
        style={{ width: '800px' }}
        />
    )
  }
}
