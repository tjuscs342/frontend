/* vim: set filetype=javascript.jsx */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './ask.css'
import { Select, Button, DatePicker, Form, Icon, Input, Radio } from 'antd'
const Option = Select.Option
import moment from 'moment'
const Modal = require('antd/lib/modal')
import { Link } from 'react-router'
const FormItem = Form.Item
import * as askActions from './askAction.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { vocationType } from 'SRC/utils/constMaps'
import { getCookie } from 'SRC/utils/cookie'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

class Ask extends Component {
  constructor(props) {
    super(props)
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkBegin = this.checkBegin.bind(this)
    this.checkEnd = this.checkEnd.bind(this)
    this.showModal = this.showModal.bind(this)
    this.state = {
      start: moment().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
      vocationType: '1',
      compensationType: '8',
      compensationTimeStart: moment().format('YYYY-MM-DD'),
      compensationTimeEnd: moment().format('YYYY-MM-DD')
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.state.isShowingModal && this.props.state.isShowingModal) {
      this.showModal()
    }
  }
  showModal() {
    if (this.props.state.msg === 'success') {
      Modal.success({
        width: '90%',
        title: this.props.location.query.type ? '修改成功' : '提交成功',
        onOk: () => {
          this.props.actions.hiddenModal()
          this.context.router.push({
            pathname: '/history'
          })
        }
      })
    } else {
      Modal.error({
        title: '错误',
        width: '90%',
        content:
          <div>
            <p>{this.props.state.msg}</p>
          </div>,
        onOk: () => {
          this.props.actions.hiddenModal()
        }
      })
    }
  }
  handleReset(e) {
    e.preventDefault()
    this.props.form.resetFields()
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, formValues) => {
      if (!!errors) {
        return
      }
      const values = formValues
      values.start = this.state.start
      values.end = this.state.end
      values.handOver = this.context.bossName
      values.type = this.state.vocationType
      if (values.type === '7' && this.state.compensationType === '8') {
        values.start2 = this.state.compensationTimeStart
        values.end2 = this.state.compensationTimeEnd
      }
      if (this.props.location.query.modifyId) {
        values.applyId = this.props.location.query.modifyId
      }
      this.props.actions.submit(values)
    })
  }
  checkBegin(rule, value, callback) {
    if (value && value.getTime() + 86400000 < Date.now()) {
      callback(new Error('这天已经过去了!'))
    } else {
      if (value) {
        this.setState({
          start: moment(value.getTime()).format('YYYY-MM-DD')
        })
      }
      callback()
    }
  }
  checkEnd(rule, value, callback) {
    const stringDate = moment(value.getTime()).format('YYYY-MM-DD')
    console.log(this.state.start, stringDate)
    if (value && value.getTime() + 86400000 < Date.now()) {
      callback(new Error('这天已经过去了!'))
    } else if (this.state.start.localeCompare(stringDate) > 0) {
      callback(new Error('不能晚于开始日期'))
    } else {
      if (value) {
        this.setState({
          end: stringDate
        })
      }
      callback()
    }
  }
  render() {
    const { getFieldProps } = this.props.form
    const reasonProps = getFieldProps('reason', {
      rules: [
        { required: true, message: '请描述原因' }
      ]
    })
    const vacationBeginProps = getFieldProps('start', {
      rules: [
        {
          required: true,
          type: 'date',
          message: '开始时间'
        }, {
          validator: this.checkBegin
        }
      ]
    })
    // if (vacationBeginProps.value === undefined) {
    //   vacationBeginProps.onChange(this.state.start)
    // }
    const vacationEndProps = getFieldProps('end', {
      rules: [
        {
          required: true,
          type: 'date',
          message: '结束时间'
        }, {
          validator: this.checkEnd
        }
      ]
    })
    // if (vacationEndProps.value === undefined) {
    //   vacationEndProps.onChange(this.state.end)
    // }
    const leaderProps = getFieldProps('leader', {
      rules: [
        {
          required: false,
          message: '必填'
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
          padding: '20px 10px',
          height: '100%',
          overflow: 'auto',
          position: 'relative'
        }}
        >
        <div>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                类型
              </span>
            }
            >
            <Select
              placeholder="请选择请假类型或加班"
              defaultValue={this.props.location.query.type ? this.props.location.query.type : '1'}
              disabled={this.props.location.query.type ? true : false}
              style={{ width: '85%' }}
              onChange={(value) => {
                this.setState({
                  vocationType: value
                })
              }}
              >
              {
                Object.keys(vocationType).map(key => (
                  <Option value={key}>{vocationType[key]}</Option>
                ))
              }
            </Select>
            <Link to="/details"> <Icon type="question-circle-o" className="ourColor" /></Link>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="原由"
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
            label="开始时间"
            >
            <DatePicker {...vacationBeginProps}  />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="结束时间"
            >
            <DatePicker {...vacationEndProps} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="直接主管"
            >
            <Input
              {...leaderProps}
              disabled
              value={getCookie('boss')}
              style={{ width: '85%' }}
              />
          </FormItem>
          {
            this.state.vocationType === '7' ?
              <FormItem
                {...formItemLayout}
                label="加班补偿方式"
                >
                <RadioGroup
                  defaultValue="8"
                  onChange={(e) => {
                    this.setState({
                      compensationType: e.target.value
                    })
                  }}
                  >
                  <RadioButton value="8">调休</RadioButton>
                  <RadioButton value="9">双薪</RadioButton>
                </RadioGroup>
              </FormItem>
            :
              ''
          }
          {
            this.state.compensationType === '8' && this.state.vocationType === '7' ?
              <div>
                <FormItem
                  {...formItemLayout}
                  label="调休开始时间"
                  >
                  <DatePicker
                    value={this.state.compensationTimeStart}
                    onChange={(date, dateString) => {
                      this.setState({
                        compensationTimeStart: dateString
                      })
                    }}
                    />
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="调休结束时间"
                  >
                  <DatePicker
                    value={this.state.compensationTimeEnd}
                    onChange={(date, dateString) => {
                      this.setState({
                        compensationTimeEnd: dateString
                      })
                    }}
                    />
                </FormItem>
              </div>
            :
              ''
          }
          <FormItem
            wrapperCol={{ span: 12, offset: 7 }}
            >
            <Button type="primary" onClick={this.handleSubmit} loading={this.props.state.isSubmitLoading} >确定</Button>
            <Button type="ghost" style={{ marginLeft: '1rem' }} onClick={this.handleReset}>重置</Button>
          </FormItem>
        </div>
      </Form>
    )
  }
}
Ask.propTypes = {
  form: React.PropTypes.object,
  state: React.PropTypes.object,
  location: React.PropTypes.object,
  actions: React.PropTypes.object
}
Ask.contextTypes = {
  router: React.PropTypes.object,
  bossName: React.PropTypes.object
}
// eslint-disable-next-line
Ask = Form.create({})(Ask)

function mapState(state) {
  return {
    state: state.ask.toJS()
  }
}
function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(askActions, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(Ask, styles))
