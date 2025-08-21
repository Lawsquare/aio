'use client'

import { useState } from 'react'

interface Task {
  id: string
  title: string
  is_completed: boolean
  created_at: string
}

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (window.confirm('确定要删除这个任务吗？')) {
      setIsDeleting(true)
      // 模拟异步删除
      setTimeout(() => {
        onDelete(task.id)
        setIsDeleting(false)
      }, 300)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`px-6 py-4 flex items-center space-x-4 ${isDeleting ? 'opacity-50' : ''}`}>
      {/* 复选框 */}
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0"
        disabled={isDeleting}
      >
        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
          task.is_completed 
            ? 'bg-indigo-600 border-indigo-600' 
            : 'border-gray-300 hover:border-indigo-500'
        }`}>
          {task.is_completed && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>

      {/* 任务内容 */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${
          task.is_completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-900'
        }`}>
          {task.title}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          创建于 {formatDate(task.created_at)}
        </p>
      </div>

      {/* 删除按钮 */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
        title="删除任务"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}
