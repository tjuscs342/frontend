/**
  1. getLabel(formCategory, formKey, formConfig, formState, formActions)
     The label of tags in User Set State, User Set Description

  2. getTagConfigFromState(state, formConfigs, formActions)
     The logic

  3. convertFormState(state)
*/
/* eslint-disable no-unused-vars */
import getUser from 'SRC/utils/getUser'

const createCustomizedTags = {
  'scenarios:filters': (formConfig, formState, formActions) => {
    function getLabel(state, index) {
      // console.log(state, index)
      const filterType = state.filterType[0]
      if (!filterType) return null
      switch (filterType.key) {
        case 'allMiuiUser':
          if (state.activation[0].key === 'all') {
            return null
          }
          return `${filterType.name}${state.activation[0].name}`
        case 'miApps':
          if (!state.miAppName[0] || state.miAppName[0].key === 'all') {
            return null
          }
          if (!state.status[0] || state.status[0].key === 'all') {
            return null
          }
          return `小米${state.miAppName[0].name}${state.status[0].name}`
        case 'appPackageName':
          if (!state.packageName) return null
          if (!state.status[0] || state.status[0].key === 'all') {
            return null
          }
          return `手机应用${state.status[0].name}${state.packageName}`
        case 'miBusinessCustomize': // eslint-disable-line no-case-declarations
          const [businessType, businessAction] = state.businessProfile.map(x => x[0])
          let start = ''
          let end = ''
          if (!businessType || !businessAction) return null
          switch (businessAction.type) {
            case 'I32':
              start = state.numberRange[0] === null ? '-∞' : state.numberRange[0]
              end = state.numberRange[1] === null ? '+∞' : state.numberRange[1]
              break
            case 'STRING':
              if (state.keywords.length === 0) return null
              return `业务画像${businessType.name}${businessAction.name}${state.keywords.join(', ')}`
            case 'Timestamp':
              if (state.dateRange[0] === null || state.dateRange[1] === null) return null
              start = state.dateRange[0]
              end = state.dateRange[1]
              break
            default:
              return null
          }
          return `业务画像${businessType.name}${businessAction.name}${start}到${end}`
        default:
          return null
      }
    }
    // console.log(formConfig, formState)
    return formState.filters.map((state, index) => {
      const label = getLabel(state, index)
      return {
        label,
        key: `${label}${index}`
      }
    })
  },
  'interestProperties:interest': (formConfig, formState, formActions) => {
    const table = formState.interest
    const rowNameMap = formState.formConfig.interestKeyMap
    return Object.keys(table).map(rowKey => {
      const row = table[rowKey]
      return {
        label: `${rowNameMap[rowKey]}兴趣${row.map(c => c.name).join('|')}`,
        onDelete: () => {
          formActions.formDelete(
            'interestProperties',
            'interest',
            rowKey
          )
        }
      }
    })
  },
  'purchaseProperties:purchaseAbility': (formConfig, formState, formActions) => {
    const table = formState.purchaseAbility
    const rowNameMap = formState.formConfig.purchaseAbilityKeyMap
    return Object.keys(table).map(rowKey => {
      const row = table[rowKey]
      return {
        label: `${rowNameMap[rowKey]}能力${row.map(c => c.name).join('|')}`,
        onDelete: () => {
          formActions.formDelete(
            'purchaseProperties',
            'purchaseAbility',
            rowKey
          )
        }
      }
    })
  },
  'deviceProperties:systemVersionDetail': (formConfig, formState, formActions) => {
    const keys = [
      ...formState.systemVersionDetail[0].map(x => x.key),
      ...formState.systemVersionDetail[1]
    ]
    if (keys.length === 0) return []
    return [{
      label: `使用${keys.join(', ')}`,
      onDelete: () => {
        formActions.formDelete(
          'deviceProperties',
          'systemVersionDetail'
        )
      }
    }]
  },
  'keywords:searchs': (formConfig, formState, formActions) => {
    // console.log(formConfig, formState)
    function getLabel(state, index) {
      if (state.keywords.length === 0) return null
      return `${state.business[0].name}搜索关键词${state.keywords.join(', ')}`
    }
    return formState.searchs.map((state, index) => {
      const label = getLabel(state, index)
      return {
        label,
        key: `${label}${index}`
      }
    })
  }
}

function getTagConfigs(formCategory, formKey, formConfig, formState, formActions) {
  const key = `${formCategory}:${formKey}`
  if (createCustomizedTags[key]) {
    return createCustomizedTags[key](formConfig, formState, formActions)
  }
  return []
}

