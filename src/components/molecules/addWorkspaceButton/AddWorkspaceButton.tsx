import { WorkspaceInterface } from '@store/types.ts'
import { ButtonType } from '.'
import { IconType } from '@enums'

import { v4 as uuidv4 } from 'uuid'

import {
  addWorkspace,
  addWorkspaceIdToOrder,
  selectAllWorkspaces,
  setActiveWorkspaceId,
  updateWorkspace,
} from '@store/slices'
import { useDispatch, useSelector } from 'react-redux'

import { Text, TextType } from '@components/atoms/text'
import { Icon } from '@components/atoms/icon'

import styles from './AddWorkspaceButton.module.scss'

export const AddWorkspaceButton = () => {
  const dispatch = useDispatch()

  const workspaces = useSelector(selectAllWorkspaces)

  const editingWorkspace = workspaces.find(
    (workspace: WorkspaceInterface) => workspace.isEditing
  )

  const canSave = editingWorkspace?.name.trim()

  const handleClick = () => {
    if (canSave && editingWorkspace) {
      dispatch(
        updateWorkspace({
          id: editingWorkspace.id,
          changes: { isEditing: false },
        })
      )
    }

    if (!canSave && !editingWorkspace) {
      const newWorkspaceId = uuidv4()
      dispatch(setActiveWorkspaceId(newWorkspaceId))
      dispatch(addWorkspaceIdToOrder(newWorkspaceId))
      dispatch(
        addWorkspace({
          id: newWorkspaceId,
          name: '',
          icon: false,
          isEditing: true,
          taskGroupOrderIds: [],
        })
      )
    }
  }

  return (
    <button
      className={`${styles.root} ${canSave ? styles.rootSave : ''}`}
      onClick={handleClick}
      disabled={editingWorkspace && !canSave}
    >
      {!editingWorkspace ? (
        <Icon type={IconType.Create} />
      ) : (
        <Icon type={IconType.Save} />
      )}
      <Text type={TextType.text_20_600}>
        {!editingWorkspace ? ButtonType.Create : ButtonType.Save}
      </Text>
    </button>
  )
}
