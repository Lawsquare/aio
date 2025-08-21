'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Task {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  category: string
  status: 'todo' | 'in_progress' | 'completed'
}

export default function TaskBoardPage() {
  // 模拟任务数据
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '完成数学作业第3章',
      description: '函数与方程组练习题',
      priority: 'high',
      due_date: '2025-08-23',
      category: '数学',
      status: 'todo',
    },
    {
      id: '2',
      title: '英语演讲准备',
      description: '准备5分钟英语演讲稿',
      priority: 'medium',
      due_date: '2025-08-25',
      category: '英语',
      status: 'in_progress',
    },
    {
      id: '3',
      title: '物理实验报告',
      description: '光学实验数据分析',
      priority: 'medium',
      due_date: '2025-08-27',
      category: '物理',
      status: 'todo',
    },
    {
      id: '4',
      title: '阅读英语课文Unit 5',
      priority: 'medium',
      category: '英语',
      status: 'completed',
    },
    {
      id: '5',
      title: '历史课堂笔记整理',
      priority: 'low',
      category: '历史',
      status: 'in_progress',
    },
  ])

  const columns = [
    { id: 'todo', title: '待办', status: 'todo' as const },
    { id: 'in_progress', title: '进行中', status: 'in_progress' as const },
    { id: 'completed', title: '已完成', status: 'completed' as const },
  ]

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-500'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  const isOverdue = (dateString?: string) => {
    if (!dateString) return false
    const dueDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dueDate < today
  }

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和视图切换 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">任务看板</h1>
          <p className="text-gray-600">可视化管理任务进度和状态</p>
        </div>
        
        {/* 视图切换 */}
        <div className="flex items-center space-x-2">
          <Link 
            href="/app/tasks/list"
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            列表
          </Link>
          <Link 
            href="/app/tasks/calendar"
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            日历
          </Link>
          <Link 
            href="/app/tasks/board"
            className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md"
          >
            看板
          </Link>
        </div>
      </div>

      {/* 看板列 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = getTasksByStatus(column.status)
          
          return (
            <div key={column.id} className="bg-gray-50 rounded-lg p-4">
              {/* 列标题 */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{column.title}</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                  {columnTasks.length}
                </span>
              </div>

              {/* 任务卡片 */}
              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-white rounded-lg shadow-sm border-l-4 p-4 hover:shadow-md transition-shadow ${getPriorityColor(task.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900 flex-1">
                        {task.title}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(task.priority)}`}>
                        {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                      </span>
                    </div>

                    {task.description && (
                      <p className="text-xs text-gray-600 mb-3">{task.description}</p>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {task.category}
                      </span>
                      
                      {task.due_date && (
                        <span className={`text-xs ${
                          isOverdue(task.due_date) ? 'text-red-600 font-medium' : 'text-gray-500'
                        }`}>
                          {formatDate(task.due_date)}
                        </span>
                      )}
                    </div>

                    {/* 状态切换按钮 */}
                    <div className="mt-3 flex space-x-2">
                      {task.status !== 'todo' && (
                        <button
                          onClick={() => moveTask(task.id, 'todo')}
                          className="text-xs text-gray-500 hover:text-gray-700"
                        >
                          ← 待办
                        </button>
                      )}
                      {task.status !== 'in_progress' && (
                        <button
                          onClick={() => moveTask(task.id, 'in_progress')}
                          className="text-xs text-blue-500 hover:text-blue-700"
                        >
                          进行中
                        </button>
                      )}
                      {task.status !== 'completed' && (
                        <button
                          onClick={() => moveTask(task.id, 'completed')}
                          className="text-xs text-green-500 hover:text-green-700"
                        >
                          完成 →
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {/* 空状态 */}
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="mx-auto h-8 w-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <p className="text-sm">暂无任务</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 统计信息 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">任务统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{getTasksByStatus('todo').length}</div>
            <div className="text-sm text-gray-500">待办任务</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{getTasksByStatus('in_progress').length}</div>
            <div className="text-sm text-gray-500">进行中</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{getTasksByStatus('completed').length}</div>
            <div className="text-sm text-gray-500">已完成</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{tasks.length}</div>
            <div className="text-sm text-gray-500">总任务数</div>
          </div>
        </div>
      </div>
    </div>
  )
}
