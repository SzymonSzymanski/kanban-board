import { Sidebar } from '@components/templates/sidebar'
import { Board } from '@components/templates/board'

import styles from '@styles/App.module.scss'

export const App = () => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <Board />
    </div>
  )
}
