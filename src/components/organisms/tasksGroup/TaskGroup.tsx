import { ChangeEvent, MouseEvent, useCallback, useState } from 'react'
import { TaskGroupProps } from '@components/organisms/tasksGroup/types'

import { RootState } from '@store/store'
import { useDispatch, useSelector } from 'react-redux'

import { Task } from '@components/molecules/task'
import { Controls } from '@components/molecules/controls'
import { AddTaskButton } from '@components/molecules/addTaskButton'

import { deleteTaskGroup, updateTaskGroup } from '@store/slices'

import styles from './TaskGroup.module.scss'

export const TaskGroup = ({ workspaceId, id, isEditing }: TaskGroupProps) => {
  const { workspaces } = useSelector((state: RootState) => state.board)

  const dispatch = useDispatch()

  const workspace = workspaces[workspaceId]

  const taskGroup = workspace.taskGroups[id]

  const [isEditingLocal, setIsEditingLocal] = useState(false)
  const [taskGroupName, setTaskGroupName] = useState(taskGroup.name)

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setTaskGroupName(newValue)
      if (!isEditingLocal) {
        dispatch(updateTaskGroup({ ...taskGroup, name: newValue }))
      }
    },
    [dispatch, isEditingLocal]
  )

  const handleEdit = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setIsEditingLocal(true)
  }, [])

  const handleRemove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      dispatch(deleteTaskGroup({ workspaceId, taskGroupId: id }))
    },
    [dispatch, id]
  )

  const handleSave = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      setIsEditingLocal(false)
      dispatch(updateTaskGroup({ ...taskGroup, name: taskGroupName }))
    },
    [dispatch, taskGroup, taskGroupName]
  )

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {isEditing || isEditingLocal ? (
          <input
            className={styles.input}
            value={taskGroupName}
            onChange={handleInputChange}
            autoFocus
          />
        ) : (
          <p className={styles.name}>{taskGroup.name}</p>
        )}
        <Controls
          isEditing={isEditingLocal || isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onRemove={handleRemove}
          canSave={taskGroupName.trim() !== '' && !isEditing}
          className={styles.controls}
        />
      </div>
      {taskGroup.tasks && (
        <div className={styles.tasks}>
          {Object.values(taskGroup.tasks).map(task => (
            <Task
              key={task.id}
              id={task.id}
              taskGroupId={task.taskGroupId}
              workspaceId={task.workspaceId}
              content={task.content}
              isEditing={task.isEditing}
            />
          ))}
        </div>
      )}
      {!isEditing && (
        <AddTaskButton workspaceId={workspaceId} taskGroupId={id} />
      )}
    </div>
  )
}
