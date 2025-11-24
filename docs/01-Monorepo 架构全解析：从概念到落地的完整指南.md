# 一、什么是 Monorepo？

## 1.1 核心概念

Monorepo（单体仓库）是一种软件开发架构模式，它将多个相关项目、应用或模块的源代码集中存储在单一的代码仓库中进行管理。与传统的多仓库（Multi-repo）模式不同，Monorepo 允许团队在一个统一的上下文中开发多个相关组件，从而简化了代码共享和项目间依赖管理。

## 1.2 与多仓库（Multi-repo）的对比

| 特性/方面     | Monorepo（单体仓库）   | Multi-repo（多仓库）      |
| --------- | ---------------- | -------------------- |
| **代码组织**  | 所有项目代码在一个仓库中     | 每个项目独立仓库             |
| **代码共享**  | 直接通过引用共享代码，无需发布包 | 需要将共享代码发布为npm包才能复用   |
| **依赖管理**  | 统一依赖版本，避免版本冲突    | 各仓库可能使用不同版本的依赖，易出现冲突 |
| **代码变更**  | 跨项目变更可在一次提交中完成   | 需要在多个仓库中进行多次提交和协调    |
| **构建测试**  | 可统一构建、测试所有项目     | 需要单独构建、测试每个仓库        |
| **存储效率**  | 依赖只安装一次，节省空间     | 相同依赖在各仓库中重复安装        |
| **权限管理**  | 较难实现细粒度的权限控制     | 可针对不同仓库设置不同权限        |
| **初始复杂度** | 配置相对复杂，需要专用工具支持  | 配置简单，容易上手            |

## 1.3 适用场景

Monorepo 特别适合以下场景：

-   **微服务架构**：多个服务紧密相关，经常需要协同开发和部署
-   **组件库开发**：共享UI组件、工具函数等公共资源
-   **前端应用与后端服务的联合开发**：需要频繁跨项目协作
-   **大型团队协作**：代码共享需求高，需要统一的工作流和规范
-   **需要频繁同步更新的多项目**：相关项目之间存在紧密依赖关系

## 1.4 常见误区

需要注意的是，Monorepo 并非适用于所有场景：

-   它不意味着所有代码都必须放在一个文件中，仍然保持良好的模块化结构
-   它不消除代码隔离的需要，相反，Monorepo 更强调合理的项目边界划分
-   它不是解决所有协作问题的银弹，仍需良好的开发规范和流程配合
-   对于完全独立、技术栈差异大、几乎不需要代码共享的项目，多仓库模式可能更合适

# 二、Monorepo 核心目标

在动手前，先明确 Monorepo 的核心目标，避免走偏。其核心是“公共代码抽离、业务项目隔离”，具体目标包括：

-   **统一管理**：代码、依赖、构建、测试、部署流程统一维护；
-   **共享复用**：公共代码（如工具函数、组件、配置）抽为公共包，避免重复开发；
-   **隔离清晰**：各项目/模块独立编译、测试、发布，互不干扰；
-   **高效协作**：跨项目开发无需切换仓库，分支管理、代码审查更简化；
-   **版本一致**：避免多仓库间依赖版本冲突，确保所有项目使用统一的依赖版本。

# 三、技术栈选择

在众多 Monorepo 解决方案中，本次选用的技术栈及核心理由如下：

| 技术组件   | 版本/作用                    | 选择理由                                                                                           |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------- |
| 核心包管理器 | Yarn 4.9.1（Workspace 特性） | 1. Workspace 功能成熟稳定；2. 依赖提升机制（hoisting）减少重复依赖；3. 支持 node-modules 模式；4. 丰富的命令行工具适配 Monorepo 操作 |
| 代码规范   | EditorConfig, Prettier, ESLint | 1. EditorConfig统一多编辑器代码格式配置；2. Prettier负责代码格式化；3. ESLint负责代码质量检查和语法规范；三者结合确保团队编码风格一致和代码质量
| 任务调度   | concurrently             | 支持并行执行多个命令，提升开发和构建效率                                                                           |

# 四、项目目录结构设计

合理的目录结构是 Monorepo 成功的关键，本次采用经典的分层结构，清晰区分业务应用与公共资源，具体结构如下：

