# cerebro-operante-cli

Interface de linha de comando para interagir com o Cérebro Operante via terminal.

## 🚀 Instalação

```bash
npm install -g cerebro-operante-cli
```

## 📦 Uso

```bash
# Iniciar o CLI
cerebro

# Verificar status
cerebro status

# Iniciar chat
cerebro chat

# Executar testes
cerebro test
```

## 🧬 Comandos

### Status
Verifica o status do Cérebro Operante e ambiente.

```bash
cerebro status
```

Opções:
- `--verbose`: Mostra informações detalhadas
- `--json`: Saída em formato JSON

### Chat
Inicia uma sessão de chat interativa.

```bash
cerebro chat
```

Opções:
- `--mode`: Modo de chat (blueprint, documentacao, prompt, comando)
- `--theme`: Tema do chat (light, dark)
- `--history`: Arquivo de histórico

### Test
Executa testes e validações.

```bash
cerebro test
```

Opções:
- `--watch`: Modo watch
- `--coverage`: Gera relatório de cobertura
- `--verbose`: Mostra detalhes dos testes

## 🎨 Temas

O CLI suporta temas claro e escuro:

```bash
# Usando tema escuro
cerebro chat --theme dark

# Usando tema claro (padrão)
cerebro chat --theme light
```

## 🔧 Configuração

O CLI pode ser configurado através de um arquivo `.cerebrorc`:

```json
{
  "theme": "dark",
  "defaultMode": "blueprint",
  "historyFile": ".cerebro/history.json",
  "outputDir": ".cerebro/output"
}
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

## 📝 Licença

MIT
