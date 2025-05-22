import { jest } from '@jest/globals';

const mockFs = {
  mkdir: jest.fn(),
  writeFile: jest.fn(),
};

await jest.unstable_mockModule('fs/promises', () => mockFs);

import { SynapseEngine } from '../synapseEngine.js';

describe('SynapseEngine', () => {
  let engine;

  beforeEach(() => {
    engine = new SynapseEngine();
    jest.clearAllMocks();
  });

  describe('processar', () => {
    it('deve processar uma ideia em modo blueprint', async () => {
      const ideia = 'Sistema de automação de tarefas';
      const output = await engine.processar(ideia, 'blueprint');

      expect(output.conteudo).toContain('# Arquitetura do Sistema');
      expect(output.conteudo).toContain(ideia);
      expect(output.arquivos.md).toMatch(/blueprint_.*\.md/);
      expect(output.arquivos.mmd).toMatch(/blueprint_.*\.mmd/);
      expect(output.arquivos.json).toMatch(/blueprint_.*\.json/);
      expect(output.metadata).toHaveProperty('tipo', 'arquitetura');
    });

    it('deve processar uma ideia em modo documentacao', async () => {
      const ideia = 'Documentação do sistema';
      const output = await engine.processar(ideia, 'documentacao');

      expect(output.conteudo).toContain('# Documentação Técnica');
      expect(output.conteudo).toContain(ideia);
      expect(output.arquivos.md).toMatch(/documentacao_.*\.md/);
      expect(output.arquivos.mmd).toBeNull();
      expect(output.arquivos.json).toMatch(/documentacao_.*\.json/);
      expect(output.metadata).toHaveProperty('tipo', 'documentacao');
    });

    it('deve lançar erro para modo inválido', async () => {
      await expect(engine.processar('teste', 'modo_invalido'))
        .rejects
        .toThrow('Modo inválido');
    });

    it('deve lançar erro para ideia vazia', async () => {
      await expect(engine.processar('', 'blueprint'))
        .rejects
        .toThrow('Ideia não pode ser vazia');
    });

    it('deve processar objeto com componentes', async () => {
      const ideia = {
        componentes: {
          'Componente A': 'Descrição do componente A',
          'Componente B': 'Descrição do componente B'
        },
        fluxo: 'Fluxo de execução do sistema'
      };

      const output = await engine.processar(ideia, 'blueprint');
      expect(output.conteudo).toContain('## Componentes');
      expect(output.conteudo).toContain('### Componente A');
      expect(output.conteudo).toContain('### Componente B');
      expect(output.conteudo).toContain('## Fluxo de Execução');
    });

    it('deve processar array de itens', async () => {
      const ideia = ['Item 1', 'Item 2', { nome: 'Item 3' }];
      const output = await engine.processar(ideia, 'documentacao');

      expect(output.conteudo).toContain('- Item 1');
      expect(output.conteudo).toContain('- Item 2');
      expect(output.conteudo).toContain('- {"nome":"Item 3"}');
    });

    it('deve aceitar template personalizado', async () => {
      const ideia = 'Teste';
      const template = {
        header: '# Template Personalizado\n\n',
        footer: '\n\n# Fim Personalizado\n',
        metadata: {
          tipo: 'personalizado',
          formato: 'markdown'
        }
      };

      const output = await engine.processar(ideia, 'blueprint', { template });
      expect(output.conteudo).toContain('# Template Personalizado');
      expect(output.conteudo).toContain('# Fim Personalizado');
      expect(output.metadata).toHaveProperty('tipo', 'personalizado');
    });
  });

  describe('salvarArquivos', () => {
    it('deve salvar arquivos corretamente', async () => {
      const output = {
        conteudo: 'conteúdo teste',
        arquivos: {
          md: 'teste.md',
          mmd: 'teste.mmd',
          json: 'teste.json'
        },
        metadata: {
          tipo: 'teste',
          formato: 'markdown'
        }
      };

      await engine.salvarArquivos(output);

      expect(mockFs.mkdir).toHaveBeenCalledWith(
        expect.stringContaining('.cerebro'),
        { recursive: true }
      );

      expect(mockFs.writeFile).toHaveBeenCalledTimes(3);
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('teste.md'),
        'conteúdo teste'
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('teste.mmd'),
        ''
      );
      expect(mockFs.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('teste.json'),
        JSON.stringify(output.metadata, null, 2)
      );
    });

    it('deve lidar com erros ao salvar arquivos', async () => {
      mockFs.writeFile.mockImplementationOnce(() => Promise.reject(new Error('Erro de escrita')));

      const output = {
        conteudo: 'conteúdo teste',
        arquivos: {
          md: 'teste.md',
          mmd: null,
          json: 'teste.json'
        },
        metadata: {
          tipo: 'teste',
          formato: 'markdown'
        }
      };

      await expect(engine.salvarArquivos(output))
        .rejects
        .toThrow('Erro ao salvar arquivos');
    });
  });

  describe('cache', () => {
    it('deve usar cache para processamento de strings', async () => {
      const ideia = 'Teste de cache';
      const output1 = await engine.processar(ideia, 'blueprint');
      const output2 = await engine.processar(ideia, 'blueprint');

      expect(output1.conteudo).toBe(output2.conteudo);
    });

    it('deve usar cache para processamento de objetos', async () => {
      const ideia = { teste: 'valor' };
      const output1 = await engine.processar(ideia, 'documentacao');
      const output2 = await engine.processar(ideia, 'documentacao');

      expect(output1.conteudo).toBe(output2.conteudo);
    });

    it('deve limpar cache corretamente', async () => {
      const ideia = 'Teste de limpeza de cache';
      await engine.processar(ideia, 'blueprint');

      engine.limparCache();

      const output = await engine.processar(ideia, 'blueprint');
      expect(output.conteudo).toBeDefined();
    });
  });
});
