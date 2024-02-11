import React, { useCallback, useState } from 'react'

import { TaskProps } from '@components/molecules/task/types.ts'

import { useDispatch } from 'react-redux'
import { removeTask, updateTask } from '@store/slices'

import { Controls } from '@components/molecules/controls'
import { Text, TextType } from '@components/atoms/text'

import styles from './Task.module.scss'

export const Task = ({ id, content, isEditing, taskGroupId }: TaskProps) => {
  const [editMode, setEditMode] = useState(isEditing)
  const [taskContent, setTaskContent] = useState(content)

  const dispatch = useDispatch()

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTaskContent(event.target.value)
    },
    []
  )

  const handleEdit = useCallback(() => {
    setEditMode(true)
  }, [])

  const handleRemove = useCallback(() => {
    dispatch(removeTask(id))
  }, [dispatch, id])

  const handleSave = useCallback(() => {
    setEditMode(false)

    if (taskContent !== content) {
      console.log('new content')
      dispatch(
        updateTask({
          id,
          changes: { content: taskContent, isEditing: false },
        })
      )
    }
  }, [dispatch, id, taskGroupId, taskContent, content])

  return (
    <div className={`${styles.root} ${editMode ? styles.rootEditing : ''}`}>
      {editMode ? (
        <input
          className={styles.input}
          value={taskContent}
          onChange={handleInputChange}
          placeholder="Title of the card..."
          autoFocus
        />
      ) : (
        <Text className={styles.content} type={TextType.text_18_400}>
          {taskContent}
        </Text>
      )}
      <Controls
        className={styles.controls}
        isEditing={editMode}
        onEdit={handleEdit}
        onSave={handleSave}
        onRemove={handleRemove}
        canSave={taskContent.trim() !== ''}
      />
    </div>
  )
}
