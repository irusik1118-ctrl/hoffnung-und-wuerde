@echo off
chcp 65001 >nul
cd /d "C:\Users\User\.gemini\antigravity-ide\scratch\hoffnung-und-stolz"
echo ========================================================
echo   Запуск сайта Hoffnung & Würde (http://localhost:3000)...
echo ========================================================
echo.
start http://localhost:3000
"C:\Users\User\.gemini\antigravity-ide\scratch\nodejs\npm.cmd" run dev
pause

