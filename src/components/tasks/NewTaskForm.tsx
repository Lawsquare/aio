'use client'

import { useState } from 'react'

interface NewTaskFormProps {
  onAddTask: (title: string) => void
}

export default function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) return

    setIsSubmitting(true)
    
    // 模拟异步操作
    setTimeout(() => {
      onAddTask(title.trim())
      setTitle('')
      setIsSubmitting(false)
    }, 300)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">添加新任务</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-2">
            任务标题
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入任务标题..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '添加中...' : '添加任务'}
          </button>
        </div>
      </form>
    </div>
  )
}
