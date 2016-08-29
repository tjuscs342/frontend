import React from 'react'
const _tooltip = require('antd/lib/tooltip')
const _checkbox = require('antd/lib/checkbox')
import classNames from 'classnames'
import CopyToClipboard from 'react-copy-to-clipboard'

const sourceMap = new Map([
  ['predefined', '预定义'],
  ['upload', '上传'],
  ['online', '在线']
])

function goPushPromotion(value) {
  window.location = `http://new.admin.ad.xiaomi.com/new-ad-plan?type=2&target_draw=hdfs://user/h_user_profile/god_${value.source}/${value.user}/${value.flag}/imeimd5`
}
/* eslint-disable no-unused-vars */
export function getColumns(state, action, recount, deleteLine) {
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
      title: '推广名称',
      dataIndex: 'name',
      key: 'name',
      width: '11%'
    }, {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width: '11%',
      render: (text) => (sourceMap.get(text) || '未知')
    }, {
      title: '用户数',
      dataIndex: 'count',
      key: 'count',
      width: '11%',
      render: (text) => (text === -1 ? '计算中' : text)
    }, {
      title: '筛选条件',
      dataIndex: 'description',
      key: 'description',
      width: '11%',
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
      width: '20%'
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => (
        <div>
          <div
            className={
              classNames(
                'btn-theme9',
                'fs12',
                'btn-unit-size',
                { 'not-allowed btn-theme7': record.flag.length === 0 }
              )
            }
            onClick={
              record.flag.length > 0 ?
              () => goPushPromotion(record) : ''
            }
            >推广</div>
          <div
            className={
              classNames(
                'btn-theme6',
                'fs12',
                'btn-unit-size',
                { 'not-allowed btn-theme7':
                  record.icon !== 'delete' ||
                  record.source === 'upload' ||
                  record.impalaSql === ''
                })
            }
            onClick={
              record.icon === 'delete' && record.source !== 'upload' ?
              () => recount(record) : ''
            }
            >
            重算
          </div>
          {
            // <div className="btn-theme8 fs12 btn-unit-size">修改属性</div>
          }
        </div>
      )
    }, {
      title: '删除',
      key: 'delete',
      render: (text, record) => (
        <div
          className={classNames('fs20', 'fc-light', { 'not-allowed': (record.source === 'predefined' || record.icon !== 'delete') })}
          onClick={(record.source !== 'predefined' && record.icon === 'delete') ? deleteLine.bind(null, record.id) : ''}
          >
          <i className={classNames('fa', { 'fa-trash-o': record.icon === 'delete', 'fa-spinner': record.icon !== 'delete', waiting: record.icon !== 'delete' })} aria-hidden="true"></i>
        </div>
      )
    }
  ]
  return columns
}
