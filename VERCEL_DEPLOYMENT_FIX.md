# Vercel部署问题修复指南

## 问题原因

1. **缺少环境变量**: Vercel部署时缺少TinaCMS所需的环境变量
2. **TinaCMS Cloud Schema未同步**: 由于删除了旧的collections，TinaCMS Cloud需要时间重新索引

## 修复步骤

### 第一步：在Vercel Dashboard中配置环境变量

登录Vercel，进入`rimag-tina`项目，在Settings → Environment Variables中添加以下变量：

#### 必需的环境变量：

1. **NEXT_PUBLIC_TINA_CLIENT_ID**
   - Value: `1493ff9c-3120-4736-b645-6a5ab674bae0`
   - Environments: Production, Preview, Development

2. **TINA_TOKEN**
   - Value: `f817cc38adb555349c5a38c6d336a6539377c669`
   - Environments: Production, Preview, Development
   - ⚠️ 这是敏感信息，建议在TinaCMS Cloud重新生成

3. **NEXT_PUBLIC_TINA_BRANCH**
   - Value: `main`
   - Environments: Production, Preview, Development

4. **NEXT_PUBLIC_API_BASE_URL**
   - Value: `https://bzh.rimagcloud.com`
   - Environments: Production, Preview, Development

### 第二步：等待TinaCMS Cloud完成索引

由于我们删除了Page、Post、Author、Tag等旧collections，TinaCMS Cloud需要重新索引schema。

检查索引状态：
- 访问 https://app.tina.io
- 进入你的项目
- 查看indexing状态

### 第三步：触发重新部署

配置完环境变量后：
1. 在Vercel Dashboard中点击 "Deployments"
2. 找到最新的部署记录
3. 点击右侧的三个点菜单
4. 选择 "Redeploy"

### 第四步（可选）：关于两个项目的问题

你提到有两个Vercel项目：
- **rimag-web**: 这是之前RimagWebDev项目的部署
- **rimag-tina**: 这是新的集成项目部署

建议：
- 保留 `rimag-tina` 作为主项目
- 可以删除或停用 `rimag-web` 项目（如果不再需要）

## 验证部署成功

部署成功后，访问：
- https://rimag-tina.vercel.app - 应该能看到首页
- https://rimag-tina.vercel.app/news - 新闻页面
- https://rimag-tina.vercel.app/overview - 标准介绍页面

## 常见错误和解决方法

### 错误1: "Tina Dev server is already in use"
- 这是本地开发错误，Vercel不会遇到
- 本地修复：`lsof -i :9000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

### 错误2: "GraphQL schema doesn't match"
- TinaCMS Cloud还在索引中
- 等待5-10分钟后重试部署

### 错误3: "TINA_TOKEN is not defined"
- 环境变量未正确配置
- 检查Vercel Environment Variables设置

## 后续优化建议

1. **更新TINA_TOKEN**: 当前token可能是临时的，建议在TinaCMS Cloud重新生成永久token
2. **配置自定义域名**: 将rimag-tina.vercel.app绑定到你的域名
3. **启用Preview Mode**: 利用Vercel的Preview Deployments进行内容预览
