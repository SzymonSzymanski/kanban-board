import { RootState } from '@store/store'
import { ButtonProps, ButtonType } from '.'
import { IconType } from '@enums'

import { useDispatch, useSelector } from 'react-redux'
import { addTaskGroup } from '@store/slices'

import { Text, TextType } from '@components/atoms/text'
import { Icon } from '@components/atoms/icon'

import styles from './AddTaskGroupButton.module.scss'

export const AddTaskGroupButton = ({ workspaceId }: ButtonProps) => {
  const dispatch = useDispatch()

  const workspace = useSelector(
    (state: RootState) => state.board.workspaces[workspaceId]
  )

  const editingTaskGroup = Object.values(workspace.taskGroups).find(
    taskGroup => taskGroup.isEditing
  )

  const handleClick = () => {
    if (!editingTaskGroup) {
      dispatch(addTaskGroup({ workspaceId }))
    }
  }

  return (
    <button
      className={styles.root}
      onClick={handleClick}
      disabled={!!editingTaskGroup}
    >
      <Icon type={IconType.Create} />
      <Text type={TextType.text_20_600}>{ButtonType.Create}</Text>
    </button>
  )
}
