import React from 'react'
const _tooltip = require('antd/lib/tooltip')
import { Link } from 'react-router'
import classNames from 'classnames'
import moment from 'moment'
import userSetId from 'SRC/constants/user-set-id'
import CopyToClipboard from 'react-copy-to-clipboard'
import { initCouldOperateFalse, operationMap, initCouldOperateTrue, operationList } from './MyUserProfileReducer'
const _checkbox = require('antd/lib/checkbox')

const sourceMap = new Map([
  ['predefined', '预定义'],
  ['upload', '上传'],
  ['online', '在线']
])

export const getColumns = (persistentActions, deleteLine, state, action, recount) => {
  function onChange(record, e) {
    action.setSelectedRow(e.target.checked ? 'SELECT' : 'DESELECT', record)
  }
  const selectedRowsIdSet = new Set(state.selectedRows.map(x => x.id))
  const columns = [
    {
      title: '',
      key: 'checkbox',
      width: '50px',
      render: (text, record) => (
        <_checkbox
          checked={selectedRowsIdSet.has(record.id)}
          disabled={!selectedRowsIdSet.has(record.id) && selectedRowsIdSet.size >= 2}
          onChange={onChange.bind(null, record)}
          />
      )
    }, {
      title: '画像名称',
      dataIndex: 'name',
      key: 'name',
      width: '12%'
    }, {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width: '12%',
      render: (text) => (sourceMap.get(text) || '未知')
    }, {
      title: '用户数',
      dataIndex: 'count',
      key: 'count',
      width: '12%',
      render: (text) => {
        switch (text) {
          case -1:
            return '计算中'
          case -2:
            return '暂不计算'
          default:
            return text
        }
      }
    }, {
      title: '筛选条件',
      dataIndex: 'description',
      key: 'description',
      width: '12%',
      render: (text, record) => (
        <_tooltip
          title={text ? <div className={classNames({ selectedText: record.isCopied })} >{text}</div> : ''}
          trigger="hover"
          onMouseLeave={() => action.setCopyStatus(record.id, false)}
          >
          <span
            className={classNames({ pointer: text })}
            data-clipboard-text={text}
            style={{
              maxWidth: '100px',
              display: 'inline-block',
              verticalAlign: 'middle',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
            >
            <CopyToClipboard
              text={text}
              onCopy={() => action.setCopyStatus(record.id, true)}
              >
              <span>{text || '全部用户'}</span>
            </CopyToClipboard>
          </span>
        </_tooltip>
      )
    }, {
      title: '提交时间',
      dataIndex: 'time',
      key: 'time',
      width: '22%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <div className={classNames('btn-theme5', 'fs12', 'btn-unit-size', { 'not-allowed': record.icon !== 'delete' })}>
            <Link
              onClick={persistentActions.persistentSet.bind(null, 'compareSetId', userSetId.defaultToId)}
              to={{
                pathname: '/user-profile/report/normal',
                query: {
                  id: record.id
                }
              }}
              className={classNames('inline', 'full', { 'not-allowed': record.icon !== 'delete' })}
              style={{ color: 'white' }}
              >
              看画像
            </Link>
          </div>
          <div
            className={classNames('btn-theme6', 'fs12', 'btn-unit-size', { 'not-allowed': (record.icon !== 'delete' || record.count === -2), 'btn-theme7': record.count === -2 })}
            onClick={record.icon === 'delete' ? () => recount(record) : ''}
            >
            重算
          </div>
        </div>
      )
    }, {
      title: '删除',
      key: 'delete',
      render: (text, record) => (
        <div
          className={classNames('fs20', 'fc-light', { 'not-allowed': (record.source === 'predefined' || record.icon !== 'delete' || record.count === -2) })}
          onClick={(record.source !== 'predefined' && record.icon === 'delete') ? deleteLine.bind(null, record.id) : ''}
          >
          <i className={classNames('fa', { 'fa-trash-o': record.icon === 'delete', 'fa-spinner': record.icon !== 'delete', waiting: record.icon !== 'delete' })} aria-hidden="true"></i>
        </div>
      )
    }
  ]
  return columns
}

// /* eslint-disable no-param-reassign */
// /**
//  * 在用户点击操作的行为获取到服务器返回结果前，生成假的数据，并且
//  * 禁止相同的操作再重复
//  * @param  {Array} selectedRows 已选择的行列表
//  * @param  {String} operation    当前操作类别
//  * @param  {Object} couldOperate 当前三个按钮的操作许可
//  * @param  {Array} mockTable = [] 假数据的table
//  * @param  {Array} table        当前的真数据
//  * @return {Object}              本次操作后改变的store数据
//  */
// export function forbidOperationAndMockTableWorker(selectedRows, operation, couldOperate, mockTable = [], table) {
//   const mockTableData = {
//     name: `${selectedRows[0].name}${operationMap.get(operation)}${selectedRows[1].name}`,
//     source: 'online',
//     count: '计算中...',
//     description: `${selectedRows[0].description},${selectedRows[1].description}`,
//     time: moment().format('YYYY-MM-DD HH:mm:ss'),
//     id: `${selectedRows[0].id},${selectedRows[1].id},${operation}`
//   }
//
//   couldOperate[operation] = false
//   mockTable.unshift(mockTableData)
//   table.unshift(mockTableData)
//   return {
//     table,
//     couldOperate,
//     mockTable
//   }
// }
// /**
//  * 获取到用户集合操作的结果后，删除假数据，恢复操作能力
//  * @param  {array} mockTable    假数据列表
//  * @param  {array} selectedRows 当前选择的行的列表
//  * @param  {string} operation    本次操作的类别
//  * @param  {object} couldOperate 当前可以进行的操作
//  * @param  {array} saveSelectedRows 操作时的选中行的列表
//  * @return {object}              本次操作后改变的store
//  */
// export const allowOperationAndDeleteMockTableWorker = (mockTable, selectedRows, operation, couldOperate, saveSelectedRows) => {
//   const saveMockId = `${saveSelectedRows[0].id},${saveSelectedRows[1].id},${operation}`
//   mockTable = mockTable.filter((mockTableData) => (mockTableData.id !== saveMockId))
//   if (selectedRows.length !== 2) {
//     couldOperate = initCouldOperateFalse()
//   } else {
//     const selectedRowsId = `${selectedRows[0].id},${selectedRows[1].id},${operation}`
//     if (saveMockId === selectedRowsId) {
//       couldOperate[operation] = true
//     }
//   }
//
//   return {
//     couldOperate,
//     mockTable
//   }
// }
// /* eslint-disable no-param-reassign */
// /**
//  * 选择table前面的按钮后会调用这个方法来处理store的变化，根据选中数据的变化
//  * 以及假数据列表里的数据来判断按钮的状态
//  * @param  {string} selectionType 当前的选择是选中还是反选
//  * @param  {array} selectedRows  已经选中的行的数组
//  * @param  {object} newRow        本次操作的行的数据
//  * @param  {array} mockTable     当前正在等待返回结果的假数据数组
//  * @param  {object} couldOperate  当前三个按钮的可操作状态
//  * @return {Object}               本次操作后store的改变
//  */
// export function rowSelectionWorker(selectionType, selectedRows, newRow, mockTable, couldOperate) {
//   if (selectionType === 'SELECT') {
//     if (selectedRows.length < 2) {
//       selectedRows.push(newRow)
//       if (selectedRows.length === 2) {
//         couldOperate = initCouldOperateTrue()
//         for (const mockTableData of mockTable) {
//           for (const key of operationList) {
//             const selectedRowsId = `${selectedRows[0].id},${selectedRows[1].id},${key}`
//             if (mockTableData.id === selectedRowsId) {
//               couldOperate[key] = false
//             }
//           }
//         }
//       }
//     }
//   } else if (selectionType === 'DESELECT') {
//     selectedRows = selectedRows.filter(item => item.id !== newRow.id)
//     couldOperate = initCouldOperateFalse()
//   }
//   return {
//     couldOperate,
//     selectedRows
//   }
// }
// /**
//  * 重算接口调用时 生成假数据显示给用户
//  * @param  {array} table     原表数据
//  * @param  {array} mockTable 现有假数据
//  * @param  {object} oldLine  选中要重新计算的行
//  * @return {Object}           本次操作后store的改变
//  */
// export function recountWorker(table, mockTable, oldLine) {
//   oldLine.count = '计算中...'
//   oldLine.id = `${oldLine.id},recount`
//   oldLine.name = `${oldLine.name}_${moment().format('MMDD')}`
//   mockTable.unshift(oldLine)
//   table.unshift(oldLine)
//
//   return {
//     table,
//     mockTable
//   }
// }
