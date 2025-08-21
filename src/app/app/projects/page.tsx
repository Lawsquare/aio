'use client'

import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  status: 'planning' | 'in_progress' | 'review' | 'completed'
  progress: number
  dueDate?: string
  tags: string[]
  collaborators: string[]
}

export default function ProjectsPage() {
  // 模拟项目数据
  const projects: Project[] = [
    {
      id: '1',
      title: '数学建模竞赛项目',
      description: '参与全国大学生数学建模竞赛，研究城市交通优化问题',
      status: 'in_progress',
      progress: 65,
      dueDate: '2025-09-15',
      tags: ['数学建模', '竞赛', '交通优化'],
      collaborators: ['李小明', '王小红'],
    },
    {
      id: '2',
      title: '英语戏剧表演',
      description: '班级英语戏剧节表演准备，改编莎士比亚经典剧目',
      status: 'planning',
      progress: 20,
      dueDate: '2025-10-01',
      tags: ['英语', '戏剧', '表演'],
      collaborators: ['张小强', '刘小美', '陈小华'],
    },
    {
      id: '3',
      title: '物理创新实验',
      description: '设计并实施创新物理实验，探索新的教学方法',
      status: 'review',
      progress: 90,
      dueDate: '2025-08-30',
      tags: ['物理', '实验', '创新'],
      collaborators: ['赵小刚'],
    },
    {
      id: '4',
      title: '历史文化调研',
      description: '本地历史文化遗产调研和保护方案设计',
      status: 'completed',
      progress: 100,
      tags: ['历史', '文化', '调研'],
      collaborators: ['孙小丽'],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning': return '规划中'
      case 'in_progress': return '进行中'
      case 'review': return '评审中'
      case 'completed': return '已完成'
      default: return '未知'
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const isOverdue = (dateString?: string) => {
    if (!dateString) return false
    const dueDate = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return dueDate < today
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">我的项目</h1>
          <p className="text-gray-600">管理你的学习项目和协作任务</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          创建项目
        </button>
      </div>

      {/* 项目统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">总项目</p>
              <p className="text-2xl font-semibold text-gray-900">{projects.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">进行中</p>
              <p className="text-2xl font-semibold text-gray-900">
                {projects.filter(p => p.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">待评审</p>
              <p className="text-2xl font-semibold text-gray-900">
                {projects.filter(p => p.status === 'review').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">已完成</p>
              <p className="text-2xl font-semibold text-gray-900">
                {projects.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 项目列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>

              {/* 进度条 */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-500">进度</span>
                  <span className="font-medium text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* 截止日期 */}
              {project.dueDate && (
                <div className="mb-4">
                  <span className={`text-sm ${
                    isOverdue(project.dueDate) ? 'text-red-600 font-medium' : 'text-gray-500'
                  }`}>
                    截止日期: {formatDate(project.dueDate)}
                  </span>
                </div>
              )}

              {/* 标签 */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 协作者 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">协作者:</span>
                  <div className="flex -space-x-1">
                    {project.collaborators.slice(0, 3).map((collaborator, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-medium text-white border-2 border-white"
                        title={collaborator}
                      >
                        {collaborator.charAt(0)}
                      </div>
                    ))}
                    {project.collaborators.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 border-2 border-white">
                        +{project.collaborators.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                <button className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                  查看详情 →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AIP 平台集成提示 */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">AIP 平台集成</h3>
            <p className="text-purple-100 mt-1">
              你的项目可以与 AIP 平台深度集成，获得更强大的项目管理和协作功能。
            </p>
          </div>
          <button className="flex-shrink-0 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            了解更多
          </button>
        </div>
      </div>
    </div>
  )
}
