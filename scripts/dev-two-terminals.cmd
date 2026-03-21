@echo off
REM Abre duas janelas do Prompt: API (server) e React (raiz).
cd /d "%~dp0.."
set "ROOT=%CD%"
start "HouseTeaList - API" cmd /k "cd /d "%ROOT%\server" && npm start"
start "HouseTeaList - Web" cmd /k "cd /d "%ROOT%" && npm start"
