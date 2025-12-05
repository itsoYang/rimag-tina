# 使用官方 Node.js 18 Alpine 镜像
FROM node:18-alpine AS base

# 配置国内镜像源
RUN npm config set registry https://registry.npmmirror.com && \
    npm install -g pnpm && \
    pnpm config set registry https://registry.npmmirror.com

WORKDIR /app

# ============================================
# 依赖安装阶段
# ============================================
FROM base AS deps

# 只复制 package.json，让 pnpm 重新生成 lockfile
COPY package.json ./
RUN pnpm install

# ============================================
# 构建阶段
# ============================================
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 删除可能存在的旧构建产物
RUN rm -rf .next public/admin

# 显式设置 TinaCloud 环境变量（从构建参数传入）
ARG NEXT_PUBLIC_TINA_CLIENT_ID
ARG TINA_TOKEN
ARG NEXT_PUBLIC_TINA_BRANCH=main

ENV NEXT_PUBLIC_TINA_CLIENT_ID=$NEXT_PUBLIC_TINA_CLIENT_ID
ENV TINA_TOKEN=$TINA_TOKEN
ENV NEXT_PUBLIC_TINA_BRANCH=$NEXT_PUBLIC_TINA_BRANCH

# 构建项目（使用 TinaCloud）
RUN pnpm build && \
    echo "验证构建产物..." && \
    ls -la /app/public/admin/index.html || \
    (echo "❌ 错误: TinaCMS admin 目录未生成！构建失败" && exit 1)

# ============================================
# 生产运行阶段
# ============================================
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 设置 TinaCloud 运行时环境变量
ARG NEXT_PUBLIC_TINA_CLIENT_ID
ARG TINA_TOKEN
ARG NEXT_PUBLIC_TINA_BRANCH=main
ARG NEXT_PUBLIC_API_BASE_URL

ENV NEXT_PUBLIC_TINA_CLIENT_ID=$NEXT_PUBLIC_TINA_CLIENT_ID
ENV TINA_TOKEN=$TINA_TOKEN
ENV NEXT_PUBLIC_TINA_BRANCH=$NEXT_PUBLIC_TINA_BRANCH
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 复制 standalone 构建产物
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 复制 public 目录（包括 admin）
COPY --from=builder /app/public ./public

# 复制 tina 目录和配置（TinaCMS 需要）
COPY --from=builder /app/tina ./tina
COPY --from=builder /app/package.json ./package.json

# 复制 content 目录（允许容器内写入）
COPY --from=builder --chown=nextjs:nodejs /app/content ./content

# 创建并设置 uploads 目录权限
RUN mkdir -p /app/public/uploads && \
    chown -R nextjs:nodejs /app/public/uploads /app/content

# 验证关键文件
RUN echo "=== 验证构建产物 ===" && \
    ls -la /app/public/admin/index.html && \
    ls -la /app/server.js && \
    echo "✅ 所有关键文件验证通过"

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
