import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SynapseEngine } from '../../engine/SynapseEngine';
import { ProcessOptions } from '../../types';
import * as fs from 'fs/promises';
import * as path from 'path';

vi.mock('fs/promises');

describe('SynapseEngine', () => {
  let engine: SynapseEngine;
  const mockOutputDir = '.cerebro';

  beforeEach(() => {
    engine = new SynapseEngine();
    vi.clearAllMocks();
  });

  it('should process blueprint input', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'blueprint',
      cache: false
    };

    const result = await engine.process(input, options);

    expect(result.success).toBe(true);
    expect(result.mode).toBe('blueprint');
    expect(result.result).toBeDefined();
    expect(result.result?.type).toBe('blueprint');
    expect(result.result?.content).toBe(input);
    expect(result.result?.metadata.version).toBe('1.0');
    expect(result.result?.metadata.format).toBe('mermaid');
  });

  it('should process documentacao input', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'documentacao',
      cache: false
    };

    const result = await engine.process(input, options);

    expect(result.success).toBe(true);
    expect(result.mode).toBe('documentacao');
    expect(result.result).toBeDefined();
    expect(result.result?.type).toBe('documentacao');
    expect(result.result?.content).toBe(input);
    expect(result.result?.metadata.version).toBe('1.0');
    expect(result.result?.metadata.format).toBe('markdown');
  });

  it('should process prompt input', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'prompt',
      cache: false
    };

    const result = await engine.process(input, options);

    expect(result.success).toBe(true);
    expect(result.mode).toBe('prompt');
    expect(result.result).toBeDefined();
    expect(result.result?.type).toBe('prompt');
    expect(result.result?.content).toBe(input);
    expect(result.result?.metadata.version).toBe('1.0');
    expect(result.result?.metadata.model).toBe('gpt-4');
  });

  it('should process comando input', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'comando',
      cache: false
    };

    const result = await engine.process(input, options);

    expect(result.success).toBe(true);
    expect(result.mode).toBe('comando');
    expect(result.result).toBeDefined();
    expect(result.result?.type).toBe('comando');
    expect(result.result?.content).toBe(input);
    expect(result.result?.metadata.version).toBe('1.0');
  });

  it('should handle invalid mode', async () => {
    const input = 'teste';
    const options = {
      mode: 'invalid' as any,
      cache: false
    };

    const result = await engine.process(input, options);

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should use cache when enabled', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'prompt',
      cache: true
    };

    const result1 = await engine.process(input, options);
    const result2 = await engine.process(input, options);

    expect(result1).toEqual(result2);
  });

  it('should handle context', () => {
    engine.setContext('test', 'value');
    expect(engine.getContext('test')).toBe('value');

    engine.clearContext();
    expect(engine.getContext('test')).toBeUndefined();
  });

  it('should handle mode', () => {
    engine.setMode('prompt');
    expect(engine.getMode()).toBe('prompt');

    engine.setMode('blueprint');
    expect(engine.getMode()).toBe('blueprint');
  });

  describe('arquivos', () => {
    it('deve salvar arquivos corretamente', async () => {
      const input = 'teste';
      await engine.process(input, { mode: 'prompt', cache: true });

      expect(fs.mkdir).toHaveBeenCalledWith(mockOutputDir, { recursive: true });
      expect(fs.writeFile).toHaveBeenCalledTimes(2);
    });
  });

  describe('métodos específicos', () => {
    it('deve processar blueprint via método específico', async () => {
      const input = JSON.stringify({
        name: 'Teste',
        version: '1.0.0',
        description: 'Descrição de teste'
      });

      const result = await engine.processBlueprint(input);
      expect(result.type).toBe('blueprint');
    });

    it('deve processar documentação via método específico', async () => {
      const input = '# Título\n\n[Link](http://exemplo.com)';
      const result = await engine.processDocumentacao(input);
      expect(result.type).toBe('documentacao');
    });

    it('deve processar prompt via método específico', async () => {
      const input = 'Este é um prompt de teste.';
      const result = await engine.processPrompt(input);
      expect(result.type).toBe('prompt');
    });

    it('deve processar comando via método específico', async () => {
      const input = 'ls -la';
      const result = await engine.processComando(input);
      expect(result.type).toBe('comando');
    });
  });

  describe('getters', () => {
    it('deve retornar instância do BlueprintProcessor', () => {
      expect(engine.getBlueprintProcessor()).toBeDefined();
    });

    it('deve retornar instância do DocumentacaoProcessor', () => {
      expect(engine.getDocumentacaoProcessor()).toBeDefined();
    });

    it('deve retornar instância do PromptProcessor', () => {
      expect(engine.getPromptProcessor()).toBeDefined();
    });

    it('deve retornar instância do ComandoProcessor', () => {
      expect(engine.getComandoProcessor()).toBeDefined();
    });
  });
});
