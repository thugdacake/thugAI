import { describe, it, expect, beforeEach } from 'vitest';
import { CerebroOperante } from '../CerebroOperante';
import { ProcessOptions } from '../types';

describe('CerebroOperante', () => {
  let cerebro: CerebroOperante;

  beforeEach(() => {
    cerebro = new CerebroOperante();
  });

  it('should initialize correctly', () => {
    expect(cerebro.getHost()).toBe('localhost');
    expect(cerebro.isAIMode()).toBe(false);
  });

  it('should handle AI mode', async () => {
    await cerebro.interceptAI();
    expect(cerebro.isAIMode()).toBe(true);
  });

  it('should process blueprint input', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'blueprint',
      cache: false
    };

    const result = await cerebro.interpretar(input, options);

    expect(result.success).toBe(true);
    expect(result.mode).toBe('blueprint');
    expect(result.result).toBeDefined();
    expect(result.result?.type).toBe('blueprint');
    expect(result.result?.content).toBe(input);
    expect(result.result?.metadata.version).toBe('1.0');
  });

  it('should process documentacao input', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'documentacao',
      cache: false
    };

    const result = await cerebro.interpretar(input, options);

    expect(result.success).toBe(true);
    expect(result.mode).toBe('documentacao');
    expect(result.result).toBeDefined();
    expect(result.result?.type).toBe('documentacao');
    expect(result.result?.content).toBe(input);
    expect(result.result?.metadata.version).toBe('1.0');
  });

  it('should process prompt input', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'prompt',
      cache: false
    };

    const result = await cerebro.interpretar(input, options);

    expect(result.success).toBe(true);
    expect(result.mode).toBe('prompt');
    expect(result.result).toBeDefined();
    expect(result.result?.type).toBe('prompt');
    expect(result.result?.content).toBe(input);
    expect(result.result?.metadata.version).toBe('1.0');
  });

  it('should process comando input', async () => {
    const input = 'teste';
    const options: ProcessOptions = {
      mode: 'comando',
      cache: false
    };

    const result = await cerebro.interpretar(input, options);

    expect(result.success).toBe(true);
    expect(result.mode).toBe('comando');
    expect(result.result).toBeDefined();
    expect(result.result?.type).toBe('comando');
    expect(result.result?.content).toBe(input);
    expect(result.result?.metadata.version).toBe('1.0');
  });

  it('should handle context', () => {
    cerebro.setContext('test', 'value');
    expect(cerebro.getContext('test')).toBe('value');

    cerebro.clearContext();
    expect(cerebro.getContext('test')).toBeUndefined();
  });

  it('should handle mode', () => {
    cerebro.setMode('prompt');
    expect(cerebro.getMode()).toBe('prompt');

    cerebro.setMode('blueprint');
    expect(cerebro.getMode()).toBe('blueprint');
  });
});
