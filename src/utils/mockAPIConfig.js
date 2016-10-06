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
      enabled: true,
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
      // 模拟请假提交
      enabled: true,
      method: 'POST',
      url: new RegExp("/apply"),
      type: 'normal',
      delay: 300,
      response: { "status": "success" }
    },
    {
      // 模拟审批
      enabled: true,
      method: 'PUT',
      url: new RegExp("/audit"),
      type: 'normal',
      delay: 300,
      response: { "status": "success" }
    },
    {
      // 模拟获取当前用户基本信息
      enabled: true,
      method: 'GET',
      url: new RegExp("/user"),
      type: 'normal',
      delay: 300,
      response: {
        "status": "success",
        "data": {
          "userId": 117,
          "userName": "test1",
          "password": "111",
          "bossId": 0,
          "phone": "",
          "marryTimes": 0,
          "sex": 0,
          "childNum": 0,
          "age": 0,
          "gmtCreate": null,
          "gmtModified": null,
          "userPower": 0
        }
      }
    },
    {
      // 模拟获取当前用户的请假申请列表
      enabled: true,
      method: 'GET',
      url: new RegExp("/apply/"),
      type: 'normal',
      delay: 1300,
      response: { "status": "success", "data": [
        {
          "userId": 116,
          "applicationId": 3,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 5,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 6,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 5,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 6,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 5,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 6,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 5,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 6,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        },
        {
          "userId": 116,
          "applicationId": 4,
          "applyDate": "2016-10-06 00:00:00",
          "auditDate": null,
          "startDate": "2016-10-07 00:00:00",
          "endDate": "2016-10-10 00:00:00",
          "reason": "hello",
          "applyType": 1,
          "result": 1,
          "operatorId": null,
          "operatorName": null,
          "remark": null
        }
      ] }
    },
    {
      // 模拟获取需要自己审批的接口列表
      enabled: true,
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
    },
    {
      // 模拟修改申请
      enabled: true,
      method: 'PUT',
      url: new RegExp('/apply'),
      type: 'normal',
      delay: 300,
      response: { "status": "success" }
    }
    // {
    //   // 模拟画像报告数据获取 - 差异化特征 app安装
    //   enabled: false,
    //   url: new RegExp('http://baidu.com'),
    //   type: 'normal',
    //   // type: 'error',
    //   // error: FETCH_TIMEOUT,
    //   delay: 1000,
    //   response: (url, config) => {
    //     switch (config.body.get('display')) {
    //       case 'table1':
    //         // eslint-disable-next-line
    //         return {"status":"succ","result":{"user":{"datas":[{"key":"0-17岁::1","value":"31238"},{"key":"18-21岁::2","value":"28678"},{"key":"22-24岁::3","value":"32285"},{"key":"25-29岁::4","value":"63053"},{"key":"30-39岁::5","value":"276919"},{"key":"40-49岁::6","value":"11407"},{"key":"50-80岁::7","value":"8250"}],"count":1559473,"unknown":1107643},"to":{"datas":[{"key":"0-17岁::1","value":"745086"},{"key":"18-21岁::2","value":"1653516"},{"key":"22-24岁::3","value":"1397835"},{"key":"25-29岁::4","value":"2523816"},{"key":"30-39岁::5","value":"2676314"},{"key":"40-49岁::6","value":"533553"},{"key":"50-80岁::7","value":"286139"}],"count":16695138,"unknown":6878879}}}
    //       case 'table3':
    //         // eslint-disable-next-line
    //         return {"status":"succ","result":{"app":[{"name":"应用商店","key":"com.xiaomi.market"},{"name":"MIUI SDK","key":"com.miui.core"},{"name":"MIUI System","key":"com.miui.system"},{"name":"图库","key":"com.miui.gallery"},{"name":"时钟","key":"com.android.deskclock"},{"name":"电子邮件","key":"com.android.email"},{"name":"文件管理","key":"com.android.fileexplorer"},{"name":"录音机","key":"com.android.soundrecorder"},{"name":"主题风格","key":"com.android.thememanager"},{"name":"授权管理","key":"com.lbe.security.miui"},{"name":"防打扰","key":"com.miui.antispam"},{"name":"百变壁纸","key":"com.miui.miwallpaper"},{"name":"便签","key":"com.miui.notes"},{"name":"黄页","key":"com.miui.yellowpage"},{"name":"用户反馈","key":"com.miui.bugreport"},{"name":"联播服务","key":"com.milink.service"},{"name":"网络助手","key":"com.miui.networkassistant"},{"name":"Cheetah Mobile CleanMaster SDK","key":"com.cleanmaster.sdk"},{"name":"相机","key":"com.android.camera"},{"name":"指南针","key":"com.miui.compass"}],"user":{"datas":[{"key":"无::0","value":"304943"},{"key":"较弱::1","value":"49271"},{"key":"一般::2","value":"122843"},{"key":"较强::3","value":"129735"},{"key":"很强::4","value":"37022"}],"count":1370255,"unknown":726441},"to":{"datas":[{"key":"无::0","value":"3819030"},{"key":"较弱::1","value":"1765419"},{"key":"一般::2","value":"3030012"},{"key":"较强::3","value":"4375153"},{"key":"很强::4","value":"1437965"}],"count":16678544,"unknown":2250965}}}
    //       case 'table4':
    //         // eslint-disable-next-line
    //         return {"status":"succ","result":{"top":[{"data":"18.90131","name":"Dolby Service","count":70861,"key":"com.dolby"},{"data":"3.27037","name":"MBN 测试","count":8830,"key":"com.qualcomm.qti.modemtestmode"},{"data":"2.14214","name":"网络助手","count":48241,"key":"com.wali.miui.networkassistant"},{"data":"1.97877","name":"碰碰贴","count":24697,"key":"com.xiaomi.tag"},{"data":"1.74743","name":"银行卡","count":44792,"key":"com.mipay.counter"},{"data":"0.24904","name":"网络位置","count":82467,"key":"com.amap.android.location"},{"data":"0.1376","name":"小米小说","count":3278,"key":"com.duokan.fiction"},{"data":"0.13749","name":"远程协助","count":1717,"key":"com.mi.misupport"},{"data":"0.13628","name":"口袋购物","count":862,"key":"com.geili.koudai"},{"data":"0.13518","name":"UC解压缩","count":2338,"key":"com.uc.addon.decompress"},{"data":"0.11986","name":"小米安全令牌","count":3388,"key":"com.xiaomi.android.apps.authenticator2"},{"data":"0.11346","name":"触宝输入法","count":1946,"key":"com.cootek.smartinputv5"},{"data":"0.11338","name":"小木虫","count":1158,"key":"com.zhuanyejun.club"},{"data":"0.09914","name":"大街","count":855,"key":"com.dajie.official"},{"data":"0.09616","name":"人人-高校美女直播","count":2150,"key":"com.renren.mobile.android"},{"data":"0.08949","name":"考研帮","count":2511,"key":"com.tal.kaoyan"},{"data":"0.08632","name":"比价助手","count":1833,"key":"com.xiaomi.pricecheck"},{"data":"0.07986","name":"小米社区","count":6902,"key":"com.xiaomi.bbs"},{"data":"0.07459","name":"金山词霸-学习神器","count":21896,"key":"com.kingsoft"},{"data":"0.07182","name":"粉笔公考","count":1647,"key":"com.fenbi.android.servant"},{"data":"0.07169","name":"支付宝安全校验服务","count":1670,"key":"com.alipay.security.mobile.authenticator"},{"data":"0.06961","name":"锁屏画报","count":2704,"key":"com.xiaomi.tv.gallerylockscreen"},{"data":"0.06885","name":"慕课网","count":1224,"key":"cn.com.open.mooc"},{"data":"0.0685","name":"夜间模式","count":2467,"key":"com.sina.weibo.nightdream"},{"data":"0.06701","name":"影梭","count":924,"key":"com.github.shadowsocks"},{"data":"0.06603","name":"脉脉","count":1248,"key":"com.taou.maimai"},{"data":"0.06546","name":"丁香园","count":1004,"key":"cn.dxy.idxyer"},{"data":"0.0648","name":"课程格子","count":1630,"key":"fm.jihua.kecheng"},{"data":"0.0647","name":"锤子便签","count":944,"key":"com.smartisan.notes"},{"data":"0.0646","name":"快播","count":1595,"key":"com.qvod.player"},{"data":"0.06455","name":"知乎日报","count":2561,"key":"com.zhihu.daily.android"},{"data":"0.06424","name":"猎豹清理大师","count":40424,"key":"com.cleanmaster.mguard_cn"},{"data":"0.0642","name":"用药助手","count":915,"key":"cn.dxy.medicinehelper"},{"data":"0.06271","name":"小米WIFI","count":1354,"key":"com.xiaomi.mishare"},{"data":"0.0614","name":"MX Player 解码包 (ARMv7 NEON)","count":1526,"key":"com.mxtech.ffmpeg.v7_neon"},{"data":"0.06076","name":"移动图书馆","count":1975,"key":"com.superlib"},{"data":"0.06074","name":"拉勾","count":1434,"key":"com.alpha.lagouapk"},{"data":"0.05829","name":"手机压缩RAR","count":2254,"key":"com.rarlab.rar"},{"data":"0.0582","name":"MoboPlayer","count":966,"key":"com.clov4r.android.nil"},{"data":"0.05804","name":"蓝灯","count":1966,"key":"org.getlantern.lantern"},{"data":"0.05677","name":"Tumblr","count":1095,"key":"com.tumblr"},{"data":"0.05635","name":"猎聘同道","count":1322,"key":"com.lietou.mishu"},{"data":"0.05571","name":"Boss直聘-招聘求职","count":1653,"key":"com.hpbr.bosszhipin"},{"data":"0.0557","name":"铂涛旅行","count":1147,"key":"com.plateno.botaoota"},{"data":"0.05554","name":"智联招聘","count":7605,"key":"com.zhaopin.social"},{"data":"0.05531","name":"扇贝新闻","count":1139,"key":"com.shanbay.news"},{"data":"0.05418","name":"简书","count":1138,"key":"com.jianshu.haruki"},{"data":"0.05322","name":"网易云课堂","count":1250,"key":"com.netease.edu.study"},{"data":"0.05301","name":"智行火车票12306购票","count":13576,"key":"com.yipiao"}],"bottom":[{"data":"0.01332","name":"Faceu","count":3187,"key":"com.lemon.faceu"},{"data":"0.01326","name":"新闻资讯","count":62809,"key":"com.yidian.xiaomi"},{"data":"0.01318","name":"触手TV","count":964,"key":"com.kascend.chushou"},{"data":"0.01311","name":"贝贝-母婴正品特卖","count":2454,"key":"com.husor.beibei"},{"data":"0.01308","name":"玩图","count":1221,"key":"com.wantu.activity"},{"data":"0.01304","name":"百度输入法小米版","count":79992,"key":"com.baidu.input_mi"},{"data":"0.01292","name":"小猿搜题","count":3829,"key":"com.fenbi.android.solar"},{"data":"0.01283","name":"手机百度","count":22721,"key":"com.baidu.searchbox"},{"data":"0.01276","name":"手电筒Flashlight","count":868,"key":"com.devuni.flashlight"},{"data":"0.01272","name":"WhatsApp","count":1286,"key":"com.whatsapp"},{"data":"0.01269","name":"蘑菇街","count":2654,"key":"com.mogujie"},{"data":"0.01244","name":"com.qti.service.colorservice","count":36923,"key":"com.qti.service.colorservice"},{"data":"0.01239","name":"汽车报价大全","count":7372,"key":"com.yiche.price"},{"data":"0.01236","name":"王者荣耀助手","count":1755,"key":"com.tencent.gamehelper.smoba"},{"data":"0.01234","name":"SNOW","count":934,"key":"com.campmobile.snow"},{"data":"0.01223","name":"浙江移动手机营业厅","count":2166,"key":"com.example.businesshall"},{"data":"0.01216","name":"美妆相机","count":1388,"key":"com.meitu.makeup"},{"data":"0.01186","name":"广东移动","count":3555,"key":"com.kingpoint.gmcchh"},{"data":"0.01183","name":"YouTube","count":946,"key":"com.google.android.youtube"},{"data":"0.0117","name":"Secure UI Service","count":34730,"key":"com.qualcomm.qti.services.secureui"},{"data":"0.01149","name":"欢乐斗牛","count":1391,"key":"com.qqgame.hldouniu"},{"data":"0.01122","name":"遥控精灵","count":1360,"key":"com.tiqiaa.icontrol"},{"data":"0.01117","name":"搜狗搜索","count":2232,"key":"com.sogou.activity.src"},{"data":"0.01114","name":"学霸君","count":1667,"key":"com.wenba.bangbang"},{"data":"0.01111","name":"ANT HAL Service","count":125743,"key":"com.dsi.ant.server"},{"data":"0.0111","name":"Backup Agent","count":35411,"key":"com.qti.backupagent"},{"data":"0.01107","name":"飞信","count":2211,"key":"cn.com.fetion"},{"data":"0.01053","name":"沃商店","count":1118,"key":"com.infinit.wostore.ui"},{"data":"0.01051","name":"教育技术服务平台","count":985,"key":"com.ime.xmpp"},{"data":"0.01035","name":"SecureSampleAuthService","count":30719,"key":"com.qualcomm.qti.auth.securesampleauthservice"},{"data":"0.01035","name":"SampleAuthenticatorService","count":30720,"key":"com.qualcomm.qti.auth.sampleauthenticatorservice"},{"data":"0.01032","name":"腾讯地图","count":7991,"key":"com.tencent.map"},{"data":"0.01015","name":"携程旅行","count":19186,"key":"ctrip.android.view"},{"data":"0.00996","name":"她社区","count":1230,"key":"cn.j.hers"},{"data":"0.00961","name":"MiPlay","count":49239,"key":"com.xiaomi.miplay"},{"data":"0.00961","name":"UpnpService","count":49249,"key":"com.xiaomi.upnp"},{"data":"0.00949","name":"116114","count":883,"key":"com.neusoft.td.android.wo116114"},{"data":"0.00906","name":"DMService","count":63083,"key":"com.xiaomi.android.dm.service"},{"data":"0.00822","name":"Google键盘","count":1694,"key":"com.google.android.inputmethod.latin"},{"data":"0.00804","name":"咪咕阅读-免费小说","count":1800,"key":"com.ophone.reader.ui"},{"data":"0.00757","name":"51信用卡管家","count":5458,"key":"com.zhangdan.app"},{"data":"0.00703","name":"小米万能遥控","count":54837,"key":"com.duokan.phone.remotecontroller"},{"data":"0.00688","name":"银联在线支付服务","count":20672,"key":"com.unionpay.uppay"},{"data":"0.00479","name":"随e行WLAN","count":1024,"key":"com.chinamobile.cmccwifi"},{"data":"0.00476","name":"讯飞输入法4G","count":1567,"key":"com.iflytek.inputmethod.oem"},{"data":"0.00468","name":"com.qualcomm.qti.telephony","count":13836,"key":"com.qualcomm.qti.telephony"},{"data":"0.00442","name":"灵犀语音助手","count":1035,"key":"com.iflytek.cmcc"},{"data":"0.0036","name":"139邮箱","count":876,"key":"cn.cj.pe"},{"data":"0.0033","name":"MM安全中心","count":1437,"key":"kvpioneer.safecenter"}]}}
    //       case 'table5':
    //         // eslint-disable-next-line
    //         return {"status":"succ","result":{"arup":{"total":"0.87","proportion":"3.43","pay":"25.37"},"arup2":{"total":"1.42","proportion":"5.25","pay":"27.1"},"user":{"datas":[{"key":"极弱::0","value":"356984"},{"key":"较弱::1","value":"4115097"},{"key":"一般::2","value":"438899"},{"key":"较强::3","value":"111496"},{"key":"很强::4","value":"146879"}],"count":153870816,"unknown":148701461},"to":{"datas":[{"key":"极弱::0","value":"52938"},{"key":"较弱::1","value":"683696"},{"key":"一般::2","value":"78217"},{"key":"较强::3","value":"20715"},{"key":"很强::4","value":"28267"}],"count":16678544,"unknown":15814711}}}
    //       default:
    //         return { status: 'fail' }
    //     }
    //   }
    // }
  ]
}

export default mockAPIConfig
