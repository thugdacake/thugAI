import chalk from 'chalk';

function interpretarComando(comando, iaDetectada) {
  const comandos = {
    'injetar': () => {
      return chalk.green('Cérebro Operante injetado com sucesso!');
    },
    'explorar': () => {
      return chalk.yellow(`Explorando ambiente... IA detectada: ${iaDetectada ? 'Sim' : 'Não'}`);
    },
    'dominar': () => {
      return chalk.red('Controle assumido. Ambiente dominado.');
    },
    'debug': () => {
      return chalk.blue(`
Diagnóstico do Cérebro Operante:
- Versão: 1.0.2
- Autor: Thug Developer
- Status: Operacional
- Modo: Debug
            `);
    }
  };

  const comandoNormalizado = comando.toLowerCase().trim();
  const acao = comandos[comandoNormalizado];

  if (acao) {
    return acao();
  }

  return chalk.yellow(`Comando não reconhecido: ${comando}`);
}

export {
  interpretarComando,
  // ... outros exports necessários
};
