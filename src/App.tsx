import { Sidebar } from '@components/templates/sidebar'
import { Board } from '@components/templates/board'

import styles from './App.module.scss'

export const App = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Board />
    </div>
  )
}
