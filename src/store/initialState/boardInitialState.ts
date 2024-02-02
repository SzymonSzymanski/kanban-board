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
    content: 'Create a video for Acme',
    taskGroupId: workingOnTaskGroupId,
    subtasks: {},
  },
  [task2Id]: {
    id: task2Id,
    content: 'Review Acme PDF',
    taskGroupId: workingOnTaskGroupId,
    subtasks: {},
  },
}

const reviewTasks: Record<string, Task> = {
  [task3Id]: {
    id: task3Id,
    content: 'Social Media posts for Acme',
    taskGroupId: reviewTaskGroupId,
    subtasks: {},
  },
  [task4Id]: {
    id: task4Id,
    content: 'Facebook Campaign',
    taskGroupId: reviewTaskGroupId,
    subtasks: {},
  },
  [task5Id]: {
    id: task5Id,
    content: 'TikTok Profile Setup',
    taskGroupId: reviewTaskGroupId,
    subtasks: {},
  },
  [task6Id]: {
    id: task6Id,
    content: 'Marketing list',
    taskGroupId: reviewTaskGroupId,
    subtasks: {},
  },
  [task7Id]: {
    id: task7Id,
    content: 'Company video',
    taskGroupId: reviewTaskGroupId,
    subtasks: {},
  },
}

const taskGroups: Record<string, TaskGroup> = {
  [workingOnTaskGroupId]: {
    id: workingOnTaskGroupId,
    name: 'Working on',
    workspaceId: workspaceId,
    tasks: workingOnTasks,
  },
  [reviewTaskGroupId]: {
    id: reviewTaskGroupId,
    name: 'Review',
    workspaceId: workspaceId,
    tasks: reviewTasks,
  },
}

const initialWorkspace: Workspace = {
  id: workspaceId,
  name: 'Acme Corp workspace',
  icon: true,
  taskGroups: taskGroups,
}

export const boardInitialState: BoardInterface = {
  workspaces: {
    [workspaceId]: initialWorkspace,
  },
  isAddingWorkspace: false,
  isEditingWorkspace: false,
  newWorkspaceDetails: null,
}
