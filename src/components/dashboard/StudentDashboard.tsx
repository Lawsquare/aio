'use client'

import Link from 'next/link'

export default function StudentDashboard() {
  // 模拟数据
  const todayTasks = 5
  const completedTasks = 3
  const weeklyOKRProgress = 75
  const upcomingDeadlines = [
    { title: '数学作业提交', date: '2025-08-23', urgent: true },
    { title: '英语演讲准备', date: '2025-08-25', urgent: false },
    { title: '物理实验报告', date: '2025-08-27', urgent: false },
  ]

  const recentActivities = [
    { action: '完成任务', content: '完成数学练习题第3章', time: '2小时前' },
    { action: 'AI对话', content: '询问了关于函数的问题', time: '4小时前' },
    { action: '更新OKR', content: '更新了本周学习目标进度', time: '1天前' },
  ]

  const notifications = [
    { type: 'announcement', content: '李老师发布了新的课程公告', time: '30分钟前' },
    { type: 'reminder', content: 'AI提醒：明天有数学作业截止', time: '1小时前' },
    { type: 'comment', content: '张同学在你的项目中@了你', time: '2小时前' },
  ]

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">我的仪表盘</h1>
        <p className="text-gray-600">欢迎回来！查看你的学习进度和最新动态</p>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 今日任务 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">今日任务</p>
              <p className="text-2xl font-semibold text-gray-900">
                {completedTasks}/{todayTasks}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">完成进度</span>
              <span className="font-medium text-gray-900">{Math.round((completedTasks / todayTasks) * 100)}%</span>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedTasks / todayTasks) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* 本周 OKR 进度 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">本周 OKR</p>
              <p className="text-2xl font-semibold text-gray-900">{weeklyOKRProgress}%</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/app/pdp/current"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              查看详细进度 →
            </Link>
          </div>
        </div>

        {/* 即将到期 */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">即将到期</p>
              <p className="text-2xl font-semibold text-gray-900">{upcomingDeadlines.length}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/app/tasks/calendar"
              className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
            >
              查看日历 →
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 即将到期的任务 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">即将到期的任务</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${deadline.urgent ? 'bg-red-500' : 'bg-yellow-500'}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-xs text-gray-500">{deadline.date}</p>
                    </div>
                  </div>
                  {deadline.urgent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      紧急
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link 
                href="/app/tasks/list"
                className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
              >
                查看所有任务 →
              </Link>
            </div>
          </div>
        </div>

        {/* 消息与通知 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">消息与通知</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'announcement' ? 'bg-blue-500' :
                    notification.type === 'reminder' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{notification.content}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 最近活动 */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">最近活动</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {activity.action.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.action}</span>: {activity.content}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
