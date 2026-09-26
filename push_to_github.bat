@echo off
chcp 65001 >nul
cd /d "C:\Users\User\.gemini\antigravity-ide\scratch\hoffnung-und-stolz"
echo ========================================================
echo   Отправка сайта Hoffnung & Würde на GitHub...
echo ========================================================
echo.
"C:\Program Files\Git\cmd\git.exe" push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo   [УСПЕХ] Проект успешно отправлен на GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo   [ОШИБКА] Проверьте вход в аккаунт GitHub в браузере.
    echo ========================================================
)
echo.
pause
