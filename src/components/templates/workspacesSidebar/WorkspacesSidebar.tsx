import { WorkspacesHeader } from '@components/organisms/workspacesHeader'
import { UserProfile } from '@components/atoms/userProfile'
import { WorkspaceSettings } from '@components/atoms/workspaceSettings'

import styles from './WorkspacesSidebar.module.scss'

export const WorkspacesSidebar = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <WorkspacesHeader />
      </div>
      <div className={styles.main}></div>
      <div className={styles.footer}>
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  )
}
