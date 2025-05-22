import { ProcessMode, Output } from '@thugdacake/operante';

export interface Theme {
  background: string;
  text: string;
  primary: string;
  secondary: string;
}

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'system';
  timestamp: string;
}

export interface Operation {
  id: string;
  name: string;
  description: string;
  mode: 'blueprint' | 'documentation' | 'prompt' | 'command';
}

export interface CerebroChatProps {
  onMessage?: (message: Message) => void;
  onOperation?: (operation: Operation) => void;
  theme?: 'light' | 'dark';
  history?: Message[];
}

export interface OperanteExplorerProps {
  onOperation?: (operation: Operation) => void;
  theme?: 'light' | 'dark';
}

export interface LibraryExplorerProps {
  onSelect?: (path: string) => void;
  theme?: 'light' | 'dark';
}

export interface TestPanelProps {
  onRun?: (test: string) => void;
  theme?: 'light' | 'dark';
}

export interface CerebroApi {
  iniciar: () => void;
  processarComando: (comando: string) => Promise<any>;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  type: 'blueprint' | 'documentacao' | 'prompt' | 'comando';
  tags: string[];
}

export interface Example {
  id: string;
  name: string;
  description: string;
  template: Template;
  code: string;
}

export interface Test {
  id: string;
  name: string;
  description: string;
  type: 'unit' | 'integration' | 'e2e';
  status: 'pending' | 'running' | 'passed' | 'failed';
  result?: any;
}

export interface TestResult {
  id: string;
  testId: string;
  status: 'passed' | 'failed';
  timestamp: number;
  error?: string;
  output?: any;
}
