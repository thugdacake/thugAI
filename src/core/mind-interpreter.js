import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Interpreta o conteúdo do arquivo mind.md como um conjunto de comandos operacionais.
 * Analisa as diretivas de instrução para os cinco papéis principais do Cérebro Operante.
 */
function parseMind(filePath = path.join(__dirname, 'mind.md')) {
  if (!fs.existsSync(filePath)) {
    console.error(chalk.red(`[x] Arquivo mind.md não encontrado em ${filePath}`));
    process.exit(1);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');
  const blocks = {
    leader: [],
    manager: [],
    architect: [],
    engineer: [],
    analyst: [],
  };

  let currentRole = null;

  for (let line of lines) {
    line = line.trim();

    // Identifica o papel atual
    if (line.toLowerCase().startsWith('# leader')) {
      currentRole = 'leader';
      continue;
    } else if (line.toLowerCase().startsWith('# manager')) {
      currentRole = 'manager';
      continue;
    } else if (line.toLowerCase().startsWith('# architect')) {
      currentRole = 'architect';
      continue;
    } else if (line.toLowerCase().startsWith('# engineer')) {
      currentRole = 'engineer';
      continue;
    } else if (line.toLowerCase().startsWith('# analyst')) {
      currentRole = 'analyst';
      continue;
    }

    // Adiciona a instrução ao bloco do papel atual
    if (currentRole && line && !line.startsWith('#')) {
      blocks[currentRole].push(line);
    }
  }

  return blocks;
}

/**
 * Executa o Cérebro Operante com base nos blocos de instruções.
 */
function executeCerebro(blocks) {
  console.log(chalk.blueBright.bold('\n>>> EXECUTANDO CÉREBRO OPERANTE <<<'));

  for (const [role, instructions] of Object.entries(blocks)) {
    console.log(chalk.green(`\n[${role.toUpperCase()}]`));
    for (const instruction of instructions) {
      if (instruction) {
        console.log(`- ${instruction}`);
      }
    }
  }

  console.log(chalk.yellow('\n>>> EXECUÇÃO COMPLETA <<<'));
}

/**
 * Valida a estrutura do mind.md
 */
function validateMind(blocks) {
  const requiredRoles = ['leader', 'manager', 'architect', 'engineer', 'analyst'];
  const missingRoles = requiredRoles.filter(role => !blocks[role] || blocks[role].length === 0);

  if (missingRoles.length > 0) {
    console.error(chalk.red(`[x] Papéis ausentes no mind.md: ${missingRoles.join(', ')}`));
    return false;
  }

  return true;
}

/**
 * Gera um relatório da estrutura do mind.md
 */
function generateMindReport(blocks) {
  console.log(chalk.cyan('\n=== RELATÓRIO DO MIND.MD ===\n'));

  for (const [role, instructions] of Object.entries(blocks)) {
    console.log(chalk.yellow(`\n[${role.toUpperCase()}]`));
    console.log(`Total de instruções: ${instructions.length}`);
    console.log('Primeiras instruções:');
    instructions.slice(0, 3).forEach(instruction => {
      console.log(`- ${instruction}`);
    });
  }

  console.log(chalk.cyan('\n=== FIM DO RELATÓRIO ===\n'));
}

export {
  parseMind,
  executeCerebro,
  validateMind,
  generateMindReport
};

// Se for executado diretamente via Node
if (import.meta.url === `file://${process.argv[1]}`) {
  const mind = parseMind();
  if (validateMind(mind)) {
    generateMindReport(mind);
  }
}
