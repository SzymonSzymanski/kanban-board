import { WorkspacesSidebar } from '@components/workspacesSidebar'

import styles from './App.module.scss'

export const App = () => {
  return (
    <div className={styles.root}>
      <WorkspacesSidebar />
    </div>
  )
}
