#!/usr/bin/env node

/**
 * Cursor工具集 - 命令行入口
 * 使用Node.js开发的工具集，支持浏览器控制、系统对话框等功能
 */

const path = require('path');
const { ToolManager } = require('./index');

// 初始化工具管理器
const toolManager = new ToolManager({
    toolsPath: path.resolve(__dirname, 'tools'),
    configPath: path.resolve(__dirname, 'config/tools.json')
});

// 帮助信息
function showHelp() {
    console.log(`
Cursor工具集 命令行工具

用法:
  node ${path.basename(__filename)} <命令> [参数]

可用命令:
  list            - 列出所有可用工具
  browser <URL>   - 打开浏览器访问URL
  dialog <消息> [标题] - 显示系统对话框
  help            - 显示帮助信息

示例:
  node ${path.basename(__filename)} browser https://www.baidu.com
  node ${path.basename(__filename)} dialog "这是一条消息" "这是标题"
  node ${path.basename(__filename)} list
`);
}

// 解析命令行参数
const args = process.argv.slice(2);
const command = args[0];

// 没有命令或者是help命令时显示帮助信息
if (!command || command === 'help') {
    showHelp();
    process.exit(0);
}

// 执行对应的命令
async function executeCommand() {
    try {
        // 加载工具
        await toolManager.loadTools();
        const tools = toolManager.listTools();

        switch (command) {
            case 'list':
                console.log('可用工具列表:');
                tools.forEach(tool => {
                    console.log(`- ${tool}`);
                });
                break;

            case 'browser':
                if (!args[1]) {
                    console.error('错误: 请指定URL');
                    showHelp();
                    process.exit(1);
                }
                await toolManager.executeTool('browser', args[1]);
                console.log(`已尝试打开浏览器访问: ${args[1]}`);
                break;

            case 'dialog':
                if (!args[1]) {
                    console.error('错误: 请指定消息内容');
                    showHelp();
                    process.exit(1);
                }
                const message = args[1];
                const title = args[2] || '系统消息';
                await toolManager.executeTool('dialog', message, title);
                console.log(`已尝试显示对话框 - 标题: ${title}, 消息: ${message}`);
                break;

            default:
                console.error(`错误: 未知命令 "${command}"`);
                showHelp();
                process.exit(1);
        }
    } catch (error) {
        console.error(`执行错误: ${error.message}`);
        process.exit(1);
    }
}

// 执行命令
executeCommand(); 