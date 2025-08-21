import { redirect } from 'next/navigation'

export default function AppPage() {
  // 重定向到仪表盘
  redirect('/app/dashboard')
}
