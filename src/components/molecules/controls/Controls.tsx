import { WorkspaceControlsProps } from '.'
import { IconType } from '@enums'

import { Icon } from '@components/atoms/icon'

import styles from './Controls.module.scss'

export const Controls = ({
  isEditing,
  onEdit,
  onSave,
  onRemove,
  canSave,
  className,
}: WorkspaceControlsProps) => (
  <div className={`${styles.root} ${className || ''}`}>
    {!isEditing && (
      <Icon
        type={IconType.Edit}
        onClick={onEdit}
        className={`${styles.icon} ${styles.edit}`}
      />
    )}
    {isEditing && canSave && (
      <Icon
        type={IconType.Save}
        onClick={onSave}
        className={`${styles.icon} ${styles.save}`}
      />
    )}
    <Icon
      type={IconType.Remove}
      onClick={onRemove}
      className={`${styles.icon} ${styles.remove}`}
    />
  </div>
)
