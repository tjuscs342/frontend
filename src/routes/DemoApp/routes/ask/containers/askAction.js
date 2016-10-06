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
    dispatch({
      type: 'ASK@SUBMIT_LOADING'
    })
    const formData = new FormData()
    formData.append('type', value.vacationType)
    formData.append('reason', value.vacationReason)
    formData.append('handover', value.vacationHandover)
    formData.append('vacationBegin', value.vacationBegin)
    formData.append('vacationEnd', value.vacationEnd)

    return fetchPro(api('ask:apply'), {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .catch((e) => {
        logger.error(e)
        return { status: 'fail', result: -1 }
      })
      .then(json => {
        console.log('json', json)
        dispatch({
          type: 'ASK@SUBMIT_DONE',
          value: json
        })
      })
  }
}
