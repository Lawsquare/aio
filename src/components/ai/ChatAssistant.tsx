'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: string
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '你好！我是你的 AI 学习助手，有什么可以帮助你的吗？',
      sender: 'ai',
      timestamp: new Date().toISOString(),
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // 模拟 AI 回复
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `我收到了你的消息："${userMessage.content}"。这是一个模拟回复，实际的 AI 功能将在后续版本中实现。`,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
    }, 1000)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 z-50"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* 聊天窗口 */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-40">
          {/* 头部 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">AI 学习助手</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 消息列表 */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs px-3 py-2 rounded-lg text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* 输入框 */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="输入你的问题..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                发送
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
