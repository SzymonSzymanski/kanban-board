import './WorkspacesSidebar.scss'
import { UserProfile } from '../userProfile'
import { WorkspaceSettings } from '../workspaceSettings'
import { WorkspacesHeader } from '../workspacesHeader'

export const WorkspacesSidebar = () => {
  return (
    <div className="workspaces-sidebar">
      <div className="workspaces-sidebar__header">
        <WorkspacesHeader />
      </div>
      <div className="workspaces-sidebar__main"></div>
      <div className="workspaces-sidebar__footer">
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  )
}
