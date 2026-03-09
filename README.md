# AI-VoiceClaw for Customer Service (E-commerce) v1.2


## 📖 项目简介 (Introduction)

**AI-VoiceClaw** 是一个专为电商客服设计的智能化工作台，旨在通过 AI 技术解决夜间客服值守难题。系统能够将语音通话转化为结构化任务，提供实时意图识别、紧急预警和智能回复建议，从而提升客服效率并降低人力成本。

### 核心功能 (Core Features)
- **全景看板 (Dashboard)**: 实时监控夜间接听量、AI 解决率、紧急任务数等关键指标。
- **智能任务列表 (Task List)**: 自动分类通话意图（售前咨询、售后投诉等），支持按优先级筛选。
- **任务详情与回溯 (Task Detail)**: 提供通话录音回放、全文转写、AI 摘要及处置建议。
- **实时对话辅助 (Live Chat)**: 集成 AI 语义分析，实时推荐最佳回复策略 (Next Best Action)。

## 🛠️ 技术栈 (Tech Stack)

本项目采用前沿的前端技术栈构建：

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **AI Integration**: Backend Proxy for LLM APIs (Gemini, OpenAI, etc.)
- **Visualization**: [Recharts](https://recharts.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 快速开始 (Getting Started)

### 前置要求 (Prerequisites)
- Node.js (v18+)
- npm / yarn / pnpm

### 安装与运行 (Installation)

1. **克隆项目**:
   ```bash
   git clone <repository-url>
   cd AI-VoiceClaw-for-Customer-Service-E-commerce_v1.2
   ```

2. **后端服务配置**:
   ```bash
   cd server
   npm install
   cp .env.example .env
   # 编辑 .env 填入 GEMINI_API_KEY
   npm run dev
   ```
   后端服务将在 `http://localhost:3001` 启动。

3. **前端服务配置** (新开终端):
   ```bash
   # 回到根目录
   cd ..
   npm install
   npm run dev
   ```
   访问: `http://localhost:3000`

## 📅 开发计划 (Roadmap)

详细开发计划请参考 [todo.md](./todo.md)。

1. **环境与依赖治理**: 清理前端冗余依赖，适配 macOS 本地开发环境。
2. **后端服务搭建**: 建立 Node.js 后端代理，保护 API Key 安全。
3. **LLM 通用化配置**: 支持多模型接入（Gemini/OpenAI/Claude），解耦特定厂商依赖。
4. **Dashboard 增强**: 接入真实数据流，优化图表性能。
5. **基础配置模块**: 增加用户管理与 RBAC 权限控制。

## 🤝 贡献 (Contributing)
欢迎提交 Issue 和 Pull Request 来改进本项目。

## 📄 License
MIT
