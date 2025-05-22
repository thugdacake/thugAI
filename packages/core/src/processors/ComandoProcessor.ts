import { Comando } from '../types';

export class ComandoProcessor {
  private shell: string = 'bash';
  private allowedCommands: Set<string> = new Set(['ls', 'cd', 'pwd', 'echo', 'cat', 'grep']);

  async process(input: string): Promise<Comando> {
    try {
      const content = await this.parseContent(input);
      this.validateContent(content);

      return {
        type: 'comando',
        content,
        metadata: {
          shell: this.shell,
          timestamp: new Date().toISOString(),
          version: '1.0',
          command: this.extractCommand(content)
        }
      };
    } catch (error) {
      throw new Error(`Erro ao processar comando: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private async parseContent(input: string): Promise<string> {
    try {
      // Remove espaços extras e normaliza quebras de linha
      const normalized = input.trim().replace(/\r\n/g, '\n');

      // Verifica se o comando está vazio
      if (!normalized) {
        throw new Error('Comando não pode estar vazio');
      }

      return normalized;
    } catch (error) {
      throw new Error(`Erro ao fazer parse do comando: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private validateContent(content: string): void {
    // Verifica se o conteúdo está vazio
    if (!content || typeof content !== 'string') {
      throw new Error('Conteúdo inválido: deve ser uma string não vazia');
    }

    // Extrai o comando base
    const command = this.extractCommand(content);

    // Verifica se o comando é permitido
    if (!this.allowedCommands.has(command)) {
      throw new Error(`Comando não permitido: ${command}`);
    }

    // Validação específica por shell
    switch (this.shell) {
      case 'bash':
        this.validateBashCommand(content);
        break;
      case 'powershell':
        this.validatePowerShellCommand(content);
        break;
      default:
        throw new Error(`Shell não suportado: ${this.shell}`);
    }
  }

  private extractCommand(content: string): string {
    // Extrai o primeiro comando da string
    const match = content.match(/^(\w+)/);
    return match ? match[1].toLowerCase() : '';
  }

  private validateBashCommand(content: string): void {
    // Verifica caracteres perigosos
    const dangerousChars = /[;&|`$]/;
    if (dangerousChars.test(content)) {
      throw new Error('Comando contém caracteres perigosos');
    }

    // Verifica redirecionamentos
    const hasRedirect = /[<>]/.test(content);
    if (hasRedirect) {
      throw new Error('Redirecionamentos não são permitidos');
    }
  }

  private validatePowerShellCommand(content: string): void {
    // Verifica caracteres perigosos
    const dangerousChars = /[;&|`$]/;
    if (dangerousChars.test(content)) {
      throw new Error('Comando contém caracteres perigosos');
    }

    // Verifica redirecionamentos
    const hasRedirect = /[<>]/.test(content);
    if (hasRedirect) {
      throw new Error('Redirecionamentos não são permitidos');
    }
  }

  setShell(shell: string): void {
    if (!['bash', 'powershell'].includes(shell)) {
      throw new Error(`Shell não suportado: ${shell}`);
    }
    this.shell = shell;
  }

  getShell(): string {
    return this.shell;
  }

  addAllowedCommand(command: string): void {
    this.allowedCommands.add(command.toLowerCase());
  }

  removeAllowedCommand(command: string): void {
    this.allowedCommands.delete(command.toLowerCase());
  }

  getAllowedCommands(): string[] {
    return Array.from(this.allowedCommands);
  }
}
