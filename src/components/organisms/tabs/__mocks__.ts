import { TabTypes } from '.'
import { IconType } from '@enums'

import { v4 as uuidv4 } from 'uuid'

export const tabsMock: TabTypes[] = [
  {
    id: uuidv4(),
    icon: IconType.Dashboard,
    name: 'Dashboard',
    isActive: false,
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
    isActive: false,
  },
  {
    id: uuidv4(),
    icon: IconType.Search,
    name: 'Search',
    isActive: false,
  },
]
