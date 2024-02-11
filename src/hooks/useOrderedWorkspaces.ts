import { useMemo } from 'react'

import { WorkspaceInterface } from '@store/types.ts'

import { useSelector } from 'react-redux'
import { selectAllWorkspaces, selectWorkspaceOrder } from '@store/slices'

export const useOrderedWorkspaces = () => {
  const workspaces = useSelector(selectAllWorkspaces)
  const workspaceOrder = useSelector(selectWorkspaceOrder)

  return useMemo(() => {
    const workspaceMap = new Map(
      workspaces.map(workspace => [workspace.id, workspace])
    )
    const orderedWorkspaces: WorkspaceInterface[] = workspaceOrder
      .map(id => workspaceMap.get(id))
      .filter((workspace): workspace is WorkspaceInterface =>
        Boolean(workspace)
      )
    const unorderedWorkspaces = workspaces.filter(
      workspace => !workspaceOrder.includes(workspace.id)
    )

    return [...orderedWorkspaces, ...unorderedWorkspaces]
  }, [workspaces, workspaceOrder])
}
