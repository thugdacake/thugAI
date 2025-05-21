const fs = require('fs');
const path = require('path');
const DocCreator = require('../core/doc-creator');

// Mock do fs
jest.mock('fs');

describe('DocCreator', () => {
  let docCreator;

  beforeEach(() => {
    // Limpa todos os mocks
    jest.clearAllMocks();

    // Configura o mock do fs
    fs.existsSync.mockReturnValue(false);
    fs.mkdirSync.mockImplementation(() => {});
    fs.writeFileSync.mockImplementation(() => {});

    // Cria uma nova instância do DocCreator
    docCreator = new DocCreator();
  });

  test('deve criar um PRD corretamente', async () => {
    const prdData = {
      title: 'Teste PRD',
      overview: 'Visão geral do teste',
      objectives: ['Objetivo 1', 'Objetivo 2'],
      functionalRequirements: ['Req 1', 'Req 2'],
      nonFunctionalRequirements: ['NFR 1', 'NFR 2'],
      successMetrics: ['Métrica 1', 'Métrica 2'],
      timeline: ['Fase 1', 'Fase 2'],
      risks: ['Risco 1', 'Risco 2']
    };

    await docCreator.createDocument('prd', prdData);

    expect(fs.mkdirSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(fs.writeFileSync.mock.calls[0][1]).toContain('Teste PRD');
  });

  test('deve criar documentação de arquitetura corretamente', async () => {
    const archData = {
      title: 'Teste Arquitetura',
      overview: 'Visão geral da arquitetura',
      components: [
        {
          name: 'Componente 1',
          description: 'Descrição 1'
        },
        {
          name: 'Componente 2',
          description: 'Descrição 2'
        }
      ],
      dataFlow: 'Fluxo de dados',
      technicalDecisions: ['Decisão 1', 'Decisão 2'],
      scalabilityConsiderations: 'Considerações de escalabilidade',
      securityConsiderations: 'Considerações de segurança'
    };

    await docCreator.createDocument('architecture', archData);

    expect(fs.mkdirSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(fs.writeFileSync.mock.calls[0][1]).toContain('Teste Arquitetura');
  });

  test('deve criar documentação de código corretamente', async () => {
    const codeData = {
      title: 'Teste Código',
      description: 'Descrição do código',
      language: 'javascript',
      usage: 'console.log("teste")',
      parameters: [
        {
          name: 'param1',
          description: 'Descrição do parâmetro 1'
        }
      ],
      returnValue: 'Valor de retorno',
      examples: [
        {
          title: 'Exemplo 1',
          code: 'console.log("exemplo")'
        }
      ],
      notes: 'Notas adicionais'
    };

    await docCreator.createDocument('code', codeData);

    expect(fs.mkdirSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(fs.writeFileSync.mock.calls[0][1]).toContain('Teste Código');
  });

  test('deve lançar erro para tipo de documento inválido', async () => {
    const data = { title: 'Teste' };
    await expect(docCreator.createDocument('invalid', data)).rejects.toThrow();
  });

  test('deve gerar nome de arquivo corretamente', () => {
    const data = { title: 'Teste Documento' };
    const filename = docCreator.generateFilename('test', data);
    expect(filename).toMatch(/^test-teste-documento-\d{4}-\d{2}-\d{2}\.md$/);
  });

  test('deve criar diretório se não existir', async () => {
    fs.existsSync.mockReturnValue(false);
    await docCreator.createDocument('prd', { title: 'Teste' });
    expect(fs.mkdirSync).toHaveBeenCalledWith(docCreator.outputDir, { recursive: true });
  });

  test('não deve criar diretório se já existir', async () => {
    fs.existsSync.mockReturnValue(true);
    await docCreator.createDocument('prd', { title: 'Teste' });
    expect(fs.mkdirSync).not.toHaveBeenCalled();
  });
}); 