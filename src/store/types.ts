export interface Subtask {
  id: string
  content: string
  completed: boolean
  taskId: string
}

export interface Task {
  id: string
  content: string
  taskGroupId: string
  subtasks: Record<string, Subtask>
}

export interface TaskGroup {
  id: string
  name: string
  workspaceId: string
  tasks: Record<string, Task>
}

export interface Workspace {
  id: string
  name: string
  icon: boolean
  taskGroups: Record<string, TaskGroup>
}

export interface BoardInterface {
  workspaces: Record<string, Workspace>
  isAddingWorkspace: boolean
  isEditingWorkspace: boolean
  newWorkspaceDetails: Workspace | null
}