export const getTagConfigFromState = (state, formConfigs, formActions) => {
  const tagsConfigs = {}
  // Loop through all sub forms [basicProperties, regionProperties, ...]
  Object.keys(state).forEach((formCategory) => {
    if (formCategory === 'general') return
    let tagsConfig = []
    // formCategory: basicProperties
    const formState = state[formCategory].toJS() // ImmutableJS
    const formConfig = formConfigs[formCategory] // eslint-disable-line no-shadow
    // Loop through all form items
    Object.keys(formConfig).forEach((formKey) => {
      // formKey: userSex
      const value = formState[formKey]
      switch (formConfig[formKey].displayType) {
        case 'horizontal-multi-selector':
        case 'horizontal-single-selector':
        case 'vertical-single-selector':
          /**
            state = {
              formCategory(basicProperties): {
                formKey(userSex): value
              }
            }
            value = [ { key: '1', name: '男' } ]
          */
          tagsConfig = tagsConfig.concat(value.map((x) => ({
            label: formConfig[formKey].label ?
                     formConfig[formKey].label(formConfig[formKey].name, x) :
                     `${formConfig[formKey].name}${x.name}`,
            onDelete: () => {
              formActions.formDelete(
                formCategory, // basicProperties
                formKey, // userSex
                [{ key: x.key, name: x.name }]
              )
            }
          })))
          break
        case 'matrix-multi-selector':
          /**
            state = {
              formCategory(boundProperties): {
                formKey(bindingAccount): value
              }
            }
            value = {
              valueKey(bindingCloudService):
                value = [ { key: 'bound', name: '绑定' } ]
            }
          */
          Object.keys(value).forEach((valueKey) => {
            const rowName = formConfig[formKey].rowNames[formConfig[formKey].rowKeys.indexOf(valueKey)]
            tagsConfig = tagsConfig.concat(value[valueKey].map((x) => ({
              label: formConfig[formKey].label ?
                       formConfig[formKey].label(formConfig[formKey].name, rowName, x) :
                       `${rowName}${x.name}`,
              onDelete: () => {
                formActions.formDelete(
                  formCategory, // boundProperties
                  formKey, // bindingAccount
                  [
                    valueKey, // bindingCloudService
                    [{ key: x.key, name: x.name }]
                  ]
                )
              }
            })))
          })
          break
        case 'cascading-selector': // eslint-disable-line no-case-declarations
          let lastActiveValue = -1
          value.forEach((x, i) => {
            if (x.length !== 0) lastActiveValue = i
          })
          if (lastActiveValue >= 0) {
            tagsConfig = tagsConfig.concat(
              value[lastActiveValue].map((x, i) => ({
                label: formConfig[formKey].label ?
                         formConfig[formKey].label(formConfig[formKey].selectorLabels[i], x) :
                         x.name,
                key: `${x.name}${lastActiveValue}`,
                onDelete: () => {
                  formActions.formDelete(
                    formCategory,
                    formKey,
                    [
                      lastActiveValue,
                      [{ key: x.key, name: x.name }]
                    ]
                  )
                }
              }))
            )
          }
          break
        case 'input':
          tagsConfig = tagsConfig.concat({
            label: formConfig[formKey].label ? formConfig[formKey].label(value) : `${value}`,
            onDelete: () => {
              formActions.formDelete(
                formCategory,
                formKey,
                value
              )
            }
          })
          break
        case 'comma-seperated-input-area':
          tagsConfig = tagsConfig.concat({
            label: formConfig[formKey].label ? formConfig[formKey].label(value) : `${value.join(',')}`,
            onDelete: () => {
              formActions.formDelete(
                formCategory,
                formKey,
                value
              )
            }
          })
          break
        case 'chain-selector':
          tagsConfig = tagsConfig.concat(
            getTagConfigs(formCategory, formKey, formConfig, formState, formActions).map((tag, index) => (
              {
                label: tag.label,
                key: tag.key,
                onDelete: tag.onDelete ? tag.onDelete : () => {
                  formActions.formDelete(formCategory, formKey, index)
                }
              }
            ))
          )
          break
        case 'customized-selector':
          tagsConfig = tagsConfig.concat(
            getTagConfigs(formCategory, formKey, formConfig, formState, formActions)
          )
          break
        default:
      }
      tagsConfigs[formCategory] = tagsConfig.filter(x => x.label)
    })
  })
  return tagsConfigs
}

