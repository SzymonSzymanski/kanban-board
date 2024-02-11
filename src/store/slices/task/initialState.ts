import { tasksAdapter } from '@store/slices'

export const initialTasksState = tasksAdapter.getInitialState({
  ids: [
    'task1Id',
    'task2Id',
    'task3Id',
    'task4Id',
    'task5Id',
    'task6Id',
    'task7Id',
  ],
  entities: {
    task1Id: {
      id: 'task1Id',
      taskGroupId: 'workingOnTaskGroupId',
      isEditing: false,
      content: 'Create a video for Acme',
    },
    task2Id: {
      id: 'task2Id',
      taskGroupId: 'workingOnTaskGroupId',
      isEditing: false,
      content: 'Review Acme PDF',
    },
    task3Id: {
      id: 'task3Id',
      taskGroupId: 'reviewTaskGroupId',
      isEditing: false,
      content: 'Social Media posts for Acme',
    },
    task4Id: {
      id: 'task4Id',
      taskGroupId: 'reviewTaskGroupId',
      isEditing: false,
      content: 'Facebook Campaign',
    },
    task5Id: {
      id: 'task5Id',
      taskGroupId: 'reviewTaskGroupId',
      isEditing: false,
      content: 'TikTok Profile Setup',
    },
    task6Id: {
      id: 'task6Id',
      taskGroupId: 'reviewTaskGroupId',
      isEditing: false,
      content: 'Marketing list',
    },
    task7Id: {
      id: 'task7Id',
      taskGroupId: 'reviewTaskGroupId',
      isEditing: false,
      content: 'Company video',
    },
  },
})
