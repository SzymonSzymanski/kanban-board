import { RootState } from '@store/store'
import { ButtonType } from '.'
import { IconType } from '@enums'

import { useDispatch, useSelector } from 'react-redux'
import { createNewWorkspace, saveNewWorkspace } from '@store/slices'

import { Icon } from '@components/atoms/icon'

import styles from './AddWorkspaceButton.module.scss'

export const AddWorkspaceButton = () => {
  const dispatch = useDispatch()
  const { isAddingWorkspace, newWorkspaceDetails } = useSelector(
    (state: RootState) => state.board
  )

  const canSave = newWorkspaceDetails?.name.trim() !== ''

  const isButtonDisabled = isAddingWorkspace && !canSave

  const handleClick = () => {
    if (isAddingWorkspace && canSave) {
      dispatch(saveNewWorkspace())
    } else {
      dispatch(createNewWorkspace())
    }
  }

  return (
    <button
      className={`${styles.root} ${isAddingWorkspace && !isButtonDisabled ? styles.rootSave : ''}`}
      onClick={handleClick}
      disabled={isButtonDisabled}
    >
      {isAddingWorkspace ? (
        <Icon type={IconType.Save} />
      ) : (
        <Icon type={IconType.Create} />
      )}
      {isAddingWorkspace ? ButtonType.Save : ButtonType.Create}
    </button>
  )
}
