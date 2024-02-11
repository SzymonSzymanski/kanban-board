import { workspacesAdapter } from '@store/slices'

export const initialWorkspacesState = workspacesAdapter.getInitialState({
  ids: ['workspace-uuid'],
  entities: {
    'workspace-uuid': {
      id: 'workspace-uuid',
      name: 'Acme Corp workspace',
      icon: true,
      isEditing: false,
      taskGroupOrderIds: ['workingOnTaskGroupId', 'reviewTaskGroupId'],
    },
  },
})
