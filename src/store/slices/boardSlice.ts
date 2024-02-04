import { Task, TaskGroup, Workspace } from '../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { boardInitialState as initialState } from '@store/initialState/boardInitialState'

import { v4 as uuidv4 } from 'uuid'

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // Workspace Reducers
    setActiveWorkspace: (state, action: PayloadAction<string>) => {
      state.activeWorkspace = action.payload
    },
    addWorkspace: state => {
      const newWorkspaceId = uuidv4()
      state.activeWorkspace = newWorkspaceId

      const newWorkspace = {
        id: newWorkspaceId,
        name: '',
        icon: false,
        isEditing: true,
        taskGroups: {},
      }

      if (state.workspaces) {
        state.workspaces[newWorkspaceId] = newWorkspace
      }
    },
    updateWorkspace: (state, action: PayloadAction<Workspace>) => {
      const workspace = action.payload
      state.workspaces[workspace.id] = workspace
    },
    deleteWorkspace: (
      state,
      action: PayloadAction<{ workspaceId: string }>
    ) => {
      const { workspaceId } = action.payload
      delete state.workspaces[workspaceId]
    },

    // Task Group Reducers
    addTaskGroup: (state, action: PayloadAction<{ workspaceId: string }>) => {
      const { workspaceId } = action.payload

      const newTaskGroupId = uuidv4()
      const newTaskGroup = {
        id: newTaskGroupId,
        workspaceId,
        isEditing: true,
        name: '',
        tasks: {},
      }

      if (state.workspaces[workspaceId]) {
        state.workspaces[workspaceId].taskGroups[newTaskGroupId] = newTaskGroup
      }
    },
    updateTaskGroup: (state, action: PayloadAction<TaskGroup>) => {
      const taskGroup = action.payload

      if (state.workspaces[taskGroup.workspaceId]) {
        state.workspaces[taskGroup.workspaceId].taskGroups[taskGroup.id] =
          taskGroup
      }
    },
    deleteTaskGroup: (
      state,
      action: PayloadAction<{ workspaceId: string; taskGroupId: string }>
    ) => {
      const { workspaceId, taskGroupId } = action.payload

      if (state.workspaces[workspaceId]) {
        delete state.workspaces[workspaceId].taskGroups[taskGroupId]
      }
    },

    // Task Reducers
    addTask: (
      state,
      action: PayloadAction<{ workspaceId: string; taskGroupId: string }>
    ) => {
      const { workspaceId, taskGroupId } = action.payload
      const taskGroups = state.workspaces[workspaceId]?.taskGroups
      const newTaskId = uuidv4()
      const newTask = {
        id: newTaskId,
        workspaceId,
        taskGroupId,
        isEditing: true,
        content: '',
      }

      if (taskGroups) {
        taskGroups[taskGroupId].tasks[newTaskId] = newTask
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload
      const taskGroups = state.workspaces[task.workspaceId]?.taskGroups

      if (taskGroups) {
        taskGroups[task.taskGroupId].tasks[task.id] = task
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        workspaceId: string
        taskGroupId: string
        taskId: string
      }>
    ) => {
      const { workspaceId, taskGroupId, taskId } = action.payload
      const workspace = state.workspaces[workspaceId]
      const taskGroup = workspace?.taskGroups[taskGroupId]

      if (taskGroup) {
        delete taskGroup.tasks[taskId]
      }
    },
  },
})

export const {
  setActiveWorkspace,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
  addTask,
  updateTask,
  deleteTask,
} = boardSlice.actions
