import { IconType } from './IconTypes'

import { Add } from './components/add'
import { Remove } from './components/remove'
import { Edit } from './components/edit'
import { Save } from './components/save'

import './Icon.scss'

interface PropInterface {
  type: IconType
}

export const Icon = ({ type }: PropInterface) => {
  const renderIcon = () => {
    switch (type) {
      case IconType.Add:
        return <Add />
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

  return <div className="icon">{renderIcon()}</div>
}
