import { describe, it, expect } from 'vitest';
import config from './vitest.config';

describe('Vitest Config', () => {
  it('should have plugins configured', () => {
    expect(config.plugins).toBeDefined();
    expect(config.plugins).toHaveLength(2);
  });

  it('should have test configuration', () => {
    expect(config.test).toBeDefined();
  });

  it('should have globals enabled', () => {
    expect(config.test?.globals).toBe(true);
  });

  it('should have jsdom environment', () => {
    expect(config.test?.environment).toBe('jsdom');
  });

  it('should have setup files', () => {
    expect(config.test?.setupFiles).toBeDefined();
    expect(config.test?.setupFiles).toHaveLength(1);
  });

  it('should have test patterns', () => {
    expect(config.test?.include).toBeDefined();
    expect(config.test?.include).toContain('**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}');
  });

  it('should have coverage configuration', () => {
    expect(config.test?.coverage).toBeDefined();
  });

  it('should have coverage reporters', () => {
    const coverage = config.test?.coverage as { reporter: string[] };
    expect(coverage?.reporter).toBeDefined();
    expect(coverage?.reporter).toHaveLength(3);
  });

  it('should have coverage exclusions', () => {
    const coverage = config.test?.coverage as { exclude: string[] };
    expect(coverage?.exclude).toBeDefined();
    expect(coverage?.exclude).toHaveLength(2);
  });
});
