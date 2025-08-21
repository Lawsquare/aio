'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import ChatAssistant from '@/components/ai/ChatAssistant'
import Sidebar from '@/components/layout/Sidebar'
import TopNavbar from '@/components/layout/TopNavbar'

// 模拟用户类型
type UserRole = 'student' | 'teacher' | 'admin'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // TODO: 实现真实的认证检查
    // 暂时模拟已认证状态和用户信息
    const checkAuth = () => {
      // 模拟检查认证状态
      const isLoggedIn = true // 暂时设为 true，后续接入 Supabase
      setIsAuthenticated(isLoggedIn)

      if (isLoggedIn) {
        // 模拟用户数据，可以通过 URL 参数切换角色进行测试
        const urlParams = new URLSearchParams(window.location.search)
        const roleParam = urlParams.get('role') as UserRole
        const mockRole = roleParam || 'student'

        setUser({
          id: '1',
          name: mockRole === 'student' ? '张三同学' : mockRole === 'teacher' ? '李老师' : '王管理员',
          email: `${mockRole}@example.com`,
          role: mockRole
        })
      } else {
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  // 加载状态
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">加载中...</div>
      </div>
    )
  }

  // 未认证，重定向到登录页
  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <TopNavbar
        user={user}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onLogout={() => {
          setUser(null)
          setIsAuthenticated(false)
          router.push('/login')
        }}
      />

      <div className="flex">
        {/* 侧边栏 */}
        <Sidebar
          user={user}
          isOpen={sidebarOpen}
          currentPath={pathname}
          onClose={() => setSidebarOpen(false)}
        />

        {/* 主要内容区域 */}
        <main className="flex-1 min-w-0">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* 全局 AI 助手 */}
      <ChatAssistant />
    </div>
  )
}
