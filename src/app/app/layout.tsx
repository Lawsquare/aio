'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ChatAssistant from '@/components/ai/ChatAssistant'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // TODO: 实现真实的认证检查
    // 暂时模拟已认证状态
    const checkAuth = () => {
      // 模拟检查认证状态
      const isLoggedIn = true // 暂时设为 true，后续接入 Supabase
      setIsAuthenticated(isLoggedIn)
      
      if (!isLoggedIn) {
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  // 加载状态
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">加载中...</div>
      </div>
    )
  }

  // 未认证，重定向到登录页
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                AIO 智能教育平台
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">学生用户</span>
              <button
                onClick={() => {
                  // TODO: 实现登出逻辑
                  router.push('/login')
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* 全局 AI 助手 */}
      <ChatAssistant />
    </div>
  )
}
