import { jest } from '@jest/globals';

const mockFs = {
  existsSync: jest.fn(() => true),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
};

await jest.unstable_mockModule('fs', () => mockFs);

// Mock global de process.exit
const originalProcessExit = process.exit;
beforeAll(() => {
  process.exit = jest.fn();
});
afterAll(() => {
  process.exit = originalProcessExit;
});

import { parseMind, validateMind, generateMindReport } from '../core/mind-interpreter.js';

describe('Mind Interpreter', () => {
  const mockMindContent = `
    # Leader
    Instrução 1 do Leader
    Instrução 2 do Leader

    # Manager
    Instrução 1 do Manager
    Instrução 2 do Manager

    # Architect
    Instrução 1 do Architect
    Instrução 2 do Architect

    # Engineer
    Instrução 1 do Engineer
    Instrução 2 do Engineer

    # Analyst
    Instrução 1 do Analyst
    Instrução 2 do Analyst
  `;
  const fakePath = '/fake/path/mind.md';

  beforeEach(() => {
    jest.clearAllMocks();
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(mockMindContent);
  });

  test('deve parsear o mind.md corretamente', () => {
    const blocks = parseMind(fakePath);
    expect(blocks).toBeDefined();
    expect(Object.keys(blocks)).toHaveLength(5);
    expect(blocks.leader).toHaveLength(2);
    expect(blocks.manager).toHaveLength(2);
    expect(blocks.architect).toHaveLength(2);
    expect(blocks.engineer).toHaveLength(2);
    expect(blocks.analyst).toHaveLength(2);
  });

  test('deve lançar erro se mind.md não existir', () => {
    mockFs.existsSync.mockReturnValue(false);
    expect(() => parseMind(fakePath)).toThrow();
  });

  test('deve validar mind.md com todos os papéis', () => {
    const blocks = parseMind(fakePath);
    expect(validateMind(blocks)).toBe(true);
  });

  test('deve falhar na validação se algum papel estiver faltando', () => {
    const blocks = {
      leader: ['teste'],
      manager: ['teste'],
      architect: ['teste'],
      engineer: ['teste']
      // analyst está faltando
    };
    expect(validateMind(blocks)).toBe(false);
  });

  test('deve gerar relatório do mind.md', () => {
    const blocks = parseMind(fakePath);
    const consoleSpy = jest.spyOn(console, 'log');
    generateMindReport(blocks);
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy.mock.calls[0][0]).toContain('RELATÓRIO DO MIND.MD');
  });

  test('deve ignorar linhas vazias e comentários', () => {
    const contentWithEmptyLines = `
      # Leader
      Instrução 1

      # Manager
      Instrução 2

      # Architect
      Instrução 3

      # Engineer
      Instrução 4

      # Analyst
      Instrução 5
    `;
    mockFs.readFileSync.mockReturnValue(contentWithEmptyLines);
    const blocks = parseMind(fakePath);
    expect(blocks.leader).toHaveLength(1);
    expect(blocks.manager).toHaveLength(1);
    expect(blocks.architect).toHaveLength(1);
    expect(blocks.engineer).toHaveLength(1);
    expect(blocks.analyst).toHaveLength(1);
  });

  test('deve manter a ordem das instruções', () => {
    const blocks = parseMind(fakePath);
    expect(blocks.leader[0]).toBe('Instrução 1 do Leader');
    expect(blocks.leader[1]).toBe('Instrução 2 do Leader');
    expect(blocks.manager[0]).toBe('Instrução 1 do Manager');
    expect(blocks.manager[1]).toBe('Instrução 2 do Manager');
  });
});
