import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'

export function loadAuditList() {
  return (dispatch) => {
    fetchPro(api('audit:loadAuditList'))
      .then(response => response.json())
      .catch(e => console.error('audit: loadAuditList error', e))
      .then(json => {
        console.log('loadAuditList', json)
        dispatch({
          type: 'AUDIT@LOAD_TABLE',
          value: json.status ? json.data : []
        })
      })
  }
}

export function audit(auditStatus, remark) {
  return (dispatch) => {
    const formData = new FormData()
    formData.append('auditStatus', auditStatus)
    formData.append('remark', remark)
    fetchPro(api('audit:audit'), {
      method: 'PUT',
      body: formData
    })
      .then(response => response.json)
      .catch(e => console.error('audit: audit error:', e))
      .then(json => {
        console.log('audit', json)
      })
  }
}
