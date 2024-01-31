import { WorkspaceProps } from '@types'

import { Edit, Remove, WorkspaceDefault } from '@assets/icons'

import styles from './Workspace.module.scss'

export const Workspace = ({
  icon,
  name,
  isEditing,
  onNameChange,
}: WorkspaceProps) => {
  return (
    <div className={styles.root} title={name}>
      {icon && <WorkspaceDefault />}
      {!icon && (
        <span className={styles.icon}>{name.charAt(0).toUpperCase()}</span>
      )}
      {isEditing ? (
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Workspace name"
          autoFocus
        />
      ) : (
        <span className={styles.name}>{name}</span>
      )}
      {!isEditing && (
        <div className={styles.controls}>
          <Edit className={`${styles.controlIcon} ${styles.edit}`} />
          <Remove className={`${styles.controlIcon} ${styles.remove}`} />
        </div>
      )}
    </div>
  )
}
