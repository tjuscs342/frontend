import fetchPro from 'SRC/utils/fetchPro'
import api from 'SRC/api'
import logger from 'SRC/utils/logger'

export function loadUserInfo() {
  return (dispatch) => (
    fetchPro(api('me:getUserInfo'))
      .then(response => response.json())
      .catch((e) => {
        logger.error(e)
        return { status: 'fail', result: -1 }
      })
      .then(json => {
        dispatch({
          type: 'ME@LOAD_USER_INFO',
          value: json
        })
      })
  )
}
