import React from 'react'
import Immutable from 'immutable'
const _tooltip = require('antd/lib/tooltip')
import * as Scroll from 'SRC/components/scroll'
const ScrollSection = Scroll.Section
import { Link } from 'react-router'
import ReportPanel from 'SRC/components/report-components/ReportPanel'
import { reportStatus } from './ProfileReportConstant'
import papaparse from 'papaparse'
import { saveAs } from 'filesaver.js'

export function processInitializion(predefinedUserSet, customizedUserSet, allProperties, baseUserSetRaw, compareUserSetRaw, rawDiamond) {
  const baseUserSet = baseUserSetRaw.result.data
  baseUserSet.key = `${baseUserSet.id}`
  const compareUserSet = compareUserSetRaw.result.data
  compareUserSet.key = `${compareUserSet.id}`
  const userSetValuePool = [{
    key: 'predefined',
    name: '预设用户集',
    valuePool: predefinedUserSet.result.map(x => ({ ...x, key: `${x.id}`, source: 'predefined' }))
  }, {
    key: 'customized',
    name: '我的用户集',
    valuePool: customizedUserSet.result
                 .filter(x => x.source !== 'predefined')
                 .slice(0, 20)
                 .map(x => ({ ...x, key: `${x.id}` }))
  }]
  // Calculate the propertiesValuePool && key2PropMap && activeProperty
  const id2PropMap = new Map()
  allProperties.result.forEach(category => {
    category.valuePool.forEach(item => {
      id2PropMap.set(`${item.id}`, item)
    })
  })
  const propertiesValuePoolMap = new Map()
  const key2PropMap = new Map()
  baseUserSet.tags.split(',').forEach(propertyId => {
    const property = id2PropMap.get(propertyId)
    if (property) {
      if (!propertiesValuePoolMap.has(property.type)) {
        propertiesValuePoolMap.set(property.type, [])
      }
      propertiesValuePoolMap.get(property.type).push(property)
    }
  })
  const propertiesValuePool = []
  let activeProperty = null
  propertiesValuePoolMap.forEach((valuePool, key) => {
    if (!activeProperty) {
      activeProperty = valuePool[0]
    }
    propertiesValuePool.push({
      key,
      name: key,
      valuePool
    })
    valuePool.forEach(property => {
      key2PropMap.set(property.key, property)
    })
  })
  // Initialze the reportDataSource
  const reportDataSource = Immutable.OrderedMap([...key2PropMap.keys()].map(key => [key, reportStatus.empty]))

  // Initialize 下钻数据
  const diamond = rawDiamond.split(';').filter(x => x !== '').map(keyValue => {
    const [propKey, keyId] = keyValue.split('||')
    const [key, id] = keyId.split('::')
    return {
      property: key2PropMap.get(propKey),
      key,
      id
    }
  })
  // 生成标题
  const title = `${baseUserSet.name}画像${diamond.map(r => `-${r.property.name}${r.key.split('::')[0]}`).join('')}`
  return {
    baseUserSet,
    compareUserSet,
    userSetValuePool,
    propertiesValuePool,
    key2PropMap,
    activeProperty,
    reportDataSource,
    diamond,
    title
  }
}

