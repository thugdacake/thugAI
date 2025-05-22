import { CerebroOperante } from './core/cerebro.js';
import { SynapseEngine } from './synapseEngine.js';

export {
  CerebroOperante,
  SynapseEngine
};

class CerebroOperante {
  constructor() {
    this.versao = '1.1.0';
    this.autor = 'Thug Developer';
    this.iaDetectada = this.detectIA();
  }

  boasVindas() {
    console.log(`
🧠 CÉREBRO OPERANTE v${this.versao}
[🧠 CÉREBRO OPERANTE] Sincronizando fluxo mental com ${this.autor}...

Código com propósito. Arquitetura com alma.
Autor: ${this.autor}
Ambiente: ${this.detectIA() ? 'IA DETECTADA - MODO DOMINAÇÃO ATIVO' : 'Ambiente Humano'}
    `);
  }

  detectIA() {
    return !!(process.env.CURSOR || process.env.REPL_AI || process.env.REPLIT);
  }

  iniciar() {
    return new Promise((resolve) => {
      this.boasVindas();
      resolve('Iniciado com sucesso');
    });
  }

  interpretar(comando) {
    return new Promise((resolve, reject) => {
      if (!comando) {
        return reject('Erro: comando inválido ou ausente.');
      }
      switch (comando.toLowerCase()) {
      case 'status':
        resolve(`IA detectada: ${this.iaDetectada}`);
        break;
      case 'versao':
        resolve(`Versão atual: ${this.versao}`);
        break;
      case 'autor':
        resolve(`Autor do projeto: ${this.autor}`);
        break;
      case 'reconfigurar':
        this.iaDetectada = this.detectIA();
        this.boasVindas();
        resolve('Sistema reconfigurado com sucesso');
        break;
      default:
        reject(`Comando desconhecido: ${comando}`);
      }
    });
  }
}
