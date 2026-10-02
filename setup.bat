@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

set PWD=%~dp0
echo %PWD%

set "PYTHON_CMD="
where py >nul 2>nul
if %errorlevel%==0 (
  set "PYTHON_CMD=py -3"
) else (
  where python >nul 2>nul
  if %errorlevel%==0 (
    set "PYTHON_CMD=python"
  ) else (
    echo Python nao encontrado. Instale Python 3.10+ e tente novamente.
    exit /b 1
  )
)

if not exist ".venv\Scripts\python.exe" (
  echo Criando ambiente virtual em .venv
  %PYTHON_CMD% -m venv .venv
  if errorlevel 1 exit /b 1
)

echo Atualizando pip no .venv
".venv\Scripts\python.exe" -m pip install --upgrade pip
if errorlevel 1 exit /b 1

echo Instalando dependencias do backend
".venv\Scripts\python.exe" -m pip install -r backend\requirements.txt
if errorlevel 1 exit /b 1

if not exist ".env" (
  if not exist "assets.dat" (
    echo Arquivo assets.dat nao encontrado na raiz do projeto.
    exit /b 1
  )
  echo Extraindo .env. Digite a senha fornecida pelo professor.
  "%SystemRoot%\System32\tar.exe" -xPf assets.dat data.txt
  if errorlevel 1 (
    if exist "data.txt" del /q "data.txt"
    echo Falha ao extrair o .env. Confirme a senha com o professor e execute o setup novamente.
    exit /b 1
  )
  move /y "data.txt" ".env" >nul
  echo .env extraido com sucesso.
)

if /I "%~1"=="run" (
  ".venv\Scripts\python.exe" -m uvicorn backend.main:app --reload --reload-dir backend --reload-dir frontend --reload-include "*.html" --reload-include "*.js" --reload-include "*.jsx" --reload-include "*.css" --host 127.0.0.1 --port 8000
  exit /b %errorlevel%
)

echo Setup concluido.
echo Para ativar o ambiente: .venv\Scripts\activate
echo Para rodar a aplicacao: setup.bat run
echo No VS Code, voce tambem pode abrir Executar e Depurar, selecionar "ChatLLM API (uvicorn)" e pressionar F5.

endlocal
