#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}📚 Gerando documentação inicial...${NC}\n"

# Criar estrutura de docs
echo -e "${YELLOW}📁 Criando estrutura de documentação...${NC}"
mkdir -p docs/{api,guides,examples}

# Gerar README principal
echo -e "${YELLOW}📄 Gerando README principal...${NC}"
cat > README.md << 'EOF'
# 🧠 Cérebro Operante

Framework de Produção Universal para desenvolvimento de software.

## 🚀 Início Rápido

1. Clone o repositório
2. Execute o script de setup:
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```
3. Configure seus secrets no arquivo `.env`
4. Consulte a [documentação completa](docs/README.md)

## 📚 Documentação

- [Guia de Início](docs/guides/getting-started.md)
- [Arquitetura](docs/architecture.md)
- [API Reference](docs/api/README.md)
- [Exemplos](docs/examples/README.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
EOF

# Gerar documentação de arquitetura
echo -e "${YELLOW}📄 Gerando documentação de arquitetura...${NC}"
cat > docs/architecture.md << 'EOF'
# Arquitetura

## Visão Geral

O Cérebro Operante é construído sobre uma arquitetura modular e extensível, permitindo fácil integração com diferentes ferramentas e workflows.

## Componentes Principais

### 1. Core
- Gerenciamento de estado
- Sistema de eventos
- Pipeline de processamento

### 2. Plugins
- Validação de código
- Geração de documentação
- Análise de qualidade

### 3. Integrações
- GitHub Actions
- Slack/Teams
- SonarCloud

## Fluxo de Dados

```mermaid
graph TD
    A[Input] --> B[Processamento]
    B --> C[Validação]
    C --> D[Output]
    D --> E[Feedback]
```

## Decisões Técnicas

- TypeScript para type safety
- Jest para testes
- ESLint para linting
- Prettier para formatação
EOF

# Gerar guia de início
echo -e "${YELLOW}📄 Gerando guia de início...${NC}"
cat > docs/guides/getting-started.md << 'EOF'
# Guia de Início

## Pré-requisitos

- Node.js 16+
- Git
- npm ou yarn

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/cerebro-operante.git
   cd cerebro-operante
   ```

2. Execute o script de setup:
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. Configure suas variáveis de ambiente:
   ```bash
   cp .env.example .env
   # Edite .env com suas configurações
   ```

## Uso Básico

1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Execute os testes:
   ```bash
   npm test
   ```

3. Gere a documentação:
   ```bash
   npm run docs
   ```

## Próximos Passos

- [Configuração Avançada](advanced-config.md)
- [Customização](customization.md)
- [Troubleshooting](troubleshooting.md)
EOF

# Gerar documentação da API
echo -e "${YELLOW}📄 Gerando documentação da API...${NC}"
cat > docs/api/README.md << 'EOF'
# API Reference

## Core

### `init()`
Inicializa o Cérebro Operante com as configurações fornecidas.

```typescript
init(config: Config): Promise<void>
```

### `validate()`
Valida o código e gera relatórios.

```typescript
validate(options: ValidateOptions): Promise<ValidationResult>
```

### `deploy()`
Executa o deploy para o ambiente especificado.

```typescript
deploy(env: Environment): Promise<DeployResult>
```

## Plugins

### `registerPlugin()`
Registra um novo plugin.

```typescript
registerPlugin(plugin: Plugin): void
```

### `getPlugin()`
Recupera um plugin pelo nome.

```typescript
getPlugin(name: string): Plugin | undefined
```

## Eventos

### `on()`
Registra um listener para um evento.

```typescript
on(event: string, listener: Function): void
```

### `emit()`
Emite um evento.

```typescript
emit(event: string, data: any): void
```
EOF

# Gerar exemplos
echo -e "${YELLOW}📄 Gerando exemplos...${NC}"
cat > docs/examples/README.md << 'EOF'
# Exemplos

## Configuração Básica

```typescript
import { init } from '@cerebro-operante/core';

await init({
  plugins: ['lint', 'test', 'docs'],
  env: 'development'
});
```

## Customização de Workflow

```typescript
import { registerPlugin } from '@cerebro-operante/core';

registerPlugin({
  name: 'custom-validator',
  validate: async (code) => {
    // Sua lógica de validação
  }
});
```

## Integração com CI/CD

```yaml
name: CI/CD
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run validate
```

## Monitoramento

```typescript
import { on } from '@cerebro-operante/core';

on('validation.complete', (result) => {
  console.log('Validação concluída:', result);
});
```
EOF

echo -e "\n${GREEN}✅ Documentação gerada com sucesso!${NC}"
echo -e "\nArquivos criados:"
echo -e "- README.md"
echo -e "- docs/architecture.md"
echo -e "- docs/guides/getting-started.md"
echo -e "- docs/api/README.md"
echo -e "- docs/examples/README.md" 