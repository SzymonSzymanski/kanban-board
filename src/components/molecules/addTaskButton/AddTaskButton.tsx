import { RootState } from '@store/store'
import { ButtonProps, ButtonType } from '.'
import { IconType } from '@enums'

import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '@store/slices'

import { Text, TextType } from '@components/atoms/text'
import { Icon } from '@components/atoms/icon'

import styles from './AddTaskButton.module.scss'

export const AddTaskButton = ({ workspaceId, taskGroupId }: ButtonProps) => {
  const dispatch = useDispatch()

  const workspace = useSelector(
    (state: RootState) => state.board.workspaces[workspaceId]
  )
  const taskGroup = workspace.taskGroups[taskGroupId]

  const editingTask = Object.values(taskGroup.tasks).find(
    task => task.isEditing
  )

  const handleClick = () => {
    if (!editingTask) {
      dispatch(addTask({ workspaceId, taskGroupId }))
    }
  }

  return (
    <button
      className={styles.root}
      onClick={handleClick}
      disabled={!!editingTask}
    >
      <Icon type={IconType.Create} />
      <Text type={TextType.text_20_600}>{ButtonType.Add}</Text>
    </button>
  )
}
