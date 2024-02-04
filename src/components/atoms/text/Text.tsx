import { TextProps, TextType } from '.'

import styles from './Text.module.scss'

export const Text = ({ type, className, children }: TextProps) => {
  const typeClassName = `
  ${type === TextType.text_18_400 ? styles.text_18_400 : ''}
  ${type === TextType.text_18_600 ? styles.text_18_600 : ''}
  ${type === TextType.text_20_600 ? styles.text_20_600 : ''}
  `
  return (
    <span className={`${typeClassName} ${className || ''}`}>{children}</span>
  )
}
