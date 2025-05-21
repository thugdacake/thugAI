#!/usr/bin/env node

const { Operante } = require('@thugdacake/operante');

// Inicializa o Cérebro Operante
const operante = new Operante();

// Exemplo de uso básico
async function main() {
  try {
    // Inicializa um novo projeto
    await operante.init({
      name: 'meu-projeto',
      template: 'basic',
      features: ['fivem', 'typescript']
    });

    // Adiciona um plugin
    await operante.plugin.add('lint');

    // Executa o linter
    await operante.plugin.run('lint');

    // Faz deploy do projeto
    await operante.deploy({
      target: 'development',
      options: {
        clean: true,
        verbose: true
      }
    });

  } catch (error) {
    console.error('Erro:', error.message);
    process.exit(1);
  }
}

main(); 