import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'

interface UseDnDSetupArgs {
  onDragEnd: (activeId: string, overId: string) => void
}

export const useDnDSetup = ({ onDragEnd }: UseDnDSetupArgs) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor)
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      onDragEnd(active.id, over.id)
    }
  }

  return { sensors, handleDragEnd }
}
