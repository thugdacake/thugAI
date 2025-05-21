import { Command } from 'commander';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { init } from './core/init';
import { validate } from './core/validate';
import { deploy } from './core/deploy';
import { registerPlugin } from './core/plugins';
import { on, emit } from './core/events';

// Carregar variáveis de ambiente
dotenv.config();

// Criar CLI
const program = new Command();

program
  .name('cerebro-operante')
  .description('Framework de Produção Universal para desenvolvimento de software')
  .version('1.0.0');

// Comando init
program
  .command('init')
  .description('Inicializa o Cérebro Operante no projeto')
  .option('-c, --config <path>', 'Caminho para o arquivo de configuração')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🧠 Inicializando Cérebro Operante...'));
      await init(options);
      console.log(chalk.green('✅ Inicialização concluída!'));
    } catch (error) {
      console.error(chalk.red('❌ Erro na inicialização:'), error);
      process.exit(1);
    }
  });

// Comando validate
program
  .command('validate')
  .description('Valida o código do projeto')
  .option('-p, --path <path>', 'Caminho para validar')
  .option('-r, --report', 'Gerar relatório detalhado')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🔍 Validando código...'));
      const result = await validate(options);
      console.log(chalk.green('✅ Validação concluída!'));
      if (options.report) {
        console.log(JSON.stringify(result, null, 2));
      }
    } catch (error) {
      console.error(chalk.red('❌ Erro na validação:'), error);
      process.exit(1);
    }
  });

// Comando deploy
program
  .command('deploy')
  .description('Realiza deploy do projeto')
  .option('-e, --env <environment>', 'Ambiente de deploy')
  .option('-f, --force', 'Forçar deploy sem confirmação')
  .action(async (options) => {
    try {
      console.log(chalk.blue('🚀 Iniciando deploy...'));
      const result = await deploy(options);
      console.log(chalk.green('✅ Deploy concluído!'));
      console.log(chalk.blue('📊 Métricas:'), result.metrics);
    } catch (error) {
      console.error(chalk.red('❌ Erro no deploy:'), error);
      process.exit(1);
    }
  });

// Comando plugin
program
  .command('plugin')
  .description('Gerencia plugins do Cérebro Operante')
  .option('-a, --add <name>', 'Adicionar plugin')
  .option('-r, --remove <name>', 'Remover plugin')
  .option('-l, --list', 'Listar plugins instalados')
  .action(async (options) => {
    try {
      if (options.add) {
        console.log(chalk.blue(`📦 Instalando plugin: ${options.add}`));
        await registerPlugin(options.add);
        console.log(chalk.green('✅ Plugin instalado!'));
      } else if (options.remove) {
        console.log(chalk.blue(`🗑️ Removendo plugin: ${options.remove}`));
        // Implementar remoção de plugin
        console.log(chalk.green('✅ Plugin removido!'));
      } else if (options.list) {
        console.log(chalk.blue('📋 Plugins instalados:'));
        // Implementar listagem de plugins
      }
    } catch (error) {
      console.error(chalk.red('❌ Erro na operação:'), error);
      process.exit(1);
    }
  });

// Exportar API
export {
  init,
  validate,
  deploy,
  registerPlugin,
  on,
  emit
};

// Executar CLI se chamado diretamente
if (require.main === module) {
  program.parse(process.argv);
} 