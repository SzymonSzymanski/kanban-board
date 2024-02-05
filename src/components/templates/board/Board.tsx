import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { RootState } from '@store/store'

import { useDispatch, useSelector } from 'react-redux'
import { reorderTaskGroup } from '@store/slices'

import { useDnDSetup } from '@hooks'

import { TaskGroup } from '@components/organisms/tasksGroup'
import { AddTaskGroupButton } from '@components/molecules/addTaskGroupButton'

import styles from './Board.module.scss'

export const Board = () => {
  const dispatch = useDispatch()

  const { workspaces, activeWorkspace: activeWorkspaceId } = useSelector(
    (state: RootState) => state.board
  )

  const activeWorkspace = workspaces[activeWorkspaceId]

  const onDragEnd = (activeId: string, overId: string) => {
    const oldIndex = Object.keys(activeWorkspace.taskGroups).indexOf(activeId)
    const newIndex = Object.keys(activeWorkspace.taskGroups).indexOf(overId)
    const newTaskGroupIds = arrayMove(
      Object.keys(activeWorkspace.taskGroups),
      oldIndex,
      newIndex
    )

    dispatch(
      reorderTaskGroup({
        workspaceId: activeWorkspaceId,
        taskGroupIds: newTaskGroupIds,
      })
    )
  }

  const { sensors, handleDragEnd } = useDnDSetup({ onDragEnd })

  if (!activeWorkspace) {
    return null
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={Object.keys(activeWorkspace.taskGroups)}>
        <div className={styles.root}>
          <>
            {Object.values(activeWorkspace.taskGroups).map(taskGroup => (
              <TaskGroup
                key={taskGroup.id}
                id={taskGroup.id}
                workspaceId={taskGroup.workspaceId}
                isEditing={taskGroup.isEditing}
              />
            ))}
            {!activeWorkspace.isEditing && (
              <div className={styles.addButton}>
                <AddTaskGroupButton workspaceId={activeWorkspaceId} />
              </div>
            )}
          </>
        </div>
      </SortableContext>
    </DndContext>
  )
}
