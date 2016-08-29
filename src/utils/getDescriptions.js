
import { descriptionConfig } from 'SRC/configs/descriptions-config.js'
export default function getDescriptions(typeName, propName) {
  let description
  let updatePeriod
  let limitation
  for (const oneType of descriptionConfig) {
    if (oneType.typeName === typeName || oneType.typeKey === typeName) {
      description = oneType.description
      updatePeriod = oneType.updatePeriod
      limitation = oneType.limitation
      if (oneType.props) {
        for (const oneProp of oneType.props) {
          if (oneProp.propName === propName || oneProp.propKey === propName) {
            description = oneProp.description
            updatePeriod = oneProp.updatePeriod
            limitation = oneProp.limitation
          }
        }
      }
    }
  }
  return {
    description,
    updatePeriod,
    limitation
  }
}
