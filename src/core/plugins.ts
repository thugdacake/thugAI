import { Plugin } from '../types';

const plugins: Plugin[] = [];

export async function registerPlugin(plugin: Plugin): Promise<void> {
  // Validar plugin
  if (!plugin.name || !plugin.version) {
    throw new Error('Plugin inválido: nome e versão são obrigatórios');
  }

  // Verificar duplicatas
  if (plugins.some(p => p.name === plugin.name)) {
    throw new Error(`Plugin ${plugin.name} já registrado`);
  }

  // Registrar plugin
  plugins.push(plugin);
}

export async function getPlugins(): Promise<Plugin[]> {
  return plugins;
}

export async function removePlugin(name: string): Promise<void> {
  const index = plugins.findIndex(p => p.name === name);
  if (index === -1) {
    throw new Error(`Plugin ${name} não encontrado`);
  }
  plugins.splice(index, 1);
}

export async function getPlugin(name: string): Promise<Plugin | undefined> {
  return plugins.find(p => p.name === name);
} 