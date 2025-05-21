const AgentEngine = require('./core/agent-engine');
const { parseMind, validateMind, generateMindReport } = require('./core/mind-interpreter');
const DocCreator = require('./core/doc-creator');

async function testCerebro() {
  console.log('🧠 Iniciando teste do Cérebro Operante...\n');

  try {
    // 1. Inicializa o motor de agentes
    const engine = new AgentEngine();
    await engine.initialize();

    // 2. Executa todos os agentes
    await engine.executeAll();

    // 3. Cria um exemplo de documentação
    const docCreator = new DocCreator();
    
    // Exemplo de PRD
    await docCreator.createDocument('prd', {
      title: 'Cérebro Operante v1.0',
      overview: 'Sistema de automação e instrução de IA baseado em mind.md',
      objectives: [
        'Unificar humanos e IA em um sistema coeso',
        'Automatizar processos de desenvolvimento',
        'Manter controle humano sobre decisões críticas'
      ],
      functionalRequirements: [
        'Interpretação de mind.md',
        'Execução de instruções por agentes',
        'Geração de documentação automática'
      ],
      nonFunctionalRequirements: [
        'Alta disponibilidade',
        'Segurança robusta',
        'Escalabilidade horizontal'
      ],
      successMetrics: [
        'Tempo de desenvolvimento reduzido em 50%',
        'Qualidade de código aumentada em 30%',
        'Satisfação do usuário acima de 90%'
      ],
      timeline: [
        'Sprint 1: Core Engine',
        'Sprint 2: Agentes',
        'Sprint 3: Documentação'
      ],
      risks: [
        'Resistência à mudança',
        'Complexidade técnica',
        'Dependência de IA'
      ]
    });

    // Exemplo de documentação de arquitetura
    await docCreator.createDocument('architecture', {
      title: 'Arquitetura do Cérebro Operante',
      overview: 'Sistema modular baseado em agentes',
      components: [
        {
          name: 'Agent Engine',
          description: 'Motor principal que coordena os agentes'
        },
        {
          name: 'Mind Interpreter',
          description: 'Interpreta o mind.md e extrai instruções'
        },
        {
          name: 'Doc Creator',
          description: 'Gera documentação automática'
        }
      ],
      dataFlow: 'Fluxo de dados unidirecional: mind.md -> Interpreter -> Engine -> Agents',
      technicalDecisions: [
        'Uso de Node.js para facilidade de integração',
        'Arquitetura baseada em eventos',
        'Sistema de plugins para extensibilidade'
      ],
      scalabilityConsiderations: 'Horizontal scaling via containers',
      securityConsiderations: 'Autenticação e autorização em todas as camadas'
    });

    console.log('\n✅ Teste do Cérebro Operante concluído com sucesso!');
  } catch (error) {
    console.error('\n❌ Erro durante o teste:', error);
    process.exit(1);
  }
}

// Executa o teste
testCerebro(); 