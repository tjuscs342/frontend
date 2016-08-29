// Reducer Path: myDataSet.profileReport

import Immutable from 'immutable'
import { LOCATION_CHANGE } from 'react-router-redux'
import { reportStatus } from './ProfileReportConstant'

const initialState = Immutable.fromJS({
  baseUserSet: undefined,
  compareUserSet: undefined,
  userSetValuePool: [],
  propertiesValuePool: [],
  activeProperty: undefined,
  downloadAllProcess: null,
  reportDataSource: Immutable.OrderedMap(),
  title: '用户画像',
  diamond: []
})

/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  [LOCATION_CHANGE]: (state, action) => {
    return state
  },
  'DATA_SET@REPORT@INITIALIZE': (state, action) => {
    return state.merge(Immutable.fromJS(action.result))
                .set('downloadAllProcess', null) // 重置下载状态
  },
  'DATA_SET@REPORT@USER_SET': (state, action) => {
    // Set 对比集 && 重置下载状态 && 清空 reportDataSource
    return state.set('compareUserSet', Immutable.fromJS(action.value))
                .set('downloadAllProcess', null)
                .update('reportDataSource', oldMap => (
                  oldMap.map(() => (reportStatus.empty))
                ))
  },
  'DATA_SET@REPORT@PROPERTY_SET': (state, action) => {
    return state.set('activeProperty', Immutable.fromJS(action.value))
  },
  'DATA_SET@REPORT@REPORT_DATA': (state, action) => {
    return state.update('reportDataSource', oldMap => (
      oldMap.set(action.propKey, Immutable.fromJS(action.result))
    ))
  },
  'DATA_SET@REPORT@DOWNLOAD_ALL_PROCESS': (state, action) => {
    return state.set('downloadAllProcess', action.value)
  }
}

export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