const convertReportDataMap = {
  /*
    DataType - 'table1' ReportData 预处理
    标准输入:
      {
        user: {
          datas: [ { key: '男', value: 800000 } ],
          count: 888888,
          unknown: 44444
        },
        to: {
          datas: [ { key: '男', value: 800000 } ],
          count: 888888,
          unknown: 44444
        }
      }
    标准输出:
      {
        dataID: '手环用户-小米用户-用户性别-12334334443',
        data: [
          {
            name: '手环用户'
            value: [
              { key: '男', name: 男, value: 0.12345 },
              { key: '男', name: 男, value: 0.87655 }
            ]
            unknown: {
              key: 'unknown',
              name: '无覆盖',
              value: 0.34566
            }
          }, ...
        ]
      }
  */
  table1: (result, baseUserSet, compareUserSet, property, diamond) => {
    if (!result) return null
    /* ------ 计算下钻标签长度 begin */
    let longestNameSize = -1
    result.user.datas.forEach(r => {
      if (r.key.length > longestNameSize) {
        longestNameSize = r.key.length
      }
    })
    if (longestNameSize > 20) {
      longestNameSize = `${longestNameSize / 3}em`
    } else {
      longestNameSize = `${longestNameSize}em`
    }
    /* ------ 计算下钻标签长度 end */
    const diamondPrefix = diamond.map(x => `${x.property.key}||${x.key}::${x.id};`).join('')
    const baseUserSetData = {
      name: baseUserSet.name,
      value: result.user.datas.map(r => ({
        key: r.key,
        name: r.key.split('::')[0],
        value: r.value / (result.user.count - result.user.unknown),
        render: result.user.datas.length < 2 ? undefined : (record) => {
          /**
           *  下钻数据传递
           *  1. 点击下钻link, 将下钻数据存到localstroe中, 并assign一个唯一的storageKey
           *  2. 新页面加载时, 将localstore中数据取出并删除, 转存到persistentStore中(session store)
           *  3. 页面初始化时, 将rawDiamond数据parse成可用数据
           */
          const storageKey = `tmp-diamaond-key-${new Date().getTime()}`
          return (
            <div>
              <span
                className="inline"
                style={{ width: longestNameSize, maxWidth: '80%', marginRight: '10px' }}
                >
                {record.name}
              </span>
              <Link
                to={{
                  pathname: '/user-profile/report/diamond',
                  query: {
                    id: baseUserSet.id,
                    storageKey
                  }
                }}
                target="_blank"
                onClick={() => {
                  localStorage.setItem(storageKey, `${diamondPrefix}${property.key}||${record.key}`)
                }}
                >
                <i className="fa fa-arrow-circle-o-down fc-blue fs12" aria-hidden="true"></i>
              </Link>
            </div>
          )
        }
      })),
      unknown: {
        key: 'unknown',
        name: '无覆盖',
        value: result.user.unknown / result.user.count
      }
    }
    // 样本集 对比集 Data Normalized
    const toDatasMap = new Map(result.to.datas.map(r => [r.key, r]))
    const compareUserSetData = {
      name: compareUserSet.name,
      value: baseUserSetData.value.map(r => {
        if (!toDatasMap.has(r.key)) {
          return { key: r.key, name: r.name, value: 0 }
        }
        const { key, value } = toDatasMap.get(r.key)
        return {
          key,
          name: key.split('::')[0],
          value: value / (result.to.count - result.to.unknown)
        }
      }),
      unknown: {
        key: 'unknown',
        name: '无覆盖',
        value: result.to.unknown / result.to.count
      }
    }

    // 设置一个Tag来标记Result, 用来判断每一个ReportPanel是否需要更新, 减少Render次数, 提高运行效率
    const dataID = `${baseUserSet.id}-${compareUserSet.id}-${property.key}-${new Date().getTime()}`
    return {
      dataID,
      data: [
        baseUserSetData,
        compareUserSetData
      ]
    }
  },
  /*
    DataType - 'table3' ReportData 预处理
    标准输入:
      {
        user: {
          datas: [ { key: '男', value: 800000 } ],
          count: 888888,
          unknown: 44444
        },
        to: {
          datas: [ { key: '男', value: 800000 } ],
          count: 888888,
          unknown: 44444
        },
        app {
          key: 'com.xiaomi.market',
          name: '应用商店'
        }
      }
    标准输出:
      {
        dataID: '手环用户-小米用户-用户性别-12334334443',
        data: [
          {
            name: '手环用户'
            value: [
              { key: '男', name: 男, value: 0.12345 },
              { key: '男', name: 男, value: 0.87655 }
            ]
            unknown: {
              key: 'unknown',
              name: '无覆盖',
              value: 0.34566
            }
          }, ... , {
            name: 'Top20 APP排行榜 (手环用户)',
            value: [
              { key: 'com.xiaomi.market', name: '应用商店' }
            ]
          }
        ]
      }
  */
  table3: (result, baseUserSet, compareUserSet, property, diamond) => {
    const res = convertReportDataMap.table1(result, baseUserSet, compareUserSet, property, diamond)
    res.data.push({
      name: `Top20 APP排行榜 (${baseUserSet.name})`,
      value: result.app.slice(0, 20).map((r, i) => (
        {
          key: r.key,
          name: r.name,
          value: i + 1,
          render: (record) => (
            <_tooltip title={record.key}>
              <span>{record.name}</span>
            </_tooltip>
          )
        }
      ))
    })
    return res
  },
  /*
    DataType - 'table4' ReportData 预处理
    标准输入:
      {
        bottom: [
          {
            key: 'com.lemon.faceu',
            name: 'Faceu',
            count: 888888,
            data: '0.01332'
          }
        ],
        top: [
          {
            key: 'com.dolby',
            name: 'Dolby Service',
            count: 70861,
            data: '18.90131'
          }
        ]
      }
    标准输出:
      {
        dataID: '手环用户-小米用户-用户性别-12334334443',
        data: [{
          name: '手环用户 Top50',
          value: [
            {
              key: 'com.lemon.faceu',
              name: 'Faceu',
              count: 888888,
              value: '0.01332'
            }
          ]
        }, {
          name: '手环用户 Bottom50'
          value: [
            {
              key: 'com.dolby',
              name: 'Dolby Service',
              count: 70861,
              value: '18.90131'
            }
          ]
        }]
      }
  */
  table4: (result, baseUserSet, compareUserSet, property, diamond) => { // eslint-disable-line no-unused-vars
    // 设置一个Tag来标记Result, 用来判断每一个ReportPanel是否需要更新, 减少Render次数, 提高运行效率
    const dataID = `${baseUserSet.id}-${compareUserSet.id}-${property.key}-${new Date().getTime()}`
    return {
      dataID,
      data: [{
        name: `${baseUserSet.name} Top50`,
        value: result.top.map(r => (
          Object.assign({}, r, {
            data: undefined,
            value: r.data / 100,
            render: () => (
              <_tooltip title={r.key}>
                <span>{r.name}</span>
              </_tooltip>
            )
          })
        ))
      }, {
        name: `${baseUserSet.name} Bottom50`,
        value: result.bottom.map(r => (
          Object.assign({}, r, {
            data: undefined,
            value: r.data / 100,
            render: () => (
              <_tooltip title={r.key}>
                <span>{r.name}</span>
              </_tooltip>
            )
          })
        ))
      }]
    }
  },
  /*
    DataType - 'table5' ReportData 预处理
    标准输入:
      {
        user: {
          datas: [ { key: '男', value: 800000 } ],
          count: 888888,
          unknown: 44444
        },
        to: {
          datas: [ { key: '男', value: 800000 } ],
          count: 888888,
          unknown: 44444
        },
        arup: {
          pay: '25.37',
          proportion: '3.43',
          total: '0.87'
        },
        arup2: {
          pay: '25.37',
          proportion: '3.43',
          total: '0.87'
        }
      }
    标准输出:
      {
        dataID: '手环用户-小米用户-用户性别-12334334443',
        data: [
          {
            name: '手环用户'
            value: [
              { key: '男', name: 男, value: 0.12345 },
              { key: '男', name: 男, value: 0.87655 }
            ]
            unknown: {
              key: 'unknown',
              name: '无覆盖',
              value: 0.34566
            }
          }, ... , {
            name: 'Arup值',
            value: [
              { key: '手环用户', name: '手环用户', pay: '25.37', proportion: '3.43%', total: '0.87' },
              { key: '手环用户', name: '手环用户', pay: '25.37', proportion: '3.43%', total: '0.87' }
            ]
          }
        ]
      }
  */
  table5: (result, baseUserSet, compareUserSet, property, diamond) => {
    const res = convertReportDataMap.table1(result, baseUserSet, compareUserSet, property, diamond)
    res.data.push({
      name: 'Arup值',
      value: [
        { ...result.arup, proportion: `${result.arup.proportion}%`, key: baseUserSet.name, name: baseUserSet.name },
        { ...result.arup2, proportion: `${result.arup2.proportion}%`, key: compareUserSet.name, name: compareUserSet.name }
      ]
    })
    return res
  }
}

