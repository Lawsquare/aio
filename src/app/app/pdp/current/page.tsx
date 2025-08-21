'use client'

import Link from 'next/link'

interface Objective {
  id: string
  title: string
  description: string
  progress: number
  keyResults: KeyResult[]
}

interface KeyResult {
  id: string
  title: string
  target: string
  current: string
  progress: number
  status: 'on-track' | 'at-risk' | 'behind'
}

export default function CurrentPDPPage() {
  // 模拟 OKR 数据
  const objectives: Objective[] = [
    {
      id: '1',
      title: '提升数学核心能力',
      description: '通过系统性学习和练习，全面提升数学解题能力和逻辑思维',
      progress: 75,
      keyResults: [
        {
          id: '1-1',
          title: '完成函数专题练习',
          target: '100题',
          current: '75题',
          progress: 75,
          status: 'on-track'
        },
        {
          id: '1-2',
          title: '数学考试成绩',
          target: '90分',
          current: '85分',
          progress: 85,
          status: 'on-track'
        },
        {
          id: '1-3',
          title: '错题整理与复习',
          target: '每周2次',
          current: '1次/周',
          progress: 50,
          status: 'at-risk'
        }
      ]
    },
    {
      id: '2',
      title: '英语综合能力提升',
      description: '重点提升英语听说读写四项技能，为高考做准备',
      progress: 60,
      keyResults: [
        {
          id: '2-1',
          title: '单词量积累',
          target: '3000词',
          current: '1800词',
          progress: 60,
          status: 'on-track'
        },
        {
          id: '2-2',
          title: '阅读理解练习',
          target: '每天1篇',
          current: '4篇/周',
          progress: 57,
          status: 'behind'
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800'
      case 'at-risk': return 'bg-yellow-100 text-yellow-800'
      case 'behind': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'on-track': return '正常'
      case 'at-risk': return '风险'
      case 'behind': return '落后'
      default: return '未知'
    }
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">本期 OKR</h1>
          <p className="text-gray-600">2024-2025学年第二学期个人发展目标</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/app/pdp/archive"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            往期回顾
          </Link>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            编辑 OKR
          </button>
        </div>
      </div>

      {/* OKR 卡片列表 */}
      <div className="space-y-6">
        {objectives.map((objective) => (
          <div key={objective.id} className="bg-white rounded-lg shadow">
            {/* Objective 头部 */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{objective.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{objective.description}</p>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-2xl font-bold text-gray-900">{objective.progress}%</div>
                  <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${objective.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Key Results */}
            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">关键结果 (Key Results)</h4>
              <div className="space-y-4">
                {objective.keyResults.map((kr) => (
                  <div key={kr.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h5 className="text-sm font-medium text-gray-900">{kr.title}</h5>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kr.status)}`}>
                          {getStatusText(kr.status)}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                        <span>目标: {kr.target}</span>
                        <span>当前: {kr.current}</span>
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-lg font-semibold text-gray-900">{kr.progress}%</div>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            kr.status === 'on-track' ? 'bg-green-500' :
                            kr.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${kr.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI 建议卡片 */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow text-white p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">AI 学习建议</h3>
            <p className="text-indigo-100 mt-1">
              根据你的学习进度分析，建议加强错题整理频率，可以显著提升数学成绩。点击与 AI 助手深入讨论学习策略。
            </p>
          </div>
          <button className="flex-shrink-0 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            与 AI 讨论
          </button>
        </div>
      </div>
    </div>
  )
}
