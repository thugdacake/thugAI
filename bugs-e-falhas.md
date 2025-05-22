# Relatório de Bugs e Falhas - Projeto Operante

## 1. Incompatibilidade ESM/CommonJS
- **Descrição:** Alguns arquivos core e de teste podem ter exports/imports inconsistentes entre ESM e CommonJS.
- **Impacto:** Quebra de testes, falha ao importar módulos, erros de execução.
- **Correção:** Padronizar todos os arquivos para ESM (`import`/`export`).

## 2. Mocks de Dependências
- **Descrição:** Uso de `jest.mock` em vez de `jest.unstable_mockModule` em testes ESM.
- **Impacto:** Mocks não aplicados corretamente, testes falham ou não isolam dependências.
- **Correção:** Usar `jest.unstable_mockModule` e garantir que mocks sejam aplicados antes dos imports.

## 3. Exports de Funções
- **Descrição:** Funções como `parseMind`, `generateMindReport` e outras não exportadas corretamente nos arquivos core.
- **Impacto:** Testes não conseguem importar funções, falhas de execução.
- **Correção:** Exportar explicitamente todas as funções utilizadas nos testes.

## 4. Testes Quebrados
- **Descrição:** Testes que dependem de mocks ou exports incorretos, ou que não cobrem todos os fluxos de erro.
- **Impacto:** Baixa cobertura, bugs não detectados, CI/CD falha.
- **Correção:** Revisar e corrigir todos os testes, garantir cobertura de fluxos de erro.

## 5. Configuração Duplicada
- **Descrição:** Arquivos de configuração com exportações duplicadas ou conflitantes.
- **Impacto:** Erros de importação, falhas de inicialização.
- **Correção:** Manter apenas uma fonte de verdade para cada configuração.

## 6. Cobertura de Testes
- **Descrição:** Alguns fluxos de erro e exceções não estão cobertos por testes.
- **Impacto:** Possíveis bugs não detectados em produção.
- **Correção:** Adicionar testes para todos os fluxos de erro e exceções esperadas.

## 7. Configuração do Jest
- **Descrição:** Opções redundantes ou desnecessárias podem causar warnings ou falhas.
- **Impacto:** Warnings no CI/CD, falhas inesperadas.
- **Correção:** Manter apenas as opções necessárias e compatíveis com ESM.

---

## Resumo das Ações Recomendadas
- [ ] Padronizar todos os arquivos para ESM
- [ ] Corrigir todos os mocks para ESM
- [ ] Exportar explicitamente todas as funções usadas em testes
- [ ] Revisar e corrigir todos os testes quebrados
- [ ] Eliminar configurações duplicadas
- [ ] Garantir cobertura de testes para fluxos de erro
- [ ] Revisar configuração do Jest
