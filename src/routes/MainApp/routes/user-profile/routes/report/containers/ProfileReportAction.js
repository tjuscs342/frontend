import fetchPro, { FETCH_TIMEOUT } from 'SRC/utils/fetchPro'
import api from 'SRC/api'

import getUser from 'SRC/utils/getUser'
import logger from 'SRC/utils/logger'

import { processInitializion, convertReportData } from './ProfileReportService'
import { reportStatus } from './ProfileReportConstant'

export function setCompareUserSet(value) {
  return {
    type: 'DATA_SET@REPORT@USER_SET',
    value
  }
}

export function setActiveProperty(value) {
  return {
    type: 'DATA_SET@REPORT@PROPERTY_SET',
    value
  }
}

export function setDownloadAllProcess(value) {
  return {
    type: 'DATA_SET@REPORT@DOWNLOAD_ALL_PROCESS',
    value
  }
}

/**

  Async Actions

*/

export function initialize(baseUserSetId, compareUserSetId, rawDiamond) {
  return (dispatch, getState) => (
    Promise.all([
      // all predefined user set
      fetchPro(api('myDataSet:predefinedUserSet', getUser().name))
        .then(response => response.json())
        .catch(() => ({ status: 'fail', result: [] })),
      // all customized user set
      fetchPro(api('myDataSet:userProfileSet', getUser().name))
        .then(response => response.json())
        .catch(() => ({ status: 'fail', result: [] })),
      // all available properties
      fetchPro(api('properties:getAllProperties'))
        .then(response => response.json())
        .catch(() => ({ status: 'fail', result: [] })),
      // base user set
      fetchPro(api('report:getProfileUserSetById', baseUserSetId))
        .then(response => response.json())
        .catch(() => ({ status: 'fail', result: { data: null } })),
      // base user set
      fetchPro(api('report:getProfileUserSetById', compareUserSetId))
        .then(response => response.json())
        .catch(() => ({ status: 'fail', result: { data: null } }))
    ]).then(values => (
      dispatch({
        type: 'DATA_SET@REPORT@INITIALIZE',
        result: { ...processInitializion(...values, getState().persistentStore.get('diamond')) }
      })
    )).catch((e) => {
      logger.error(e)
      logger.log('Initalization Failed')
    })
  )
}

export function loadCompareUserSet(id) {
  return (dispatch/* , getState*/) => (
    fetchPro(api('report:getProfileUserSetById', id))
      .then(response => response.json())
      .catch(() => ({ status: 'fail', result: { data: null } }))
      .then(json => dispatch({
        type: 'DATA_SET@REPORT@USER_SET',
        userSetType: 'compareUserSet',
        status: json.status,
        result: json.result.data
      }))
  )
}

export function loadReportData(property) {
  return (dispatch, getState) => {
    const report = getState().userProfile.report
    const baseUserSet = report.get('baseUserSet').toJS()
    const compareUserSet = report.get('compareUserSet').toJS()
    const reportDataSource = report.get('reportDataSource')
    const key2PropMap = report.get('key2PropMap')
    const diamond = report.get('diamond').toJS()

    // 错误处理函数, 打log, 并且设置report datasource为相应状态
    function handleLoadException(propKey, msg, err) {
      logger.warn(`Load Report Data Error:\n[/${baseUserSet.id}/${compareUserSet.id}/${propKey}] : ${msg}`)
      if (err) {
        logger.error(err, err.stack)
      }
      return dispatch({
        type: 'DATA_SET@REPORT@REPORT_DATA',
        propKey,
        status: msg,
        result: msg
      })
    }

    // 异常propKey排除
    if (!reportDataSource.has(property.key)) return null
    // 限制同时请求的上限, 最多同时三个Fetch请求
    const fetchNumLimit = 3 - reportDataSource.filter(x => x === reportStatus.loading).size
    if (fetchNumLimit <= 0) return null

    // 提取所有需要加载的属性报告Key,
    // 请求当前展示页面 && 紧随的 fetchNumLimit 个报告
    const reportsToFetch = []
    let activePropertyIndex = -1;
    [...reportDataSource.keys()].forEach((key, index) => {
      if (key === property.key) {
        reportsToFetch.push(key)
        activePropertyIndex = index
      } else if (activePropertyIndex >= 0 && reportsToFetch.length < fetchNumLimit) {
        reportsToFetch.push(key)
      }
    })

    // 根据reportsToFetch, 依次发送请求
    return Promise.all(reportsToFetch.map(key => {
      const reportDataStatus = reportDataSource.get(key)
      // 如果数据已经加载,直接跳过
      if (typeof reportDataStatus !== 'string') return null
      // 如果数据获取错误
      if (reportDataStatus !== reportStatus.empty && reportDataStatus.indexOf(reportStatus.reload) !== 0) return null

      // 如果数据尚未加载, 或者需要reload
      const numOfTry = parseInt(reportDataStatus.split('||')[1] || 0)

      // 将属性报告设置为请求状态
      dispatch({
        type: 'DATA_SET@REPORT@REPORT_DATA',
        propKey: key,
        status: reportStatus.loading,
        result: reportStatus.loading
      })

      const bodyData = new FormData()
      bodyData.append('id', baseUserSet.id)
      bodyData.append('toid', compareUserSet.id)
      bodyData.append('tag', key)
      bodyData.append('user', getUser().name)
      bodyData.append('display', key2PropMap.get(key).display.table)
      bodyData.append('filter', JSON.stringify(diamond.map(x => ({
        key: x.property.key,
        value: x.id
      }))))
      // 发送请求
      return fetchPro(api('report:getReportData'), {
        timeout: 60000, // 60s
        method: 'POST',
        body: bodyData
      })
        .then(json => json.json())
        .then(response => {
          // Server 返回错误代码
          if (response.status && response.status !== 'succ') {
            return handleLoadException(key, reportStatus.fail_server)
          }

          // 将Result转化为图表渲染所需数据
          const { status, result, error } = convertReportData(
            response.result, baseUserSet, compareUserSet, key2PropMap.get(key), diamond
          )

          // 数据处理错误
          if (status !== reportStatus.succ) {
            return handleLoadException(key, status, error)
          }

          // 返回正常结果
          return dispatch({
            type: 'DATA_SET@REPORT@REPORT_DATA',
            propKey: key,
            status,
            result
          })
        })
        .catch((err) => {
          let msg
          if (err.message === FETCH_TIMEOUT && numOfTry < 1) {
            msg = `${reportStatus.reload}||${numOfTry + 1}`
          } else {
            msg = reportStatus.fail_fetch
          }
          handleLoadException(key, msg, err)
        })
    }))
  }
}

export function loadAllReport() {
  return (dispatch, getState) => {
    const reportDataSource = getState().userProfile.report.get('reportDataSource')
    const key2PropMap = getState().userProfile.report.get('key2PropMap')
    let numOfEmptyReport = 0
    let firstEmptyReportPropKey = null
    for (const [propKey, propValue] of reportDataSource) {
      if (typeof propValue !== 'string') continue
      if (propValue === reportStatus.empty || propValue.indexOf(reportStatus.reload) === 0) {
        numOfEmptyReport++
        if (firstEmptyReportPropKey === null) {
          firstEmptyReportPropKey = propKey
        }
      }
    }
    dispatch(setDownloadAllProcess(1 - numOfEmptyReport / reportDataSource.size))
    if (firstEmptyReportPropKey !== null) {
      return loadReportData(key2PropMap.get(firstEmptyReportPropKey))(dispatch, getState)
              .then(() => loadAllReport()(dispatch, getState))
    }
    return 'Done'
  }
}
