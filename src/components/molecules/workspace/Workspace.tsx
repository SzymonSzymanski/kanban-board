import {
  ChangeEvent,
  CSSProperties,
  memo,
  MouseEvent,
  useCallback,
  useState,
} from 'react'

import { WorkspaceProps } from '.'
import { IconType } from '@enums'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useDispatch, useSelector } from 'react-redux'
import {
  removeWorkspace,
  selectActiveWorkspaceId,
  selectWorkspaceOrder,
  setActiveWorkspaceId,
  updateWorkspace,
  updateWorkspaceOrder,
} from '@store/slices'

import { Icon } from '@components/atoms/icon'
import { Controls } from '@components/molecules/controls'

import styles from './Workspace.module.scss'

export const Workspace = memo(
  ({ id, icon, name, isActive, isEditing }: WorkspaceProps) => {
    const dispatch = useDispatch()

    const [isEditingLocal, setIsEditingLocal] = useState(false)
    const [workspaceName, setWorkspaceName] = useState(name)

    const workspaceOrder = useSelector(selectWorkspaceOrder)

    const activeWorkspaceId = useSelector(selectActiveWorkspaceId)

    const handleInputChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setWorkspaceName(value)

        if (!isEditingLocal && (value.length === 0 || value.length === 1)) {
          dispatch(updateWorkspace({ id, changes: { name: value } }))
        }
      },
      [dispatch, id, isEditingLocal]
    )

    const handleEdit = useCallback(() => {
      setIsEditingLocal(true)
    }, [])

    const handleRemove = useCallback(
      (event: MouseEvent) => {
        event.stopPropagation()

        const currentIndex = workspaceOrder.indexOf(id)

        let newActiveWorkspaceId = null

        if (currentIndex > 0) {
          newActiveWorkspaceId = workspaceOrder[currentIndex - 1]
        } else if (workspaceOrder.length > 1) {
          newActiveWorkspaceId = workspaceOrder[currentIndex + 1]
        }
        const updatedWorkspaceOrder = workspaceOrder.filter(
          workspaceId => workspaceId !== id
        )

        dispatch(removeWorkspace(id))
        dispatch(updateWorkspaceOrder(updatedWorkspaceOrder))
        dispatch(setActiveWorkspaceId(newActiveWorkspaceId))
      },
      [dispatch, id, workspaceOrder]
    )

    const handleSave = useCallback(() => {
      setIsEditingLocal(false)

      if (workspaceName !== name) {
        dispatch(
          updateWorkspace({
            id,
            changes: { name: workspaceName, isEditing: false },
          })
        )
      }
    }, [dispatch, id, workspaceName, name])

    const handleSaveOnBlur = useCallback(() => {
      if (workspaceName !== name) {
        dispatch(
          updateWorkspace({
            id,
            changes: { name: workspaceName },
          })
        )
      }
    }, [dispatch, id, workspaceName, name])

    const handleSetActiveWorkspace = (id: string) => {
      if (activeWorkspaceId !== id) {
        dispatch(setActiveWorkspaceId(id))
      }
    }

    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id })

    const style: CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
    }

    return (
      <div
        onClick={() => handleSetActiveWorkspace(id)}
        className={`${styles.root} ${isActive ? styles.rootActive : ''}`}
        title={workspaceName}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {icon ? (
          <Icon type={IconType.WorkspaceDefault} />
        ) : (
          <span className={styles.icon}>
            {workspaceName.charAt(0).toUpperCase()}
          </span>
        )}
        {(isEditing || isEditingLocal) && (
          <input
            className={styles.input}
            value={workspaceName}
            onChange={handleInputChange}
            onBlur={handleSaveOnBlur}
            autoComplete="off"
            autoFocus
          />
        )}
        {!isEditing && !isEditingLocal && (
          <span className={styles.name}>{workspaceName}</span>
        )}
        {!isEditing && (
          <Controls
            className={styles.controls}
            isEditing={isEditingLocal}
            onEdit={handleEdit}
            onSave={handleSave}
            onRemove={handleRemove}
            canSave={workspaceName.trim() !== ''}
          />
        )}
      </div>
    )
  }
)
