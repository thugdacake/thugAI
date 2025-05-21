import { Plugin, ValidationResult } from '../types';
import { ESLint } from 'eslint';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const plugin: Plugin = {
  name: 'lint',
  version: '1.0.0',
  async validate(path: string): Promise<ValidationResult> {
    const errors = [];
    const warnings = [];
    let files = 0;
    let lines = 0;

    try {
      // Lint JavaScript/TypeScript
      const eslint = new ESLint();
      const results = await eslint.lintFiles([path]);
      
      for (const result of results) {
        files++;
        lines += result.source.split('\n').length;

        for (const message of result.messages) {
          const issue = {
            file: result.filePath,
            line: message.line,
            message: message.message,
            severity: message.severity === 2 ? 'error' : 'warning'
          };

          if (issue.severity === 'error') {
            errors.push(issue);
          } else {
            warnings.push(issue);
          }
        }
      }

      // Lint Lua (se houver)
      try {
        const { stdout } = await execAsync(`luacheck ${path}`);
        const luacheckResults = stdout.split('\n');

        for (const line of luacheckResults) {
          if (line.includes(':')) {
            const [file, lineNum, message] = line.split(':');
            files++;
            lines++;

            const issue = {
              file,
              line: parseInt(lineNum),
              message: message.trim(),
              severity: message.includes('error') ? 'error' : 'warning'
            };

            if (issue.severity === 'error') {
              errors.push(issue);
            } else {
              warnings.push(issue);
            }
          }
        }
      } catch (error) {
        // Ignora erro se luacheck não estiver instalado
      }

      return {
        success: errors.length === 0,
        errors,
        warnings,
        metrics: {
          files,
          lines,
          issues: errors.length + warnings.length
        }
      };
    } catch (error) {
      throw new Error(`Erro ao executar lint: ${error.message}`);
    }
  }
};

export default plugin; 