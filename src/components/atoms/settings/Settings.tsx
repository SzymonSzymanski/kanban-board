import { IconType } from '@enums'

import { Icon } from '@components/atoms/icon'

import styles from './Settings.module.scss'

export const Settings = () => {
  return (
    <button className={styles.root}>
      <Icon type={IconType.Settings} className={styles.icon} />
    </button>
  )
}
