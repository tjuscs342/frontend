import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

import { SUBMIT_STATUS } from './ProfilePropertiesConstant'

const initialState = Immutable.fromJS({
  config: [
    {
      name: '基础属性',
      defaultValueKeys: [],
      valuePool: [
        { key: 'user_age', name: '年龄', price: 1, displayTypes: ['column', 'pie'] },
        { key: 'user_sex', name: '性别', price: 1, displayTypes: ['stack', 'ring'] },
        { key: 'user_degree', name: '学历', price: 1, displayTypes: ['column', 'pie'] },
        { key: 'user_pregnant', name: '是否怀孕', price: 1, displayTypes: ['stack', 'ring'] },
        { key: 'have_kid', name: '家有儿童', price: 1, displayTypes: ['stack', 'ring'] }
      ]
    }
  ],
  initialForm: {},
  form: {},
  id: -1,
  submitStatus: SUBMIT_STATUS.empty
})

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  [LOCATION_CHANGE]: (state, action) => {
    // if (action.payload.pathname.split('/')[2] !== 'properties') {
    //   state = state.set('form', state.get('initialForm'))
    // }
    return state.set('id', action.payload.query.id || -1)
  },
  'USER_PROFILE@PROPERTIES@PULL': (state, action) => {
    return state.set('config', Immutable.fromJS(action.data.result))
  },
  'USER_PROFILE@PROPERTIES@SUBMIT_STATUS_CHANGE': (state, action) => {
    return state.set('submitStatus', action.submitStatus)
  },
  'USER_PROFILE@PROPERTIES@PUSH': (state, action) => {
    return state.set('form', state.get('initialForm'))
                .set('submitStatus', SUBMIT_STATUS.done)
  },
  'USER_PROFILE@PROPERTIES@FORM_SET_ALL': (state, action) => {
    let newDict = Immutable.Map()
    state.get('config').forEach((value, key) => {
      newDict = newDict.set(`${key}`, value.get('valuePool'))
    })
    return state.set('form', newDict)
  },
  'USER_PROFILE@PROPERTIES@FORM_SET': (state, action) => {
    return state.update('form', oldDict => (
      oldDict.set(action.formCategory, Immutable.fromJS(action.values))
    ))
  },
  'USER_PROFILE@PROPERTIES@FORM_DELETE': (state, action) => {
    if (typeof action.values === 'string') {
      state = state.update('form', oldDict => (
        oldDict.update(action.category, Immutable.List(), oldList => (
          oldList.filter(x => (
            x.get('key') !== action.values
          ))
        ))
      ))
    }
    return state
  },
  'USER_PROFILE@PROPERTIES@FORM_CLEAR': (state, action) => {
    return state.set('form', state.get('initialForm'))
  }
}

export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
