import { ChangeEvent, MouseEvent, useCallback, useState } from 'react'

import { RootState } from '@store/store'
import { TaskProps } from '.'

import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, updateTask } from '@store/slices'

import { Controls } from '@components/molecules/controls'

import styles from './Task.module.scss'
import { Text, TextType } from '@components/atoms/text'

export const Task = ({
  id,
  taskGroupId,
  workspaceId,
  isEditing,
}: TaskProps) => {
  const [isEditingLocal, setIsEditingLocal] = useState(false)

  const dispatch = useDispatch()

  const workspace = useSelector(
    (state: RootState) => state.board.workspaces[workspaceId]
  )

  const taskGroup = workspace.taskGroups[taskGroupId]
  const task = taskGroup.tasks[id]

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      dispatch(updateTask({ ...task, content: newValue }))
    },
    [isEditingLocal]
  )

  const handleEdit = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setIsEditingLocal(true)
  }, [])

  const handleRemove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      dispatch(deleteTask({ workspaceId, taskGroupId, taskId: id }))
    },
    [dispatch, workspaceId, taskGroupId, id]
  )

  const handleSave = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      setIsEditingLocal(false)
      dispatch(updateTask({ ...task, isEditing: false }))
    },
    [dispatch, workspace]
  )

  return (
    <div
      className={`${styles.root} ${isEditingLocal || isEditing ? styles.rootEditing : ''}`}
      title={task.content}
    >
      {isEditing || isEditingLocal ? (
        <input
          className={styles.input}
          value={task.content}
          onChange={handleInputChange}
          placeholder={
            isEditing ? 'Title of the new card...' : 'New title of the card...'
          }
          autoFocus
        />
      ) : (
        <Text className={styles.content} type={TextType.text_18_400}>
          {task.content}
        </Text>
      )}
      <Controls
        className={styles.controls}
        isEditing={isEditingLocal || isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onRemove={handleRemove}
        canSave={task.content.trim() !== ''}
      />
    </div>
  )
}
