import { ChangeEventHandler } from 'react'

import { DefaultIcon } from './DefaultIcon.tsx'

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
      {icon && <DefaultIcon />}
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
