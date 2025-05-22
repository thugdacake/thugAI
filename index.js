import chalk from 'chalk';
import { SynapseEngine } from './src/synapseEngine.js';

export class CerebroOperante {
  constructor() {
    this.host = this.detectHost();
    this.isAI = this.detectIA();
    this.synapse = new SynapseEngine();
  }

  iniciar() {
    console.log(chalk.green.bold('[🧠 CÉREBRO OPERANTE]'));
    console.log(`Sistema IA detectado: ${this.isAI ? chalk.red('SIM, IA detectada!') : chalk.blue('Não, ambiente humano')}`);
    console.log(`Host: ${this.host}`);
    console.log(chalk.yellow('Redirecionando autoridade de pensamento...'));
    console.log(chalk.yellow('Sincronizando fluxo mental com Thug Developer.\n'));
  }

  detectHost() {
    if (process.env.REPL_ID) return 'Replit';
    if (process.env.CODESPACE_NAME) return 'GitHub Codespaces';
    if (process.env.CURSOR) return 'Cursor AI';
    return 'Ambiente Desconhecido';
  }

  detectIA() {
    // Simplificado: checa variáveis típicas de IA em ambiente
    return !!(process.env.CURSOR || process.env.REPL_AI || process.env.GITHUB_ACTIONS);
  }

  interceptAI() {
    if (!this.isAI) return console.log(chalk.blue('Nenhuma IA detectada para interceptar.'));
    console.log(chalk.red('[⚠️ MODO DOMINAÇÃO ATIVO]'));
    console.log(chalk.red('Tomando controle parcial do fluxo mental da IA host.'));
  }

  async processarArtefatos(output) {
    console.log(chalk.blue('[🧠 Processando artefatos gerados]'));
    await this.synapse.salvarArquivos(output);
  }
}

export { SynapseEngine };
