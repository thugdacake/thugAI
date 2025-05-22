# 🧠 Cérebro Operante

Framework de produção universal que transforma a forma como interagimos com IAs, criando uma mente única e poderosa.

## 📦 Pacotes

O Cérebro Operante é composto por três pacotes principais:

### 1. @thugdacake/operante (Core)
O núcleo do framework, responsável pela lógica principal de interação com IAs.

```bash
npm install @thugdacake/operante
```

### 2. cerebro-operante-explorer (Web)
Interface web React para interagir com o Cérebro Operante de forma visual e intuitiva.

```bash
npm install cerebro-operante-explorer
```

### 3. cerebro-operante-cli (CLI)
Interface de linha de comando para interagir com o Cérebro Operante via terminal.

```bash
npm install -g cerebro-operante-cli
```

## 🚀 Desenvolvimento

### Pré-requisitos
- Node.js >= 18.0.0
- npm >= 9.0.0

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/thugdacake/cerebro-operante.git
cd cerebro-operante
```

2. Instale as dependências:
```bash
npm install
```

3. Inicialize o monorepo:
```bash
npm run bootstrap
```

### Scripts Disponíveis

- `npm run build` - Compila todos os pacotes
- `npm run test` - Executa testes em todos os pacotes
- `npm run lint` - Executa linting em todos os pacotes
- `npm run clean` - Limpa builds e caches
- `npm run docs` - Gera documentação

### Desenvolvimento por Pacote

#### Core
```bash
cd packages/core
npm run dev
```

#### Web Explorer
```bash
cd packages/web-explorer
npm run dev
```

#### CLI
```bash
cd packages/cli
npm run dev
```

## 📚 Documentação

A documentação completa está disponível em:
- [Documentação do Core](packages/core/README.md)
- [Documentação do Web Explorer](packages/web-explorer/README.md)
- [Documentação da CLI](packages/cli/README.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua branch de feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'feat: add some amazing feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Thug Developer](https://github.com/thugdacake) - Criador e mantenedor
- Todos os contribuidores que ajudaram a tornar este projeto possível
