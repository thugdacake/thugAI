import { SynapseEngine } from '../engine/SynapseEngine';

describe('SynapseEngine', () => {
  let engine: SynapseEngine;

  beforeEach(() => {
    engine = new SynapseEngine();
  });

  describe('process', () => {
    it('deve processar input no modo prompt por padrão', async () => {
      const result = await engine.process('teste');
      expect(result.success).toBe(true);
      expect(result.mode).toBe('prompt');
      expect(result.result.type).toBe('prompt');
    });

    it('deve retornar erro quando o modo é inválido', async () => {
      // @ts-ignore
      engine.setMode('invalid');
      const result = await engine.process('teste');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('setMode', () => {
    it('deve alterar o modo corretamente', () => {
      engine.setMode('blueprint');
      expect(engine.getMode()).toBe('blueprint');
    });
  });

  describe('context', () => {
    it('deve gerenciar o contexto corretamente', () => {
      engine.setContext('test', 'value');
      expect(engine.getContext('test')).toBe('value');

      engine.clearContext();
      expect(engine.getContext('test')).toBeUndefined();
      expect(engine.getContext('mode')).toBeDefined();
    });
  });
});
