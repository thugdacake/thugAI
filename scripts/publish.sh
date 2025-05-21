#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Iniciando processo de publicação do Cérebro Operante...${NC}"

# Verifica se há mudanças não commitadas
if [[ -n $(git status -s) ]]; then
    echo -e "${RED}Erro: Existem mudanças não commitadas.${NC}"
    exit 1
fi

# Atualiza a versão no package.json
echo -e "${YELLOW}Atualizando versão...${NC}"
npm version patch --no-git-tag-version

# Commit das alterações
echo -e "${YELLOW}Commitando alterações...${NC}"
git add .
git commit -m "feat: implementa núcleo Cérebro Operante v1.0.1"

# Push para o GitHub
echo -e "${YELLOW}Enviando para o GitHub...${NC}"
git push origin main

# Publicação no NPM
echo -e "${YELLOW}Publicando no NPM...${NC}"
npm publish --access public

echo -e "${GREEN}Publicação concluída com sucesso!${NC}"
