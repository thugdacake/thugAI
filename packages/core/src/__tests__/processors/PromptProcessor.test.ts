import { PromptProcessor } from '../../processors/PromptProcessor';

describe('PromptProcessor', () => {
  let processor: PromptProcessor;

  beforeEach(() => {
    processor = new PromptProcessor();
  });

  describe('process', () => {
    it('deve processar prompt válido', async () => {
      const input = 'Este é um prompt de teste com algumas palavras.';
      const result = await processor.process(input);
      expect(result.type).toBe('prompt');
      expect(result.content).toBe(input);
      expect(result.metadata.model).toBe('gpt-4');
      expect(result.metadata.timestamp).toBeDefined();
      expect(result.metadata.version).toBe('1.0');
      expect(result.metadata.tokens).toBeDefined();
    });

    it('deve normalizar quebras de linha', async () => {
      const input = 'Linha 1\r\nLinha 2\r\nLinha 3';
      const result = await processor.process(input);
      expect(result.content).toBe('Linha 1\nLinha 2\nLinha 3');
    });

    it('deve lançar erro para prompt vazio', async () => {
      const input = '   ';
      await expect(processor.process(input)).rejects.toThrow('Prompt não pode estar vazio');
    });

    it('deve lançar erro para prompt muito longo', async () => {
      processor.setMaxTokens(10);
      const input = 'Este é um prompt muito longo que deve exceder o limite de tokens definido.';
      await expect(processor.process(input)).rejects.toThrow('Prompt muito longo');
    });

    it('deve lançar erro para prompt sem caracteres alfanuméricos', async () => {
      const input = '!@#$%^&*()';
      await expect(processor.process(input)).rejects.toThrow('deve conter pelo menos um caractere alfanumérico');
    });
  });

  describe('model', () => {
    it('deve permitir alterar o modelo para gpt-3.5-turbo', () => {
      processor.setModel('gpt-3.5-turbo');
      expect(processor.getModel()).toBe('gpt-3.5-turbo');
    });

    it('deve manter o modelo padrão como gpt-4', () => {
      expect(processor.getModel()).toBe('gpt-4');
    });

    it('deve lançar erro ao tentar definir modelo inválido', () => {
      // @ts-ignore
      expect(() => processor.setModel('invalid-model')).toThrow('Modelo não suportado');
    });
  });

  describe('maxTokens', () => {
    it('deve permitir alterar o número máximo de tokens', () => {
      processor.setMaxTokens(2048);
      expect(processor.getMaxTokens()).toBe(2048);
    });

    it('deve manter o número máximo de tokens padrão', () => {
      expect(processor.getMaxTokens()).toBe(4096);
    });

    it('deve lançar erro ao tentar definir número máximo de tokens inválido', () => {
      expect(() => processor.setMaxTokens(0)).toThrow('Número máximo de tokens deve ser maior que zero');
    });
  });
});
