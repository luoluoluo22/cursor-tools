const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

/**
 * 在Windows上显示消息框
 * @param {string} message - 要显示的消息
 * @param {string} title - 对话框标题
 * @returns {Promise<string>} - 执行结果
 */
function showMessageBoxWindows(message, title) {
  return new Promise((resolve, reject) => {
    // 创建临时VBS文件，设置Unicode格式
    const vbsContent = `
      ' 设置Unicode编码
      Option Explicit
      Dim objFSO, objFile
      Set objFSO = CreateObject("Scripting.FileSystemObject")
      
      ' 转换可能的特殊字符
      Function EncodeString(str)
        EncodeString = Replace(str, Chr(34), Chr(34) & Chr(34))
      End Function
      
      Dim result
      result = MsgBox(EncodeString("${message.replace(/"/g, '""')}"), 0, EncodeString("${title.replace(/"/g, '""')}"))
      WScript.Echo result
    `;
    
    const tempDir = os.tmpdir();
    const vbsPath = path.join(tempDir, 'cursor_message.vbs');
    
    // 使用UTF-16LE (Unicode)编码写入文件
    fs.writeFileSync(vbsPath, Buffer.from('\ufeff' + vbsContent, 'utf16le'));
    
    // 执行VBS文件
    exec(`cscript //nologo "${vbsPath}"`, {encoding: 'utf8'}, (error, stdout, stderr) => {
      // 删除临时文件
      try {
        fs.unlinkSync(vbsPath);
      } catch (e) {
        console.warn('无法删除临时VBS文件:', e);
      }
      
      if (error) {
        reject(`显示消息框失败: ${error.message}`);
        return;
      }
      
      // 解析响应
      const response = stdout.trim();
      resolve(`消息框显示成功，用户点击了: ${response === '1' ? '确定' : '取消/关闭'}`);
    });
  });
}

/**
 * 在MacOS/Linux上显示对话框
 * @param {string} message - 要显示的消息
 * @param {string} title - 对话框标题
 * @returns {Promise<string>} - 执行结果
 */
function showMessageBoxUnix(message, title) {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    let command;
    
    if (platform === 'darwin') {
      // MacOS
      command = `osascript -e 'display dialog "${message.replace(/"/g, '\\"')}" with title "${title.replace(/"/g, '\\"')}" buttons {"OK"} default button "OK"'`;
    } else {
      // Linux
      command = `zenity --info --title="${title.replace(/"/g, '\\"')}" --text="${message.replace(/"/g, '\\"')}"`;
    }
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // 如果用户关闭对话框，某些工具会返回错误码，但实际上不是真正的错误
        if (error.code === 1) {
          resolve('用户关闭了对话框');
          return;
        }
        reject(`显示消息框失败: ${error.message}`);
        return;
      }
      
      resolve('消息框显示成功');
    });
  });
}

/**
 * 显示消息对话框
 * @param {string} message - 要显示的消息
 * @param {string} title - 对话框标题
 * @returns {Promise<string>} - 执行结果
 */
function showMessageBox(message, title = '消息') {
  const platform = os.platform();
  
  if (platform === 'win32') {
    return showMessageBoxWindows(message, title);
  } else {
    return showMessageBoxUnix(message, title);
  }
}

module.exports = {
  showMessageBox
}; 