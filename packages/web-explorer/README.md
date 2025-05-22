# Cérebro Operante - Web Explorer

Interface web React para o Cérebro Operante.

## Requisitos

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Instalação

```bash
# Instalar dependências
pnpm install
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
pnpm dev
```

## Testes

### Executando Testes

```bash
# Rodar todos os testes
pnpm test

# Rodar testes com cobertura
pnpm test:coverage

# Rodar testes com interface visual
pnpm test:ui
```

### Notas sobre Ambiente

- **Windows (PowerShell):** Use `;` como separador de comandos
- **Linux/macOS (Bash):** Use `&&` como separador de comandos

### Estrutura de Testes

- `src/__tests__/`: Testes unitários e de integração
- `src/__mocks__/`: Mocks e fixtures
- `src/__tests__/setup.ts`: Configuração global dos testes

## Build

```bash
# Build de produção
pnpm build

# Preview do build
pnpm preview
```

## Linting e Formatação

```bash
# Lint
pnpm lint

# Formatação
pnpm format
```

## Limpeza

```bash
# Remover arquivos gerados
pnpm clean
```

## Características

- Interface moderna e responsiva
- Suporte a temas claro e escuro
- Chat integrado com o Cérebro Operante
- Explorador de operações
- Explorador de bibliotecas
- Painel de testes

## Tecnologias

- React
- TypeScript
- Vite
- Chakra UI
- Vitest
- MSW

## Scripts

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run preview` - Visualiza o build de produção
- `npm test` - Executa os testes
- `npm run test:coverage` - Executa os testes com cobertura
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige problemas de linting
- `npm run format` - Formata o código
- `npm run clean` - Limpa arquivos gerados

## Estrutura

```
src/
  ├── components/     # Componentes React
  ├── hooks/         # Hooks personalizados
  ├── styles/        # Estilos globais
  ├── test/          # Configuração de testes
  ├── types/         # Definições de tipos
  ├── App.tsx        # Componente principal
  └── main.tsx       # Ponto de entrada
```

## Licença

MIT
