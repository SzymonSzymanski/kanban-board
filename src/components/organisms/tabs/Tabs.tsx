import { tabsMock } from '.'

import { Icon } from '@components/atoms/icon'

import styles from './Tabs.module.scss'

export const Tabs = () => {
  return (
    <ul className={styles.root}>
      {tabsMock.map(({ id, icon, name, isActive }) => (
        <li
          key={id}
          className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
        >
          <Icon type={icon} />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  )
}
