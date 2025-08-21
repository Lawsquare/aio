'use client'

import { useState } from 'react'
import Link from 'next/link'
import NewTaskForm from '@/components/tasks/NewTaskForm'
import TaskList from '@/components/tasks/TaskList'

// 模拟任务数据类型
interface Task {
  id: string
  title: string
  description?: string
  is_completed: boolean
  priority: 'low' | 'medium' | 'high'
  due_date?: string
  created_at: string
  category: string
}

export default function TaskListPage() {
  // 模拟任务数据
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '完成数学作业第3章',
      description: '函数与方程组练习题',
      is_completed: false,
      priority: 'high',
      due_date: '2025-08-23',
      created_at: new Date().toISOString(),
      category: '数学',
    },
    {
      id: '2',
      title: '阅读英语课文Unit 5',
      description: '完成课后练习和单词记忆',
      is_completed: true,
      priority: 'medium',
      due_date: '2025-08-22',
      created_at: new Date().toISOString(),
      category: '英语',
    },
    {
      id: '3',
      title: '准备物理实验报告',
      description: '光学实验数据分析和结论',
      is_completed: false,
      priority: 'medium',
      due_date: '2025-08-27',
      created_at: new Date().toISOString(),
      category: '物理',
    },
    {
      id: '4',
      title: '历史课堂笔记整理',
      is_completed: false,
      priority: 'low',
      created_at: new Date().toISOString(),
      category: '历史',
    },
  ])

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'created' | 'due_date' | 'priority'>('created')

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      is_completed: false,
      priority: 'medium',
      created_at: new Date().toISOString(),
      category: '其他',
    }
    setTasks([newTask, ...tasks])
  }

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, is_completed: !task.is_completed }
        : task
    ))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // 过滤和排序任务
  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.is_completed
    if (filter === 'completed') return task.is_completed
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'due_date') {
      if (!a.due_date && !b.due_date) return 0
      if (!a.due_date) return 1
      if (!b.due_date) return -1
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
    }
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  return (
    <div className="space-y-6">
      {/* 页面标题和视图切换 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的任务</h1>
          <p className="text-gray-600">管理你的学习任务，保持高效学习状态</p>
        </div>
        
        {/* 视图切换 */}
        <div className="flex items-center space-x-2">
          <Link 
            href="/app/tasks/list"
            className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md"
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
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            看板
          </Link>
        </div>
      </div>

      {/* 过滤和排序控件 */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">筛选:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="all">全部任务</option>
                <option value="pending">待完成</option>
                <option value="completed">已完成</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">排序:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="created">创建时间</option>
                <option value="due_date">截止时间</option>
                <option value="priority">优先级</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            共 {filteredTasks.length} 个任务
          </div>
        </div>
      </div>

      {/* 新建任务表单 */}
      <NewTaskForm onAddTask={handleAddTask} />

      {/* 任务列表 */}
      <TaskList 
        tasks={sortedTasks}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  )
}
