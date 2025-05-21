# Cores para output
$RED = [System.ConsoleColor]::Red
$GREEN = [System.ConsoleColor]::Green
$YELLOW = [System.ConsoleColor]::Yellow

Write-Host "Iniciando processo de publicação do Cérebro Operante..." -ForegroundColor $YELLOW

# Verifica se há mudanças não commitadas
$status = git status -s
if ($status) {
    Write-Host "Erro: Existem mudanças não commitadas." -ForegroundColor $RED
    exit 1
}

# Atualiza a versão no package.json
Write-Host "Atualizando versão..." -ForegroundColor $YELLOW
npm version patch --no-git-tag-version

# Commit das alterações
Write-Host "Commitando alterações..." -ForegroundColor $YELLOW
git add .
git commit -m "feat: implementa núcleo Cérebro Operante v1.0.1"

# Push para o GitHub
Write-Host "Enviando para o GitHub..." -ForegroundColor $YELLOW
git push origin main

# Publicação no NPM
Write-Host "Publicando no NPM..." -ForegroundColor $YELLOW
npm publish --access public

Write-Host "Publicação concluída com sucesso!" -ForegroundColor $GREEN
