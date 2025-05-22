import { DocumentacaoProcessor } from '../../processors/DocumentacaoProcessor';

describe('DocumentacaoProcessor', () => {
  let processor: DocumentacaoProcessor;

  beforeEach(() => {
    processor = new DocumentacaoProcessor();
  });

  describe('process', () => {
    it('deve processar conteúdo Markdown válido', async () => {
      const input = '# Título\n\nParágrafo com **negrito** e *itálico*';
      const result = await processor.process(input);

      expect(result.type).toBe('documentacao');
      expect(result.content).toBe(input);
      expect(result.metadata.format).toBe('markdown');
      expect(result.metadata.timestamp).toBeDefined();
      expect(result.metadata.version).toBe('1.0');
    });

    it('deve processar conteúdo HTML válido', async () => {
      processor.setFormat('html');
      const input = '<h1>Título</h1><p>Parágrafo com <strong>negrito</strong> e <em>itálico</em></p>';
      const result = await processor.process(input);

      expect(result.type).toBe('documentacao');
      expect(result.content).toBe(input);
      expect(result.metadata.format).toBe('html');
      expect(result.metadata.timestamp).toBeDefined();
      expect(result.metadata.version).toBe('1.0');
    });

    it('deve processar conteúdo texto válido', async () => {
      processor.setFormat('text');
      const input = 'Texto simples sem formatação';
      const result = await processor.process(input);

      expect(result.type).toBe('documentacao');
      expect(result.content).toBe(input);
      expect(result.metadata.format).toBe('text');
      expect(result.metadata.timestamp).toBeDefined();
      expect(result.metadata.version).toBe('1.0');
    });

    it('deve processar conteúdo JSON válido', async () => {
      processor.setFormat('json');
      const input = JSON.stringify({ title: 'Título', content: 'Conteúdo' });
      const result = await processor.process(input);

      expect(result.type).toBe('documentacao');
      expect(result.content).toBe(input);
      expect(result.metadata.format).toBe('json');
      expect(result.metadata.timestamp).toBeDefined();
      expect(result.metadata.version).toBe('1.0');
    });

    it('deve converter HTML para Markdown', async () => {
      const input = '<h1>Título</h1><p>Parágrafo com <strong>negrito</strong></p>';
      const result = await processor.process(input);

      expect(result.type).toBe('documentacao');
      expect(result.content).toBe('# Título\n\nParágrafo com **negrito**');
      expect(result.metadata.format).toBe('markdown');
    });

    it('deve converter Markdown para HTML', async () => {
      processor.setFormat('html');
      const input = '# Título\n\nParágrafo com **negrito**';
      const result = await processor.process(input);

      expect(result.type).toBe('documentacao');
      expect(result.content).toBe('<h1>Título</h1><p>Parágrafo com <strong>negrito</strong></p>');
      expect(result.metadata.format).toBe('html');
    });

    it('deve converter texto para Markdown', async () => {
      const input = 'Título\n\nParágrafo';
      const result = await processor.process(input);

      expect(result.type).toBe('documentacao');
      expect(result.content).toBe('Título\n\nParágrafo');
      expect(result.metadata.format).toBe('markdown');
    });

    it('deve converter JSON para Markdown', async () => {
      const input = JSON.stringify({ title: 'Título', content: 'Conteúdo' });
      const result = await processor.process(input);

      expect(result.type).toBe('documentacao');
      expect(result.content).toBe('## title\n\nTítulo\n\n## content\n\nConteúdo');
      expect(result.metadata.format).toBe('markdown');
    });

    it('deve lançar erro para conteúdo vazio', async () => {
      await expect(processor.process('')).rejects.toThrow('Conteúdo não pode estar vazio');
    });

    it('deve lançar erro para formato Markdown inválido', async () => {
      await expect(processor.process('Texto sem formatação')).rejects.toThrow('Conteúdo não está em formato Markdown válido');
    });

    it('deve lançar erro para formato HTML inválido', async () => {
      processor.setFormat('html');
      await expect(processor.process('Texto sem tags')).rejects.toThrow('Conteúdo não está em formato HTML válido');
    });

    it('deve lançar erro para formato JSON inválido', async () => {
      processor.setFormat('json');
      await expect(processor.process('Texto não é JSON')).rejects.toThrow('Conteúdo não está em formato JSON válido');
    });
  });

  describe('format', () => {
    it('deve permitir mudar o formato para HTML', () => {
      processor.setFormat('html');
      expect(processor.getFormat()).toBe('html');
    });

    it('deve permitir mudar o formato para texto', () => {
      processor.setFormat('text');
      expect(processor.getFormat()).toBe('text');
    });

    it('deve permitir mudar o formato para JSON', () => {
      processor.setFormat('json');
      expect(processor.getFormat()).toBe('json');
    });

    it('deve manter o formato padrão como Markdown', () => {
      expect(processor.getFormat()).toBe('markdown');
    });

    it('deve lançar erro para formato inválido', () => {
      expect(() => processor.setFormat('pdf' as any)).toThrow('Formato não suportado');
    });
  });

  describe('conversão de formatos', () => {
    it('deve converter elementos HTML básicos para Markdown', async () => {
      const input = `
        <h1>Título Principal</h1>
        <h2>Subtítulo</h2>
        <p>Parágrafo com <strong>texto em negrito</strong> e <em>texto em itálico</em>.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
        <blockquote>Citação importante</blockquote>
        <img src="imagem.jpg" alt="Descrição da imagem">
      `;
      const result = await processor.process(input);
      expect(result.content).toContain('# Título Principal');
      expect(result.content).toContain('## Subtítulo');
      expect(result.content).toContain('**texto em negrito**');
      expect(result.content).toContain('*texto em itálico*');
      expect(result.content).toContain('- Item 1');
      expect(result.content).toContain('- Item 2');
      expect(result.content).toContain('> Citação importante');
      expect(result.content).toContain('![Descrição da imagem](imagem.jpg)');
    });

    it('deve converter elementos Markdown básicos para HTML', async () => {
      processor.setFormat('html');
      const input = `
        # Título Principal
        ## Subtítulo
        Parágrafo com **texto em negrito** e *texto em itálico*.
        - Item 1
        - Item 2
        > Citação importante
        ![Descrição da imagem](imagem.jpg)
      `;
      const result = await processor.process(input);
      expect(result.content).toContain('<h1>Título Principal</h1>');
      expect(result.content).toContain('<h2>Subtítulo</h2>');
      expect(result.content).toContain('<strong>texto em negrito</strong>');
      expect(result.content).toContain('<em>texto em itálico</em>');
      expect(result.content).toContain('<li>Item 1</li>');
      expect(result.content).toContain('<li>Item 2</li>');
      expect(result.content).toContain('<blockquote>Citação importante</blockquote>');
      expect(result.content).toContain('<img src="imagem.jpg" alt="Descrição da imagem">');
    });
  });

  describe('casos de borda', () => {
    it('deve lidar com HTML aninhado', async () => {
      const input = '<div><p><strong>Texto <em>aninhado</em></strong></p></div>';
      const result = await processor.process(input);
      expect(result.content).toContain('**Texto *aninhado***');
    });

    it('deve lidar com Markdown aninhado', async () => {
      processor.setFormat('html');
      const input = '**Texto *aninhado***';
      const result = await processor.process(input);
      expect(result.content).toContain('<strong>Texto <em>aninhado</em></strong>');
    });

    it('deve lidar com HTML malformado', async () => {
      const input = '<h1>Título</h1><p>Parágrafo sem fechar';
      const result = await processor.process(input);
      expect(result.content).toContain('# Título');
      expect(result.content).toContain('Parágrafo sem fechar');
    });

    it('deve lidar com Markdown malformado', async () => {
      processor.setFormat('html');
      const input = '# Título\n**Texto sem fechar';
      const result = await processor.process(input);
      expect(result.content).toContain('<h1>Título</h1>');
      expect(result.content).toContain('<strong>Texto sem fechar</strong>');
    });

    it('deve lidar com caracteres especiais em HTML', async () => {
      const input = '<p>&lt;script&gt;alert("teste")&lt;/script&gt;</p>';
      const result = await processor.process(input);
      expect(result.content).toContain('<script>alert("teste")</script>');
    });

    it('deve lidar com caracteres especiais em Markdown', async () => {
      processor.setFormat('html');
      const input = '`<script>alert("teste")</script>`';
      const result = await processor.process(input);
      expect(result.content).toContain('<code>&lt;script&gt;alert("teste")&lt;/script&gt;</code>');
    });

    it('deve lidar com URLs complexas', async () => {
      const input = '<a href="https://exemplo.com/path?param=value&other=123#section">Link</a>';
      const result = await processor.process(input);
      expect(result.content).toContain('[Link](https://exemplo.com/path?param=value&other=123#section)');
    });

    it('deve lidar com imagens sem alt text', async () => {
      const input = '<img src="imagem.jpg">';
      const result = await processor.process(input);
      expect(result.content).toContain('![](imagem.jpg)');
    });

    it('deve lidar com listas numeradas', async () => {
      processor.setFormat('html');
      const input = '1. Primeiro item\n2. Segundo item\n3. Terceiro item';
      const result = await processor.process(input);
      expect(result.content).toContain('<li>Primeiro item</li>');
      expect(result.content).toContain('<li>Segundo item</li>');
      expect(result.content).toContain('<li>Terceiro item</li>');
    });

    it('deve lidar com tabelas', async () => {
      const input = '<table><tr><th>Cabeçalho</th></tr><tr><td>Dado</td></tr></table>';
      const result = await processor.process(input);
      expect(result.content).toContain('| Cabeçalho |');
      expect(result.content).toContain('| Dado |');
    });
  });
});
