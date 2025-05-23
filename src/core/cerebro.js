import chalk from 'chalk';
import { detectarIA } from './ia-detector.js';
import { interpretarComando } from './comando-interpretador.js';

export class CerebroOperante {
  constructor() {
    this.versao = '1.0.2';
    this.autor = 'Thug Developer';
    this.iaDetectada = false;
  }

  boasVindas() {
    return chalk.green(`
🧠 Cérebro Operante v${this.versao}
Desenvolvido por ${this.autor}

Código com propósito. Arquitetura com alma.
        `);
  }

  async iniciar() {
    console.log(this.boasVindas());
    this.iaDetectada = await detectarIA();
    return this.iaDetectada;
  }

  async interpretar(comando) {
    if (!this.iaDetectada) {
      await this.iniciar();
    }
    return interpretarComando(comando, this.iaDetectada);
  }
}
