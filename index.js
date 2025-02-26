const fs = require('fs');
const path = require('path');

/**
 * 工具管理器类
 */
class ToolManager {
  constructor() {
    this.tools = {};
    this.loadTools();
  }

  /**
   * 加载工具配置
   */
  loadTools() {
    try {
      const configPath = path.join(__dirname, 'config', 'tools.json');
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      
      config.tools.forEach(tool => {
        // 使用绝对路径加载工具模块
        const absoluteToolPath = path.resolve(__dirname, tool.path);
        const toolModule = require(absoluteToolPath);
        this.tools[tool.name] = toolModule;
      });
      
      console.log('工具加载成功:', Object.keys(this.tools).join(', '));
    } catch (error) {
      console.error('加载工具失败:', error);
    }
  }

  /**
   * 获取工具
   * @param {string} toolName - 工具名称
   * @returns {object|null} - 工具对象
   */
  getTool(toolName) {
    return this.tools[toolName] || null;
  }

  /**
   * 列出所有可用工具
   * @returns {string[]} - 工具名称列表
   */
  listTools() {
    return Object.keys(this.tools);
  }
}

// 创建工具管理器实例
const toolManager = new ToolManager();

// 示例：使用浏览器工具打开网页
async function openGoogleExample() {
  const browser = toolManager.getTool('browser');
  if (browser) {
    try {
      const result = await browser.openBrowser('https://www.google.com');
      console.log(result);
    } catch (error) {
      console.error('打开浏览器失败:', error);
    }
  } else {
    console.error('浏览器工具未找到');
  }
}

// 导出工具管理器
module.exports = {
  toolManager,
  openGoogleExample
}; 