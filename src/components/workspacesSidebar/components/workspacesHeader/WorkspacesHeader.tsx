import { WorkspacesList } from './components/workspacesList'
import { AddWorkspaceButton } from './components/addWorkspaceButton'

import styles from './WorkspacesHeader.module.scss'

export const WorkspacesHeader = () => {
  return (
    <div className={styles.root}>
      <WorkspacesList />
      <AddWorkspaceButton />
    </div>
  )
}
