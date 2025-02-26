const path = require('path');
// 使用绝对路径引入工具管理器
const indexPath = path.resolve(__dirname, 'index.js');
const { toolManager } = require(indexPath);

async function main() {
  console.log('可用工具:', toolManager.listTools());
  
  // 获取对话框工具
  const dialog = toolManager.getTool('dialog');
  
  if (dialog) {
    try {
      // 显示欢迎消息
      console.log('正在显示欢迎消息...');
      let result = await dialog.showMessageBox('欢迎使用Cursor工具集!', 'Cursor工具');
      console.log(result);
      
      // 等待2秒
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 获取浏览器工具
      const browser = toolManager.getTool('browser');
      
      if (browser) {
        // 打开百度
        console.log('正在打开百度...');
        result = await browser.openBrowser('https://www.baidu.com');
        console.log(result);
        
        // 等待3秒
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 显示另一条消息
        console.log('正在显示完成消息...');
        result = await dialog.showMessageBox('浏览器已成功打开!', '操作完成');
        console.log(result);
      } else {
        console.error('浏览器工具未找到');
      }
    } catch (error) {
      console.error('执行工具时出错:', error);
    }
  } else {
    console.error('对话框工具未找到');
  }
}

// 运行主函数
main().catch(error => {
  console.error('程序运行错误:', error);
}); 