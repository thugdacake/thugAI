// Cérebro Operante — Núcleo

import { SynapseEngine } from './engine/SynapseEngine';
import { Output, ProcessResult, ProcessOptions } from './types';

export const versao = '1.2.0';
export const autor = 'Thug Developer';

export class CerebroOperante {
  private engine: SynapseEngine;
  private host: string;
  private isAI: boolean;

  constructor() {
    this.engine = new SynapseEngine();
    this.host = 'localhost';
    this.isAI = false;
  }

  async iniciar(): Promise<void> {
    // Inicializar o cérebro
    console.log('Iniciando Cérebro Operante...');
  }

  async interpretar(input: string, options: ProcessOptions = { mode: 'prompt', cache: false }): Promise<Output> {
    return await this.engine.process(input, options);
  }

  async interceptAI(): Promise<void> {
    this.isAI = true;
    console.log('Modo IA ativado');
  }

  setMode(mode: 'blueprint' | 'documentacao' | 'prompt' | 'comando'): void {
    this.engine.setMode(mode);
  }

  getMode(): string {
    return this.engine.getMode();
  }

  setContext(key: string, value: any): void {
    this.engine.setContext(key, value);
  }

  getContext(key: string): any {
    return this.engine.getContext(key);
  }

  clearContext(): void {
    this.engine.clearContext();
  }

  getHost(): string {
    return this.host;
  }

  isAIMode(): boolean {
    return this.isAI;
  }
}
