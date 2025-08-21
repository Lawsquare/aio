'use client'

import { useState } from 'react'
import NewTaskForm from '@/components/tasks/NewTaskForm'
import TaskList from '@/components/tasks/TaskList'

// 模拟任务数据类型
interface Task {
  id: string
  title: string
  is_completed: boolean
  created_at: string
}

export default function TasksPage() {
  // 模拟任务数据
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: '完成数学作业',
      is_completed: false,
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: '阅读英语课文',
      is_completed: true,
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: '准备物理实验报告',
      is_completed: false,
      created_at: new Date().toISOString(),
    },
  ])

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      is_completed: false,
      created_at: new Date().toISOString(),
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

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">我的学习任务</h1>
            <p className="text-gray-600">管理你的学习任务，保持高效学习状态</p>
          </div>

          {/* 新建任务表单 */}
          <div className="mb-8">
            <NewTaskForm onAddTask={handleAddTask} />
          </div>

          {/* 任务列表 */}
          <div>
            <TaskList 
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
