# Cursor工具集 API文档

本文档描述了Cursor工具集提供的API，供AI使用以理解各工具的功能和参数。

## 命令行接口 (CLI)

Cursor工具集提供了命令行接口，可以直接从PowerShell或其他终端使用。

### 安装

如果全局安装了工具集，可以直接使用`cursor-tools`命令：

```powershell
npm install -g cursor-tools
cursor-tools list
```

否则，可以使用本地命令：

```powershell
node cli.js list
```

### 可用命令

#### 列出所有工具

```powershell
node cli.js list
```

#### 打开浏览器

```powershell
node cli.js browser https://www.example.com
```

#### 显示对话框

```powershell
node cli.js dialog "这是一条消息" "标题"
```

## 工具管理器

工具管理器是加载和管理所有工具的核心组件。

```javascript
const path = require('path');
const indexPath = path.resolve(__dirname, 'index.js');
const { toolManager } = require(indexPath);
```

### 方法

#### listTools()

列出所有可用的工具。

**返回值**: `string[]` - 工具名称列表

**示例**:
```javascript
const tools = toolManager.listTools();
console.log(tools); // ['browser', 'dialog']
```

**PowerShell示例**:
```powershell
node cli.js list
```

#### getTool(toolName)

获取指定名称的工具。

**参数**:
- `toolName` (string): 工具名称

**返回值**: `object|null` - 工具对象，如果工具不存在则返回null

**示例**:
```javascript
const browser = toolManager.getTool('browser');
```

## 浏览器工具 (browser)

浏览器工具用于打开系统默认浏览器并访问指定URL。

### 方法

#### openBrowser(url)

打开系统默认浏览器并访问指定URL。

**参数**:
- `url` (string): 要访问的URL

**返回值**: `Promise<string>` - 执行结果

**JavaScript示例**:
```javascript
const browser = toolManager.getTool('browser');
if (browser) {
  browser.openBrowser('https://www.example.com')
    .then(result => console.log(result))
    .catch(error => console.error(error));
}
```

**PowerShell示例**:
```powershell
node cli.js browser https://www.example.com
```

## 对话框工具 (dialog)

对话框工具用于显示系统消息对话框。

### 方法

#### showMessageBox(message, title)

显示消息对话框。

**参数**:
- `message` (string): 要显示的消息
- `title` (string, 可选): 对话框标题，默认为"消息"

**返回值**: `Promise<string>` - 执行结果

**JavaScript示例**:
```javascript
const dialog = toolManager.getTool('dialog');
if (dialog) {
  dialog.showMessageBox('这是一条消息', '标题')
    .then(result => console.log(result))
    .catch(error => console.error(error));
}
```

**PowerShell示例**:
```powershell
node cli.js dialog "这是一条消息" "标题"
```

## 工具调用规范 (适用于AI)

AI在调用这些工具时应遵循以下规范：

1. **首先检查工具是否存在**：使用`toolManager.listTools()`或`toolManager.getTool()`确认工具可用性
2. **处理错误**：使用try/catch或Promise的catch方法捕获可能的错误
3. **参数传递**：确保传递所有必需参数，并按照正确的类型和格式
4. **异步处理**：所有工具方法都返回Promise，需要使用异步方式处理结果

### CLI命令调用规范

当通过CLI命令调用工具时：

1. **参数引号**：包含空格的参数需要用双引号括起来
2. **错误处理**：CLI会自动处理错误并显示适当的错误消息
3. **命令格式**：始终遵循`node cli.js <command> [params...]`格式

## 工具返回值解释

每个工具方法都会返回一个Promise，解析为一个字符串，描述操作的结果。可能的结果示例：

- 浏览器工具：
  - 成功：`"成功打开浏览器访问: https://www.example.com"`
  - 失败：`"打开浏览器失败: [错误详情]"`

- 对话框工具：
  - 成功：`"消息框显示成功，用户点击了: 确定"`
  - 成功：`"用户关闭了对话框"`
  - 失败：`"显示消息框失败: [错误详情]"`

## 错误处理

工具可能产生的常见错误：

1. **工具不存在**：尝试使用不存在的工具名
2. **参数无效**：提供的参数类型或格式不正确
3. **系统限制**：由于系统权限或配置导致的执行失败
4. **用户交互**：用户关闭对话框或取消操作

AI应该对这些错误有适当的处理策略。 