```
LowCode/
├── package.json                # 根项目配置（管理公共依赖、脚本命令）
├── tsconfig.base.json          # TypeScript 基础配置（共享给所有子项目）
├── .yarn/                      # Yarn 配置
├── .yarnrc.yml                 # Yarn 运行时配置
├── 其他配置...
├── apps/                       # 业务项目目录（独立部署的应用）
│   ├── web/                    # 前端 Web 应用
│   │   └── package.json
│   ├── api/                    # 后端 API 服务
│   │   └── package.json
├── packages/                   # 公共包目录（可被其他项目依赖）
│   ├── utils/                  # 工具函数库
│   │   └── package.json
│   ├── components/             # UI 组件库
│   │   └── package.json
│   └── config/                 # 共享配置库
│   │   └── package.json
```

**核心目录说明**：

-   **apps/** ：存放业务应用，每个应用都是独立可部署的项目，如前端 Web 应用和后端 API 服务；
-   **packages/** ：存放可重用的公共库，供 apps 目录下的项目依赖使用，包括工具函数、UI 组件和共享配置等；
-   **根目录**：承担全局管理职责，包含项目级公共配置、共享脚本、依赖声明和项目文档。

# 五、实现步骤详解

Monorepo 的实现遵循“初始化-配置-细化”的流程，从根项目搭建到子项目配置逐步推进，确保每个环节衔接顺畅。

## 1. 初始化根项目

首先创建项目根目录并通过 Yarn 初始化，生成基础的 package.json 文件：

```bash
mkdir LowCode
cd LowCode
yarn init -y
```

## 2. 配置 Yarn Workspace

Yarn Workspace 是实现 Monorepo 依赖管理和项目关联的核心，需在根项目的 package.json 中添加如下配置，明确工作空间范围和公共脚本：

```json
{
  "name": "low_code",
  "version": "1.0.0",
  "packageManager": "yarn@4.9.1",
  "private": true,
  "workspaces": [
    "packages/*",    // 所有在 packages 目录下的子项目
    "apps/*"         // 所有在 apps 目录下的子项目
  ],
  "scripts": {
    "test": "yarn workspaces foreach -A run test",
    "build:all": "yarn workspaces foreach -A -p run build",
    "build:apps": "yarn workspaces foreach -A --include 'apps/*' -p run build",
    "build:packages": "yarn workspaces foreach -A --include 'packages/*' -p run build",
    "dev:web": "yarn workspace @wect/web dev",
    "dev:api": "yarn workspace @wect/api dev",
    "dev:all": "concurrently "yarn workspace @wect/web dev" "yarn workspace @wect/api dev"",
    "clean": "yarn workspaces foreach -A -p run clean",
    "add": "yarn workspace",
    "remove": "yarn workspace",
    "lint": "yarn workspaces foreach -A -p run lint",
    "lint:fix": "yarn workspaces foreach -A -p run lint:fix",
    "format": "prettier --write './**/*.{js,jsx,ts,tsx,json,md,yml}' --ignore-path .prettierignore",
    "format:check": "prettier --check './**/*.{js,jsx,ts,tsx,json,md,yml}' --ignore-path .prettierignore"
  },
  "devDependencies": {
    "concurrently": "^9.2.1"
  }
}
```

**配置关键点**：

-   `private: true` 确保根项目不会被意外发布；
-   `workspaces` 数组定义工作空间位置，自动识别指定目录下的子项目；
-   通过 `workspace` 命令操作单个子项目，`workspaces foreach` 批量操作所有子项目；
-   子项目名称统一使用作用域前缀（如 `@wect/web`），避免命名冲突。

## 3. 配置 Yarn 运行时

创建 `.yarnrc.yml` 文件，指定 Yarn 的依赖链接模式，本次采用经典的 node-modules 模式，兼容性更强：

```yml
# Yarn配置文件
nodeLinker: node-modules
```

## 4. 初始化子项目

子项目初始化提供两种方式，可根据实际需求选择：

### 方法一：批量初始化（推荐）

先安装任务调度依赖 concurrently，再通过 Yarn 命令批量初始化所有子项目：

```bash
# 安装公共开发依赖
yarn add -D concurrently

