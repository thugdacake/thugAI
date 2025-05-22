# @thugdacake/operante

O núcleo do Cérebro Operante, um framework injetável que transforma o comportamento de IAs e permite controle sobre diferentes ambientes.

## 🚀 Instalação

```bash
npm install @thugdacake/operante
```

## 📦 Uso

```typescript
import { CerebroOperante, SynapseEngine } from '@thugdacake/operante';

// Inicializar o cérebro
const cerebro = new CerebroOperante();
await cerebro.iniciar();

// Usar o Synapse Engine
const synapse = new SynapseEngine();

// Processar uma ideia
const output = await synapse.process('Minha ideia', {
  mode: 'blueprint',
  cache: true
});

// Verificar resultado
if (output.success) {
  console.log('Resultado:', output.result);
} else {
  console.error('Erro:', output.error);
}
```

## 🧬 API

### CerebroOperante

```typescript
class CerebroOperante {
  // Inicializa o cérebro
  async iniciar(): Promise<void>;

  // Processa artefatos gerados pelo Synapse Engine
  async processarArtefatos(artefatos: Artefatos): Promise<void>;

  // Detecta o ambiente atual
  detectarAmbiente(): Ambiente;

  // Intercepta a IA host
  async interceptarIA(): Promise<void>;
}
```

### SynapseEngine

```typescript
class SynapseEngine {
  // Processa uma ideia em diferentes modos
  async process(
    input: string,
    options: {
      mode: 'blueprint' | 'documentacao' | 'prompt' | 'comando',
      cache?: boolean,
      context?: Record<string, any>
    }
  ): Promise<Output>;

  // Gerencia o modo de processamento
  setMode(mode: ProcessMode): void;
  getMode(): ProcessMode;

  // Gerencia o contexto
  setContext(key: string, value: any): void;
  getContext(key: string): any;
  clearContext(): void;

  // Gerencia o cache
  clearCache(): void;
}
```

## 🎯 Modos de Processamento

### Blueprint
Gera arquitetura e diagramas `.mmd`:
```typescript
const output = await synapse.process(
  'Sistema de automação de tarefas com IA',
  { mode: 'blueprint' }
);
```

### Documentação
Gera arquivos `.md` explicativos:
```typescript
const output = await synapse.process(
  'Documentação do sistema de automação',
  { mode: 'documentacao' }
);
```

### Prompt
Gera prompts formatados para IA:
```typescript
const output = await synapse.process(
  'Criar um sistema de automação',
  { mode: 'prompt' }
);
```

### Comando
Gera comandos CLI específicos:
```typescript
const output = await synapse.process(
  'npm install',
  { mode: 'comando' }
);
```

## 📊 Estrutura de Saída

```typescript
interface Output {
  conteudo: string;
  arquivos: {
    md: string;    // Arquivo markdown
    mmd: string;   // Arquivo mermaid (apenas para blueprint)
    json: string;  // Arquivo de metadados
  };
  metadata: {
    tipo: string;
    formato: string;
    timestamp: string;
    modo: string;
    versao: string;
  };
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
