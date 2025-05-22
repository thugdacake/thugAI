import { describe, it, expect, vi } from 'vitest';
import { server } from './mocks/server';

describe('Test Setup', () => {
  it('should have MSW server configured', () => {
    expect(server).toBeDefined();
  });

  it('should have ResizeObserver mock', () => {
    expect(window.ResizeObserver).toBeDefined();
    expect(window.ResizeObserver).toBeInstanceOf(Function);
  });

  it('should have IntersectionObserver mock', () => {
    expect(window.IntersectionObserver).toBeDefined();
    expect(window.IntersectionObserver).toBeInstanceOf(Function);
  });

  it('should have matchMedia mock', () => {
    expect(window.matchMedia).toBeDefined();
    expect(window.matchMedia).toBeInstanceOf(Function);
  });

  it('should have jest-dom matchers', () => {
    const element = document.createElement('div');
    expect(element).toBeInTheDocument();
  });

  it('should have MSW handlers configured', () => {
    expect(server.listHandlers()).toHaveLength(5);
  });

  it('should have MSW server lifecycle methods', () => {
    expect(server.listen).toBeDefined();
    expect(server.resetHandlers).toBeDefined();
    expect(server.close).toBeDefined();
  });
});
