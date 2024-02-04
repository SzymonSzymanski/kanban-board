import { RootState } from '@store/store'
import { ButtonType } from '.'
import { IconType } from '@enums'

import { useDispatch, useSelector } from 'react-redux'
import { addWorkspace, updateWorkspace } from '@store/slices'

import { Text, TextType } from '@components/atoms/text'
import { Icon } from '@components/atoms/icon'

import styles from './AddWorkspaceButton.module.scss'

export const AddWorkspaceButton = () => {
  const dispatch = useDispatch()
  const { workspaces } = useSelector((state: RootState) => state.board)

  const editingWorkspace = Object.values(workspaces).find(
    workspace => workspace.isEditing
  )

  const canSave = editingWorkspace?.name.trim()

  const handleClick = () => {
    if (canSave && editingWorkspace) {
      dispatch(updateWorkspace({ ...editingWorkspace, isEditing: false }))
    } else {
      dispatch(addWorkspace())
    }
  }

  return (
    <button
      className={`${styles.root} ${canSave ? styles.rootSave : ''}`}
      onClick={handleClick}
      disabled={editingWorkspace && !canSave}
    >
      {!editingWorkspace ? (
        <Icon type={IconType.Create} />
      ) : (
        <Icon type={IconType.Save} />
      )}
      <Text type={TextType.text_20_600}>
        {!editingWorkspace ? ButtonType.Create : ButtonType.Save}
      </Text>
    </button>
  )
}
