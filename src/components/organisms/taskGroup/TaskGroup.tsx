import {
  ChangeEvent,
  CSSProperties,
  memo,
  MouseEvent,
  useCallback,
  useMemo,
  useState,
} from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { RootState } from '@store/store.ts'
import { TaskGroupProps } from '.'

import { useDispatch, useSelector } from 'react-redux'
import {
  removeTaskGroup,
  selectAllTasks,
  selectTaskGroupById,
  updateTaskGroup,
} from '@store/slices'

import { Controls } from '@components/molecules/controls'
import { Task } from '@components/molecules/task'
import { AddTaskButton } from '@components/molecules/addTaskButton'

import styles from './TaskGroup.module.scss'

export const TaskGroup = memo(({ id, isEditing }: TaskGroupProps) => {
  const dispatch = useDispatch()

  const taskGroup = useSelector((state: RootState) =>
    selectTaskGroupById(state, id)
  )

  if (!taskGroup) return null

  const allTasks = useSelector(selectAllTasks)

  const tasks = useMemo(
    () => allTasks.filter(task => task.taskGroupId === id),
    [allTasks, id]
  )

  const [isEditingLocal, setIsEditingLocal] = useState(false)
  const [taskGroupName, setTaskGroupName] = useState(taskGroup.name)

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTaskGroupName(event.target.value)
    },
    []
  )

  const handleEdit = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    setIsEditingLocal(true)
  }, [])

  const handleRemove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      dispatch(removeTaskGroup(id))
    },
    [dispatch, id]
  )

  const handleSave = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      setIsEditingLocal(false)
      if (taskGroupName !== taskGroup.name) {
        dispatch(
          updateTaskGroup({
            id,
            changes: { name: taskGroupName, isEditing: false },
          })
        )
      }
    },
    [dispatch, id, taskGroupName, taskGroup.name]
  )

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const transformWithoutScale = {
    x: transform?.x ?? 0,
    y: transform?.y ?? 0,
    scaleX: 1,
    scaleY: 1,
  }

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transformWithoutScale),
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
          <p className={styles.name}>{taskGroupName}</p>
        )}
        <Controls
          className={styles.controls}
          isEditing={isEditingLocal || isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onRemove={handleRemove}
          canSave={taskGroupName.trim() !== ''}
        />
      </div>
      {tasks.length > 0 && (
        <div className={styles.tasks}>
          {tasks.map(task => (
            <Task
              key={task.id}
              id={task.id}
              taskGroupId={task.taskGroupId}
              content={task.content}
              isEditing={task.isEditing}
            />
          ))}
        </div>
      )}
      {!isEditing && (
        <div className={styles.addButton}>
          <AddTaskButton taskGroupId={id} />
        </div>
      )}
    </div>
  )
})
