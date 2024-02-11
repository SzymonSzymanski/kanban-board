import { RootState } from '@store/store'
import { TaskInterface } from '@store/types.ts'

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const tasksAdapter = createEntityAdapter<TaskInterface>()

const initialState = tasksAdapter.getInitialState()

export const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    updateTask: tasksAdapter.updateOne,
    removeTask: tasksAdapter.removeOne,
  },
})

export const { addTask, updateTask, removeTask } = taskSlice.actions

export const { selectById: selectTaskById, selectAll: selectAllTasks } =
  tasksAdapter.getSelectors((state: RootState) => state.tasks)
