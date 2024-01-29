import { UserProfile } from './components/userProfile'
import { WorkspaceSettings } from './components/workspaceSettings'
import { WorkspacesHeader } from './components/workspacesHeader'

import './WorkspacesSidebar.scss'

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
