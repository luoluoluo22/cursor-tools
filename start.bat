@echo off
echo ===============================================
echo Cursor工具集服务启动脚本
echo ===============================================

rem 获取当前脚本所在目录的绝对路径
set SCRIPT_DIR=%~dp0
set SCRIPT_DIR=%SCRIPT_DIR:~0,-1%

echo 启动目录: %SCRIPT_DIR%

rem 检查是否安装了Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo 错误: 未安装Node.js或无法找到node命令
    echo 请安装Node.js后重试
    pause
    exit /b 1
)

rem 检查是否安装了依赖包
if not exist "%SCRIPT_DIR%\node_modules" (
    echo 正在安装依赖包...
    cd /d "%SCRIPT_DIR%"
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo 安装依赖包失败，请手动运行 npm install 命令安装
        pause
        exit /b 1
    )
)

echo 正在启动Cursor工具集API服务...
echo 按Ctrl+C可以停止服务

rem 启动服务器
cd /d "%SCRIPT_DIR%"
node "%SCRIPT_DIR%\server.js"

pause