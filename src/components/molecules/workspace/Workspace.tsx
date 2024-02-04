import { ChangeEvent, MouseEvent, useCallback, useState } from 'react'

import { RootState } from '@store/store'
import { WorkspaceProps } from '.'
import { IconType } from '@enums'

import { useDispatch, useSelector } from 'react-redux'
import {
  deleteWorkspace,
  setActiveWorkspace,
  updateWorkspace,
} from '@store/slices'

import { Icon } from '@components/atoms/icon'
import { Controls } from '@components/molecules/controls'

import styles from './Workspace.module.scss'

export const Workspace = ({
  id,
  icon,
  name,
  isActive,
  isEditing,
}: WorkspaceProps) => {
  const [isEditingLocal, setIsEditingLocal] = useState(false)
  const [workspaceName, setWorkspaceName] = useState(name)

  const workspace = useSelector(
    (state: RootState) => state.board.workspaces[id]
  )

  const dispatch = useDispatch()

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setWorkspaceName(newValue)
      if (!isEditingLocal) {
        dispatch(updateWorkspace({ ...workspace, name: newValue }))
      }
    },
    [dispatch, isEditingLocal]
  )

  const handleEdit = useCallback(() => {
    setIsEditingLocal(true)
  }, [])

  const handleRemove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      dispatch(deleteWorkspace({ workspaceId: id }))
    },
    [dispatch, id]
  )

  const handleSave = useCallback(() => {
    setIsEditingLocal(false)
    dispatch(
      updateWorkspace({ ...workspace, name: workspaceName, isEditing: false })
    )
  }, [dispatch, workspace, workspaceName])

  const handleSetActiveWorkspace = (id: string) => {
    dispatch(setActiveWorkspace(id))
  }

  return (
    <div
      onClick={() => handleSetActiveWorkspace(id)}
      className={`${styles.root} ${isActive ? styles.rootActive : ''}`}
      title={workspaceName}
    >
      {icon ? (
        <Icon type={IconType.WorkspaceDefault} />
      ) : (
        <span className={styles.icon}>
          {workspaceName.charAt(0).toUpperCase()}
        </span>
      )}
      {isEditing || isEditingLocal ? (
        <input
          className={styles.input}
          value={workspaceName}
          onChange={handleInputChange}
          autoFocus
        />
      ) : (
        <span className={styles.name}>{workspaceName}</span>
      )}
      {!isEditing && (
        <Controls
          className={styles.controls}
          isEditing={isEditingLocal}
          onEdit={handleEdit}
          onSave={handleSave}
          onRemove={handleRemove}
          canSave={workspaceName.trim() !== ''}
        />
      )}
    </div>
  )
}
