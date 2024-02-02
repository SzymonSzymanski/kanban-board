import { MouseEventHandler } from 'react'

import { IconType } from '@enums'

export interface PropInterface {
  type: IconType
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}
