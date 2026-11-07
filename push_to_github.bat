@echo off
chcp 65001 >nul
cd /d "C:\Users\User\.gemini\antigravity-ide\scratch\hoffnung-und-stolz"
echo ========================================================
echo   Сохранение и отправка сайта Hoffnung & Würde на GitHub...
echo ========================================================
echo.
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Update site: add assets, data files and start script"
"C:\Program Files\Git\cmd\git.exe" push origin main
echo.
if %errorlevel% equ 0 (
    echo ========================================================
    echo   [УСПЕХ] Все изменения успешно сохранены и отправлены на GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo   [ИНФОРМАЦИЯ] Проверьте вход в GitHub или статус подключения.
    echo ========================================================
)
echo.
pause
