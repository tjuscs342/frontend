/* vim: set filetype=javascript.jsx */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './ask.css'
import { Select, Radio, Checkbox, Button, DatePicker, TimePicker, InputNumber, Form, Cascader, Icon, Input } from 'antd'
const Option = Select.Option
import { Link } from 'react-router'
const RadioGroup = Radio.Group
const FormItem = Form.Item

class Ask extends Component {
  constructor(props) {
    super(props)
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkBegin = this.checkBegin.bind(this)
    this.checkPrime = this.checkPrime.bind(this)
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      eat: true,
      sleep: true,
      beat: true
    })
  }
  handleReset(e) {
    e.preventDefault()
    this.props.form.resetFields()
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!')
        return
      }
      console.log('Submit!!!')
      console.log(values)
    })
  }

  checkBegin(rule, value, callback) {
    if (value && value.getTime() < Date.now()) {
      callback(new Error('这天已经过去了!'))
    } else {
      callback()
    }
  }

  checkPrime(rule, value, callback) {
    if (value !== 11) {
      callback(new Error('8~12之间的质数明明是11啊!'))
    } else {
      callback()
    }
  }

  render() {
    const { getFieldProps } = this.props.form
    const vacationTypeProps = getFieldProps('vacationType', {
      rules: [
        { required: true, message: '请选择您的假期类型' }
      ]
    })
    const reasonProps = getFieldProps('vacationReason', {
      rules: [
        { required: true, message: '请描述请假原因' }
      ]
    })
    const vacationBeginProps = getFieldProps('vacationBegin', {
      rules: [
        {
          required: true,
          type: 'date',
          message: '请假的开始时间'
        }, {
          validator: this.checkBegin
        }
      ]
    })
    const vacationEndProps = getFieldProps('vacationEnd', {
      rules: [
        {
          required: true,
          type: 'date',
          message: '请假的结束时间'
        }
      ]
    })
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 15 }
    }
    return (
      <Form
        horizontal
        form={this.props.form}
        style={{
          height: '100%'
        }}
        >
        <div className="container">
          <FormItem
            {...formItemLayout}
            label="直接主管"
            >
            接口传的某人
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="请假类型"
            >
            <Select {...vacationTypeProps} placeholder="请选择假期类型" style={{ width: '85%' }}>
              <Option value="year">带薪年假</Option>
              <Option value="sick">病假</Option>
              <Option value="personal">事假</Option>
              <Option value="marry">婚假</Option>
              <Option value="diedWay">丧假路途假</Option>
              <Option value="checkBaby">产检假</Option>
              <Option value="lostBaby">流产假</Option>
              <Option value="baby">产假</Option>
              <Option value="feed">哺乳假</Option>
              <Option value="workInjury">工伤假</Option>
            </Select>
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 7 }}
            style={{ marginTop: '-1rem', marginBottom: '0rem' }}
            >
            <Link to="/details">
              <span className="ourColor">查看假期类型 </span> <Icon type="circle-o-right" />
            </Link>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="请假原因"
            >
            <Input
              {...reasonProps}
              type="textarea"
              rows={2}
              style={{ width: '85%' }}
              />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工作交接人"
            >
            <Input
              style={{ width: '85%' }}
              />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="开始时间"
            >
            <DatePicker {...vacationBeginProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="结束时间"
            >
            <DatePicker {...vacationEndProps} />
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 7 }}
            >
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            <Button type="ghost" style={{ marginLeft: '1rem' }} onClick={this.handleReset}>重置</Button>
          </FormItem>
        </div>
      </Form>
    )
  }
}
Ask.propTypes = {
  form: React.PropTypes.object
}
// eslint-disable-next-line
Ask = Form.create({})(Ask)

export default CSSModules(Ask, styles)
