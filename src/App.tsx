import { Sidebar } from '@components/templates/sidebar'

import styles from '@styles/App.module.scss'
import { Board } from '@components/templates/board'

export const App = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Board />
    </div>
  )
}
