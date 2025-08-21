import { redirect } from 'next/navigation'

export default function TasksPage() {
  // 重定向到任务列表视图
  redirect('/app/tasks/list')
}
