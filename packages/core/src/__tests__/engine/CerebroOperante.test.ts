import { CerebroOperante } from '../../engine/CerebroOperante';

describe('CerebroOperante', () => {
  let cerebro: CerebroOperante;

  beforeEach(() => {
    cerebro = new CerebroOperante();
  });

  describe('process', () => {
    it('deve processar blueprint e armazenar na memória', async () => {
      const input = JSON.stringify({
        name: 'Teste',
        version: '1.0.0',
        description: 'Descrição de teste'
      });

      const result = await cerebro.process(input, 'blueprint');
      expect(result.type).toBe('blueprint');
      expect(result.content).toBe(input);
      expect(result.metadata.version).toBe('1.0');
      expect(result.metadata.timestamp).toBeDefined();

      const memory = cerebro.getMemory();
      expect(memory.get(result.metadata.timestamp)).toEqual(result);
    });

    it('deve processar documentação e armazenar na memória', async () => {
      const input = '# Título\n\n[Link](http://exemplo.com)';
      const result = await cerebro.process(input, 'documentacao');
      expect(result.type).toBe('documentacao');
      expect(result.content).toBe(input);
      expect(result.metadata.format).toBe('markdown');
      expect(result.metadata.timestamp).toBeDefined();

      const memory = cerebro.getMemory();
      expect(memory.get(result.metadata.timestamp)).toEqual(result);
    });

    it('deve processar prompt e armazenar na memória', async () => {
      const input = 'Este é um prompt de teste.';
      const result = await cerebro.process(input, 'prompt');
      expect(result.type).toBe('prompt');
      expect(result.content).toBe(input);
      expect(result.metadata.model).toBe('gpt-4');
      expect(result.metadata.timestamp).toBeDefined();

      const memory = cerebro.getMemory();
      expect(memory.get(result.metadata.timestamp)).toEqual(result);
    });

    it('deve processar comando e armazenar na memória', async () => {
      const input = 'ls -la';
      const result = await cerebro.process(input, 'comando');
      expect(result.type).toBe('comando');
      expect(result.content).toBe(input);
      expect(result.metadata.shell).toBe('bash');
      expect(result.metadata.timestamp).toBeDefined();

      const memory = cerebro.getMemory();
      expect(memory.get(result.metadata.timestamp)).toEqual(result);
    });

    it('deve lançar erro para tipo não suportado', async () => {
      // @ts-ignore
      await expect(cerebro.process('teste', 'invalid')).rejects.toThrow('Tipo de processamento não suportado');
    });
  });

  describe('métodos específicos', () => {
    it('deve processar blueprint via método específico', async () => {
      const input = JSON.stringify({
        name: 'Teste',
        version: '1.0.0',
        description: 'Descrição de teste'
      });

      const result = await cerebro.processBlueprint(input);
      expect(result.type).toBe('blueprint');
    });

    it('deve processar documentação via método específico', async () => {
      const input = '# Título\n\n[Link](http://exemplo.com)';
      const result = await cerebro.processDocumentacao(input);
      expect(result.type).toBe('documentacao');
    });

    it('deve processar prompt via método específico', async () => {
      const input = 'Este é um prompt de teste.';
      const result = await cerebro.processPrompt(input);
      expect(result.type).toBe('prompt');
    });

    it('deve processar comando via método específico', async () => {
      const input = 'ls -la';
      const result = await cerebro.processComando(input);
      expect(result.type).toBe('comando');
    });
  });

  describe('memória', () => {
    it('deve retornar a memória', () => {
      const memory = cerebro.getMemory();
      expect(memory).toBeInstanceOf(Map);
      expect(memory.size).toBe(0);
    });

    it('deve limpar a memória', async () => {
      const input = 'Teste';
      await cerebro.process(input, 'prompt');
      expect(cerebro.getMemory().size).toBe(1);

      cerebro.clearMemory();
      expect(cerebro.getMemory().size).toBe(0);
    });
  });

  describe('engine', () => {
    it('deve retornar a instância do engine', () => {
      const engine = cerebro.getEngine();
      expect(engine).toBeDefined();
    });
  });
});
