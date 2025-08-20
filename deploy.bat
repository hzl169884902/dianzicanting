@echo off
echo ========================================
echo 电子餐厅网站 - 快速部署准备脚本
echo ========================================
echo.

echo [1/4] 检查项目状态...
git status
echo.

echo [2/4] 运行构建测试...
npm run build
if %errorlevel% neq 0 (
    echo 构建失败！请检查错误信息。
    pause
    exit /b 1
)
echo 构建成功！
echo.

echo [3/4] 启动预览服务器...
echo 请在浏览器中访问 http://localhost:4173 测试网站
echo 按 Ctrl+C 停止预览服务器
start http://localhost:4173
npm run preview
echo.

echo [4/4] 部署准备完成！
echo.
echo 下一步：
echo 1. 将代码推送到GitHub: git add . && git commit -m "Ready for deployment" && git push
echo 2. 访问 https://vercel.com 导入你的GitHub仓库
echo 3. 配置环境变量（参考 .env.production 文件）
echo 4. 点击部署按钮
echo.
echo 详细部署指南请查看: docs/免费部署指南.md
echo 部署检查清单请查看: docs/部署检查清单.md
echo.
pause