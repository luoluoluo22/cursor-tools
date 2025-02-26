# Cursor工具集使用指南 - 系统提示词

你可以通过命令行方式调用Cursor工具集的功能，或者使用云端API远程调用。所有命令都支持Windows、macOS和Linux平台。

## 命令行工具使用方式

### 必须使用绝对路径

所有命令必须使用绝对路径调用JavaScript文件，否则会导致错误。例如：

```
node E:\code\test\cli.js browser https://www.baidu.com
```

### 可用命令列表

#### 1. 列出所有可用工具
```powershell
node "E:\code\test\cli.js" list
```

#### 2. 打开默认浏览器访问URL
```powershell
node "E:\code\test\cli.js" browser https://www.baidu.com
```

#### 3. 显示系统对话框
```powershell
node "E:\code\test\cli.js" dialog "这是一条消息" "标题"
```
注意：消息和标题中包含空格时必须用双引号括起来

#### 4. 显示帮助信息
```powershell
node "E:\code\test\cli.js" help
```

### 重要注意事项

1. 如果命令包含路径，应该使用双引号包裹整个路径
2. 中文参数是支持的，但必须用双引号括起来
3. 所有命令都会返回清晰的成功或失败信息
4. 错误会自动处理并显示在控制台
5. 如果安装了全局包，也可以使用：`cursor-tools 命令 [参数]`

## 云端API使用方式

除了命令行工具，Cursor工具集也提供了RESTful API接口，可以通过HTTP请求远程调用：

### 云端API基本信息

- **API基础URL**: `https://cursor-tools.onrender.com`
- **返回格式**: 所有接口均返回JSON格式数据

### 主要API接口

#### 1. 获取工具列表
```
GET /api/tools
```

#### 2. 打开浏览器
```
POST /api/browser
Content-Type: application/json

{
  "url": "https://www.baidu.com"
}
```

#### 3. 显示系统对话框
```
POST /api/dialog
Content-Type: application/json

{
  "message": "这是一条消息",
  "title": "标题"
}
```

### 云端API注意事项

1. 浏览器和对话框功能在云环境中会模拟执行，无法在实际环境中打开浏览器或显示对话框
2. 详细API文档请参考：`api-prompt.md`
3. 建议的云端工具扩展请参考：`cloud-tools.md`

## 常见错误处理

- 如果提示"找不到模块"，确保使用了绝对路径
- 如果对话框显示乱码，确保使用了双引号括起中文参数
- 如果API请求失败，检查请求格式和参数是否正确

这个工具集既可作为本地工具使用，也可以通过云API远程调用，为AI工具开发提供了灵活的选择。 