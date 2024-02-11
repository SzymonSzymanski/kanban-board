import { RootState } from '@store/store'
import { ButtonProps, ButtonType } from '.'
import { IconType } from '@enums'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { addTask, selectAllTasks } from '@store/slices'

import { Text, TextType } from '@components/atoms/text'
import { Icon } from '@components/atoms/icon'

import styles from './AddTaskButton.module.scss'

export const AddTaskButton = ({ taskGroupId }: ButtonProps) => {
  const dispatch = useDispatch()

  const tasks = useSelector((state: RootState) => selectAllTasks(state))

  const editingTask = tasks.find(
    task => task.taskGroupId === taskGroupId && task.isEditing
  )

  const handleClick = () => {
    if (!editingTask) {
      const newTaskId = uuidv4()
      dispatch(
        addTask({
          id: newTaskId,
          taskGroupId,
          content: '',
          isEditing: true,
        })
      )
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
