import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { RootState } from '@store/store'

import { useDispatch, useSelector } from 'react-redux'
import { reorderWorkspaces } from '@store/slices'

import { Workspace } from '@components/molecules/workspace'

import styles from './WorkspacesList.module.scss'

export const WorkspacesList = () => {
  const dispatch = useDispatch()

  const { workspaces, activeWorkspace } = useSelector(
    (state: RootState) => state.board
  )

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor)
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = Object.keys(workspaces).indexOf(active.id)
      const newIndex = Object.keys(workspaces).indexOf(over.id)
      const newOrder = arrayMove(Object.keys(workspaces), oldIndex, newIndex)
      dispatch(reorderWorkspaces(newOrder))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={Object.keys(workspaces)}
        strategy={verticalListSortingStrategy}
      >
        <div className={styles.root}>
          {Object.values(workspaces).map(workspace => (
            <Workspace
              key={workspace.id}
              id={workspace.id}
              name={workspace.name}
              icon={workspace.icon}
              isActive={activeWorkspace === workspace.id}
              isEditing={workspace.isEditing}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
