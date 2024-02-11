import { RootState } from '@store/store.ts'
import { ButtonProps, ButtonType } from '.'
import { IconType } from '@enums'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import {
  addTaskGroup,
  selectAllTaskGroups,
  selectWorkspaceById,
  updateWorkspace,
} from '@store/slices'

import { Text, TextType } from '@components/atoms/text'
import { Icon } from '@components/atoms/icon'

import styles from './AddTaskGroupButton.module.scss'

export const AddTaskGroupButton = ({ workspaceId }: ButtonProps) => {
  const dispatch = useDispatch()

  const activeWorkspace = useSelector((state: RootState) =>
    selectWorkspaceById(state, workspaceId)
  )

  const taskGroups = useSelector(selectAllTaskGroups)

  const editingTaskGroup = taskGroups.find(
    taskGroup => taskGroup.workspaceId === workspaceId && taskGroup.isEditing
  )

  const handleClick = () => {
    if (!editingTaskGroup && activeWorkspace) {
      const newTaskGroupId = uuidv4()
      dispatch(
        addTaskGroup({
          id: newTaskGroupId,
          workspaceId,
          name: '',
          isEditing: true,
        })
      )

      const updatedTaskGroupIds = [
        ...(activeWorkspace.taskGroupOrderIds || []),
        newTaskGroupId,
      ]

      dispatch(
        updateWorkspace({
          id: workspaceId,
          changes: { taskGroupOrderIds: updatedTaskGroupIds },
        })
      )
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
