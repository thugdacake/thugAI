import { Prompt } from '../types';

export class PromptProcessor {
  private model: 'gpt-4' | 'gpt-3.5-turbo' = 'gpt-4';
  private maxTokens: number = 4096;

  async process(input: string): Promise<Prompt> {
    try {
      const content = this.parseContent(input);
      this.validateContent(content);

      const tokenCount = this.countTokens(content);

      return {
        type: 'prompt',
        content,
        metadata: {
          model: this.model,
          maxTokens: this.maxTokens,
          tokenCount,
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      };
    } catch (error: any) {
      throw new Error(`Erro ao processar prompt: ${error.message}`);
    }
  }

  private parseContent(input: string): string {
    const content = input.trim();
    if (!content) {
      throw new Error('Prompt não pode estar vazio');
    }
    return content;
  }

  private validateContent(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new Error('Prompt não pode estar vazio');
    }

    const tokenCount = this.countTokens(content);
    if (tokenCount > this.maxTokens) {
      throw new Error(`Prompt excede o limite de tokens (${this.maxTokens})`);
    }

    if (!/[a-zA-Z0-9]/.test(content)) {
      throw new Error('Prompt deve conter pelo menos um caractere alfanumérico');
    }
  }

  private countTokens(content: string): number {
    // Implementação simplificada da contagem de tokens
    // Baseada na documentação da OpenAI: https://platform.openai.com/tokenizer

    // Remove espaços extras e quebras de linha
    const normalized = content.replace(/\s+/g, ' ').trim();

    // Divide em palavras
    const words = normalized.split(/\s+/);

    let tokenCount = 0;

    for (const word of words) {
      // Palavras comuns em inglês são geralmente 1 token
      if (/^[a-zA-Z]+$/.test(word)) {
        tokenCount += 1;
        continue;
      }

      // Palavras com números ou caracteres especiais
      if (/^[a-zA-Z0-9]+$/.test(word)) {
        tokenCount += Math.ceil(word.length / 4);
        continue;
      }

      // Caracteres especiais e pontuação
      if (/^[^a-zA-Z0-9]+$/.test(word)) {
        tokenCount += Math.ceil(word.length / 2);
        continue;
      }

      // Palavras mistas (letras, números e caracteres especiais)
      tokenCount += Math.ceil(word.length / 3);
    }

    // Adiciona tokens para espaços e pontuação
    tokenCount += Math.ceil(normalized.length / 4);

    return Math.ceil(tokenCount);
  }

  setModel(model: 'gpt-4' | 'gpt-3.5-turbo'): void {
    if (model !== 'gpt-4' && model !== 'gpt-3.5-turbo') {
      throw new Error('Modelo não suportado');
    }
    this.model = model;
  }

  getModel(): 'gpt-4' | 'gpt-3.5-turbo' {
    return this.model;
  }

  setMaxTokens(maxTokens: number): void {
    if (maxTokens < 1 || maxTokens > 8192) {
      throw new Error('Limite de tokens deve estar entre 1 e 8192');
    }
    this.maxTokens = maxTokens;
  }

  getMaxTokens(): number {
    return this.maxTokens;
  }
}
