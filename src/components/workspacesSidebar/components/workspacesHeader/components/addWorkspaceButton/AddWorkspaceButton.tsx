import { AddWorkspaceButtonType, IconType } from '@enums'

import { RootState } from '@store/store'
import { useDispatch, useSelector } from 'react-redux'
import { saveNewWorkspace, startAddingWorkspace } from '@store/slices'

import { Icon } from '@components/common/icon'

import styles from './AddWorkspaceButton.module.scss'

export const AddWorkspaceButton = () => {
  const dispatch = useDispatch()
  const { isAddingWorkspace, newWorkspaceDetails } = useSelector(
    (state: RootState) => state.board
  )

  const handleClick = () => {
    if (isAddingWorkspace) {
      dispatch(saveNewWorkspace())
    } else {
      dispatch(startAddingWorkspace())
    }
  }

  const isButtonDisabled =
    isAddingWorkspace &&
    (!newWorkspaceDetails || newWorkspaceDetails.name.trim() === '')

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
      {isAddingWorkspace
        ? AddWorkspaceButtonType.Create
        : AddWorkspaceButtonType.Save}
    </button>
  )
}
