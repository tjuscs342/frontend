export function formSet(formCategory, formKey, values) {
  return {
    type: 'PUSH_PROMOTION@UPLOAD@FORM_SET',
    formCategory,
    formKey,
    values
  }
}

export function updateProgress(progress, status, isHide) {
  return {
    type: 'PUSH_PROMOTION@UPLOAD@UPDATE_PROGRESS',
    progress,
    status,
    isHide
  }
}

export function changeTag(tagName) {
  return {
    type: 'PUSH_PROMOTION@UPLOAD@CHANGE_TAG',
    tagName
  }
}
