# 📦 Instalação

## Requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0
- Git (opcional, para desenvolvimento)

## Instalação Global

```bash
npm install -g @thugdacake/operante
```

## Instalação Local

```bash
npm install @thugdacake/operante
```

## Verificação da Instalação

```bash
operante --version
```

## Atualização

```bash
npm update -g @thugdacake/operante
```

## Desinstalação

```bash
npm uninstall -g @thugdacake/operante
```

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# Configurar diretório de templates
export OPERANTE_TEMPLATES_DIR="/path/to/templates"

# Configurar diretório de plugins
export OPERANTE_PLUGINS_DIR="/path/to/plugins"

# Configurar nível de log
export OPERANTE_LOG_LEVEL="debug"
```

### Arquivo de Configuração

Crie um arquivo `.operanterc` no seu diretório home:

```json
{
  "templates": {
    "dir": "/path/to/templates"
  },
  "plugins": {
    "dir": "/path/to/plugins"
  },
  "logging": {
    "level": "debug"
  }
}
```

## 🐛 Solução de Problemas

### Erro de Permissão

Se você encontrar erros de permissão durante a instalação global:

```bash
# Linux/Mac
sudo npm install -g @thugdacake/operante

# Windows (PowerShell como Administrador)
npm install -g @thugdacake/operante
```

### Erro de Versão do Node.js

Se você encontrar erros relacionados à versão do Node.js:

1. Verifique sua versão:
   ```bash
   node --version
   ```

2. Atualize o Node.js se necessário:
   - [Download Node.js](https://nodejs.org/)

### Erro de Cache do npm

Se você encontrar problemas com o cache do npm:

```bash
npm cache clean --force
```

## 📚 Próximos Passos

- [Guia de Uso](./usage.md)
- [API Reference](./api.md)
- [Exemplos](./examples.md) 