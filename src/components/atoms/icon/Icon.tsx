import { IconProps } from '.'
import { IconType } from '@enums'

import {
  Boards,
  Create,
  Dashboard,
  Edit,
  Profile,
  Remove,
  Save,
  Search,
  Settings,
  WorkspaceDefault,
} from '@assets/icons'

import styles from './Icon.module.scss'

export const Icon = ({ type, onClick, className }: IconProps) => {
  const renderIcon = () => {
    switch (type) {
      case IconType.Boards:
        return <Boards />
      case IconType.Create:
        return <Create />
      case IconType.Dashboard:
        return <Dashboard />
      case IconType.Edit:
        return <Edit />
      case IconType.Profile:
        return <Profile />
      case IconType.Remove:
        return <Remove />
      case IconType.Save:
        return <Save />
      case IconType.Search:
        return <Search />
      case IconType.Settings:
        return <Settings />
      case IconType.WorkspaceDefault:
        return <WorkspaceDefault />
      default:
        return null
    }
  }

  return (
    <div onClick={onClick} className={`${styles.icon} ${className || ''}`}>
      {renderIcon()}
    </div>
  )
}
