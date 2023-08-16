rem Builds the repository

call node --version
call npm --version

call npm install
call npm run build

echo Built %date% %time% >dist\solutions-components_commit.txt
git rev-parse --abbrev-ref HEAD >>dist\solutions-components_commit.txt
git log -1>>dist\solutions-components_commit.txt

