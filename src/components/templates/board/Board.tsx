import { useMemo } from 'react'

import { RootState } from '@store/store.ts'
import { TaskGroupInterface } from '@store/types.ts'

import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { closestCenter, DndContext } from '@dnd-kit/core'

import { useDispatch, useSelector } from 'react-redux'
import {
  reorderTaskGroup,
  selectActiveWorkspaceId,
  selectAllTaskGroups,
  selectWorkspaceById,
} from '@store/slices'

import { useDnDSetup } from '@hooks'

import { TaskGroup } from '@components/organisms/taskGroup'
import { AddTaskGroupButton } from '@components/molecules/addTaskGroupButton'

import styles from './Board.module.scss'

export const Board = () => {
  const dispatch = useDispatch()

  const activeWorkspaceId = useSelector(selectActiveWorkspaceId)

  const activeWorkspace = useSelector((state: RootState) =>
    activeWorkspaceId ? selectWorkspaceById(state, activeWorkspaceId) : null
  )
  const taskGroups = useSelector(selectAllTaskGroups)

  const sortedTaskGroups = useMemo(() => {
    if (!activeWorkspace || !activeWorkspace.taskGroupOrderIds) return []
    return activeWorkspace.taskGroupOrderIds
      .map(taskGroupId => taskGroups.find(group => group.id === taskGroupId))
      .filter((taskGroup): taskGroup is TaskGroupInterface =>
        Boolean(taskGroup)
      )
  }, [taskGroups, activeWorkspace?.taskGroupOrderIds])

  const onDragEnd = (activeId: string, overId: string) => {
    if (!activeWorkspaceId) return

    const oldIndex = sortedTaskGroups.findIndex(
      taskGroup => taskGroup.id === activeId
    )
    const newIndex = sortedTaskGroups.findIndex(
      taskGroup => taskGroup.id === overId
    )

    if (oldIndex !== -1 && newIndex !== -1) {
      const newOrder = arrayMove(
        sortedTaskGroups.map(taskGroup => taskGroup.id),
        oldIndex,
        newIndex
      )
      dispatch(
        reorderTaskGroup({
          workspaceId: activeWorkspaceId,
          taskGroupOrderIds: newOrder,
        })
      )
    }
  }

  const { sensors, handleDragEnd } = useDnDSetup({ onDragEnd })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={sortedTaskGroups.map(group => group.id)}>
        <div className={styles.root}>
          {sortedTaskGroups.map(taskGroup => (
            <TaskGroup
              key={taskGroup.id}
              id={taskGroup.id}
              isEditing={taskGroup.isEditing}
            />
          ))}
          {activeWorkspaceId && (
            <div className={styles.addButton}>
              <AddTaskGroupButton workspaceId={activeWorkspaceId} />
            </div>
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}
