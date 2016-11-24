import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import logger from 'SRC/utils/logger'

export function hiddenModal() {
  return {
    type: 'ASK@HIDDEN_MODAL'
  }
}

export function submit(value) {
  return (dispatch) => {
    // dispatch({
    //   type: 'ASK@SUBMIT_LOADING'
    // })
    const formData = new FormData()
    formData.append('type', value.type)
    formData.append('reason', value.reason)
    formData.append('handOver', value.handOver)
    formData.append('start', value.start)
    formData.append('end', value.end)
    if (value.applyId) {
      formData.append('applyId', value.applyId)
      fetchPro(api('ask:modify'), {
        credentials: 'include',
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .catch((e) => {
        logger.error(e)
      })
      .then(json => {
        console.log('json', json)
        dispatch({
          type: 'ASK@SUBMIT_DONE',
          value: json
        })
      })
      if (value.type === '7') {
        const formData2 = new FormData()
        formData2.append('applyId', value.applyId)
        formData2.append('type', value.start2 && value.end2 ? '8' : '9')
        formData2.append('reason', value.reason)
        formData2.append('handOver', value.handOver)
        formData2.append('start', value.start2 ? value.start2 : value.start)
        formData2.append('end', value.end2 ? value.end2 : value.end)
        if (value.applyId) {
          formData2.append('applyId', value.applyId)
        }
        fetchPro(api('ask:modify'), {
          method: 'POST',
          body: formData2
        })
        .then(response => response.json())
        .catch(e => console.error('type 7 error: ', e))
        .then(json => {
        })
      }
    } else {
      fetchPro(api('ask:apply'), {
        credentials: 'include',
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .catch((e) => {
        logger.error(e)
      })
      .then(json => {
        dispatch({
          type: 'ASK@SUBMIT_DONE',
          value: json
        })
      })
      if (value.type === '7') {
        const formData2 = new FormData()
        formData2.append('type', value.start2 && value.end2 ? '8' : '9')
        formData2.append('reason', value.reason)
        formData2.append('handOver', value.handOver)
        formData2.append('start', value.start2 ? value.start2 : value.start)
        formData2.append('end', value.end2 ? value.end2 : value.end)
        if (value.applyId) {
          formData2.append('applyId', value.applyId)
        }
        fetchPro(api('ask:apply'), {
          method: 'POST',
          body: formData2
        })
        .then(response => response.json())
        .catch(e => console.error('type 7 error: ', e))
        .then(json => {
        })
      }
    }
  }
}
