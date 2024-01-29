import { ChangeEventHandler } from 'react'

import { WorkspaceDefault } from '@assets/icons'

import './Workspace.scss'

interface WorkspaceProps {
  icon: boolean
  name: string
  isEditing: boolean
  onNameChange?: ChangeEventHandler<HTMLInputElement>
}

export const Workspace = ({
  icon,
  name,
  isEditing,
  onNameChange,
}: WorkspaceProps) => {
  return (
    <div className="workspace">
      {icon && <WorkspaceDefault />}
      {!icon && (
        <span className="workspace__icon">{name.charAt(0).toUpperCase()}</span>
      )}
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Workspace name"
          autoFocus
        />
      ) : (
        <span>{name}</span>
      )}
    </div>
  )
}
