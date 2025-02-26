const { exec } = require('child_process');
const os = require('os');

/**
 * 打开默认浏览器并访问指定URL
 * @param {string} url - 要访问的URL
 * @returns {Promise<string>} - 执行结果
 */
function openBrowser(url) {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    let command;

    // 根据不同操作系统使用不同的命令
    if (platform === 'win32') {
      command = `start ${url}`;
    } else if (platform === 'darwin') {
      command = `open ${url}`;
    } else {
      command = `xdg-open ${url}`;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`打开浏览器失败: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`打开浏览器错误: ${stderr}`);
        return;
      }
      resolve(`成功打开浏览器访问: ${url}`);
    });
  });
}

module.exports = {
  openBrowser
}; 