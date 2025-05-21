import { ValidationResult, ValidationError, ValidationWarning } from '../types';
import { getPlugins } from './plugins';

export async function validate(options: {
  path?: string;
  report?: boolean;
}): Promise<ValidationResult> {
  const plugins = await getPlugins();
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  let files = 0;
  let lines = 0;

  // Validar com cada plugin
  for (const plugin of plugins) {
    if (plugin.validate) {
      const result = await plugin.validate(options.path || '.');
      errors.push(...result.errors);
      warnings.push(...result.warnings);
      files += result.metrics.files;
      lines += result.metrics.lines;
    }
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
} 