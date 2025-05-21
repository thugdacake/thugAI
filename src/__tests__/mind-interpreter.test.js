const fs = require('fs');
const path = require('path');
const { parseMind, validateMind, generateMindReport } = require('../core/mind-interpreter');

// Mock do fs
jest.mock('fs');

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

  beforeEach(() => {
    // Limpa todos os mocks
    jest.clearAllMocks();

    // Configura o mock do fs
    fs.existsSync.mockReturnValue(true);
    fs.readFileSync.mockReturnValue(mockMindContent);
  });

  test('deve parsear o mind.md corretamente', () => {
    const blocks = parseMind();
    
    expect(blocks).toBeDefined();
    expect(Object.keys(blocks)).toHaveLength(5);
    expect(blocks.leader).toHaveLength(2);
    expect(blocks.manager).toHaveLength(2);
    expect(blocks.architect).toHaveLength(2);
    expect(blocks.engineer).toHaveLength(2);
    expect(blocks.analyst).toHaveLength(2);
  });

  test('deve lançar erro se mind.md não existir', () => {
    fs.existsSync.mockReturnValue(false);
    expect(() => parseMind()).toThrow();
  });

  test('deve validar mind.md com todos os papéis', () => {
    const blocks = parseMind();
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
    const blocks = parseMind();
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
    
    fs.readFileSync.mockReturnValue(contentWithEmptyLines);
    const blocks = parseMind();
    
    expect(blocks.leader).toHaveLength(1);
    expect(blocks.manager).toHaveLength(1);
    expect(blocks.architect).toHaveLength(1);
    expect(blocks.engineer).toHaveLength(1);
    expect(blocks.analyst).toHaveLength(1);
  });

  test('deve manter a ordem das instruções', () => {
    const blocks = parseMind();
    
    expect(blocks.leader[0]).toBe('Instrução 1 do Leader');
    expect(blocks.leader[1]).toBe('Instrução 2 do Leader');
    expect(blocks.manager[0]).toBe('Instrução 1 do Manager');
    expect(blocks.manager[1]).toBe('Instrução 2 do Manager');
  });
}); 