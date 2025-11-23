# LowCode

一个基于Monorepo架构的低代码平台项目框架。

## 项目依赖

### 主要依赖
- **包管理器**: Yarn 4.9.1
- **开发工具**: 
  - concurrently (用于同时运行多个开发服务)
  - editorconfig (用于统一代码格式)

### 项目结构
```
LowCode/
├── apps/
│   ├── api/      # API服务应用
│   └── web/      # Web前端应用
├── packages/
│   ├── components/  # 公共组件库
│   ├── config/      # 配置管理
│   └── utils/       # 工具函数库
└── docs/            # 项目文档
```

## 安装指南

### 前置条件
确保您已安装以下软件：
- Node.js (推荐最新LTS版本)
- Yarn

### 安装步骤

1. 克隆项目后，在项目根目录执行以下命令安装依赖：

```bash
# 安装所有项目依赖
yarn install
```

## 使用说明

### 开发环境启动

```bash
# 启动Web应用
yarn dev:web

# 启动API服务
yarn dev:api

# 同时启动Web和API
yarn dev:all
```

### 构建项目

```bash
# 构建所有包和应用
yarn build:all

# 仅构建应用
yarn build:apps

# 仅构建组件包
yarn build:packages
```

### 测试与代码检查

```bash
# 运行测试
yarn test

# 代码风格检查
yarn lint

# 代码格式化
yarn format
```

## 注意事项

当前项目处于初始阶段，Web和API服务的开发服务器实现为基础版本。后续可根据需求扩展功能。
