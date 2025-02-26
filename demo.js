/**
 * Cursor工具集 API 演示脚本
 * 展示如何使用API以及启动Web服务
 */

const path = require('path');
const { exec } = require('child_process');
const { startServer } = require('./server');
const port = 3000;

// 启动Web服务器
const server = startServer();

// 延迟3秒后自动打开浏览器
setTimeout(() => {
    console.log('正在打开浏览器...');
    const command = process.platform === 'win32' 
        ? `node "${path.resolve(__dirname, 'cli.js')}" browser http://localhost:${port}`
        : `node "${path.resolve(__dirname, 'cli.js')}" browser http://localhost:${port}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`执行错误: ${error}`);
            return;
        }
        console.log(stdout);
    });
}, 3000);

console.log(`
===============================================
Cursor工具集 API 演示
===============================================

API服务已启动! 🚀

在浏览器中访问: http://localhost:${port}

您可以测试以下功能:
1. 获取工具列表
2. 打开浏览器
3. 显示系统对话框

服务器日志:
`); 