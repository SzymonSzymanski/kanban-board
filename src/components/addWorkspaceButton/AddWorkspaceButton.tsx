import { RootState } from '../../store/store.ts'
import { useDispatch, useSelector } from 'react-redux'
import { saveNewWorkspace, startAddingWorkspace } from '../../store/slices'

import { AddWorkSpaceButtonIconAdd } from './AddWorkSpaceButtonIconAdd.tsx'
import { AddWorkSpaceButtonIconSave } from './AddWorkSpaceButtonIconSave.tsx'

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
        <AddWorkSpaceButtonIconSave />
      ) : (
        <AddWorkSpaceButtonIconAdd />
      )}
      {isAddingWorkspace ? 'Save new workspace' : 'Create workspace'}
    </button>
  )
}
