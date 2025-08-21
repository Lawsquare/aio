'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Task {
  id: string
  title: string
  due_date: string
  priority: 'low' | 'medium' | 'high'
  category: string
  is_completed: boolean
}

export default function TaskCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // 模拟任务数据
  const tasks: Task[] = [
    {
      id: '1',
      title: '数学作业第3章',
      due_date: '2025-08-23',
      priority: 'high',
      category: '数学',
      is_completed: false,
    },
    {
      id: '2',
      title: '英语演讲准备',
      due_date: '2025-08-25',
      priority: 'medium',
      category: '英语',
      is_completed: false,
    },
    {
      id: '3',
      title: '物理实验报告',
      due_date: '2025-08-27',
      priority: 'medium',
      category: '物理',
      is_completed: false,
    },
    {
      id: '4',
      title: '历史课堂笔记',
      due_date: '2025-08-24',
      priority: 'low',
      category: '历史',
      is_completed: true,
    },
  ]

  // 获取当前月份的日期
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const current = new Date(startDate)
  
  for (let i = 0; i < 42; i++) {
    days.push(new Date(current))
    current.setDate(current.getDate() + 1)
  }

  // 获取指定日期的任务
  const getTasksForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return tasks.filter(task => task.due_date === dateStr)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1))
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* 页面标题和视图切换 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">任务日历</h1>
          <p className="text-gray-600">查看任务的时间安排和截止日期</p>
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
            className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md"
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

      {/* 日历组件 */}
      <div className="bg-white rounded-lg shadow">
        {/* 日历头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h2 className="text-lg font-semibold text-gray-900">
            {formatMonth(currentDate)}
          </h2>
          
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 星期标题 */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day} className="px-3 py-2 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        {/* 日历网格 */}
        <div className="grid grid-cols-7">
          {days.map((day, index) => {
            const dayTasks = getTasksForDate(day)
            return (
              <div
                key={index}
                className={`min-h-[120px] p-2 border-r border-b border-gray-100 ${
                  !isCurrentMonth(day) ? 'bg-gray-50' : ''
                } ${isToday(day) ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  !isCurrentMonth(day) ? 'text-gray-400' : 
                  isToday(day) ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {day.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className={`text-xs p-1 rounded truncate ${
                        task.is_completed 
                          ? 'bg-gray-100 text-gray-500 line-through' 
                          : 'bg-white border border-gray-200 text-gray-700'
                      }`}
                      title={task.title}
                    >
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                        <span className="truncate">{task.title}</span>
                      </div>
                    </div>
                  ))}
                  
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayTasks.length - 3} 更多
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 今日任务快速预览 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">今日任务</h3>
        <div className="space-y-3">
          {getTasksForDate(new Date()).map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={task.is_completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <div>
                  <p className={`text-sm font-medium ${task.is_completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-500">{task.category}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
              </span>
            </div>
          ))}
          
          {getTasksForDate(new Date()).length === 0 && (
            <p className="text-gray-500 text-center py-4">今日暂无任务</p>
          )}
        </div>
      </div>
    </div>
  )
}
