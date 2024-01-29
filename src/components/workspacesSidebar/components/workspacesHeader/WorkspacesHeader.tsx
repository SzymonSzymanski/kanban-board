import { WorkspacesList } from './components/workspacesList'
import { AddWorkspaceButton } from './components/addWorkspaceButton'

import './WorkspacesHeader.scss'

export const WorkspacesHeader = () => {
  return (
    <div className="workspace-header">
      <WorkspacesList />
      <AddWorkspaceButton />
    </div>
  )
}
