import { RootState } from '@store/store'
import { useSelector } from 'react-redux'

import { Workspace } from '@components/molecules/workspace'

import styles from './WorkspacesList.module.scss'

export const WorkspacesList = () => {
  const { workspaces, isAddingWorkspace, newWorkspaceDetails } = useSelector(
    (state: RootState) => state.board
  )

  return (
    <div className={styles.root}>
      {Object.values(workspaces).map(workspace => (
        <Workspace
          key={workspace.id}
          id={workspace.id}
          name={workspace.name}
          icon={workspace.icon}
          isEditing={false}
        />
      ))}
      {isAddingWorkspace && newWorkspaceDetails && (
        <Workspace
          id={newWorkspaceDetails.id}
          name={newWorkspaceDetails.name}
          icon={newWorkspaceDetails.icon}
          isEditing={true}
        />
      )}
    </div>
  )
}
