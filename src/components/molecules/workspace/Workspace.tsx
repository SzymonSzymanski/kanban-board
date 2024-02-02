import { ChangeEvent, useCallback, useState } from 'react'

import { RootState } from '@store/store'
import { WorkspaceProps } from '.'

import { useDispatch, useSelector } from 'react-redux'
import {
  deleteWorkspace,
  saveWorkspace,
  updateNewWorkspaceName,
} from '@store/slices'

import { WorkspaceControls } from '@components/molecules/workspaceControls'
import { WorkspaceDefault } from '@assets/icons'

import styles from './Workspace.module.scss'

export const Workspace = ({ id, icon, name, isEditing }: WorkspaceProps) => {
  const [isEditingLocal, setIsEditingLocal] = useState(false)
  const [workspaceName, setWorkspaceName] = useState(name)

  const dispatch = useDispatch()
  const workspace = useSelector(
    (state: RootState) => state.board.workspaces[id]
  )

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setWorkspaceName(newValue)
      if (!isEditingLocal) {
        dispatch(updateNewWorkspaceName(newValue))
      }
    },
    [dispatch, isEditingLocal]
  )

  const handleEdit = useCallback(() => setIsEditingLocal(true), [])

  const handleRemove = useCallback(
    () => dispatch(deleteWorkspace({ workspaceId: id })),
    [dispatch, id]
  )

  const handleSave = useCallback(() => {
    setIsEditingLocal(false)
    dispatch(saveWorkspace({ ...workspace, name: workspaceName }))
  }, [dispatch, workspace, workspaceName])

  return (
    <div className={styles.root} title={workspaceName}>
      {icon ? (
        <WorkspaceDefault />
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
        <WorkspaceControls
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