# 批量初始化所有子项目
yarn workspaces foreach -A -p init
```

### 方法二：手动初始化（适用于个别项目）

进入具体子项目目录，单独执行初始化命令，以 web 应用为例：

```bash
cd apps/web
yarn init -y
```

## 5. 配置子项目

每个子项目需配置独立的 package.json，明确自身依赖、脚本命令等信息，同时通过 workspace 协议关联内部公共包。以下是核心子项目的配置示例：

### Web 应用配置（apps/web/package.json）

```json
{
  "name": "@wect/web",
  "version": "1.0.0",
  "private": true,
  "packageManager": "yarn@4.9.1",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "echo '运行Web测试...'",
    "clean": "rm -rf dist",
    "lint": "eslint 'src/**/*.{js,jsx,ts,tsx}'",
    "lint:fix": "eslint 'src/**/*.{js,jsx,ts,tsx}' --fix",
    "format": "prettier --write 'src/**/*' --ignore-path ../../.prettierignore"
  },
  "dependencies": {
    "@wect/utils": "workspace:*",       // 依赖内部工具包
    "@wect/components": "workspace:*",  // 依赖内部组件库
    "@wect/config": "workspace:*",      // 依赖内部配置库
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.10",
    "@types/react": "^19.2.0",
    "@types/react-dom": "^19.2.0",
    "@vitejs/plugin-react": "^5.2.0",
    "eslint": "^9.7.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "typescript": "^5.5.3",
    "vite": "^6.3.9"
  }
}
```

### API 服务配置（apps/api/package.json）

```json
{
  "name": "@wect/api",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "echo "启动API开发服务器..."",
    "build": "echo "构建API服务..."",
    "test": "echo "运行API服务测试..."",
    "lint": "echo "检查API服务代码..."",
    "clean": "echo "清理API服务构建产物..."",
    "deploy": "echo "部署API服务...""
  },
  "dependencies": {
    "@wect/utils": "workspace:*",
    "@wect/config": "workspace:*"
  }
}
```

## 6. 依赖管理详解

Monorepo 中的依赖管理分为“外部依赖”和“内部依赖”，需采用不同的管理方式：

### 安装外部依赖

根据依赖的作用范围，可安装在根项目（所有子项目共享）或特定子项目：

```bash
# 安装根项目依赖（所有子项目共享）
yarn add -D prettier eslint

# 为 web 应用单独安装依赖
yarn workspace @wect/web add react react-dom
```

### 依赖内部子项目

使用 `workspace:` 协议引用其他工作空间，确保始终使用本地最新版本，避免版本不一致问题：

```json
{
  "dependencies": {
    "@wect/utils": "workspace:*",    // * 表示匹配最新版本
    "@wect/components": "workspace:*"
  }
}
```

## 7. 常用脚本命令详解

根项目的 scripts 配置了批量操作子项目的命令，结合 Yarn Workspace 特性实现高效管理，核心命令及用途如下：

| 命令分类                       | 具体命令                                 | 功能说明             |
| -------------------------- | ------------------------------------ | ---------------- |
| 开发命令                       | yarn dev:web                         | 单独启动 web 应用开发服务器 |
|| yarn dev:api               | 单独启动 API 服务开发服务器                     |                 
|| yarn dev:all               | 并行启动 web 和 API 开发服务（依赖 concurrently） |              
| 构建命令                       | yarn build:all                       | 构建所有工作空间（应用+公共包） |
|| yarn build:apps            | 仅构建 apps 目录下的业务应用                    |                 
|| yarn build:packages        | 仅构建 packages 目录下的公共包                 |                 
| 质量保障命令                     | yarn test                            | 运行所有子项目的测试用例     |
|| yarn lint / lint:fix       | 检查/修复所有子项目的代码规范问题                    |           
|| yarn format / format:check | 格式化代码/检查代码格式是否合规                     |             
|| yarn clean                 | 清理所有子项目的构建产物（dist 目录）                |          

**批量命令技巧**：

-   `-A` 参数：操作所有工作空间；
-   `-p` 参数：并行执行命令，提升效率；
-   `--include` 参数：过滤目标工作空间，如 `--include 'apps/*'` 仅操作应用项目。

# 六、版本一致性保障

Monorepo 中依赖版本不一致是常见问题，可能导致运行报错或功能异常，需从以下三方面保障版本统一：

1.  **根级依赖锁定**：将 TypeScript、构建工具、代码规范工具等公共依赖在根项目的 package.json 中明确定义版本，子项目无需重复声明，直接继承根依赖版本；
1.  **使用 workspace 协议**：子项目间的依赖必须使用 `workspace:*` 协议，确保始终引用本地最新版本，避免子项目间依赖版本错位；
1.  **统一 TypeScript 配置**：根项目创建 `tsconfig.base.json` 作为基础配置，子项目通过 `"extends": "../../tsconfig.base.json"` 继承，保证类型检查规则一致。

# 七、实际配置总结

本次 Monorepo 实现的核心配置要点可归纳为以下三点，便于后续维护和扩展：

-   **依赖模式**：采用 node-modules 模式，兼容性强，避免 PnP 模式可能出现的工具适配问题；
-   **命名规范**：子项目统一使用 `@wect/` 作用域前缀，清晰区分项目归属，避免命名冲突；
-   **脚本统一**：所有子项目定义一致的脚本命令（如 build、dev、test），确保批量操作顺畅；