@echo off
mkdir __trash >nul
robocopy src\components __trash *.js /s /mov /create /xd assets >nul
rmdir /s/q __trash
