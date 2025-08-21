# AIO 智能教育平台 - MVP v0.1

校内师生学习任务管理平台的最小可行产品版本。

## 功能特性

### ✅ 已实现（UI 骨架）
- **用户认证界面**: 登录/注册页面
- **任务管理**: 创建、查看、完成、删除学习任务
- **AI 聊天助手**: 悬浮式聊天界面
- **响应式设计**: 适配桌面和移动设备

### 🚧 待实现
- Supabase 认证集成
- 数据库连接和 CRUD 操作
- OpenAI API 集成
- 聊天记录持久化

## 技术栈

- **前端**: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **后端**: Supabase (Auth + Database)
- **AI**: OpenAI API + Vercel AI SDK
- **部署**: Vercel

## 快速开始

1. **安装依赖**
   ```bash
   npm install
   ```

2. **配置环境变量**
   ```bash
   cp .env.local.example .env.local
   # 编辑 .env.local 填入你的配置
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **访问应用**
   打开 [http://localhost:3000](http://localhost:3000)

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页（重定向到登录）
│   ├── login/             # 登录页面
│   └── app/               # 受保护的应用路由
│       ├── layout.tsx     # 应用布局（包含导航和 AI 助手）
│       └── tasks/         # 任务管理页面
└── components/            # 可复用组件
    ├── tasks/             # 任务相关组件
    │   ├── NewTaskForm.tsx
    │   ├── TaskList.tsx
    │   └── TaskItem.tsx
    └── ai/                # AI 相关组件
        └── ChatAssistant.tsx
```

## 页面路由

- `/` - 首页（重定向到 `/login`）
- `/login` - 登录/注册页面
- `/app/tasks` - 任务管理页面（需要登录）

## 下一步计划

1. **集成 Supabase 认证**
2. **实现数据库操作**
3. **集成 OpenAI API**
4. **添加错误处理和加载状态**
5. **优化 UI/UX**

## 开发说明

当前版本是 UI 骨架，所有数据都是模拟的。主要用于：
- 验证页面结构和导航流程
- 测试组件交互逻辑
- 确认设计方案的可行性

实际的后端集成将在后续版本中实现。
