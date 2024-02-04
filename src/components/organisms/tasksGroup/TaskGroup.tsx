import {
  ChangeEvent,
  CSSProperties,
  MouseEvent,
  useCallback,
  useState,
} from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

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
      dispatch(
        updateTaskGroup({ ...taskGroup, name: taskGroupName, isEditing: false })
      )
    },
    [dispatch, taskGroup, taskGroupName]
  )

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      className={`${styles.root} ${isEditing ? styles.rootEditing : ''}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className={styles.header}>
        {isEditing || isEditingLocal ? (
          <input
            className={styles.input}
            value={taskGroupName}
            placeholder={
              isEditing ? 'Title of the new list...' : 'Title of the list'
            }
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
          canSave={taskGroupName.trim() !== ''}
          className={styles.controls}
        />
      </div>
      {Object.keys(taskGroup.tasks).length > 0 && (
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
        <div className={styles.addButton}>
          <AddTaskButton workspaceId={workspaceId} taskGroupId={id} />
        </div>
      )}
    </div>
  )
}
