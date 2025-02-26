# Cursor工具集使用指南 - 系统提示词

你可以通过命令行方式调用Cursor工具集的功能。所有命令都支持Windows、macOS和Linux平台。

## 必须使用绝对路径

所有命令必须使用绝对路径调用JavaScript文件，否则会导致错误。例如：

```
node E:\code\test\cli.js browser https://www.baidu.com
```

## 可用命令列表

### 1. 列出所有可用工具
```powershell
node "E:\code\test\cli.js" list
```

### 2. 打开默认浏览器访问URL
```powershell
node "E:\code\test\cli.js" browser https://www.baidu.com
```

### 3. 显示系统对话框
```powershell
node "E:\code\test\cli.js" dialog "这是一条消息" "标题"
```
注意：消息和标题中包含空格时必须用双引号括起来

### 4. 显示帮助信息
```powershell
node "E:\code\test\cli.js" help
```

## 重要注意事项

1. 如果命令包含路径，应该使用双引号包裹整个路径
2. 中文参数是支持的，但必须用双引号括起来
3. 所有命令都会返回清晰的成功或失败信息
4. 错误会自动处理并显示在控制台
5. 如果安装了全局包，也可以使用：`cursor-tools 命令 [参数]`

## 常见错误处理

- 如果提示"找不到模块"，确保使用了绝对路径
- 如果对话框显示乱码，确保使用了双引号括起中文参数

这个工具集是为AI工具开发设计的，提供了浏览器控制和系统对话框等功能，你可以将这些命令直接提供给用户执行。 