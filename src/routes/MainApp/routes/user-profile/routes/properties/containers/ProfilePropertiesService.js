export function getMenuItems(config, id) {
  const menuItems = []
  for (let i = 0; i < config.length; i += 2) {
    menuItems.push({
      key: `${i}`,
      name: !config[i + 1] ? config[i].name : `${config[i].name} / ${config[i + 1].name}`,
      link: {
        pathname: `/user-profile/properties/${i}`,
        query: { id }
      }
    })
  }
  return menuItems
}

export function getTagConfigFromState(state, actions) {
  const { config, form } = state
  const tagsConfigs = {}
  Object.keys(config).forEach(category => {
    tagsConfigs[category] = {
      name: config[category].name,
      tagsConfig: (form[category] || []).map(el => (
        {
          label: el.name,
          onDelete: actions.formDelete.bind(null, category, el.key)
        }
      ))
    }
  })
  return tagsConfigs
}

export function isAllPropertiesSelected(state) {
  const { form, config } = state
  if (Object.keys(form).length !== config.length) return false
  let flag = true
  config.forEach((category, index) => {
    if (category.valuePool.length !== form[index].length) flag = false
  })
  return flag
}

export function calTotalPrice(state) {
  const { form } = state
  let totalPrice = 0
  Object.keys(form).forEach(category => {
    totalPrice += form[category].reduce((total, x) => (total + x.price), 0)
  })
  return totalPrice
}

export function convertFormState(state) {
  const { form } = state
  const tags = []
  Object.keys(form).forEach(category => {
    for (const item of form[category]) {
      tags.push(item.id)
    }
  })
  return tags.join(',')
}
