@echo off
echo ========================================
echo   订阅代扣演示 - 模块化版本
echo   启动本地服务器
echo ========================================
echo.

cd ..

echo 正在启动 Python HTTP 服务器...
echo 访问地址: http://localhost:8000/prototype_new_ux/
echo.
echo 按 Ctrl+C 停止服务器
echo ========================================
echo.

python -m http.server 8000
