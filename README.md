# 在线简历生成器

一个基于 Vue 3 + TypeScript 的在线简历系统，支持访问码验证、中英文切换和 PDF 导出功能。

## 相关项目
- 后端项目：[sakana-resume-backend（go + gin + gorm）](https://github.com/sakana9826/sakana-resume-backend)

## 功能特点

- 🔐 访问码验证
  - 24小时有效期
  - 一次性使用
  - 后端验证

- 🌐 中英文切换
  - 实时切换语言
  - 支持自定义翻译

- 📄 PDF 导出
  - A4 纸张格式
  - 高质量导出
  - 保持原始样式

- 💅 现代化设计
  - 响应式布局
  - Tailwind CSS 样式
  - 清晰的排版

## 技术栈

- 前端
  - Vue 3
  - TypeScript
  - Tailwind CSS
  - Vue Router
  - Vue I18n
  - html2pdf.js

- 后端
  - Go
  - Gin
  - GORM
  - JWT

## 快速开始

1. 安装依赖
```bash
pnpm install
```

2. 启动开发服务器
```bash
pnpm dev
```

3. 构建生产版本
```bash
pnpm build
```

## 环境变量

- 开发环境 (.env)
```
VITE_API_BASE_URL=http://localhost:8080
```

- 生产环境 (.env.production)
```
VITE_API_BASE_URL=https://api.your-domain.com
```

## 项目结构

```
src/
├── components/     # 组件
├── views/         # 页面
├── router/        # 路由配置
├── i18n/          # 国际化
├── config/        # 配置文件
├── types/         # 类型定义
└── style/         # 样式文件
```

## 部署

### 自动部署（推荐）

本项目使用 GitHub Actions 实现自动部署。每次推送代码到 main 分支时，会自动在服务器上构建 Docker 镜像并部署。

配置步骤：

1. 在服务器上克隆项目并配置 Git
```bash
git clone https://github.com/your-username/sakana-resume.git
cd sakana-resume
```

2. 在 GitHub 仓库的 Settings -> Secrets and variables -> Actions 中添加以下密钥：
   - `SERVER_HOST`: 服务器 IP 或域名
   - `SERVER_USERNAME`: 服务器用户名
   - `SERVER_SSH_KEY`: 服务器 SSH 私钥

3. 修改 `.github/workflows/deploy.yml` 中的项目路径：
   ```yaml
   cd /path/to/project  # 改为你的项目实际路径
   ```

4. 推送代码到 main 分支即可触发自动部署

### 使用 Docker 手动部署

1. 构建 Docker 镜像
```bash
docker build -t sakana-resume .
```

2. 运行容器
```bash
docker run -d -p 80:80 sakana-resume
```

### 手动部署

1. 修改 `.env.production` 中的后端 API 地址
2. 运行 `pnpm build` 生成生产版本
3. 将 `dist` 目录部署到 Web 服务器

## 安全说明

- 访问码验证在后端进行
- 使用 JWT 进行身份验证
- 访问码具有时效性和一次性使用限制


## 许可证

本项目采用 MIT 许可证。MIT 许可证是一个宽松的软件许可证，主要特点：

- ✅ 可以自由使用、修改和分发代码
- ✅ 可以将代码用于商业用途
- ✅ 修改后的代码可以闭源
- ❗ 需要在软件和文档中包含原始许可证和版权声明
- ❗ 不提供任何担保

完整的许可证文本请查看 [LICENSE](LICENSE) 文件。