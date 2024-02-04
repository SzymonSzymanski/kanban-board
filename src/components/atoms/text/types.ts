import { ReactNode } from 'react'
import { TextType } from '.'

export interface TextProps {
  type: TextType
  className?: string
  children: ReactNode
}
