import { describe, it, expect } from 'vitest';
import { handlers } from './handlers';

describe('MSW Handlers', () => {
  it('should have all required handlers', () => {
    expect(handlers).toHaveLength(5);
  });

  it('should have GET /api/operations handler', () => {
    const getOperationsHandler = handlers.find(
      handler => handler.info.method === 'GET' && handler.info.path === '/api/operations'
    );
    expect(getOperationsHandler).toBeDefined();
  });

  it('should have POST /api/operations handler', () => {
    const postOperationsHandler = handlers.find(
      handler => handler.info.method === 'POST' && handler.info.path === '/api/operations'
    );
    expect(postOperationsHandler).toBeDefined();
  });

  it('should have GET /api/operations/:id handler', () => {
    const getOperationHandler = handlers.find(
      handler => handler.info.method === 'GET' && handler.info.path === '/api/operations/:id'
    );
    expect(getOperationHandler).toBeDefined();
  });

  it('should have PUT /api/operations/:id handler', () => {
    const putOperationHandler = handlers.find(
      handler => handler.info.method === 'PUT' && handler.info.path === '/api/operations/:id'
    );
    expect(putOperationHandler).toBeDefined();
  });

  it('should have DELETE /api/operations/:id handler', () => {
    const deleteOperationHandler = handlers.find(
      handler => handler.info.method === 'DELETE' && handler.info.path === '/api/operations/:id'
    );
    expect(deleteOperationHandler).toBeDefined();
  });
});
