@echo off

:: Check for admin privileges
net session >nul 2>&1
if %errorLevel% == 0 (
    echo Running with administrator privileges
) else (
    echo Please run as administrator
    pause
    exit /b 1
)

:: Set environment variables
set NODE_ENV=production

:: Run deploy with environment variables
call npm run deploy

if %errorLevel% == 0 (
    echo Deployment successful!
) else (
    echo Deployment failed with error code %errorLevel%
    pause
)