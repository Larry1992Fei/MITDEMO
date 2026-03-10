#!/bin/bash
# 阿里云快速修复上传脚本

# 配置信息（请修改为你的实际信息）
SERVER_USER="your-username"
SERVER_IP="your-server-ip"
WEB_ROOT="/path/to/web/root"

echo "🚀 开始修复阿里云部署问题..."

# 1. 检查本地文件
echo "📋 检查本地文件..."
if [ ! -f "prototype_new_ux/js/app-bundle.js" ]; then
    echo "❌ 本地缺少 js/app-bundle.js"
    exit 1
fi

if [ ! -d "prototype_new_ux/css" ]; then
    echo "❌ 本地缺少 css 目录"
    exit 1
fi

echo "✅ 本地文件检查完成"

# 2. 创建服务器目录结构
echo "📁 创建服务器目录结构..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $WEB_ROOT/js $WEB_ROOT/css"

# 3. 上传关键文件
echo "📤 上传JavaScript文件..."
scp prototype_new_ux/js/app-bundle.js $SERVER_USER@$SERVER_IP:$WEB_ROOT/js/

echo "📤 上传CSS文件..."
scp prototype_new_ux/css/*.css $SERVER_USER@$SERVER_IP:$WEB_ROOT/css/

echo "📤 上传HTML文件..."
scp prototype_new_ux/index-full.html $SERVER_USER@$SERVER_IP:$WEB_ROOT/

# 4. 设置文件权限
echo "🔐 设置文件权限..."
ssh $SERVER_USER@$SERVER_IP "
    chmod 644 $WEB_ROOT/*.html
    chmod 644 $WEB_ROOT/js/*.js
    chmod 644 $WEB_ROOT/css/*.css
    chown -R www-data:www-data $WEB_ROOT/
"

# 5. 验证文件
echo "🔍 验证服务器文件..."
ssh $SERVER_USER@$SERVER_IP "
    echo '=== 文件结构 ==='
    ls -la $WEB_ROOT/
    echo '=== JS文件 ==='
    ls -la $WEB_ROOT/js/
    echo '=== CSS文件 ==='
    ls -la $WEB_ROOT/css/
"

echo "✅ 修复完成！请访问 http://mitdemo.jimas.cn/index-full.html 验证"