import { Settings } from '@assets/icons'

import styles from './WorkspaceSettings.module.scss'

export const WorkspaceSettings = () => {
  return (
    <button className={styles.root}>
      <Settings />
    </button>
  )
}
