import { RootState } from '@store/store'
import { ButtonType, ButtonTypes } from '.'
import { IconType } from '@enums'

import { useDispatch, useSelector } from 'react-redux'
import { addTask, updateTask } from '@store/slices'

import { Icon } from '@components/atoms/icon'

import styles from './AddTaskButton.module.scss'

export const AddTaskButton = ({ workspaceId, taskGroupId }: ButtonTypes) => {
  const dispatch = useDispatch()
  const { workspaces } = useSelector((state: RootState) => state.board)

  const workspace = workspaces[workspaceId]
  const taskGroup = workspace.taskGroups[taskGroupId]

  const editingTask = Object.values(taskGroup.tasks).find(
    task => task.isEditing
  )

  const canSave = editingTask?.content.trim() !== ''

  const handleClick = () => {
    if (canSave && editingTask) {
      dispatch(updateTask({ ...editingTask, isEditing: false }))
    } else {
      dispatch(addTask({ workspaceId, taskGroupId }))
    }
  }

  return (
    <button
      className={`${styles.root} ${canSave ? styles.rootSave : ''}`}
      onClick={handleClick}
      disabled={!canSave}
    >
      {editingTask ? (
        <Icon type={IconType.Save} />
      ) : (
        <Icon type={IconType.Create} />
      )}
      {editingTask ? ButtonType.Save : ButtonType.Add}
    </button>
  )
}
