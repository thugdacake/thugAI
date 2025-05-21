#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🚀 Iniciando setup do Cérebro Operante...${NC}\n"

# Verificar estrutura de diretórios
echo -e "${YELLOW}📁 Verificando estrutura de diretórios...${NC}"
mkdir -p workflows docs scripts

# Verificar arquivos essenciais
echo -e "${YELLOW}📄 Verificando arquivos essenciais...${NC}"
if [ ! -f "mind.md" ]; then
    echo -e "${RED}❌ mind.md não encontrado!${NC}"
    exit 1
fi

if [ ! -f "mind-flow.mermaid" ]; then
    echo -e "${RED}❌ mind-flow.mermaid não encontrado!${NC}"
    exit 1
fi

# Instalar dependências
echo -e "${YELLOW}📦 Instalando dependências...${NC}"
if [ -f "package.json" ]; then
    npm install
else
    echo -e "${YELLOW}⚠️ package.json não encontrado, pulando instalação de dependências${NC}"
fi

# Configurar Git hooks
echo -e "${YELLOW}🔧 Configurando Git hooks...${NC}"
if [ -d ".git" ]; then
    mkdir -p .git/hooks
    cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🧠 Cérebro Operante: Validando commit..."
npm run lint && npm test
EOF
    chmod +x .git/hooks/pre-commit
else
    echo -e "${YELLOW}⚠️ Diretório .git não encontrado, pulando configuração de hooks${NC}"
fi

# Verificar act (GitHub Actions local)
echo -e "${YELLOW}🔍 Verificando act...${NC}"
if ! command -v act &> /dev/null; then
    echo -e "${YELLOW}⚠️ act não encontrado. Para testar workflows localmente, instale:${NC}"
    echo -e "  macOS: brew install act"
    echo -e "  Windows: choco install act-cli"
fi

# Configurar secrets locais
echo -e "${YELLOW}🔐 Configurando secrets locais...${NC}"
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️ Criando arquivo .env de exemplo${NC}"
    cat > .env << 'EOF'
# GitHub Secrets
GITHUB_TOKEN=your_github_token
DEPLOY_TOKEN=your_deploy_token

# Slack Webhook (opcional)
SLACK_WEBHOOK_URL=your_slack_webhook

# SonarCloud (opcional)
SONAR_TOKEN=your_sonar_token
SONAR_PROJECT_KEY=your_project_key
SONAR_ORGANIZATION=your_organization
EOF
fi

echo -e "\n${GREEN}✅ Setup concluído!${NC}"
echo -e "\nPróximos passos:"
echo -e "1. Configure seus secrets no arquivo .env"
echo -e "2. Execute 'npm run test' para verificar a instalação"
echo -e "3. Faça seu primeiro commit para testar os hooks"
echo -e "4. Consulte mind.md para mais informações" 