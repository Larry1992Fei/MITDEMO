# 订阅代扣演示 Demo - 模块化架构版本

## 📁 项目结构

```
prototype_new_ux/
├── index.html                 # 主 HTML 文件
├── css/                       # 样式文件
│   ├── variables.css         # CSS 变量和主题
│   ├── layout.css            # 布局样式
│   ├── components.css        # 组件样式
│   └── code-display.css      # 代码展示样式
├── js/                        # JavaScript 模块
│   ├── config/               # 配置文件
│   │   ├── modes.js          # 业务模式配置
│   │   └── steps.js          # 步骤配置
│   ├── components/           # 组件模块（待完善）
│   │   ├── progress.js       # 进度条组件
│   │   ├── codeBlock.js      # 代码块组件
│   │   └── pmComponent.js    # PayerMax 组件封装
│   ├── modes/                # 业务模式模块（待完善）
│   │   ├── payermax.js       # PayerMax 托管模式
│   │   ├── merchant.js       # 商户自管模式
│   │   └── nonperiodic.js    # 非周期性模式
│   ├── utils/                # 工具函数
│   │   ├── dom.js            # DOM 操作工具
│   │   └── formatter.js      # 数据格式化工具
│   └── app.js                # 主应用入口
└── data/                      # 数据文件（待完善）
    └── templates.js          # 代码模板数据
```

## 🎯 架构优势

### 1. 模块化设计
- **CSS 分离**：样式按功能分类，易于维护和修改
- **JavaScript 模块化**：使用 ES6 模块系统，代码组织清晰
- **配置分离**：业务逻辑与配置数据分离

### 2. 可维护性
- **单一职责**：每个文件只负责一个功能模块
- **易于定位**：问题定位更快，修改影响范围小
- **代码复用**：工具函数和组件可以在多处复用

### 3. 可扩展性
- **新增模式**：只需添加新的模式配置和对应的模块
- **新增功能**：可以独立添加新的组件或工具函数
- **主题定制**：修改 `variables.css` 即可更换主题

### 4. 协作友好
- **并行开发**：不同开发者可以同时修改不同模块
- **代码审查**：小文件更容易进行代码审查
- **版本控制**：Git 冲突减少，合并更容易

### 5. 性能优化
- **按需加载**：可以实现模块的按需加载
- **缓存优化**：CSS 和 JS 文件可以独立缓存
- **代码分割**：未来可以进一步优化打包策略

## 🚀 使用方法

### 开发环境

由于使用了 ES6 模块，需要通过 HTTP 服务器访问（不能直接打开 HTML 文件）。

**方法 1：使用 Python 内置服务器**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**方法 2：使用 Node.js http-server**
```bash
npx http-server -p 8000
```

**方法 3：使用 VS Code Live Server 插件**
- 安装 Live Server 插件
- 右键点击 `index.html`
- 选择 "Open with Live Server"

然后访问：`http://localhost:8000/prototype_new_ux/`

### 生产环境

可以使用构建工具（如 Webpack、Vite）进行打包优化。

## 📝 开发指南

### 添加新的业务模式

1. 在 `js/config/modes.js` 中添加模式配置
2. 在 `js/config/steps.js` 中添加步骤配置
3. 在 `js/modes/` 中创建对应的模式模块
4. 在 `index.html` 中添加对应的 HTML 面板

### 添加新的组件

1. 在 `js/components/` 中创建组件文件
2. 在 `css/components.css` 中添加组件样式
3. 在需要的地方导入并使用组件

### 修改样式

- **主题颜色**：修改 `css/variables.css` 中的 CSS 变量
- **布局**：修改 `css/layout.css`
- **组件样式**：修改 `css/components.css`
- **代码显示**：修改 `css/code-display.css`

## 🔄 迁移状态

### ✅ 已完成
- [x] 目录结构创建
- [x] CSS 模块化拆分
- [x] JavaScript 基础架构
- [x] 配置文件提取
- [x] 工具函数提取
- [x] 主应用逻辑框架

### 🚧 进行中
- [ ] HTML 内容完整迁移（当前只有基础框架）
- [ ] 组件模块完善
- [ ] 业务模式模块完善
- [ ] 代码模板数据提取

### 📋 待完成
- [ ] 单元测试
- [ ] 文档完善
- [ ] 构建配置
- [ ] 性能优化

## 🔗 相关文件

- **原始文件**：`../prototype_new_ux.html`（保留作为参考）
- **新版本**：`./index.html`（模块化版本）

## 📞 技术支持

如有问题，请参考原始文件或联系开发团队。

## 📄 许可证

内部项目，仅供演示使用。
