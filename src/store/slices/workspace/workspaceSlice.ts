import { RootState } from '@store/store'
import { WorkspaceInterface } from '@store/types.ts'

import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit'

export const workspacesAdapter = createEntityAdapter<WorkspaceInterface>()

const initialState = workspacesAdapter.getInitialState()

export const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    addWorkspace: workspacesAdapter.addOne,
    updateWorkspace: workspacesAdapter.updateOne,
    removeWorkspace: workspacesAdapter.removeOne,
    reorderTaskGroup: (
      state,
      action: PayloadAction<{
        workspaceId: string
        taskGroupOrderIds: string[]
      }>
    ) => {
      const { workspaceId, taskGroupOrderIds } = action.payload
      const workspace = state.entities[workspaceId]
      if (workspace) {
        workspace.taskGroupOrderIds = taskGroupOrderIds
      }
    },
  },
})

export const {
  addWorkspace,
  updateWorkspace,
  removeWorkspace,
  reorderTaskGroup,
} = workspaceSlice.actions

export const {
  selectById: selectWorkspaceById,
  selectAll: selectAllWorkspaces,
} = workspacesAdapter.getSelectors((state: RootState) => state.workspaces)
