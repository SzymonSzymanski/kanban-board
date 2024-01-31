import { v4 as uuidv4 } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BoardInterface, Subtask, Task, TaskGroup, Workspace } from '../types'

const initialWorkspace: Workspace = {
  id: uuidv4(),
  name: 'Acme Corp workspace',
  icon: true,
  taskGroups: {},
}

const initialState: BoardInterface = {
  workspaces: {
    [initialWorkspace.id]: initialWorkspace,
  },
  isAddingWorkspace: false,
  newWorkspaceDetails: null,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // Workspace Reducers
    startAddingWorkspace: state => {
      state.isAddingWorkspace = true
      state.newWorkspaceDetails = {
        id: uuidv4(),
        name: '',
        icon: false,
        taskGroups: {},
      }
    },
    updateNewWorkspaceName: (state, action: PayloadAction<string>) => {
      if (state.newWorkspaceDetails) {
        state.newWorkspaceDetails.name = action.payload
      }
    },
    cancelAddingWorkspace: state => {
      state.isAddingWorkspace = false
      state.newWorkspaceDetails = null
    },
    saveNewWorkspace: state => {
      if (
        state.newWorkspaceDetails &&
        state.newWorkspaceDetails.name.trim() !== ''
      ) {
        state.workspaces[state.newWorkspaceDetails.id] = {
          ...state.newWorkspaceDetails,
          taskGroups: {},
        }
        state.isAddingWorkspace = false
        state.newWorkspaceDetails = null
      }
    },
    addWorkspace: (state, action: PayloadAction<Workspace>) => {
      const workspace = action.payload
      state.workspaces[workspace.id] = workspace
    },
    updateWorkspace: (state, action: PayloadAction<Workspace>) => {
      const workspace = action.payload
      state.workspaces[workspace.id] = workspace
    },
    deleteWorkspace: (state, action: PayloadAction<string>) => {
      delete state.workspaces[action.payload]
    },

    // Task Group Reducers
    addTaskGroup: (state, action: PayloadAction<TaskGroup>) => {
      const taskGroup = action.payload

      if (state.workspaces[taskGroup.workspaceId]) {
        state.workspaces[taskGroup.workspaceId].taskGroups[taskGroup.id] =
          taskGroup
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
    addTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload
      const taskGroups = state.workspaces[task.taskGroupId]?.taskGroups

      if (taskGroups) {
        taskGroups[task.taskGroupId].tasks[task.id] = task
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload
      const taskGroups = state.workspaces[task.taskGroupId]?.taskGroups

      if (taskGroups) {
        taskGroups[task.taskGroupId].tasks[task.id] = task
      }
    },
    deleteTask: (
      state,
      action: PayloadAction<{ taskGroupId: string; taskId: string }>
    ) => {
      const { taskGroupId, taskId } = action.payload
      const taskGroups = state.workspaces[taskGroupId]?.taskGroups

      if (taskGroups) {
        delete taskGroups[taskGroupId].tasks[taskId]
      }
    },

    // Subtask Reducers
    addSubtask: (state, action: PayloadAction<Subtask>) => {
      const subtask = action.payload
      const tasks =
        state.workspaces[subtask.taskId]?.taskGroups[subtask.taskId]?.tasks

      if (tasks) {
        tasks[subtask.taskId].subtasks[subtask.id] = subtask
      }
    },
    updateSubtask: (state, action: PayloadAction<Subtask>) => {
      const subtask = action.payload
      const tasks =
        state.workspaces[subtask.taskId]?.taskGroups[subtask.taskId]?.tasks

      if (tasks) {
        tasks[subtask.taskId].subtasks[subtask.id] = subtask
      }
    },
    deleteSubtask: (
      state,
      action: PayloadAction<{ taskId: string; subtaskId: string }>
    ) => {
      const { taskId, subtaskId } = action.payload
      const tasks = state.workspaces[taskId]?.taskGroups[taskId]?.tasks

      if (tasks) {
        delete tasks[taskId].subtasks[subtaskId]
      }
    },
  },
})

export const {
  startAddingWorkspace,
  updateNewWorkspaceName,
  cancelAddingWorkspace,
  saveNewWorkspace,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
  addTaskGroup,
  updateTaskGroup,
  deleteTaskGroup,
  addTask,
  updateTask,
  deleteTask,
  addSubtask,
  updateSubtask,
  deleteSubtask,
} = boardSlice.actions
