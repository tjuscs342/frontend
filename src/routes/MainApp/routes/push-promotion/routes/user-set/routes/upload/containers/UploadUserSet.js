import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as UploadUserSetAction from './UploadUserSetAction'

import api from 'SRC/api'
import getUser from 'SRC/utils/getUser'

import Input from 'SRC/components/input-components/input/Input'
const _row = require('antd/lib/row')
const _col = require('antd/lib/col')
const _upload = require('antd/lib/upload')
const _progress = require('antd/lib/progress')

import CSSModules from 'react-css-modules'
import styles from './UploadUserSet.css'

class UploadUserSet extends Component {
  constructor(props) {
    super(props)
    this.handleUploadStatusChange = this.handleUploadStatusChange.bind(this)
    this.newProgress = this.newProgress.bind(this)
    this.changeTag = this.changeTag.bind(this)
    this.checkName = this.checkName.bind(this)
  }
  // 上传文件 和 HDFS路径 的切换
  changeTag(tagName) {
    this.props.formActions.changeTag(tagName)
  }
  // 进度条样式改变
  newProgress(value, status, isHide) {
    this.props.formActions.updateProgress(value, status, isHide)
  }
  // 上传组件的callback
  handleUploadStatusChange(info) {
    if (info.event) {
      this.newProgress(Math.floor(info.event.percent), info.file.status, false)
    }
    if (info.file.status === 'done') {
      this.newProgress(100, info.file.status, false)
    } else if (info.file.status === 'error') {
      this.newProgress(0, info.file.status, false)
    }
  }
  // 上传文件前检查是否填写了用户集名称
  checkName() {
    if (this.props.state.name === '') {
      this.props.formActions.formSet('uploadUserSet', 'name', null)
      this.newProgress(0, 'active', true)
      return false
    }
    return true
  }
  componentDidUpdate(prevProps) {
    if (prevProps.state.progressBar.status !== 'success' && this.props.state.progressBar.status === 'success') {
      setTimeout(() => {
        this.newProgress(0, 'active', true)
        this.context.router.push({
          pathname: 'my-data-set/push-promotion'
        })
      }, 1000)
    }
  }

  render() {
    const uploadProps = {
      name: 'file',
      action: api('extractUserSet:pushPromotionupload'),
      headers: {
      },
      data: {
        user: getUser().name,
        name: this.props.state.name
      },
      showUploadList: false,
      onChange: this.handleUploadStatusChange,
      beforeUpload: this.checkName
    }
    const progress = this.props.state.progressBar.progress
    const status = this.props.state.progressBar.status
    const isHide = this.props.state.progressBar.isHide
    const activeTag = this.props.state.activeTag
    const uploadText = new Map([
      ['exception', '上传失败'],
      ['active', '正在上传文件']
    ])
    return (
      <div style={{ paddingTop: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <_row style={{ height: '95px', lineHeight: '95px' }}>
          <_col style={{ height: '95px', lineHeight: '95px' }} span={4} className="fs14 fc-dark text-left">用户集名称</_col>
          <_col span={20}>
            <Input
              disableLabel
              required
              placeholer="请输入"
              value={this.props.state.name}
              onInput={this.props.formActions.formSet.bind(null, 'uploadUserSet', 'name')}
              validator={(value) => (value !== null)}
              />
          </_col>
        </_row>
        <_row>
          <_col
            span={4}
            className="fs14 fc-dark text-left h25"
            styleName={activeTag.upload ? 'activeTag' : ''}
            onClick={this.changeTag.bind(null, 'upload')}
            >上传文件
          </_col>
          {
            // <_col
            //   span={5}
            //   className="fs14 fc-dark text-left h25 pointer"
            //   styleName={activeTag.hdfsPath ? 'activeTag' : ''}
            //   onClick={this.changeTag.bind(null, 'hdfsPath')}
            //   >HDFS路径
            // </_col>
          }
        </_row>
        <div className={activeTag.upload ? '' : 'hide'}>
          <section className="fc-light" style={{ marginTop: '20px' }}>
            <p>注意：</p>
            <ol style={{ listStyleType: 'decimal', paddingLeft: '13px' }}>
              <li>请上传txt格式的文本文件，一行一个ID</li>
              <li>内容为ImeiMd5</li>
              <li>请注意文件中不要带有制表符等不可见字符</li>
            </ol>
          </section>
          <_row style={{ margin: '15px 0px' }}>
            <_col span={24}>
              <_upload {...uploadProps}>
              <div className="btn-theme1" onClick={() => this.newProgress(0, 'active', true)} >点击上传</div>
              </_upload>
            </_col>
          </_row>
          <div style={{ display: `${isHide ? 'none' : ''}` }}>
            <_progress
              percent={progress}
              status={status}
              />
            {progress === 100 ? <div><p>文件上传完成，正在进行初始化</p><p>此过程大约需要30分钟，请耐心等待～</p></div> : uploadText.get(status)}
          </div>
        </div>

        <div className={activeTag.hdfsPath ? '' : 'hide'}>
          <section className="fc-light" style={{ margin: '20px 0px' }}>
            <p>注意：内容为ImeiMd5</p>
          </section>
          <Input
            disableLabel
            required
            placeholer="请输入"
            value={this.props.state.path}
            onInput={this.props.formActions.formSet.bind(null, 'uploadUserSet', 'path')}
            validator={(value) => (value !== null)}
            />
          <div className="btn-theme1" onClick={this.newProgress.bind(null, 0, 'uploading', false)} style={{ marginTop: '6px' }}>生成用户集</div>
        </div>


      </div>
    )
  }
}

UploadUserSet.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.element,
  state: React.PropTypes.object,
  formActions: React.PropTypes.object
}
UploadUserSet.contextTypes = {
  router: React.PropTypes.object
}
function mapState(state) {
  return {
    state: state.pushPromotion.userSet.upload.toJS()
  }
}

function mapDispatch(dispatch) {
  return {
    formActions: bindActionCreators(UploadUserSetAction, dispatch)
  }
}

export default connect(mapState, mapDispatch)(CSSModules(UploadUserSet, styles))
