import { Tab } from '.'
import { IconType } from '@enums'

import { v4 as uuidv4 } from 'uuid'

export const tabsMock: Tab[] = [
  {
    id: uuidv4(),
    icon: IconType.Dashboard,
    name: 'Dashboard',
  },
  {
    id: uuidv4(),
    icon: IconType.Boards,
    name: 'Boards',
    isActive: true,
  },
  {
    id: uuidv4(),
    icon: IconType.Profile,
    name: 'Profile',
  },
  {
    id: uuidv4(),
    icon: IconType.Search,
    name: 'Search',
  },
]
