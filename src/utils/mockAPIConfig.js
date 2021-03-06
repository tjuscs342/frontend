import { FETCH_TIMEOUT } from 'SRC/utils/fetchPro' // eslint-disable-line no-unused-vars

/**
 * mockAPIConfig = {
 * 	rules: [{
 * 		url: RegExp 检测请求链接是否match,
 * 	}]
 * }
 */

/* eslint-disable quote-props, quotes */
export const mockAPIConfig = {
  enabled: true,
  rules: [
    {
      // 模拟登录
      enabled: false,
      method: 'POST',
      url: new RegExp("/login"),
      type: 'normal',
      delay: 1000,
      response: {
        status: 'success',
        data: {
          uid: 1,
          userName: 'ljm'
        },
        msg: '密码错误'
      }
    },
    {
      // 模拟审批
      enabled: false,
      method: 'PUT',
      url: new RegExp("/audit"),
      type: 'normal',
      delay: 300,
      response: { "status": "success" }
    },
    {
      // 模拟获取当前用户基本信息
      enabled: false,
      method: 'GET',
      url: new RegExp('http://121.42.202.145:8888/attendence-system/user'),
      type: 'normal',
      delay: 300,
      // eslint-disable-next-line
      response: {"status":"success","data":{"userId":117,"userName":"test1","password":"111","bossId":0,"phone":"","marryTimes":0,"sex":0,"childNum":0,"age":0,"gmtCreate":null,"gmtModified":null,"userPower":0}}
    },
    {
      // 模拟获取当前用户的请假申请列表
      enabled: false,
      method: 'GET',
      url: new RegExp("apply"),
      type: 'normal',
      delay: 1300,
      // eslint-disable-next-line
      response: { "status":"success", "data":[ { "applyId":"777", "type":"年假", "reason":"累了", "handOver":"老大", "startDate":"2016-8-11", "endDate":"2016-8-12", "status": "agreee"|"disagree"|"undetermined" }  ] }
    },
    {
      // 模拟获取需要自己审批的接口列表
      enabled: false,
      method: 'GET',
      url: new RegExp("/audit"),
      type: 'normal',
      delay: 300,
      response: { "status": "success", "data": [
        {
          "applyId": "777",
          "userId": "116",
          "userName": "tjullin",
          "type": "year",
          "reason": "累了",
          "handOver": "老大",
          "startDate": "2016-8-11",
          "endDate": "2016-8-12",
          "status": "agreee"
        },
        {
          "applyId": "888",
          "userId": "116",
          "userName": "tjullin",
          "type": "year",
          "reason": "累了",
          "handOver": "老大",
          "startDate": "2016-8-11",
          "endDate": "2016-8-12",
          "status": "disagree"
        },
        {
          "applyId": "999",
          "userId": "116",
          "userName": "tjullin",
          "type": "year",
          "reason": "累了",
          "handOver": "老大",
          "startDate": "2016-8-11",
          "endDate": "2016-8-12",
          "status": "undetermined"
        }
      ] }
    }
  ]
}

export default mockAPIConfig
