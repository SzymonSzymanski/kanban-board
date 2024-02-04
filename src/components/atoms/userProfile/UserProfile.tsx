import { userMock } from '.'

import styles from './UserProfile.module.scss'
import { Text, TextType } from '@components/atoms/text'

export const UserProfile = () => {
  return (
    <div className={styles.root}>
      <img className={styles.image} src={userMock.image} alt={userMock.name} />
      <Text type={TextType.text_18_600} className={styles.name}>
        {userMock.name}
      </Text>
    </div>
  )
}
