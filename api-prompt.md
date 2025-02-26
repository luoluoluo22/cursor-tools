# Cursor工具集API使用指南 - 系统提示词

Cursor工具集提供了RESTful API接口，你可以通过HTTP请求远程调用工具功能。API支持浏览器控制、系统对话框等操作。

## API基本信息

- **基础URL**: `https://cursor-tools.onrender.com` (云端部署版本)
- **本地测试URL**: `http://localhost:3000` (本地开发版本)
- **返回格式**: 所有接口均返回JSON格式数据

## 可用API接口

### 1. 获取工具列表

```
GET /api/tools
```

**响应示例**:
```json
{
  "status": "success",
  "data": ["browser", "dialog"]
}
```

### 2. 打开浏览器

```
POST /api/browser
Content-Type: application/json
 
{
  "url": "https://www.baidu.com"
}
```

**请求参数**:
- `url` (必填): 要打开的网址

**响应示例** (本地环境):
```json
{
  "status": "success",
  "message": "浏览器已打开URL: https://www.baidu.com"
}
```

**响应示例** (云环境):
```json
{
  "status": "success",
  "message": "云环境无法直接打开浏览器，但API调用成功",
  "url": "https://www.baidu.com"
}
```

### 3. 显示系统对话框

```
POST /api/dialog
Content-Type: application/json

{
  "message": "这是一条消息",
  "title": "标题"
}
```

**请求参数**:
- `message` (必填): 要显示的消息内容
- `title` (可选): 对话框标题

**响应示例** (本地环境):
```json
{
  "status": "success",
  "message": "对话框已显示: 这是一条消息"
}
```

**响应示例** (云环境):
```json
{
  "status": "success",
  "message": "云环境无法直接显示对话框，但API调用成功",
  "dialog": {
    "message": "这是一条消息",
    "title": "标题"
  }
}
```

## 使用代码示例

### JavaScript/Node.js:

```javascript
// 打开浏览器
fetch('https://cursor-tools.onrender.com/api/browser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://www.baidu.com'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Python:

```python
import requests

# 显示对话框
response = requests.post(
    'https://cursor-tools.onrender.com/api/dialog',
    json={
        'message': '这是一条测试消息',
        'title': '测试标题'
    }
)
print(response.json())
```

## 重要注意事项

1. 浏览器和对话框功能仅在本地环境有效，云环境下只会模拟操作并返回成功响应
2. 所有请求参数和响应都支持中文
3. 请求时建议设置超时时间，避免长时间等待
4. 云端API可能有请求限制，请适当控制请求频率

## 错误处理

所有API错误都会返回以下格式的JSON:

```json
{
  "status": "error",
  "message": "错误描述信息"
}
```

常见错误状态码:
- `400`: 请求参数错误
- `404`: 请求的工具不存在
- `500`: 服务器内部错误

当你需要在AI系统中集成Cursor工具集功能时，可以使用上述API接口访问其功能。 