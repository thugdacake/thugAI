export interface Config {
  plugins?: string[];
  env?: 'development' | 'production' | 'testing';
  options?: {
    [key: string]: any;
  };
}

export interface ValidationResult {
  success: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  metrics: {
    files: number;
    lines: number;
    issues: number;
  };
}

export interface ValidationError {
  file: string;
  line: number;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationWarning extends ValidationError {
  severity: 'warning';
}

export interface DeployResult {
  success: boolean;
  environment: string;
  timestamp: string;
  metrics: {
    duration: number;
    size: number;
    files: number;
  };
}

export interface Plugin {
  name: string;
  version: string;
  validate?: (code: string) => Promise<ValidationResult>;
  deploy?: (env: string) => Promise<DeployResult>;
  init?: (config: Config) => Promise<void>;
}

export type EventListener = (data: any) => void; 