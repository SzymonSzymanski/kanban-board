import { WorkspacesSidebar } from '@components/templates/workspacesSidebar'

import styles from './App.module.scss'

export const App = () => {
  return (
    <div className={styles.root}>
      <WorkspacesSidebar />
    </div>
  )
}
