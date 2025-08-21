'use client'

interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'teacher' | 'admin'
}

interface TopNavbarProps {
  user: User
  onMenuClick: () => void
  onLogout: () => void
}

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case 'student': return '学生'
    case 'teacher': return '教师'
    case 'admin': return '管理员'
    default: return '用户'
  }
}

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'student': return 'bg-blue-100 text-blue-800'
    case 'teacher': return 'bg-green-100 text-green-800'
    case 'admin': return 'bg-purple-100 text-purple-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function TopNavbar({ user, onMenuClick, onLogout }: TopNavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 左侧：菜单按钮和标题 */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <span className="sr-only">打开菜单</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-900">
                AIO 智能教育平台
              </h1>
              <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                {getRoleDisplayName(user.role)}
              </span>
            </div>
          </div>

          {/* 右侧：用户信息和操作 */}
          <div className="flex items-center space-x-4">
            {/* 通知图标 */}
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <span className="sr-only">查看通知</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v2.25a2.25 2.25 0 0 1-2.25 2.25H7.5a2.25 2.25 0 0 1-2.25-2.25V9.75a6 6 0 0 1 6-6z" />
              </svg>
              {/* 通知小红点 */}
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
            </button>

            {/* 用户菜单 */}
            <div className="relative">
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </div>
                
                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.name.charAt(0)}
                  </span>
                </div>
                
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100"
                >
                  登出
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
