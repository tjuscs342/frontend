// Reducer Path: myDataSet.pushPromotion
import { initCouldOperateFalse } from '../../../containers/MyDataSetService'

import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  name: null,
  table: [],
  searchKey: '',
  selectedRows: [],
  couldOperate: initCouldOperateFalse(),
  mockTable: []
})


/* eslint-disable no-param-reassign, arrow-body-style, no-unused-vars*/
const reducerMap = {
  'DATA_SET@PUSH_PROMOTION@TABLE_LOAD': (state, action) => {
    const table = action.data.result
    for (let i = 0; i < table.length; i++) {
      if (table[i] !== null && !table[i].hasOwnProperty('icon')) {
        table[i].icon = 'delete'
      }
    }
    let mockTable = state.get('mockTable').toJS()
    mockTable = mockTable.concat(table)
    return state.set('table', Immutable.fromJS(mockTable))
  },
  'DATA_SET@PUSH_PROMOTION@SEARCH': (state, action) => {
    return state.set('searchKey', Immutable.fromJS(action.value))
  },
  'DATA_SET@PUSH_PROMOTION@DELETE_WAITING': (state, action) => {
    const table = state.get('table').toJS()
    let selectedRows = state.get('selectedRows').toJS()
    let newState = state
    selectedRows = selectedRows.filter((x) => {
      if (x.id !== action.id) {
        return true
      }
      newState = newState.set('couldOperate', Immutable.fromJS(initCouldOperateFalse()))
      return false
    })
    newState = newState.update('selectedRows', () => (Immutable.fromJS(selectedRows)))
    for (let i = 0; i < table.length; i++) {
      if (table[i].id === action.id) {
        table[i].icon = 'wait'
      }
    }
    newState = newState.set('table', Immutable.fromJS(table))
    return newState
  },
  'DATA_SET@PUSH_PROMOTION@DELETE_DONE': (state, action) => {
    let table = state.get('table').toJS()
    switch (action.data.status) {
      case 'succ':
        table = table.filter(line => line.id !== action.id)
        break
      default:
        table = table.filter(line => line.id !== action.id)
    }
    return state.set('table', Immutable.fromJS(table))
  },
  'DATA_SET@PUSH_PROMOTION@ROW_SELECTION': (state, action) => {
    const { couldOperate, selectedRows } = action.data
    return state.set('couldOperate', Immutable.fromJS(couldOperate))
                .set('selectedRows', Immutable.fromJS(selectedRows))
  },
  'DATA_SET@PUSH_PROMOTION@FORBID_OPERATION_AND_MOCK_TABLE': (state, action) => {
    const { couldOperate, mockTable, table } = action.value
    return state.set('couldOperate', Immutable.fromJS(couldOperate))
                .set('mockTable', Immutable.fromJS(mockTable))
                .set('table', Immutable.fromJS(table))
                .set('selectedRows', Immutable.fromJS([]))
  },
  'DATA_SET@PUSH_PROMOTION@ALLOW_OPERATION_AND_DELETE_MOCK_TABLE': (state, action) => {
    const { couldOperate, mockTable } = action.value
    return state.set('couldOperate', Immutable.fromJS(couldOperate))
                .set('mockTable', Immutable.fromJS(mockTable))
  },
  'DATA_SET@PUSH_PROMOTION@DO_RECOUNT': (state, action) => {
    const { table, mockTable } = action.value
    return state.set('table', Immutable.fromJS(table))
                .set('mockTable', Immutable.fromJS(mockTable))
  },
  'DATA_SET@PUSH_PROMOTION@RECOUNT_DONE': (state, action) => {
    return state.update('mockTable', (oldArray) => Immutable.fromJS(oldArray.toJS().filter(x => x.id !== action.id)))
  },
  'DATA_SET@PUSH_PROMOTION@SET_COPY_STATUS': (state, action) => {
    return state.update('table', (oldArray) => {
      const newArray = oldArray.toJS()
      for (let i = 0; i < newArray.length; i++) {
        if (newArray[i].id === action.id) {
          newArray[i].isCopied = action.status
        }
      }
      return Immutable.fromJS(newArray)
    })
  }
}

export default function (state = initialState, action) {
  if (reducerMap[action.type]) {
    return reducerMap[action.type](state, action)
  }
  return state
}
