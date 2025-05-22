import { Blueprint } from '../types';

export class BlueprintProcessor {
  private version: string = '1.0';

  async process(input: string): Promise<Blueprint> {
    try {
      const structure = await this.parseStructure(input);
      this.validateStructure(structure);

      return {
        type: 'blueprint',
        content: input,
        metadata: {
          version: this.version,
          timestamp: new Date().toISOString(),
          structure
        }
      };
    } catch (error) {
      throw new Error(`Erro ao processar blueprint: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private async parseStructure(input: string): Promise<Record<string, any>> {
    try {
      // Tenta fazer parse como JSON primeiro
      try {
        return JSON.parse(input);
      } catch {
        // Se não for JSON, tenta parse como YAML
        // TODO: Implementar parser YAML
        throw new Error('Formato não suportado. Use JSON ou YAML.');
      }
    } catch (error) {
      throw new Error(`Erro ao fazer parse da estrutura: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  private validateStructure(structure: Record<string, any>): void {
    if (!structure || typeof structure !== 'object') {
      throw new Error('Estrutura inválida: deve ser um objeto');
    }

    // Validação básica de campos obrigatórios
    const requiredFields = ['name', 'version', 'description'];
    const missingFields = requiredFields.filter(field => !(field in structure));

    if (missingFields.length > 0) {
      throw new Error(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
    }

    // Validação de tipos
    if (typeof structure.name !== 'string') {
      throw new Error('Campo "name" deve ser uma string');
    }

    if (typeof structure.version !== 'string') {
      throw new Error('Campo "version" deve ser uma string');
    }

    if (typeof structure.description !== 'string') {
      throw new Error('Campo "description" deve ser uma string');
    }

    // Validação de componentes (se existirem)
    if (structure.components && !Array.isArray(structure.components)) {
      throw new Error('Campo "components" deve ser um array');
    }
  }

  setVersion(version: string): void {
    this.version = version;
  }

  getVersion(): string {
    return this.version;
  }
}
