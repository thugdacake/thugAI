import { jest } from '@jest/globals';

const mockFs = {
  existsSync: jest.fn(() => true),
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  mkdirSync: jest.fn(),
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

import { AgentEngine } from '../core/agent-engine.js';
import { parseMind } from '../core/mind-interpreter.js';
import chalk from 'chalk';

describe('AgentEngine', () => {
  let engine;
  const mockMindContent = `
    # Leader
    Instrução 1
    Instrução 2

    # Manager
    Instrução 3
    Instrução 4

    # Architect
    Instrução 5
    Instrução 6

    # Engineer
    Instrução 7
    Instrução 8

    # Analyst
    Instrução 9
    Instrução 10
  `;

  beforeEach(() => {
    // Limpa todos os mocks
    jest.clearAllMocks();

    // Configura o mock do fs
    mockFs.existsSync.mockReturnValue(true);
    mockFs.readFileSync.mockReturnValue(mockMindContent);

    // Cria uma nova instância do engine
    engine = new AgentEngine();
  });

  test('deve inicializar corretamente', async () => {
    await engine.initialize();
    expect(engine.agents).toBeDefined();
    expect(Object.keys(engine.agents)).toHaveLength(5);
  });

  test('deve lançar erro se mind.md não existir', async () => {
    mockFs.existsSync.mockReturnValue(false);
    await expect(engine.initialize()).rejects.toThrow();
  });

  test('deve processar instruções de cada agente', async () => {
    await engine.initialize();
    await engine.executeAll();

    // Verifica se cada agente foi inicializado
    expect(engine.agents.leader).toBeDefined();
    expect(engine.agents.manager).toBeDefined();
    expect(engine.agents.architect).toBeDefined();
    expect(engine.agents.engineer).toBeDefined();
    expect(engine.agents.analyst).toBeDefined();
  });

  test('deve processar instruções do Leader', async () => {
    await engine.initialize();
    const instruction = 'Teste Leader';
    await engine.processLeaderInstruction(instruction);
    // Adicione aqui as asserções específicas para o Leader
  });

  test('deve processar instruções do Manager', async () => {
    await engine.initialize();
    const instruction = 'Teste Manager';
    await engine.processManagerInstruction(instruction);
    // Adicione aqui as asserções específicas para o Manager
  });

  test('deve processar instruções do Architect', async () => {
    await engine.initialize();
    const instruction = 'Teste Architect';
    await engine.processArchitectInstruction(instruction);
    // Adicione aqui as asserções específicas para o Architect
  });

  test('deve processar instruções do Engineer', async () => {
    await engine.initialize();
    const instruction = 'Teste Engineer';
    await engine.processEngineerInstruction(instruction);
    // Adicione aqui as asserções específicas para o Engineer
  });

  test('deve processar instruções do Analyst', async () => {
    await engine.initialize();
    const instruction = 'Teste Analyst';
    await engine.processAnalystInstruction(instruction);
    // Adicione aqui as asserções específicas para o Analyst
  });
});
