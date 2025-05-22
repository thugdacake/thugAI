import { describe, it, expect } from 'vitest';
import { server } from './server';
import type { RestHandler } from 'msw';

describe('MSW Server', () => {
  it('should be defined', () => {
    expect(server).toBeDefined();
  });

  it('should have handlers', () => {
    expect(server.listHandlers()).toHaveLength(5);
  });

  it('should have GET /api/operations handler', () => {
    const handlers = server.listHandlers();
    const getOperationsHandler = handlers.find(
      (handler: RestHandler) => handler.info.method === 'GET' && handler.info.path === '/api/operations'
    );
    expect(getOperationsHandler).toBeDefined();
  });

  it('should have POST /api/operations handler', () => {
    const handlers = server.listHandlers();
    const postOperationsHandler = handlers.find(
      (handler: RestHandler) => handler.info.method === 'POST' && handler.info.path === '/api/operations'
    );
    expect(postOperationsHandler).toBeDefined();
  });

  it('should have GET /api/operations/:id handler', () => {
    const handlers = server.listHandlers();
    const getOperationHandler = handlers.find(
      (handler: RestHandler) => handler.info.method === 'GET' && handler.info.path === '/api/operations/:id'
    );
    expect(getOperationHandler).toBeDefined();
  });

  it('should have PUT /api/operations/:id handler', () => {
    const handlers = server.listHandlers();
    const putOperationHandler = handlers.find(
      (handler: RestHandler) => handler.info.method === 'PUT' && handler.info.path === '/api/operations/:id'
    );
    expect(putOperationHandler).toBeDefined();
  });

  it('should have DELETE /api/operations/:id handler', () => {
    const handlers = server.listHandlers();
    const deleteOperationHandler = handlers.find(
      (handler: RestHandler) => handler.info.method === 'DELETE' && handler.info.path === '/api/operations/:id'
    );
    expect(deleteOperationHandler).toBeDefined();
  });
});
