import { CerebroOperante } from '@thugdacake/operante';

export class CerebroApi {
  private cerebro: CerebroOperante;

  constructor() {
    this.cerebro = new CerebroOperante();
  }

  async iniciar(): Promise<void> {
    await this.cerebro.iniciar();
  }

  async getStatus(): Promise<any> {
    return await this.cerebro.interpretar('status');
  }

  async processarComando(comando: string): Promise<any> {
    return await this.cerebro.interpretar(comando);
  }

  async interceptarIA(): Promise<void> {
    await this.cerebro.interceptAI();
  }

  getHost(): string {
    return this.cerebro.host;
  }

  isIA(): boolean {
    return this.cerebro.isAI;
  }
}
