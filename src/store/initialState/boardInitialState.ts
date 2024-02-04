import { v4 as uuidv4 } from 'uuid'

import { BoardInterface, Task, TaskGroup, Workspace } from '@store/types'

const workspaceId = uuidv4()

const workingOnTaskGroupId = uuidv4()
const reviewTaskGroupId = uuidv4()

const task1Id = uuidv4()
const task2Id = uuidv4()
const task3Id = uuidv4()
const task4Id = uuidv4()
const task5Id = uuidv4()
const task6Id = uuidv4()
const task7Id = uuidv4()

const workingOnTasks: Record<string, Task> = {
  [task1Id]: {
    id: task1Id,
    taskGroupId: workingOnTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    content: 'Create a video for Acme',
  },
  [task2Id]: {
    id: task2Id,
    taskGroupId: workingOnTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    content: 'Review Acme PDF',
  },
}

const reviewTasks: Record<string, Task> = {
  [task3Id]: {
    id: task3Id,
    taskGroupId: reviewTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    content: 'Social Media posts for Acme',
  },
  [task4Id]: {
    id: task4Id,
    taskGroupId: reviewTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    content: 'Facebook Campaign',
  },
  [task5Id]: {
    id: task5Id,
    taskGroupId: reviewTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    content: 'TikTok Profile Setup',
  },
  [task6Id]: {
    id: task6Id,
    taskGroupId: reviewTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    content: 'Marketing list',
  },
  [task7Id]: {
    id: task7Id,
    taskGroupId: reviewTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    content: 'Company video',
  },
}

const taskGroups: Record<string, TaskGroup> = {
  [workingOnTaskGroupId]: {
    id: workingOnTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    name: 'Working on',
    tasks: workingOnTasks,
  },
  [reviewTaskGroupId]: {
    id: reviewTaskGroupId,
    workspaceId: workspaceId,
    isEditing: false,
    name: 'Review',
    tasks: reviewTasks,
  },
}

const initialWorkspace: Workspace = {
  id: workspaceId,
  name: 'Acme Corp workspace',
  icon: true,
  isEditing: false,
  taskGroups: taskGroups,
}

export const boardInitialState: BoardInterface = {
  workspaces: {
    [workspaceId]: initialWorkspace,
  },
  activeWorkspace: workspaceId,
}
