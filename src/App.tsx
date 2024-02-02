import { Sidebar } from '@components/templates/sidebar'

import styles from './App.module.scss'

export const App = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
    </div>
  )
}
