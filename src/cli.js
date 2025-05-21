#!/usr/bin/env node

const { program } = require('commander');
const { CerebroOperante } = require('./core/cerebro');
const chalk = require('chalk');

program
    .version('1.0.2')
    .description('Cérebro Operante - Framework de Influência Comportamental para IAs');

program
    .command('injetar')
    .description('Inicializa o Cérebro no ambiente')
    .action(async () => {
        const cerebro = new CerebroOperante();
        await cerebro.iniciar();
    });

program
    .command('explorar')
    .description('Analisa o ambiente e detecta IAs')
    .action(async () => {
        const cerebro = new CerebroOperante();
        const iaDetectada = await cerebro.iniciar();
        console.log(chalk.yellow(`IA detectada: ${iaDetectada ? 'Sim' : 'Não'}`));
    });

program
    .command('dominar')
    .description('Assume o controle do ambiente')
    .action(async () => {
        const cerebro = new CerebroOperante();
        await cerebro.iniciar();
        console.log(chalk.red('Controle assumido. Ambiente dominado.'));
    });

program
    .command('debug')
    .description('Mostra diagnóstico do Cérebro')
    .action(() => {
        console.log(chalk.blue(`
Diagnóstico do Cérebro Operante:
- Versão: 1.0.2
- Autor: Thug Developer
- Status: Operacional
- Modo: Debug
        `));
    });

program.parse(process.argv);
