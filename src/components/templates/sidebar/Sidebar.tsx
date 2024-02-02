import { WorkspacesHeader } from '@components/organisms/workspacesHeader'
import { Tabs } from '@components/organisms/tabs'
import { UserProfile } from '@components/atoms/userProfile'
import { Settings } from '@components/atoms/settings'

import styles from './Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <WorkspacesHeader />
      </div>
      <div className={styles.main}>
        <Tabs />
      </div>
      <div className={styles.footer}>
        <UserProfile />
        <Settings />
      </div>
    </div>
  )
}
