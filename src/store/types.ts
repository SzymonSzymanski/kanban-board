export interface Task {
  id: string
  taskGroupId: string
  workspaceId: string
  isEditing: boolean
  content: string
}

export interface TaskGroup {
  id: string
  workspaceId: string
  isEditing: boolean
  name: string
  tasks: Record<string, Task>
}

export interface Workspace {
  id: string
  isEditing: boolean
  name: string
  icon: boolean
  taskGroups: Record<string, TaskGroup>
}

export interface BoardInterface {
  workspaces: Record<string, Workspace>
  activeWorkspace: string | null
}
