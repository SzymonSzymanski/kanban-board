import { RootState } from '@store/store'
import { ButtonType, ButtonTypes } from '.'
import { IconType } from '@enums'

import { useDispatch, useSelector } from 'react-redux'
import { addTaskGroup, updateTaskGroup } from '@store/slices'

import { Icon } from '@components/atoms/icon'

import styles from './AddTaskGroupButton.module.scss'

export const AddTaskGroupButton = ({ workspaceId }: ButtonTypes) => {
  const dispatch = useDispatch()
  const { workspaces } = useSelector((state: RootState) => state.board)

  const workspace = workspaces[workspaceId]

  const editingTaskGroup = Object.values(workspace.taskGroups).find(
    taskGroup => taskGroup.isEditing
  )

  const canSave = editingTaskGroup?.name.trim() !== ''

  const handleClick = () => {
    if (canSave && editingTaskGroup) {
      dispatch(updateTaskGroup({ ...editingTaskGroup, isEditing: false }))
    } else {
      dispatch(addTaskGroup({ workspaceId }))
    }
  }

  return (
    <button
      className={`${styles.root} ${canSave ? styles.rootSave : ''}`}
      onClick={handleClick}
      disabled={!canSave}
    >
      {editingTaskGroup ? (
        <Icon type={IconType.Save} />
      ) : (
        <Icon type={IconType.Create} />
      )}
      {editingTaskGroup ? ButtonType.Save : ButtonType.Create}
    </button>
  )
}
