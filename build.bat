rem Builds the repository

call node --version
call npm --version

call npm install
del/q node_modules\@jest\transform\node_modules\@jest\types\build\Config.d.ts 2>nul
del/q node_modules\@jest\transform\node_modules\@jest\types\build\Global.d.ts 2>nul
call npm run build

pushd packages\solutions-components
echo Repository solutions-components, package solutions-components >dist\solutions-components_commit.txt
echo Built %date% %time% >>dist\solutions-components_commit.txt
git rev-parse --abbrev-ref HEAD >>dist\solutions-components_commit.txt
git log -1>>dist\solutions-components_commit.txt
popd

