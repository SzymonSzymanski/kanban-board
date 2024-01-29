import { IconType } from '../common/icon/IconTypes.ts'

import { RootState } from '../../store/store.ts'
import { useDispatch, useSelector } from 'react-redux'
import { saveNewWorkspace, startAddingWorkspace } from '../../store/slices'

import { Icon } from '../common/icon'

import './AddWorkspaceButton.scss'

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
      className={`add-workspace-button ${isAddingWorkspace && !isButtonDisabled ? 'add-workspace-button--add' : ''}`}
      onClick={handleClick}
      disabled={isButtonDisabled}
    >
      {isAddingWorkspace ? (
        <Icon type={IconType.Save} />
      ) : (
        <Icon type={IconType.Add} />
      )}
      {isAddingWorkspace ? 'Save new workspace' : 'Create workspace'}
    </button>
  )
}
