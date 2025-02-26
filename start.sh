#!/bin/bash

echo "==============================================="
echo "Cursor工具集服务启动脚本"
echo "==============================================="

# 获取当前脚本所在目录的绝对路径
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo "启动目录: $SCRIPT_DIR"

# 检查是否安装了Node.js
if ! command -v node &> /dev/null; then
    echo "错误: 未安装Node.js或无法找到node命令"
    echo "请安装Node.js后重试"
    exit 1
fi

# 检查是否安装了依赖包
if [ ! -d "$SCRIPT_DIR/node_modules" ]; then
    echo "正在安装依赖包..."
    cd "$SCRIPT_DIR"
    npm install
    if [ $? -ne 0 ]; then
        echo "安装依赖包失败，请手动运行 npm install 命令安装"
        exit 1
    fi
fi

echo "正在启动Cursor工具集API服务..."
echo "按Ctrl+C可以停止服务"

# 启动服务器
cd "$SCRIPT_DIR"
node "$SCRIPT_DIR/server.js" 