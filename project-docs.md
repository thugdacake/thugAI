# 🧠 ThugAI Framework — Documentação do Projeto

## 1. Visão Geral

O ThugAI Framework é um sistema operacional de produção que padroniza o desenvolvimento de projetos FiveM, garantindo qualidade, consistência e eficiência em todo o ciclo de vida do software.

## 2. Arquitetura do Sistema

### 2.1 Componentes Principais

```mermaid
graph TB
    subgraph Frontend
        UI[Interface NUI]
        React[React/TS]
        State[Gerenciamento de Estado]
    end
    
    subgraph Backend
        Lua[Scripts Lua]
        Events[Eventos]
        DB[oxmysql]
    end
    
    subgraph Infraestrutura
        CI[GitHub Actions]
        Docs[Docusaurus]
        Tests[Testes]
    end
    
    UI --> React
    React --> State
    State --> Events
    Events --> Lua
    Lua --> DB
    Lua --> Tests
    React --> Tests
    Tests --> CI
    CI --> Docs
```

### 2.2 Fluxo de Dados

```mermaid
sequenceDiagram
    participant U as Usuário
    participant N as NUI
    participant C as Client
    participant S as Server
    participant D as Database
    
    U->>N: Interação
    N->>C: NUI Message
    C->>S: TriggerServerEvent
    S->>D: Query
    D-->>S: Resultado
    S-->>C: Callback
    C-->>N: Update
    N-->>U: Feedback
```

## 3. Estrutura de Diretórios

```
📦 thugai-framework
├── 📂 client
│   └── 📄 *.lua
├── 📂 server
│   └── 📄 *.lua
├── 📂 html
│   ├── 📂 src
│   └── 📂 dist
├── 📂 planning
│   └── 📄 checklist.md
├── 📂 templates
│   └── 📄 README.md
├── 📂 workflows
│   └── 📄 main.yml
├── 📄 mind.md
├── 📄 mind-flow.mermaid
├── 📄 config.lua
└── 📄 fxmanifest.lua
```

## 4. Tecnologias Utilizadas

### 4.1 Frontend
- React 18+
- TypeScript
- TailwindCSS
- Vite

### 4.2 Backend
- Lua 5.4
- QBXCore
- oxmysql
- ox_lib

### 4.3 Infraestrutura
- GitHub Actions
- Docusaurus
- Jest
- Busted

## 5. Fluxo de Desenvolvimento

```mermaid
stateDiagram-v2
    [*] --> Análise
    Análise --> Arquitetura
    Arquitetura --> Prototipação
    Prototipação --> Implementação
    Implementação --> Testes
    Testes --> Deploy
    Deploy --> Documentação
    Documentação --> Análise
```

## 6. Métricas e KPIs

### 6.1 Qualidade
- Cobertura de testes: > 80%
- Vulnerabilidades: 0 críticas
- Documentação: 100% atualizada

### 6.2 Performance
- Tempo de resposta: < 100ms
- Uso de memória: Otimizado
- Memory leaks: 0

### 6.3 Produtividade
- Deploy: Automático
- Feedback: < 24h
- Docs: Geradas automaticamente

## 7. Integrações

### 7.1 Desenvolvimento
- Cursor AI
- GitHub Copilot
- ESLint/Prettier
- TypeScript
- LuaLS

### 7.2 Infraestrutura
- GitHub Actions
- QBXCore
- oxmysql
- Docusaurus
- ChatGPT API

## 8. Segurança

### 8.1 Autenticação
- Sistema de autenticação obrigatório
- Máximo de 3 tentativas
- Banimento automático

### 8.2 Logs
- Nível: info
- Salvamento em arquivo
- Monitoramento contínuo

## 9. Documentação

### 9.1 Templates
- README.md
- CONTRIBUTING.md
- LICENSE
- CHANGELOG.md

### 9.2 Guias
- Instalação
- Configuração
- Desenvolvimento
- Deploy

## 10. Contribuição

### 10.1 Processo
1. Fork do projeto
2. Branch de feature
3. Commit das mudanças
4. Push para a branch
5. Pull Request

### 10.2 Padrões
- Clean Code
- Testes unitários
- Documentação atualizada
- Code review obrigatório 