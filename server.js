const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// 导入工具管理器
const toolsPath = path.resolve(__dirname, 'index.js');
const { toolManager } = require(toolsPath);

// 创建Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// 路由：API首页
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Cursor工具集API服务正在运行',
    version: '1.0.0',
    endpoints: [
      { path: '/api/tools', method: 'GET', description: '获取所有可用工具列表' },
      { path: '/api/browser', method: 'POST', description: '打开浏览器（仅在本地运行时有效）' },
      { path: '/api/dialog', method: 'POST', description: '显示对话框（仅在本地运行时有效）' },
      { path: '/api/docs', method: 'GET', description: '获取API文档' }
    ]
  });
});

// 路由：获取工具列表
app.get('/api/tools', (req, res) => {
  try {
    const tools = toolManager.listTools();
    res.json({
      status: 'success',
      data: tools
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// 路由：打开浏览器
app.post('/api/browser', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url) {
      return res.status(400).json({
        status: 'error',
        message: '缺少URL参数'
      });
    }
    
    const browser = toolManager.getTool('browser');
    if (!browser) {
      return res.status(404).json({
        status: 'error',
        message: '浏览器工具未找到'
      });
    }
    
    // 确定是本地环境还是云环境
    const isLocalEnvironment = !process.env.RENDER || process.env.ENVIRONMENT === 'local';
    
    if (!isLocalEnvironment) {
      return res.json({
        status: 'success',
        message: '云环境无法直接打开浏览器，但API调用成功',
        url: url
      });
    }
    
    // 本地环境下执行浏览器打开
    const result = await browser.openBrowser(url);
    res.json({
      status: 'success',
      message: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// 路由：显示对话框
app.post('/api/dialog', async (req, res) => {
  try {
    const { message, title } = req.body;
    
    if (!message) {
      return res.status(400).json({
        status: 'error',
        message: '缺少消息参数'
      });
    }
    
    const dialog = toolManager.getTool('dialog');
    if (!dialog) {
      return res.status(404).json({
        status: 'error',
        message: '对话框工具未找到'
      });
    }
    
    // 确定是本地环境还是云环境
    const isLocalEnvironment = !process.env.RENDER || process.env.ENVIRONMENT === 'local';
    
    if (!isLocalEnvironment) {
      return res.json({
        status: 'success',
        message: '云环境无法直接显示对话框，但API调用成功',
        dialog: { message, title }
      });
    }
    
    // 本地环境下显示对话框
    const result = await dialog.showMessageBox(message, title);
    res.json({
      status: 'success',
      message: result
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// 路由：获取API文档
app.get('/api/docs', (req, res) => {
  res.json({
    name: 'Cursor工具集API',
    version: '1.0.0',
    description: '用于访问Cursor工具功能的RESTful API',
    endpoints: [
      {
        path: '/api/tools',
        method: 'GET',
        description: '获取所有可用工具列表',
        parameters: [],
        response: {
          status: 'success或error',
          data: '可用工具名称数组（仅在成功时）',
          message: '错误信息（仅在失败时）'
        }
      },
      {
        path: '/api/browser',
        method: 'POST',
        description: '打开浏览器（仅在本地运行时有效）',
        parameters: [
          {
            name: 'url',
            type: 'string',
            required: true,
            description: '要访问的URL'
          }
        ],
        response: {
          status: 'success或error',
          message: '执行结果或错误信息',
          url: '在云环境下返回请求的URL'
        }
      },
      {
        path: '/api/dialog',
        method: 'POST',
        description: '显示对话框（仅在本地运行时有效）',
        parameters: [
          {
            name: 'message',
            type: 'string',
            required: true,
            description: '要显示的消息'
          },
          {
            name: 'title',
            type: 'string',
            required: false,
            description: '对话框标题'
          }
        ],
        response: {
          status: 'success或error',
          message: '执行结果或错误信息',
          dialog: '在云环境下返回请求的对话框内容'
        }
      }
    ]
  });
});

// 启动函数，允许作为模块被引用时不自动启动
function startServer() {
  // 只有当直接运行此文件时，才启动服务器
  const server = app.listen(PORT, () => {
    console.log(`Cursor工具集API服务已启动，监听端口: ${PORT}`);
    console.log(`访问 http://localhost:${PORT} 查看API首页`);
  });
  return server;
}

// 如果直接运行此文件（不是被其他模块引用），则启动服务器
if (require.main === module) {
  startServer();
}

// 导出app和startServer函数，以便其他模块引用
module.exports = { app, startServer };