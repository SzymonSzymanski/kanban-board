import { configureStore } from '@reduxjs/toolkit'
import {
  boardSlice,
  initialTaskGroupsState,
  initialTasksState,
  initialWorkspacesState,
  taskGroupSlice,
  taskSlice,
  workspaceSlice,
} from './slices'

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    workspaces: workspaceSlice.reducer,
    taskGroups: taskGroupSlice.reducer,
    tasks: taskSlice.reducer,
  },
  preloadedState: {
    workspaces: initialWorkspacesState,
    taskGroups: initialTaskGroupsState,
    tasks: initialTasksState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
