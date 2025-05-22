import fs from 'fs/promises';
import path from 'path';

export class SynapseEngine {
  constructor() {
    this.modos = ['blueprint', 'documentacao', 'prompt', 'comando'];
    this.templates = {
      blueprint: {
        header: '# Arquitetura do Sistema\n\n',
        footer: '\n\n## Diagrama de Fluxo\n\n```mermaid\n',
        metadata: {
          tipo: 'arquitetura',
          formato: 'markdown'
        }
      },
      documentacao: {
        header: '# Documentação Técnica\n\n',
        footer: '\n\n## Referências\n\n',
        metadata: {
          tipo: 'documentacao',
          formato: 'markdown'
        }
      },
      prompt: {
        header: '## Contexto\n\n',
        footer: '\n\n## Instruções\n\n',
        metadata: {
          tipo: 'prompt',
          formato: 'markdown'
        }
      },
      comando: {
        header: '#!/bin/bash\n\n',
        footer: '\n\n# Fim do script\n',
        metadata: {
          tipo: 'script',
          formato: 'bash'
        }
      }
    };
    this.cache = new Map();
  }

  async processar(ideia, modo, opcoes = {}) {
    this._validarInputs(ideia, modo, opcoes);

    const template = this._obterTemplate(modo, opcoes);
    const conteudo = await this._gerarConteudo(ideia, modo, template);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const nomeArquivo = `${modo}_${timestamp}`;

    const output = {
      conteudo,
      arquivos: {
        md: `${nomeArquivo}.md`,
        mmd: modo === 'blueprint' ? `${nomeArquivo}.mmd` : null,
        json: `${nomeArquivo}.json`
      },
      metadata: {
        ...template.metadata,
        timestamp,
        modo,
        versao: '1.0.0'
      }
    };

    // eslint-disable-next-line no-console
    console.log(`Processamento concluído para modo: ${modo}`);
    return output;
  }

  async salvarArquivos(output) {
    const cerebroDir = path.join(process.cwd(), '.cerebro');

    try {
      await fs.mkdir(cerebroDir, { recursive: true });

      const promises = [];

      // Salvar arquivo .md
      promises.push(
        fs.writeFile(
          path.join(cerebroDir, output.arquivos.md),
          output.conteudo
        )
      );

      // Se houver arquivo .mmd, salvá-lo também
      if (output.arquivos.mmd) {
        promises.push(
          fs.writeFile(
            path.join(cerebroDir, output.arquivos.mmd),
            this._extrairMermaid(output.conteudo)
          )
        );
      }

      // Salvar metadados
      promises.push(
        fs.writeFile(
          path.join(cerebroDir, output.arquivos.json),
          JSON.stringify(output.metadata, null, 2)
        )
      );

      await Promise.all(promises);
      // eslint-disable-next-line no-console
      console.log('Arquivos salvos com sucesso em:', cerebroDir);
    } catch (erro) {
      throw new Error(`Erro ao salvar arquivos: ${erro.message}`);
    }
  }

  _validarInputs(ideia, modo, opcoes) {
    if (!ideia) {
      throw new Error('Ideia não pode ser vazia');
    }

    if (!this.modos.includes(modo)) {
      throw new Error(`Modo inválido. Modos disponíveis: ${this.modos.join(', ')}`);
    }

    if (opcoes.template && typeof opcoes.template !== 'object') {
      throw new Error('Template personalizado deve ser um objeto válido');
    }
  }

  _obterTemplate(modo, opcoes) {
    if (opcoes.template) {
      return {
        ...this.templates[modo],
        ...opcoes.template
      };
    }
    return this.templates[modo];
  }

  async _gerarConteudo(ideia, modo, template) {
    let conteudo = template.header;

    if (typeof ideia === 'string') {
      conteudo += this._processarString(ideia, modo);
    } else if (typeof ideia === 'object') {
      conteudo += await this._processarObjeto(ideia, modo);
    }

    conteudo += template.footer;
    return conteudo;
  }

  _processarString(ideia, modo) {
    const cacheKey = `string_${modo}_${ideia}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let resultado;
    switch (modo) {
    case 'blueprint':
      resultado = this._gerarBlueprint(ideia);
      break;
    case 'documentacao':
      resultado = this._gerarDocumentacao(ideia);
      break;
    case 'prompt':
      resultado = this._gerarPrompt(ideia);
      break;
    case 'comando':
      resultado = this._gerarComando(ideia);
      break;
    default:
      resultado = ideia;
    }

    this.cache.set(cacheKey, resultado);
    return resultado;
  }

  async _processarObjeto(ideia, modo) {
    const cacheKey = `object_${modo}_${JSON.stringify(ideia)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    let resultado = '';

    // Processamento estruturado baseado no tipo de objeto
    if (Array.isArray(ideia)) {
      resultado = this._processarArray(ideia);
    } else if (ideia.componentes) {
      resultado = this._processarComponentes(ideia);
    } else {
      resultado = JSON.stringify(ideia, null, 2);
    }

    this.cache.set(cacheKey, resultado);
    return resultado;
  }

  _processarArray(array) {
    return array.map(item => {
      if (typeof item === 'string') {
        return `- ${item}`;
      }
      return `- ${JSON.stringify(item)}`;
    }).join('\n');
  }

  _processarComponentes(ideia) {
    let resultado = '';

    if (ideia.componentes) {
      resultado += '## Componentes\n\n';
      for (const [nome, descricao] of Object.entries(ideia.componentes)) {
        resultado += `### ${nome}\n${descricao}\n\n`;
      }
    }

    if (ideia.fluxo) {
      resultado += '## Fluxo de Execução\n\n';
      resultado += ideia.fluxo;
    }

    return resultado;
  }

  _gerarBlueprint(ideia) {
    return `## Visão Geral\n\n${ideia}\n\n## Componentes\n\n`;
  }

  _gerarDocumentacao(ideia) {
    return `## Descrição\n\n${ideia}\n\n## Detalhes Técnicos\n\n`;
  }

  _gerarPrompt(ideia) {
    return `## Objetivo\n\n${ideia}\n\n## Requisitos\n\n`;
  }

  _gerarComando(ideia) {
    return `# Script gerado automaticamente\n\n${ideia}\n\n`;
  }

  _extrairMermaid(conteudo) {
    const match = conteudo.match(/```mermaid\n([\s\S]*?)```/);
    return match ? match[1] : '';
  }

  limparCache() {
    this.cache.clear();
  }
}
