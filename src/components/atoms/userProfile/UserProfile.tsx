import { Images } from '@assets/images'

import styles from './UserProfile.module.scss'

export const UserProfile = () => {
  const user = {
    name: 'John Doe',
    image: Images.User,
  }

  return (
    <div className={styles.root}>
      <img className={styles.image} src={user.image} alt={user.name} />
      <span className={styles.name}>{user.name}</span>
    </div>
  )
}
