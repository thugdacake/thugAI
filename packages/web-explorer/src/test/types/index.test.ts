import { describe, it, expect } from 'vitest';
import type { Message, Operation, Test, Theme } from '../../types';

describe('Types', () => {
  describe('Message', () => {
    it('should have required properties', () => {
      const message: Message = {
        id: '1',
        content: 'Test message',
        type: 'user',
        timestamp: new Date()
      };

      expect(message).toHaveProperty('id');
      expect(message).toHaveProperty('content');
      expect(message).toHaveProperty('type');
      expect(message).toHaveProperty('timestamp');
    });
  });

  describe('Operation', () => {
    it('should have required properties', () => {
      const operation: Operation = {
        id: '1',
        name: 'Test Operation',
        description: 'Test Description',
        mode: 'blueprint'
      };

      expect(operation).toHaveProperty('id');
      expect(operation).toHaveProperty('name');
      expect(operation).toHaveProperty('description');
      expect(operation).toHaveProperty('mode');
    });
  });

  describe('Test', () => {
    it('should have required properties', () => {
      const test: Test = {
        id: '1',
        name: 'Test Test',
        description: 'Test Description',
        type: 'unit',
        status: 'pending'
      };

      expect(test).toHaveProperty('id');
      expect(test).toHaveProperty('name');
      expect(test).toHaveProperty('description');
      expect(test).toHaveProperty('type');
      expect(test).toHaveProperty('status');
    });
  });

  describe('Theme', () => {
    it('should have required properties', () => {
      const theme: Theme = {
        background: '#ffffff',
        text: '#1a1a1a',
        primary: '#3182ce',
        secondary: '#e2e8f0'
      };

      expect(theme).toHaveProperty('background');
      expect(theme).toHaveProperty('text');
      expect(theme).toHaveProperty('primary');
      expect(theme).toHaveProperty('secondary');
    });
  });
});
