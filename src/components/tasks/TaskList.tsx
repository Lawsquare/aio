'use client'

import TaskItem from './TaskItem'

interface Task {
  id: string
  title: string
  is_completed: boolean
  created_at: string
}

interface TaskListProps {
  tasks: Task[]
  onToggleTask: (id: string) => void
  onDeleteTask: (id: string) => void
}

export default function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无任务</h3>
        <p className="text-gray-500">添加你的第一个学习任务开始吧！</p>
      </div>
    )
  }

  // 分离已完成和未完成的任务
  const incompleteTasks = tasks.filter(task => !task.is_completed)
  const completedTasks = tasks.filter(task => task.is_completed)

  return (
    <div className="space-y-6">
      {/* 未完成任务 */}
      {incompleteTasks.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              待完成任务 ({incompleteTasks.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {incompleteTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* 已完成任务 */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              已完成任务 ({completedTasks.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleTask}
                onDelete={onDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
