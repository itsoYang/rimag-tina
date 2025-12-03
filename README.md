# 医学影像检查项目名称及编码标准化平台

基于 **Next.js 15** + **TinaCMS** + **Ant Design** 构建的医学影像标准化官网，提供标准查询、AI 辅助功能、内容管理等功能。

## ✨ 核心功能

- 🏥 **标准查询**：医学影像检查项目名称及编码标准查询
- 🤖 **AI 平台**：项目名称标准化、检查推荐、报告解读等 AI 功能
- 📝 **内容管理**：基于 TinaCMS 的可视化内容编辑
- 📱 **响应式设计**：支持桌面和移动端
- 🌍 **国际化**：中英文双语支持
- 🎨 **现代 UI**：基于 Tailwind CSS + Ant Design

## 🛠️ 技术栈

- **框架**: Next.js 15 (App Router)
- **CMS**: TinaCMS (TinaCloud)
- **UI**: Ant Design + Tailwind CSS
- **语言**: TypeScript
- **动画**: Motion
- **部署**: Docker + Docker Compose

## 📦 快速开始

### 前置要求

- Node.js 18+ 
- pnpm 8+
- Docker & Docker Compose（生产环境）

### 本地开发

1. **安装依赖**

```bash
pnpm install
```

2. **配置环境变量**

创建 `.env.local` 文件：

```bash
# TinaCloud 配置（从 https://app.tina.io 获取）
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
NEXT_PUBLIC_TINA_BRANCH=main

# 后端 API 地址
NEXT_PUBLIC_API_BASE_URL=https://bzh.rimagcloud.com
```

3. **启动开发服务器**

```bash
pnpm dev
```

访问：
- 网站：http://localhost:3001
- 管理后台：http://localhost:3001/admin

## 🚀 生产部署（Docker）

### 步骤 1：构建镜像

```bash
# 在项目根目录执行
docker build \
  --build-arg NEXT_PUBLIC_TINA_CLIENT_ID=你的_client_id \
  --build-arg TINA_TOKEN=你的_token \
  --build-arg NEXT_PUBLIC_TINA_BRANCH=main \
  -t rimag-tina:latest .
```

> **重要**：TinaCMS 的 `NEXT_PUBLIC_*` 环境变量会在构建时编译到前端代码中，因此必须在构建镜像时传入。

### 步骤 2：配置环境变量

创建 `.env` 文件（服务器上）：

```bash
# TinaCloud 配置（构建时已编译，运行时可选）
NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
NEXT_PUBLIC_TINA_BRANCH=main

# 后端 API 地址（运行时环境变量）
NEXT_PUBLIC_API_BASE_URL=https://bzh.rimagcloud.com
```

### 步骤 3：启动容器

```bash
docker-compose up -d
```

### 步骤 4：验证部署

```bash
# 查看容器状态
docker-compose ps

# 查看日志
docker-compose logs -f rimag-tina

# 访问服务
curl http://localhost:3000
```

### 管理命令

```bash
# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 更新部署（重新构建）
docker build --build-arg ... -t rimag-tina:latest .
docker-compose down
docker-compose up -d
```

## 📝 TinaCMS 内容管理

### 注册 TinaCloud

1. 访问 https://app.tina.io
2. 使用 GitHub 账号登录
3. 创建新项目并连接到你的 GitHub 仓库
4. 获取 `Client ID` 和 `Token`

### 内容编辑

1. 访问 `/admin` 路由
2. 使用 TinaCloud 账号登录
3. 可视化编辑 Markdown 内容
4. 保存后内容自动同步到 GitHub

### 内容结构

```
content/
├── about/          # 关于我们
│   └── about.md
├── blog/           # 博客文章
│   ├── ai-in-medical-imaging.md
│   └── ...
├── news/           # 新闻动态
│   ├── welcome-post.zh.md
│   ├── welcome-post.en.md
│   └── ...
├── overview/       # 标准概览
│   ├── overview_1.zh.md
│   └── ...
└── global/         # 全局配置
    └── index.json
```

## 🔧 开发说明

### 项目结构

```
rimag-tina/
├── app/                    # Next.js App Router 页面
│   ├── about/             # 关于我们
│   ├── ai/                # AI 平台
│   ├── blog/              # 博客
│   ├── news/              # 新闻
│   ├── overview/          # 标准概览
│   ├── standards/         # 标准查询
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── ai/               # AI 功能组件
│   ├── common/           # 通用组件
│   ├── home/             # 首页组件
│   └── standards/        # 标准查询组件
├── content/              # Markdown 内容（TinaCMS）
├── lib/                  # 工具函数和配置
│   ├── api.config.ts    # API 配置
│   └── i18n/            # 国际化
├── public/               # 静态资源
│   ├── admin/           # TinaCMS 管理界面（自动生成）
│   └── uploads/         # 用户上传文件
├── tina/                 # TinaCMS 配置
│   ├── config.tsx       # CMS 主配置
│   └── collection/      # 内容集合定义
├── Dockerfile            # Docker 构建文件
├── docker-compose.yml    # Docker Compose 配置
└── package.json          # 项目依赖
```

### 常用命令

```bash
# 开发
pnpm dev              # 启动开发服务器
pnpm build            # 构建生产版本
pnpm start            # 启动生产服务器
pnpm lint             # 代码检查

# TinaCMS
pnpm tina:build       # 构建 TinaCMS（已集成在 dev 中）
```

## 🌐 环境变量说明

| 变量名 | 说明 | 必填 | 构建时 | 运行时 |
|--------|------|------|--------|--------|
| `NEXT_PUBLIC_TINA_CLIENT_ID` | TinaCloud 客户端 ID | ✅ | ✅ | ❌ |
| `TINA_TOKEN` | TinaCloud 访问令牌 | ✅ | ✅ | ❌ |
| `NEXT_PUBLIC_TINA_BRANCH` | Git 分支名称 | ⚠️ | ✅ | ❌ |
| `NEXT_PUBLIC_API_BASE_URL` | 后端 API 地址 | ✅ | ❌ | ✅ |

> **注意**：
> - `NEXT_PUBLIC_*` 变量会在构建时编译到前端代码中
> - 运行时无法修改这些变量
> - 如需修改 TinaCloud 配置，必须重新构建镜像

## 🐛 常见问题

### 1. 构建失败：`params is possibly 'null'`

**原因**：Next.js 15 要求对动态路由参数进行 null 检查。

**解决**：已在代码中添加 `params?.slug` 的 null 检查。

### 2. TinaCMS 管理界面 404

**原因**：TinaCMS admin 目录未生成。

**解决**：检查 `public/admin/index.html` 是否存在，重新执行 `pnpm build`。

### 3. 内容无法加载

**原因**：TinaCloud 配置错误或网络问题。

**解决**：
1. 检查环境变量是否正确
2. 确认 TinaCloud 项目已正确配置
3. 查看浏览器控制台错误信息

## 📄 许可证

本项目采用 [Apache 2.0](./LICENSE) 许可证。

## 🙏 致谢

- [TinaCMS](https://tina.io) - 内容管理系统
- [Next.js](https://nextjs.org) - React 框架
- [Ant Design](https://ant.design) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com) - CSS 框架

---

**医学影像标准化平台** - 让医学影像标准化更简单 🏥
