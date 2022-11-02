@echo off
mkdir __trash >nul
del/q src\index.js 2>nul
robocopy src\components __trash *.js /s /mov /create /xd assets >nul
robocopy src\utils __trash *.js /s /mov /create /xd assets >nul
rmdir /s/q __trash