export function convertFormState(immutableState, formConfigs) {
  function camel2LowerHyphen(a) {
    if (!a) return a
    return a.replace(/([A-Z][a-z]*)/g, '-$1').toLowerCase()
  }
  function keyNormalized(a) {
    if (a === '' || a === 'all' || a === null) return undefined
    if (typeof a === 'number' && isNaN(a)) return undefined
    if (Array.isArray(a) && a.length === 0) return undefined
    if (typeof a === 'object' && Object.keys(a).length === 0) return undefined
    return a
  }
  const convertFuncMap = {
    'horizontal-multi-selector': (state, config) => {
      // if (state.length === config.valuePool.length || state.length === 0) return undefined
      // return state.map(x => x.key)
      return keyNormalized(state.map(x => x.key))
    },
    'horizontal-single-selector': (state) => (
      keyNormalized(state.map(x => x.key))
    ),
    'vertical-single-selector': (state) => (
      keyNormalized(state.map(x => x.key))
    ),
    'vertical-multi-selector': (state) => (
      keyNormalized(state.map(x => x.key))
    ),
    'matrix-multi-selector': (state, config) => {
      const res = {}
      Object.keys(state).forEach(key => {
        const values = state[key]
        if (values.length > 0) {
          res[key] = keyNormalized(values.map(x => x.key))
        }
      })
      return keyNormalized(res)
    },
    'cascading-selector': (state) => {
      let isEmpty = true
      const res = state.map(values => {
        if (values.length > 0) isEmpty = false
        return values.map(x => x.key)
      })
      if (isEmpty) return undefined
      return res
    }
  }
  function convert(state, type, config) {
    if (convertFuncMap[type]) {
      return convertFuncMap[type](state, config)
    }
    return undefined
  }

  // Convert to normal JavaScript Object
  const formStates = {}
  Object.keys(immutableState).forEach(key => {
    formStates[key] = immutableState[key].toJS()
  })
  /**
    general
  */
  const data = {
    meta: { user: getUser().name },
    name: formStates.general.name || undefined
  }
  Object.keys(formStates).forEach(formCategory => {
    if (formCategory === 'general') return
    const formState = formStates[formCategory]
    const formConfig = formConfigs[formCategory]
    Object.keys(formConfig).forEach(formKey => {
      const state = formState[formKey]
      const config = formConfig[formKey]
      data[formKey] = convert(state, config.displayType, config)
    })
  })
  /**
    scenario
  */
  data.filters = keyNormalized(
    formStates.scenarios.filters.map(rawState => {
      if (rawState.filterType.length === 0) return null
      const res = {}
      res.filterType = camel2LowerHyphen(rawState.filterType[0].key)
      res.activation = keyNormalized(rawState.activation[0].key)
      if (rawState.miAppName[0] && rawState.miAppName[0].key !== 'all') {
        const [miAppName, key] = rawState.miAppName[0].key.split('$$')
        res.miAppName = miAppName
        res.key = parseInt(key)
      }
      res.status = rawState.status[0] ? keyNormalized(rawState.status[0].key) : undefined
      res.packageName = keyNormalized(rawState.packageName)
      const [which, action] = rawState.businessProfile.map(x => x[0] || {})
      res.which = which.key
      res.action = action.key
      res.actionType = action.type
      res.startNumber = keyNormalized(rawState.numberRange[0])
      res.endNumber = keyNormalized(rawState.numberRange[1])
      res.startDate = keyNormalized(rawState.dateRange[0])
      res.endDate = keyNormalized(rawState.dateRange[1])
      res.keywords = keyNormalized(rawState.keywords)
      res.relationWithNext = rawState.relationWithNext[0].key
      return res
    }).filter(x => x !== null)
  )
  if (data.filters && data.filters.length > 0) {
    data.filters[data.filters.length - 1].relationWithNext = undefined
  }
  /**
    deviceProperties
  */
  data.deviceModel = keyNormalized((data.devicePhone || []).concat(data.deviceSmartDevice || []))
  data.devicePhone = undefined
  data.deviceSmartDevice = undefined
  data.systemVersionDetail = keyNormalized([
    ...formStates.deviceProperties.systemVersionDetail[0].map(x => x.key),
    ...formStates.deviceProperties.systemVersionDetail[1]
  ])
  /**
    interestProperties
  */
  data.interest = convert(formStates.interestProperties.interest, 'matrix-multi-selector', formConfigs.interestProperties.interest)
  /**
    purchaseProperties
  */
  data.purchaseModel = keyNormalized((data.purchasePhone || []).concat(data.purchaseSmartDevice || []))
  data.purchasePhone = undefined
  data.purchaseSmartDevice = undefined
  data.purchaseAbility = convert(formStates.purchaseProperties.purchaseAbility, 'matrix-multi-selector', formConfigs.purchaseProperties.purchaseAbility)
  /**
    keywords
  */
  data.searchs = keyNormalized(
    formStates.keywords.searchs.map(rawState => {
      const res = {}
      res.filterType = camel2LowerHyphen(rawState.business[0].key)
      if (rawState.keywords.length === 0) return null
      res.keywords = keyNormalized(rawState.keywords)
      res.relationWithNext = rawState.relationWithNext[0].key
      return res
    }).filter(x => x !== null)
  )
  if (data.searchs && data.searchs.length > 0) {
    data.searchs[data.searchs.length - 1].relationWithNext = undefined
  }
  return data
}
