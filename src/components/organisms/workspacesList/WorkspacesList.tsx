import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { RootState } from '@store/store'

import { useDispatch, useSelector } from 'react-redux'
import { reorderWorkspaces } from '@store/slices'

import { useDnDSetup } from '@hooks'

import { Workspace } from '@components/molecules/workspace'

import styles from './WorkspacesList.module.scss'

export const WorkspacesList = () => {
  const dispatch = useDispatch()

  const { workspaces, activeWorkspace } = useSelector(
    (state: RootState) => state.board
  )

  const onDragEnd = (activeId: string, overId: string) => {
    const oldIndex = Object.keys(workspaces).indexOf(activeId)
    const newIndex = Object.keys(workspaces).indexOf(overId)
    const newOrder = arrayMove(Object.keys(workspaces), oldIndex, newIndex)

    dispatch(reorderWorkspaces(newOrder))
  }

  const { sensors, handleDragEnd } = useDnDSetup({ onDragEnd })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={Object.keys(workspaces)}>
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
