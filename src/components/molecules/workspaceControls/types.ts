import { MouseEventHandler } from 'react'

export interface WorkspaceControlsProps {
  isEditing: boolean
  onEdit: MouseEventHandler<HTMLDivElement> // or HTMLElement based on your Icon component's onClick prop type
  onSave: MouseEventHandler<HTMLDivElement>
  onRemove: MouseEventHandler<HTMLDivElement>
  canSave: boolean
  className: string
}
