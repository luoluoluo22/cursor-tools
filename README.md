# Cursor 本地工具集

这个项目提供了一组可以在 Cursor 中使用的本地工具，方便调用系统功能。同时提供了Web API接口，可以通过HTTP请求远程调用这些功能。

## 功能特点

- 简单的工具管理系统
- 可配置的工具定义
- 支持多平台（Windows、MacOS、Linux）
- 命令行接口，可直接在PowerShell等终端中使用
- Web API接口，可通过HTTP请求调用
- 支持中文参数及显示
- 可部署到Render等云平台

## 当前可用工具

- **浏览器工具**: 打开系统默认浏览器并访问指定URL
- **对话框工具**: 显示系统消息对话框

## 项目结构

```
cursor-tools/
  ├── config/
  │   └── tools.json      # 工具配置文件
  ├── tools/
  │   ├── browser.js      # 浏览器工具实现
  │   └── dialog.js       # 对话框工具实现
  ├── public/
  │   └── index.html      # API Web界面
  ├── index.js            # 主入口文件
  ├── server.js           # Web服务器
  ├── cli.js              # 命令行接口
  ├── demo.js             # API演示脚本
  ├── start.bat           # Windows启动脚本
  ├── start.sh            # Linux/Mac启动脚本
  ├── cli-prompt.md       # 命令行工具使用提示词
  ├── api-prompt.md       # API使用提示词
  ├── api-docs.json       # API文档（供AI解析）
  ├── .env                # 环境变量配置
  ├── .env.example        # 环境变量示例
  ├── render.yaml         # Render部署配置
  └── README.md           # 项目说明文档
```

## 使用方式

本项目提供了三种使用方式：

1. **命令行接口** - 适合本地直接调用
2. **Web API** - 适合远程调用或第三方集成
3. **直接导入** - 适合在Node.js项目中使用

## 命令行使用

⚠️ **重要**: 所有命令都必须使用**绝对路径**调用JavaScript文件，否则会导致错误。

列出所有可用工具：

```powershell
node "E:\code\test\cli.js" list
```

使用浏览器打开网页：

```powershell
node "E:\code\test\cli.js" browser https://www.baidu.com
```

显示消息对话框（支持中文）：

```powershell
node "E:\code\test\cli.js" dialog "这是一条中文消息" "中文标题"
```

显示帮助信息：

```powershell
node "E:\code\test\cli.js" help
```

## Web API 使用

### 启动API服务

Windows:
```
.\start.bat
```

Linux/Mac:
```
chmod +x start.sh
./start.sh
```

### API接口

获取工具列表:
```
GET http://localhost:3000/api/tools
```

打开浏览器:
```
POST http://localhost:3000/api/browser
Content-Type: application/json

{
  "url": "https://www.baidu.com"
}
```

显示对话框:
```
POST http://localhost:3000/api/dialog
Content-Type: application/json

{
  "message": "这是一条消息",
  "title": "标题"
}
```

### 演示界面

启动API服务后，访问 http://localhost:3000 可以查看并测试API功能。

## 部署到云端

项目已配置好可以直接部署到Render平台：

1. 注册Render账号: https://render.com
2. 创建新的Web服务
3. 连接到你的GitHub仓库
4. 设置以下配置:
   - **环境**: `Node`
   - **构建命令**: `npm install`
   - **启动命令**: `node server.js`
   - **环境变量**: 添加 `ENVIRONMENT=production`

注意：云端部署时，浏览器和对话框功能只会模拟执行，无法实际打开浏览器或显示对话框。

## 添加新工具

1. 在 `tools/` 目录中创建新的工具实现文件
2. 在 `config/tools.json` 中添加相应的工具配置
3. 重启应用程序以加载新工具

## AI使用指南

- [命令行使用提示词](./cli-prompt.md) - 适合AI调用命令行工具
- [API使用提示词](./api-prompt.md) - 适合AI调用Web API
- [API JSON文档](./api-docs.json) - 结构化JSON格式，便于AI理解和解析

## 许可证

MIT