import { ChangeEventHandler } from 'react'

export interface WorkspaceProps {
  icon: boolean
  name: string
  isEditing: boolean
  onNameChange?: ChangeEventHandler<HTMLInputElement>
}
