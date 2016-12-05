#### [点击查看页面效果](http://121.42.202.145:5386/)

### <span id="menu">接口目录</span>

1. [登陆](#login)

### 接口定义

#### 通用规范

1. 所有接口都返回`status`字段，当参数正确时，status返回`succ`，不正常时,status返回`fail`
2. status === succ 时，有data字段，对象类型，用于返回数据，具体内容视接口而定
3. status === fail 时，有msg字段，字符串类型，用于返回错误原因

<br id='login'>

- ##### 登陆 [返回目录](#menu)

    - 请求方式 ：`POST` `http://localhost/login`

    - ######请求参数

        |字段|说明|示例|
        |:-:|:-:|:-:|
        |userName|用户名|Allan|
        |password|密码|12345678|

    - ######返回结果示例：

        ```
        // 错误时返回信息
        {
          status: 'fail',
        	msg: "密码错误之类的"
        }
        // 成功时返回信息
        {
          status: 'succ',
        	data: {
            uid: 1,
            userName: 'Allan'
          }
        }
        ```
