# LowCode - 低代码平台项目

一个基于Monorepo架构的企业级低代码开发平台，提供可视化组件拖拽、页面配置、实时预览等核心功能，帮助开发者快速构建Web应用。

## 🌟 核心特性

- **可视化开发**：通过拖拽组件快速构建页面
- **实时预览**：所见即所得的页面预览功能
- **组件化设计**：丰富的可复用组件库
- **灵活配置**：支持组件属性的动态配置
- **Monorepo架构**：统一管理前端、后端和组件库

## 🛠️ 技术栈

### 前端应用 (Web)
- **框架**: React 19
- **构建工具**: Vite 7
- **UI组件库**: Ant Design 6
- **状态管理**: React Context
- **拖拽功能**: React DnD
- **HTTP请求**: Axios
- **路由**: React Router 7
- **样式**: SASS

### 预览服务 (preIframe)
- **框架**: React 19
- **构建工具**: Vite 7
- **路由**: React Router 7

### 后端API (api)
- **框架**: NestJS 11
- **ORM**: TypeORM
- **数据库**: PostgreSQL
- **语言**: TypeScript

### 公共库
- **组件库**: @wect/components
- **工具函数**: @wect/utils
- **配置管理**: @wect/config

## 📁 项目结构

```
LowCode/
├── apps/
│   ├── web/          # 主Web应用（低代码编辑器）
│   │   ├── src/
│   │   └── package.json
│   ├── api/          # 后端API服务
│   └── preIframe/    # 预览服务应用
├── packages/
│   ├── components/   # 公共组件库
│   ├── config/       # 配置管理
│   └── utils/        # 工具函数库
├── docs/             # 项目文档
└── package.json      # 根目录配置
```

## 🚀 快速开始

### 前置条件

确保您已安装以下软件：
- Node.js 18.0+ (推荐最新LTS版本)
- Yarn 4.9.1+

### 安装步骤

1. 克隆项目到本地：

```bash
git clone <项目地址>
cd LowCode
```

2. 安装项目依赖：

```bash
# 安装所有项目依赖
yarn install
# 安装依赖后构建组件包
yarn build:packages
```

3. 配置API服务：

   - 查看 `apps/api/.env.example` 文件，了解配置项
   - 编辑 `apps/api/.env` 文件，配置数据库连接信息
   - 根据实际环境配置数据库连接信息

### 开发环境启动

#### 启动单个应用

```bash
# 启动Web应用 (低代码编辑器)
yarn dev:web

# 启动API服务
yarn dev:api

# 启动预览服务
yarn dev:pre
```

#### 启动所有应用

```bash
yarn dev:all
```

### 构建项目

#### 构建所有包和应用

```bash
yarn build:all
```

#### 选择性构建

```bash
# 仅构建应用
yarn build:apps

# 仅构建组件包
yarn build:packages
```

## 📝 使用指南

### 低代码编辑器

1. 启动Web应用后，访问 `http://localhost:5173`
2. 在左侧组件面板拖拽组件到画布
3. 在右侧属性面板配置组件属性
4. 点击顶部预览按钮查看效果
5. 保存页面配置到后端

### API接口

API服务提供以下主要接口：
- 页面管理：创建、查询、更新、删除页面
- 组件管理：组件元数据管理
- 配置管理：应用配置管理

## 📄 文档

项目文档位于 `docs/` 目录下，包含：

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License