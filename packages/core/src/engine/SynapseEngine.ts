import { ProcessMode, ProcessOptions, ProcessResult, Output, CacheEntry } from '../types';
import * as fs from 'fs/promises';
import * as path from 'path';

export class SynapseEngine {
  private cache: Map<string, CacheEntry>;
  private context: Record<string, any>;
  private mode: ProcessMode;
  private outputDir: string;

  constructor() {
    this.cache = new Map();
    this.context = {};
    this.mode = 'prompt';
    this.outputDir = '.cerebro';
  }

  async process(input: string, options: ProcessOptions): Promise<Output> {
    try {
      // Verificar cache
      if (options.cache) {
        const cached = this.getFromCache(input);
        if (cached) {
          return {
            success: true,
            mode: options.mode,
            result: cached
          };
        }
      }

      // Processar input
      const result = await this.processInput(input, options);

      // Salvar no cache
      if (options.cache) {
        this.saveToCache(input, result);
      }

      // Salvar arquivos
      await this.saveFiles(result);

      return {
        success: true,
        mode: options.mode,
        result
      };
    } catch (error: any) {
      return {
        success: false,
        mode: options.mode,
        error: error.message
      };
    }
  }

  private async processInput(input: string, options: ProcessOptions): Promise<ProcessResult> {
    const timestamp = new Date().toISOString();

    switch (options.mode) {
      case 'blueprint':
        return {
          type: 'blueprint',
          content: input,
          metadata: {
            timestamp,
            version: '1.0',
            format: 'mermaid'
          }
        };

      case 'documentacao':
        return {
          type: 'documentacao',
          content: input,
          metadata: {
            timestamp,
            version: '1.0',
            format: 'markdown'
          }
        };

      case 'prompt':
        return {
          type: 'prompt',
          content: input,
          metadata: {
            timestamp,
            version: '1.0',
            model: 'gpt-4'
          }
        };

      case 'comando':
        return {
          type: 'comando',
          content: input,
          metadata: {
            timestamp,
            version: '1.0'
          }
        };

      default:
        throw new Error(`Modo de processamento inválido: ${options.mode}`);
    }
  }

  private getFromCache(key: string): ProcessResult | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  private saveToCache(key: string, value: ProcessResult): void {
    const entry: CacheEntry = {
      key,
      value,
      timestamp: Date.now(),
      ttl: 3600000 // 1 hora
    };
    this.cache.set(key, entry);
  }

  private async saveFiles(result: ProcessResult): Promise<void> {
    const timestamp = result.metadata.timestamp.replace(/[:.]/g, '-');
    const filename = `${result.type}-${timestamp}`;

    // Criar diretório se não existir
    await fs.mkdir(this.outputDir, { recursive: true });

    // Salvar arquivo principal
    const extension = this.getFileExtension(result.type);
    const filepath = path.join(this.outputDir, `${filename}.${extension}`);
    await fs.writeFile(filepath, result.content);

    // Salvar metadados
    const metapath = path.join(this.outputDir, `${filename}.json`);
    await fs.writeFile(metapath, JSON.stringify(result.metadata, null, 2));
  }

  private getFileExtension(type: ProcessMode): string {
    switch (type) {
      case 'blueprint':
        return 'mmd';
      case 'documentacao':
        return 'md';
      case 'prompt':
        return 'txt';
      case 'comando':
        return 'cmd';
      default:
        return 'txt';
    }
  }

  setMode(mode: ProcessMode): void {
    this.mode = mode;
  }

  getMode(): ProcessMode {
    return this.mode;
  }

  setContext(key: string, value: any): void {
    this.context[key] = value;
  }

  getContext(key: string): any {
    return this.context[key];
  }

  clearContext(): void {
    this.context = {};
  }

  clearCache(): void {
    this.cache.clear();
  }
}
