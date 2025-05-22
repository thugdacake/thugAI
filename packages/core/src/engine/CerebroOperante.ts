import { SynapseEngine } from './SynapseEngine';
import { Output } from '../types';

export class CerebroOperante {
  private engine: SynapseEngine;
  private memory: Map<string, Output>;

  constructor() {
    this.engine = new SynapseEngine();
    this.memory = new Map();
  }

  async process(input: string, type: 'blueprint' | 'documentacao' | 'prompt' | 'comando'): Promise<Output> {
    try {
      const result = await this.engine.process(input, type);
      this.memory.set(result.metadata.timestamp, result);
      return result;
    } catch (error: any) {
      throw new Error(`Erro ao processar entrada: ${error.message}`);
    }
  }

  async processBlueprint(input: string): Promise<Output> {
    return this.process(input, 'blueprint');
  }

  async processDocumentacao(input: string): Promise<Output> {
    return this.process(input, 'documentacao');
  }

  async processPrompt(input: string): Promise<Output> {
    return this.process(input, 'prompt');
  }

  async processComando(input: string): Promise<Output> {
    return this.process(input, 'comando');
  }

  getMemory(): Map<string, Output> {
    return this.memory;
  }

  clearMemory(): void {
    this.memory.clear();
  }

  getEngine(): SynapseEngine {
    return this.engine;
  }
}