export function convertReportData(result, baseUserSet, compareUserSet, property, diamond) {
  const display = property.display
  if (!convertReportDataMap[display.table]) {
    return { status: reportStatus.fail_data_type }
  }
  try {
    return { status: reportStatus.succ, result: convertReportDataMap[display.table](result, baseUserSet, compareUserSet, property, diamond) }
  } catch (e) {
    return { status: reportStatus.fail_data_process, error: e }
  }
}

/*

  Generate the ReportPanel

*/

function parseDataSource(rawDataSource) {
  if (!rawDataSource || rawDataSource === reportStatus.empty || rawDataSource === reportStatus.loading) return null
  if (typeof rawDataSource === 'string') {
    return {
      dataID: rawDataSource,
      data: rawDataSource
    }
  }
  return rawDataSource.toJS()
}

export function getPageElements(state) {
  const { propertiesValuePool, baseUserSet, compareUserSet } = state.toJS()
  const reportDataSource = state.get('reportDataSource') // Immutable OrderMap
  const res = []

  // /*
  //   由于每个ReportPanel会占用大量的内存,因此只渲染当前展示的ReportPanel && 上下各一个ReportPanel
  // */
  // const propertyKeyArray = [...reportDataSource.keys()]
  // let activeReportPanelIndex = -1
  // propertyKeyArray.forEach((propertyKey, index) => {
  //   if (propertyKey === activeProperty.key) {
  //     activeReportPanelIndex = index
  //   }
  // })
  // const activeReportPanel = new Set(
  //   propertyKeyArray.filter((propertyKey, index) => Math.abs(index - activeReportPanelIndex) < 3)
  // )

  // console.log(activeReportPanel)
  propertiesValuePool.forEach(category => {
    category.valuePool.forEach(property => {
      const dataSource = parseDataSource(reportDataSource.get(property.key))
      res.push((
        <ScrollSection
          className="bottom-border"
          id={`${property.key}`}
          ref={`${property.key}`}
          key={`${property.key}`}
          name={`${property.key}`}
          loading={dataSource === null}
          >
          <div style={{ margin: '25px 2%' }} className="bg-white">
            <ReportPanel
              dataSource={dataSource}
              property={property}
              baseUserSet={baseUserSet}
              compareUserSet={compareUserSet}
              />
          </div>
        </ScrollSection>
      ))
    })
  })
  return res
}


const convertReportData2RawCSV = {
  table1: (propName, data) => {
    const row1 = [propName]
    const row2 = [data[0].name]
    const row3 = [data[1].name]
    data[0].value.forEach((r, i) => {
      row1.push(r.name)
      row2.push(r.value)
      row3.push(data[1].value[i].value)
    })
    return [row1, row2, row3]
  }
}

export function saveReportData(filename, reportDataSource, key2PropMap) {
  const rawCSV = []
  for (const [propKey, record] of reportDataSource) {
    const property = key2PropMap.get(propKey)
    if (typeof record === 'string') {
      rawCSV.push([property.name, record])
    } else {
      if (convertReportData2RawCSV[property.display.table]) {
        rawCSV.push(...convertReportData2RawCSV[property.display.table](property.name, record.get('data').toJS()))
      }
    }
    rawCSV.push([])
  }
  // console.log(rawCSV)
  // console.log(papaparse.unparse(rawCSV))
  saveAs(
    new Blob([papaparse.unparse(rawCSV)], { type: 'text/csv;charset=utf-8' }),
    filename
  )
}
