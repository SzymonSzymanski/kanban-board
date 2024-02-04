import { WorkspacesList } from '@components/organisms/workspacesList'
import { AddWorkspaceButton } from '@components/molecules/addWorkspaceButton'

import styles from './WorkspacesHeader.module.scss'

export const WorkspacesHeader = () => {
  return (
    <div className={styles.root}>
      <WorkspacesList />
      <AddWorkspaceButton />
    </div>
  )
}
