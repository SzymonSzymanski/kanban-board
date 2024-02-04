import { MouseEventHandler } from 'react'

import { IconType } from '@enums'

export interface IconProps {
  type: IconType
  onClick?: MouseEventHandler<HTMLDivElement>
  className?: string
}
