import { RootState } from '@store/store'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { initialBoardState } from '@store/slices'

export const boardSlice = createSlice({
  name: 'board',
  initialState: initialBoardState,
  reducers: {
    setActiveWorkspaceId: (state, action: PayloadAction<string | null>) => {
      state.activeWorkspaceId = action.payload
    },
    updateWorkspaceOrder: (state, action: PayloadAction<string[]>) => {
      state.workspaceOrder = action.payload
    },
    addWorkspaceIdToOrder: (state, action: PayloadAction<string>) => {
      state.workspaceOrder.push(action.payload)
    },
  },
})

export const {
  setActiveWorkspaceId,
  updateWorkspaceOrder,
  addWorkspaceIdToOrder,
} = boardSlice.actions

export const selectActiveWorkspaceId = (state: RootState) =>
  state.board.activeWorkspaceId
export const selectWorkspaceOrder = (state: RootState) =>
  state.board.workspaceOrder
