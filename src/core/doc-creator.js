const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class DocCreator {
  constructor(outputDir = './docs') {
    this.outputDir = outputDir;
    this.templates = {
      prd: this.prdTemplate,
      architecture: this.architectureTemplate,
      code: this.codeTemplate
    };
  }

  /**
   * Cria um novo documento baseado no template especificado
   */
  async createDocument(type, data) {
    console.log(chalk.cyan(`\n[📝] Criando documento do tipo: ${type}`));

    if (!this.templates[type]) {
      throw new Error(`Template não encontrado: ${type}`);
    }

    const content = await this.templates[type](data);
    const filename = this.generateFilename(type, data);
    const filepath = path.join(this.outputDir, filename);

    // Garante que o diretório existe
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    // Salva o arquivo
    fs.writeFileSync(filepath, content);
    console.log(chalk.green(`[✅] Documento criado: ${filepath}`));

    return filepath;
  }

  /**
   * Template para PRD (Product Requirements Document)
   */
  async prdTemplate(data) {
    return `# ${data.title}

## Visão Geral
${data.overview}

## Objetivos
${data.objectives.map(obj => `- ${obj}`).join('\n')}

## Requisitos Funcionais
${data.functionalRequirements.map(req => `- ${req}`).join('\n')}

## Requisitos Não-Funcionais
${data.nonFunctionalRequirements.map(req => `- ${req}`).join('\n')}

## Métricas de Sucesso
${data.successMetrics.map(metric => `- ${metric}`).join('\n')}

## Cronograma
${data.timeline.map(phase => `- ${phase}`).join('\n')}

## Riscos
${data.risks.map(risk => `- ${risk}`).join('\n')}
`;
  }

  /**
   * Template para Documentação de Arquitetura
   */
  async architectureTemplate(data) {
    return `# Arquitetura: ${data.title}

## Visão Geral
${data.overview}

## Componentes
${data.components.map(comp => `### ${comp.name}
${comp.description}
`).join('\n')}

## Fluxo de Dados
${data.dataFlow}

## Decisões Técnicas
${data.technicalDecisions.map(decision => `- ${decision}`).join('\n')}

## Considerações de Escalabilidade
${data.scalabilityConsiderations}

## Segurança
${data.securityConsiderations}
`;
  }

  /**
   * Template para Documentação de Código
   */
  async codeTemplate(data) {
    return `# ${data.title}

## Descrição
${data.description}

## Uso
\`\`\`${data.language}
${data.usage}
\`\`\`

## Parâmetros
${data.parameters.map(param => `- \`${param.name}\`: ${param.description}`).join('\n')}

## Retorno
${data.returnValue}

## Exemplos
${data.examples.map(example => `### ${example.title}
\`\`\`${data.language}
${example.code}
\`\`\`
`).join('\n')}

## Notas
${data.notes}
`;
  }

  /**
   * Gera um nome de arquivo baseado no tipo e dados
   */
  generateFilename(type, data) {
    const timestamp = new Date().toISOString().split('T')[0];
    const sanitizedTitle = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `${type}-${sanitizedTitle}-${timestamp}.md`;
  }
}

module.exports = DocCreator; 