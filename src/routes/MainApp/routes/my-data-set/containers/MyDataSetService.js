import moment from 'moment'

export const operationList = ['throng', 'diff', 'union']
export const initCouldOperateFalse = () => ({
  diff: false,
  throng: false,
  collection: false
})
export const initCouldOperateTrue = () => ({
  diff: true,
  throng: true,
  collection: true
})


export const operationMap = new Map([
  ['throng', '[交]'],
  ['diff', '[差]'],
  ['union', '[合]']
])
/* eslint-disable no-param-reassign */
/**
 * 在用户点击操作的行为获取到服务器返回结果前，生成假的数据，并且
 * 禁止相同的操作再重复
 * @param  {Array} selectedRows 已选择的行列表
 * @param  {String} operation    当前操作类别
 * @param  {Object} couldOperate 当前三个按钮的操作许可
 * @param  {Array} mockTable = [] 假数据的table
 * @param  {Array} table        当前的真数据
 * @return {Object}              本次操作后改变的store数据
 */
export function forbidOperationAndMockTableWorker(selectedRows, operation, couldOperate, mockTable = [], table) {
  console.log('selectedRows', selectedRows)
  const mockTableData = {
    name: `${selectedRows[0].name}${operationMap.get(operation)}${selectedRows[1].name}`,
    source: 'online',
    count: '计算中...',
    description: `${selectedRows[0].description},${selectedRows[1].description}`,
    time: moment().format('YYYY-MM-DD HH:mm:ss'),
    id: `${selectedRows[0].id},${selectedRows[1].id},${operation}`
  }

  couldOperate[operation] = false
  mockTable.unshift(mockTableData)
  table.unshift(mockTableData)
  return {
    table,
    couldOperate,
    mockTable
  }
}
/**
 * 获取到用户集合操作的结果后，删除假数据，恢复操作能力
 * @param  {array} mockTable    假数据列表
 * @param  {array} selectedRows 当前选择的行的列表
 * @param  {string} operation    本次操作的类别
 * @param  {object} couldOperate 当前可以进行的操作
 * @param  {array} saveSelectedRows 操作时的选中行的列表
 * @return {object}              本次操作后改变的store
 */
export const allowOperationAndDeleteMockTableWorker = (mockTable, selectedRows, operation, couldOperate, saveSelectedRows) => {
  const saveMockId = `${saveSelectedRows[0].id},${saveSelectedRows[1].id},${operation}`
  mockTable = mockTable.filter((mockTableData) => (mockTableData.id !== saveMockId))
  if (selectedRows.length !== 2) {
    couldOperate = initCouldOperateFalse()
  } else {
    const selectedRowsId = `${selectedRows[0].id},${selectedRows[1].id},${operation}`
    if (saveMockId === selectedRowsId) {
      couldOperate[operation] = true
    }
  }

  return {
    couldOperate,
    mockTable
  }
}
/* eslint-disable no-param-reassign */
/**
 * 选择table前面的按钮后会调用这个方法来处理store的变化，根据选中数据的变化
 * 以及假数据列表里的数据来判断按钮的状态
 * @param  {string} selectionType 当前的选择是选中还是反选
 * @param  {array} selectedRows  已经选中的行的数组
 * @param  {object} newRow        本次操作的行的数据
 * @param  {array} mockTable     当前正在等待返回结果的假数据数组
 * @param  {object} couldOperate  当前三个按钮的可操作状态
 * @return {Object}               本次操作后store的改变
 */
export function rowSelectionWorker(selectionType, selectedRows, newRow, mockTable, couldOperate) {
  if (selectionType === 'SELECT') {
    if (selectedRows.length < 2) {
      selectedRows.push(newRow)
      if (selectedRows.length === 2) {
        couldOperate = initCouldOperateTrue()
        for (const mockTableData of mockTable) {
          for (const key of operationList) {
            const selectedRowsId = `${selectedRows[0].id},${selectedRows[1].id},${key}`
            if (mockTableData.id === selectedRowsId) {
              couldOperate[key] = false
            }
          }
        }
      }
    }
  } else if (selectionType === 'DESELECT') {
    selectedRows = selectedRows.filter(item => item.id !== newRow.id)
    couldOperate = initCouldOperateFalse()
  }
  return {
    couldOperate,
    selectedRows
  }
}
/**
 * 重算接口调用时 生成假数据显示给用户
 * @param  {array} table     原表数据
 * @param  {array} mockTable 现有假数据
 * @param  {object} oldLine  选中要重新计算的行
 * @return {Object}           本次操作后store的改变
 */
export function recountWorker(table, mockTable, oldLine) {
  oldLine.count = '计算中...'
  oldLine.id = `${oldLine.id},recount`
  oldLine.name = `${oldLine.name}_${moment().format('MMDD')}`
  mockTable.unshift(oldLine)
  table.unshift(oldLine)

  return {
    table,
    mockTable
  }
}
