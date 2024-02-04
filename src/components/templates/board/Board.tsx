import { RootState } from '@store/store'

import { useSelector } from 'react-redux'
import { TaskGroup } from '@components/organisms/tasksGroup'

import styles from './Board.module.scss'
import { AddTaskGroupButton } from '@components/molecules/addTaskGroupButton'

export const Board = () => {
  const { workspaces, activeWorkspace: workspaceId } = useSelector(
    (state: RootState) => state.board
  )

  const activeWorkspace = workspaces[workspaceId]

  return (
    <div className={styles.root}>
      {activeWorkspace && (
        <>
          {Object.values(activeWorkspace.taskGroups).map(taskGroup => (
            <TaskGroup
              key={taskGroup.id}
              id={taskGroup.id}
              workspaceId={taskGroup.workspaceId}
              isEditing={taskGroup.isEditing}
            />
          ))}
          <AddTaskGroupButton workspaceId={workspaceId} />
        </>
      )}
    </div>
  )
}
