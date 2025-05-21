import { DeployResult } from '../types';
import { getPlugins } from './plugins';
import { emit } from './events';

export async function deploy(options: {
  env: string;
  force?: boolean;
}): Promise<DeployResult> {
  const startTime = Date.now();
  const plugins = await getPlugins();
  let files = 0;
  let size = 0;

  // Emitir evento de início
  emit('deploy.start', { environment: options.env });

  try {
    // Executar deploy em cada plugin
    for (const plugin of plugins) {
      if (plugin.deploy) {
        const result = await plugin.deploy(options.env);
        files += result.metrics.files;
        size += result.metrics.size;
      }
    }

    const duration = Date.now() - startTime;

    // Emitir evento de sucesso
    emit('deploy.success', {
      environment: options.env,
      duration,
      files,
      size
    });

    return {
      success: true,
      environment: options.env,
      timestamp: new Date().toISOString(),
      metrics: {
        duration,
        size,
        files
      }
    };
  } catch (error) {
    // Emitir evento de erro
    emit('deploy.error', {
      environment: options.env,
      error
    });

    throw error;
  }
} 