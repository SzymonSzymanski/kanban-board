import { ChangeEvent } from 'react'
import { RootState } from '../../store/store.ts'
import { useDispatch, useSelector } from 'react-redux'
import { updateNewWorkspaceName } from '../../store/slices'

import { Workspace } from '../workspace'

import './WorkspacesList.scss'

export const WorkspacesList = () => {
  const { workspaces, isAddingWorkspace, newWorkspaceDetails } = useSelector(
    (state: RootState) => state.board
  )
  const dispatch = useDispatch()

  const handleNewWorkspaceNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateNewWorkspaceName(e.target.value))
  }

  return (
    <div className="workspaces-list">
      {Object.values(workspaces).map(workspace => (
        <Workspace
          key={workspace.id}
          name={workspace.name}
          icon={workspace.icon}
          isEditing={false}
        />
      ))}
      {isAddingWorkspace && newWorkspaceDetails && (
        <Workspace
          name={newWorkspaceDetails.name}
          icon={newWorkspaceDetails.icon}
          isEditing={true}
          onNameChange={handleNewWorkspaceNameChange}
        />
      )}
    </div>
  )
}
