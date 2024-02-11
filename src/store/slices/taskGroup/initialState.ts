import { taskGroupsAdapter } from '@store/slices'

export const initialTaskGroupsState = taskGroupsAdapter.getInitialState({
  ids: ['workingOnTaskGroupId', 'reviewTaskGroupId'],
  entities: {
    workingOnTaskGroupId: {
      id: 'workingOnTaskGroupId',
      workspaceId: 'workspace-uuid',
      name: 'Working on',
      isEditing: false,
    },
    reviewTaskGroupId: {
      id: 'reviewTaskGroupId',
      workspaceId: 'workspace-uuid',
      name: 'Review',
      isEditing: false,
    },
  },
})
