import { IconType } from '@enums'

import { Create, Edit, Remove, Save } from '@assets/icons'

import styles from './Icon.module.scss'

interface PropInterface {
  type: IconType
}

export const Icon = ({ type }: PropInterface) => {
  const renderIcon = () => {
    switch (type) {
      case IconType.Create:
        return <Create />
      case IconType.Remove:
        return <Remove />
      case IconType.Edit:
        return <Edit />
      case IconType.Save:
        return <Save />
      default:
        return null
    }
  }

  return <div className={styles.icon}>{renderIcon()}</div>
}
