// Configurações globais para testes
import { jest } from '@jest/globals';

// Aumenta o timeout para testes que podem demorar mais
jest.setTimeout(30000);

// Configurações de ambiente
process.env.NODE_ENV = 'test';

// Limpa todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks();
});

// Configurações de console para testes
const originalConsole = { ...console };
beforeAll(() => {
  // Suprime logs durante os testes
  console.log = jest.fn();
  console.error = jest.fn();
  console.warn = jest.fn();
});

afterAll(() => {
  // Restaura console original
  console.log = originalConsole.log;
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
});
