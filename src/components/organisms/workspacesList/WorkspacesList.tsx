import { useCallback } from 'react'

import { closestCenter, DndContext } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'

import { useDispatch, useSelector } from 'react-redux'
import { selectActiveWorkspaceId, updateWorkspaceOrder } from '@store/slices'

import { useDnDSetup, useOrderedWorkspaces } from '@hooks'

import { Workspace } from '@components/molecules/workspace'

import styles from './WorkspacesList.module.scss'

export const WorkspacesList = () => {
  const dispatch = useDispatch()

  const activeWorkspaceId = useSelector(selectActiveWorkspaceId)

  const displayedWorkspaces = useOrderedWorkspaces()

  const onDragEnd = useCallback(
    (activeId: string, overId: string) => {
      const oldIndex = displayedWorkspaces.findIndex(
        workspace => workspace.id === activeId
      )
      const newIndex = displayedWorkspaces.findIndex(
        workspace => workspace.id === overId
      )

      if (oldIndex !== -1 && newIndex !== -1) {
        let newOrder = displayedWorkspaces.map(workspace => workspace.id)
        newOrder = arrayMove(newOrder, oldIndex, newIndex)
        dispatch(updateWorkspaceOrder(newOrder))
      }
    },
    [dispatch, displayedWorkspaces]
  )

  const { sensors, handleDragEnd } = useDnDSetup({ onDragEnd })

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={displayedWorkspaces.map(w => w.id)}>
        <div className={styles.root}>
          {displayedWorkspaces.map(workspace => (
            <Workspace
              key={workspace.id}
              id={workspace.id}
              name={workspace.name}
              icon={workspace.icon}
              isActive={activeWorkspaceId === workspace.id}
              isEditing={workspace.isEditing}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}
