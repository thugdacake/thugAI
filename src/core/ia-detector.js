import fs from 'fs-extra';

async function detectarIA() {
  try {
    // Verifica arquivos comuns de IA
    const arquivosIA = [
      'model.json',
      'config.json',
      'weights.bin',
      'tokenizer.json'
    ];

    // Verifica diretórios comuns de IA
    const diretoriosIA = [
      'models',
      'ai',
      'ml',
      'neural'
    ];

    // Verifica no diretório atual
    const arquivos = await fs.readdir('.');
    const temArquivoIA = arquivos.some(arquivo => arquivosIA.includes(arquivo));
    const temDiretorioIA = arquivos.some(arquivo =>
      diretoriosIA.includes(arquivo) && fs.statSync(arquivo).isDirectory()
    );

    return temArquivoIA || temDiretorioIA;
  } catch (erro) {
    console.error('Erro ao detectar IA:', erro);
    return false;
  }
}

export { detectarIA };
