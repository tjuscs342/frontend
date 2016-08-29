export function formSet(formCategory, formKey, values) {
  return {
    type: 'USER_PROFILE@UPLOAD@FORM_SET',
    formCategory,
    formKey,
    values
  }
}

export function updateProgress(progress, status, isHide) {
  return {
    type: 'USER_PROFILE@UPLOAD@UPDATE_PROGRESS',
    progress,
    status,
    isHide
  }
}

export function changeTag(tagName) {
  return {
    type: 'USER_PROFILE@UPLOAD@CHANGE_TAG',
    tagName
  }
}
