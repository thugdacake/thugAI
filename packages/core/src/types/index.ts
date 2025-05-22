export type ProcessMode = 'blueprint' | 'documentacao' | 'prompt' | 'comando';

export interface ProcessOptions {
  mode: ProcessMode;
  context?: Record<string, any>;
  cache?: boolean;
}

export interface ProcessResult {
  type: ProcessMode;
  content: string;
  metadata: {
    timestamp: string;
    version: string;
    format?: string;
    model?: string;
  };
}

export interface Output {
  success: boolean;
  mode: ProcessMode;
  result?: ProcessResult;
  error?: string;
}

export interface CacheEntry {
  key: string;
  value: ProcessResult;
  timestamp: number;
  ttl: number;
}

export interface Blueprint extends Output {
  type: 'blueprint';
  metadata: {
    timestamp: string;
    version: string;
    name: string;
    description: string;
  };
}

export interface Documentacao extends Output {
  type: 'documentacao';
  metadata: {
    format: 'markdown' | 'html' | 'text' | 'json';
    timestamp: string;
    version: string;
  };
}

export interface Prompt extends Output {
  type: 'prompt';
  metadata: {
    timestamp: string;
    version: string;
    model: 'gpt-4' | 'gpt-3.5-turbo';
    maxTokens: number;
    tokenCount: number;
  };
}

export interface Comando extends Output {
  type: 'comando';
  metadata: {
    timestamp: string;
    version: string;
    shell: 'bash' | 'powershell';
    command: string;
  };
}
