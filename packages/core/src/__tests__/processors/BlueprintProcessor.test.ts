import { BlueprintProcessor } from '../../processors/BlueprintProcessor';

describe('BlueprintProcessor', () => {
  let processor: BlueprintProcessor;

  beforeEach(() => {
    processor = new BlueprintProcessor();
  });

  describe('process', () => {
    it('deve processar input JSON válido', async () => {
      const input = JSON.stringify({
        name: 'Teste',
        version: '1.0.0',
        description: 'Descrição de teste'
      });

      const result = await processor.process(input);
      expect(result.type).toBe('blueprint');
      expect(result.content).toBe(input);
      expect(result.metadata.version).toBe('1.0');
      expect(result.metadata.timestamp).toBeDefined();
      expect(result.metadata.structure).toEqual({
        name: 'Teste',
        version: '1.0.0',
        description: 'Descrição de teste'
      });
    });

    it('deve lançar erro para JSON inválido', async () => {
      const input = '{invalid json}';
      await expect(processor.process(input)).rejects.toThrow('Erro ao processar blueprint');
    });

    it('deve lançar erro para campos obrigatórios ausentes', async () => {
      const input = JSON.stringify({
        name: 'Teste'
      });

      await expect(processor.process(input)).rejects.toThrow('Campos obrigatórios ausentes');
    });

    it('deve lançar erro para tipos inválidos', async () => {
      const input = JSON.stringify({
        name: 123,
        version: '1.0.0',
        description: 'Descrição de teste'
      });

      await expect(processor.process(input)).rejects.toThrow('Campo "name" deve ser uma string');
    });

    it('deve validar componentes como array', async () => {
      const input = JSON.stringify({
        name: 'Teste',
        version: '1.0.0',
        description: 'Descrição de teste',
        components: 'não é um array'
      });

      await expect(processor.process(input)).rejects.toThrow('Campo "components" deve ser um array');
    });
  });

  describe('version', () => {
    it('deve permitir alterar a versão', () => {
      processor.setVersion('2.0');
      expect(processor.getVersion()).toBe('2.0');
    });

    it('deve manter a versão padrão', () => {
      expect(processor.getVersion()).toBe('1.0');
    });
  });
});
