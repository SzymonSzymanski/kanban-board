export interface TaskInterface {
  id: string
  taskGroupId: string
  isEditing: boolean
  content: string
}

export interface TaskGroupInterface {
  id: string
  workspaceId: string
  isEditing: boolean
  name: string
}

export interface WorkspaceInterface {
  id: string
  isEditing: boolean
  name: string
  icon: boolean
  taskGroupOrderIds: string[]
}

export interface BoardInterface {
  activeWorkspaceId: string | null
  workspaceOrder: string[]
}
