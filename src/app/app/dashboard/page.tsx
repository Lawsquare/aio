'use client'

import { useSearchParams } from 'next/navigation'
import StudentDashboard from '@/components/dashboard/StudentDashboard'
import TeacherDashboard from '@/components/dashboard/TeacherDashboard'
import AdminDashboard from '@/components/dashboard/AdminDashboard'

export default function DashboardPage() {
  // 从 URL 参数获取角色，默认为学生
  const searchParams = useSearchParams()
  const role = searchParams.get('role') || 'student'

  const renderDashboard = () => {
    switch (role) {
      case 'teacher':
        return <TeacherDashboard />
      case 'admin':
        return <AdminDashboard />
      case 'student':
      default:
        return <StudentDashboard />
    }
  }

  return (
    <div className="space-y-6">
      {renderDashboard()}
    </div>
  )
}
