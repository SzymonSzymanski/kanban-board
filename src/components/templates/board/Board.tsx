import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { RootState } from '@store/store'

import { useDispatch, useSelector } from 'react-redux'
import { reorderTaskGroup } from '@store/slices'

import { TaskGroup } from '@components/organisms/tasksGroup'
import { AddTaskGroupButton } from '@components/molecules/addTaskGroupButton'

import styles from './Board.module.scss'

export const Board = () => {
  const dispatch = useDispatch()

  const { workspaces, activeWorkspace: activeWorkspaceId } = useSelector(
    (state: RootState) => state.board
  )

  const activeWorkspace = workspaces[activeWorkspaceId]

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, useSensor(TouchSensor))

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = Object.keys(activeWorkspace.taskGroups).indexOf(
        active.id
      )
      const newIndex = Object.keys(activeWorkspace.taskGroups).indexOf(over.id)
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
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={Object.keys(activeWorkspace.taskGroups)}>
        <div className={styles.root}>
          {activeWorkspace && (
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
          )}
        </div>
      </SortableContext>
    </DndContext>
  )
}
