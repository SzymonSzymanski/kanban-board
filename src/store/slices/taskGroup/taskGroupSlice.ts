import { RootState } from '@store/store'
import { TaskGroupInterface } from '@store/types.ts'

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const taskGroupsAdapter = createEntityAdapter<TaskGroupInterface>()

const initialState = taskGroupsAdapter.getInitialState()

export const taskGroupSlice = createSlice({
  name: 'taskGroups',
  initialState: initialState,
  reducers: {
    addTaskGroup: taskGroupsAdapter.addOne,
    updateTaskGroup: taskGroupsAdapter.updateOne,
    removeTaskGroup: taskGroupsAdapter.removeOne,
  },
})

export const { addTaskGroup, updateTaskGroup, removeTaskGroup } =
  taskGroupSlice.actions

export const {
  selectById: selectTaskGroupById,
  selectAll: selectAllTaskGroups,
} = taskGroupsAdapter.getSelectors((state: RootState) => state.taskGroups)
