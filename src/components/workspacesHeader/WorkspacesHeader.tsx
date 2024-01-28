import { WorkspacesList } from '../workspacesList'
import { AddWorkspaceButton } from '../addWorkspaceButton'

import './WorkspacesHeader.scss'

export const WorkspacesHeader = () => {
  return (
    <div className="workspace-header">
      <WorkspacesList />
      <AddWorkspaceButton />
    </div>
  )
}
