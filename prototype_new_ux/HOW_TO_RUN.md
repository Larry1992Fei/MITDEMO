# 如何运行模块化版本

## ⚠️ 重要提示

由于使用了 ES6 模块（`type="module"`），**不能直接双击打开 HTML 文件**，必须通过 HTTP 服务器访问。

## 🚀 运行方法

### 方法 1：使用 Python（推荐）

在项目根目录（MITDEMO）下运行：

```bash
# Python 3
python -m http.server 8000

# 或者 Python 2
python -m SimpleHTTPServer 8000
```

然后访问：http://localhost:8000/prototype_new_ux/

### 方法 2：使用 Node.js

```bash
# 安装 http-server（只需一次）
npm install -g http-server

# 在项目根目录运行
http-server -p 8000
```

然后访问：http://localhost:8000/prototype_new_ux/

### 方法 3：使用 VS Code Live Server

1. 安装 VS Code 扩展：Live Server
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

### 方法 4：使用 PHP

```bash
php -S localhost:8000
```

然后访问：http://localhost:8000/prototype_new_ux/

## 🐛 调试方法

1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页
3. 应该能看到以下日志：
   - "Initializing app..."
   - "Rendering progress: ..."
   - "Progress rendered successfully"
   - "App initialized successfully"

如果看不到这些日志，说明 JavaScript 没有正确加载。

## 🔍 常见问题

### Q: 页面空白或没有进度条
A: 检查浏览器控制台是否有错误信息，确保通过 HTTP 服务器访问

### Q: 提示 CORS 错误
A: 确保使用上述方法之一启动 HTTP 服务器，不要直接打开文件

### Q: JavaScript 模块加载失败
A: 检查文件路径是否正确，确保所有 JS 文件都存在

## 📝 对比测试

### 原始版本（单文件）
直接打开：`prototype_new_ux.html`
- ✅ 可以直接双击打开
- ❌ 代码难以维护

### 模块化版本
通过服务器访问：`http://localhost:8000/prototype_new_ux/`
- ❌ 需要 HTTP 服务器
- ✅ 代码结构清晰，易于维护

## 🎯 验证清单

访问页面后，检查以下内容是否正常：

- [ ] 顶部有 PayerMax logo 和标题
- [ ] 左侧有业务模式选择面板
- [ ] 右侧顶部有进度条（Step 1, Step 2, Step 3...）
- [ ] 右侧中间有表单内容
- [ ] 右侧底部有"下一步"按钮
- [ ] 浏览器控制台没有错误信息

如果以上都正常，说明模块化版本运行成功！
