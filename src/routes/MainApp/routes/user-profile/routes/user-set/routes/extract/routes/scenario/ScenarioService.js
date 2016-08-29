import React from 'react'
import CascadingSelector from 'SRC/components/input-components/cascading-selector/CascadingSelector'
import DoubleDatePicker from 'SRC/components/input-components/date-picker/DoubleDatePicker'
import DoubleNumberInput from 'SRC/components/input-components/input/DoubleNumberInput'
import CommaSeperatedInputArea from 'SRC/components/input-components/input/CommaSeperatedInputArea'

// import { getReadableNumber } from 'SRC/utils/utils'

export const createCustomizedComponent = {
  businessProfile: (formConfig, formState, formActions, contextConfig) => {
    // console.log(formConfig, formState, formActions, contextConfig)
    const config = formConfig.businessProfile
    return (
      <div key="businessProfile">
        <CascadingSelector
          disableLabel
          selectorLabels={config.selectorLabels}
          placeholders={config.placeholders}
          selectedValues={formState.businessProfile}
          selectorType={config.selectorType}
          valuePool={contextConfig.cascadingSelectorConfig}
          onSelect={formActions.formSet.bind(null, contextConfig.index, 'businessProfile')}
          />
      </div>
    )
  },
  dateRange: (formConfig, formState, formActions, contextConfig) => {
    const businessAction = formState.businessProfile[1][0] || {}
    if (businessAction.type !== 'Timestamp') {
      return null
    }
    return (
      <DoubleDatePicker
        key="dateRange"
        label={formConfig.dateRange.name}
        values={formState.dateRange}
        onChange={formActions.formSet.bind(null, contextConfig.index, 'dateRange')}
        />
    )
  },
  numberRange: (formConfig, formState, formActions, contextConfig) => {
    const businessAction = formState.businessProfile[1][0] || {}
    if (businessAction.type !== 'I32') {
      return null
    }
    return (
      <DoubleNumberInput
        key="numberRange"
        label={formConfig.numberRange.name}
        labelSize="small"
        values={formState.numberRange}
        placeholders={formConfig.numberRange.placeholders}
        onChange={formActions.formSet.bind(null, contextConfig.index, 'numberRange')}
        />
    )
  },
  keywords: (formConfig, formState, formActions, contextConfig) => {
    const businessAction = formState.businessProfile[1][0] || {}
    if (businessAction.type !== 'STRING') {
      return null
    }
    return (
      <CommaSeperatedInputArea
        key="keywords"
        label={formConfig.keywords.name}
        values={formState.keywords}
        placeholders={formConfig.keywords.placeholder}
        onInput={formActions.formSet.bind(null, contextConfig.index, 'keywords')}
        />
    )
  },
  systemVersionDetail: (formConfig, formState, formActions) => (
    <SystemVersionDetail
      key={'systemVersionDetail'}
      config={formConfig.systemVersionDetail}
      formState={formState}
      formActions={formActions}
      />
  )
}

export function transformBusinessRawData(rawData) {
  const cascadingSelectorConfig = {}
  Object.keys(rawData).forEach(firstKey => {
    const children = {}
    rawData[firstKey].forEach(second => {
      children[second.key] = {
        name: second.name,
        type: second.type
      }
    })
    cascadingSelectorConfig[firstKey] = {
      name: firstKey,
      children
    }
  })
  return cascadingSelectorConfig
}
