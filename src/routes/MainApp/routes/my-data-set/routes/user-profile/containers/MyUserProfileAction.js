import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import { allowOperationAndDeleteMockTableWorker,
         forbidOperationAndMockTableWorker,
         rowSelectionWorker,
         recountWorker
       } from '../../../containers/MyDataSetService'
import getUser from 'SRC/utils/getUser'
import logger from 'SRC/utils/logger'

export function setSearchKey(value) {
  return {
    type: 'DATA_SET@USER_PROFILE@SEARCH',
    value
  }
}

/**
 * change icon when click delete
 * @param  {Number} value id of delete user-set
 * @return {Object}       the action
 */
function deleteWaiting(id) {
  return {
    type: 'DATA_SET@USER_PROFILE@DELETE_WAITING',
    id
  }
}

/**
 * change icon back when delete fail or hide this line when success
 * @param  {Number} value id of delete user-set
 * @return {Object}       the action
 */
function deleteDone(data, id) {
  return {
    type: 'DATA_SET@USER_PROFILE@DELETE_DONE',
    id,
    data
  }
}
/**
 * forbid operations afer one operation
 * until server callback and refresh table or
 * choice another 2
 * @return {Object} an action
 */
function forbidOperationAndMockTable(value) {
  return {
    type: 'DATA_SET@USER_PROFILE@FORBID_OPERATION_AND_MOCK_TABLE',
    value
  }
}
/**
 * afer forbidOperation
 * when server response and refresh table
 * allow user do operations
 * @return {Object} an action
 */
function allowOperationAndDeleteMockTable(value) {
  return {
    type: 'DATA_SET@USER_PROFILE@ALLOW_OPERATION_AND_DELETE_MOCK_TABLE',
    value
  }
}
/**
 * 点击复制筛选条件时，tooltip中的文字变成选中的样式
 * 鼠标移开，恢复样式
 */
export function setCopyStatus(id, status) {
  return {
    type: 'DATA_SET@USER_PROFILE@SET_COPY_STATUS',
    id,
    status
  }
}

/**

  Async Actions

*/

export function loadTableData() {
  return (dispatch/* , getState*/) => (
    fetchPro(api('myDataSet:userProfileSet', getUser().name))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: [] }))
      .then(json => dispatch({
        type: 'DATA_SET@USER_PROFILE@TABLE_LOAD',
        data: json
      }))
  )
}
/**
 * 1.change icon before request
 * 2.request
 * 3.change icon back when fail or hide the line when success
 * @param {Number} value id of delete user-set
 * @return {function} do the job
 */
export function deleteLine(id) {
  const bodyData = new FormData()
  bodyData.append('id', id)
  bodyData.append('user', getUser().name)
  return (dispatch) => {
    dispatch(deleteWaiting(id))
    fetchPro(api('myDataSet:userProfileSetDelete'), {
      method: 'POST',
      body: bodyData
    })
      .then(response => response.json())
      .catch((e) => ({ status: 'fail', result: [], error: e }))
      .then(json => dispatch(deleteDone(json, id)))
  }
}
/**
 * process operation of selected table line
 * 取合集、交集、差集的操作处理
 * @param {String} operation operation type
 */
export function setSelectedOperation(operation) {
  return (dispatch, getState) => {
    const { mockTable, couldOperate, selectedRows, table } = getState().myDataSet.userProfile.toJS()
    const saveSelectedRows = selectedRows
    const jids = selectedRows.map(r => r.id)
    // 在返回结果前 禁止重复的操作 添加临时假数据 并计算出store的变化 返回变化的对象
    const value = forbidOperationAndMockTableWorker(selectedRows, operation, couldOperate, mockTable, table)
    // 将变化加入state
    dispatch(forbidOperationAndMockTable(value))
    // 请求接口所需参数
    const formData = new FormData()
    formData.append('jids', jids.toString())
    formData.append('type', operation)
    formData.append('user', getUser().name)

    fetchPro(api('myDataSet:userProfileOperation'), {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .catch((e) => ({ status: 'fail', result: [], error: e }))
      .then(json => {
        if (json.hasOwnProperty('error')) {
          logger.error('error:', json.error)
        }
        // eslint-disable-next-line no-shadow
        const { mockTable, couldOperate, selectedRows } = getState().myDataSet.userProfile.toJS()
        // 返回结果后 将假数据删除 取消禁止的操作 将新的store变化返回
        // eslint-disable-next-line no-shadow
        const value = allowOperationAndDeleteMockTableWorker(mockTable, selectedRows, operation, couldOperate, saveSelectedRows)
        switch (json.status) {
          case 'succ':
            // 更新state
            dispatch(allowOperationAndDeleteMockTable(value))
            // 加载新的table
            dispatch(loadTableData())
            break
          default:
            dispatch(allowOperationAndDeleteMockTable(value))
            dispatch(loadTableData())
        }
      })
  }
}

export function recount(oldLine) {
  return (dispatch, getState) => {
    const { table, mockTable } = getState().myDataSet.userProfile.toJS()
    // 请求所需参数
    const formData = new FormData()
    formData.append('id', oldLine.id)
    formData.append('user', getUser().name)
    // 获取要展示给用户的假数据
    const value = recountWorker(table, mockTable, oldLine)
    // 用假数据更新store
    dispatch({
      type: 'DATA_SET@USER_PROFILE@DO_RECOUNT',
      value
    })

    fetchPro(api('myDataSet:userProfileRecount'), {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .catch(e => ({ status: 'fail', result: [], error: e }))
      .then(json => {
        if (json.hasOwnProperty('error')) {
          logger.error('error', json.error)
        }

        switch (json.status) {
          case 'succ':
            dispatch({
              type: 'DATA_SET@USER_PROFILE@RECOUNT_DONE',
              id: oldLine.id
            })
            dispatch(loadTableData())
            break
          default:
            dispatch(loadTableData())
        }
      })
  }
}
/**
 * action on clicking checkbox
 * @param {String} selectionType select or deselect
 * @param {Object} value         one line of table
 */
export function setSelectedRow(selectionType, value) {
  return (dispatch, getState) => {
    const { selectedRows, mockTable, couldOperate } = getState().myDataSet.userProfile.toJS()
    // 选择框操作改变的store状态
    const data = rowSelectionWorker(selectionType, selectedRows, value, mockTable, couldOperate)
    dispatch({
      type: 'DATA_SET@USER_PROFILE@ROW_SELECTION',
      data
    })
  }
}
