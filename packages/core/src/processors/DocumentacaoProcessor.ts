import { Documentacao } from '../types';

export class DocumentacaoProcessor {
  private format: 'markdown' | 'html' | 'text' | 'json' = 'markdown';

  async process(input: string): Promise<Documentacao> {
    try {
      const content = await this.convertContent(input);
      this.validateContent(content);

      return {
        type: 'documentacao',
        content,
        metadata: {
          format: this.format,
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      };
    } catch (error: any) {
      throw new Error(`Erro ao processar documentação: ${error.message}`);
    }
  }

  private async convertContent(content: string): Promise<string> {
    switch (this.format) {
      case 'markdown':
        return this.convertToMarkdown(content);
      case 'html':
        return this.convertToHtml(content);
      case 'text':
        return this.convertToText(content);
      case 'json':
        return this.convertToJson(content);
      default:
        throw new Error('Formato não suportado');
    }
  }

  private async convertToMarkdown(content: string): Promise<string> {
    // Se já estiver em markdown, retorna o conteúdo
    if (this.isMarkdown(content)) {
      return content;
    }

    // Converte HTML para Markdown
    if (this.isHtml(content)) {
      return content
        .replace(/<h1>(.*?)<\/h1>/g, '# $1\n')
        .replace(/<h2>(.*?)<\/h2>/g, '## $1\n')
        .replace(/<h3>(.*?)<\/h3>/g, '### $1\n')
        .replace(/<p>(.*?)<\/p>/g, '$1\n\n')
        .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
        .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
        .replace(/<em>(.*?)<\/em>/g, '*$1*')
        .replace(/<code>(.*?)<\/code>/g, '`$1`')
        .replace(/<pre>(.*?)<\/pre>/g, '```\n$1\n```')
        .replace(/<ul>(.*?)<\/ul>/g, '$1')
        .replace(/<ol>(.*?)<\/ol>/g, '$1')
        .replace(/<li>(.*?)<\/li>/g, '- $1\n')
        .replace(/<br\s*\/?>/g, '\n')
        .replace(/<hr\s*\/?>/g, '---\n')
        .replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1\n')
        .replace(/<img src="(.*?)" alt="(.*?)"\/?>/g, '![$2]($1)')
        .replace(/<div>(.*?)<\/div>/g, '$1\n')
        .replace(/<span>(.*?)<\/span>/g, '$1')
        .replace(/<\/?[^>]+(>|$)/g, '');
    }

    // Converte JSON para Markdown
    if (this.isJson(content)) {
      const json = JSON.parse(content);
      return this.jsonToMarkdown(json);
    }

    // Converte texto para Markdown
    return content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('\n\n');
  }

  private async convertToHtml(content: string): Promise<string> {
    // Se já estiver em HTML, retorna o conteúdo
    if (this.isHtml(content)) {
      return content;
    }

    // Converte Markdown para HTML
    if (this.isMarkdown(content)) {
      return content
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4>$1</h4>')
        .replace(/^##### (.*$)/gm, '<h5>$1</h5>')
        .replace(/^###### (.*$)/gm, '<h6>$1</h6>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/```\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
        .replace(/^\- (.*$)/gm, '<li>$1</li>')
        .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
        .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^<p>/g, '')
        .replace(/<\/p>$/g, '')
        .replace(/<\/p><p>/g, '</p>\n<p>');
    }

    // Converte JSON para HTML
    if (this.isJson(content)) {
      const json = JSON.parse(content);
      return this.jsonToHtml(json);
    }

    // Converte texto para HTML
    return `<p>${content.replace(/\n/g, '</p><p>')}</p>`;
  }

  private async convertToText(content: string): Promise<string> {
    // Se já for texto puro, retorna o conteúdo
    if (!this.isHtml(content) && !this.isMarkdown(content) && !this.isJson(content)) {
      return content;
    }

    // Converte HTML para texto
    if (this.isHtml(content)) {
      return content
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .trim();
    }

    // Converte Markdown para texto
    if (this.isMarkdown(content)) {
      return content
        .replace(/^#+\s+/gm, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/^\- /gm, '')
        .replace(/^\d+\. /gm, '')
        .replace(/^> /gm, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .trim();
    }

    // Converte JSON para texto
    if (this.isJson(content)) {
      const json = JSON.parse(content);
      return this.jsonToText(json);
    }

    return content;
  }

  private async convertToJson(content: string): Promise<string> {
    // Se já for JSON, retorna o conteúdo
    if (this.isJson(content)) {
      return content;
    }

    // Converte HTML para JSON
    if (this.isHtml(content)) {
      const text = await this.convertToText(content);
      return JSON.stringify({ content: text, format: 'html' });
    }

    // Converte Markdown para JSON
    if (this.isMarkdown(content)) {
      const text = await this.convertToText(content);
      return JSON.stringify({ content: text, format: 'markdown' });
    }

    // Converte texto para JSON
    return JSON.stringify({ content, format: 'text' });
  }

  private isMarkdown(content: string): boolean {
    return /^# |\*\*.*\*\*|\*.*\*|`.*`|```|\[.*\]\(.*\)|^\- |^\d+\. |^> |!\[.*\]\(.*\)/.test(content);
  }

  private isHtml(content: string): boolean {
    return /<[a-z][\s\S]*>/i.test(content);
  }

  private isJson(content: string): boolean {
    try {
      JSON.parse(content);
      return true;
    } catch {
      return false;
    }
  }

  private jsonToMarkdown(json: any): string {
    if (typeof json === 'string') {
      return json;
    }

    if (Array.isArray(json)) {
      return json.map(item => `- ${this.jsonToMarkdown(item)}`).join('\n');
    }

    if (typeof json === 'object') {
      return Object.entries(json)
        .map(([key, value]) => `## ${key}\n\n${this.jsonToMarkdown(value)}`)
        .join('\n\n');
    }

    return String(json);
  }

  private jsonToHtml(json: any): string {
    if (typeof json === 'string') {
      return `<p>${json}</p>`;
    }

    if (Array.isArray(json)) {
      return `<ul>${json.map(item => `<li>${this.jsonToHtml(item)}</li>`).join('')}</ul>`;
    }

    if (typeof json === 'object') {
      return Object.entries(json)
        .map(([key, value]) => `<div><h2>${key}</h2>${this.jsonToHtml(value)}</div>`)
        .join('');
    }

    return `<p>${String(json)}</p>`;
  }

  private jsonToText(json: any): string {
    if (typeof json === 'string') {
      return json;
    }

    if (Array.isArray(json)) {
      return json.map(item => this.jsonToText(item)).join('\n');
    }

    if (typeof json === 'object') {
      return Object.entries(json)
        .map(([key, value]) => `${key}:\n${this.jsonToText(value)}`)
        .join('\n\n');
    }

    return String(json);
  }

  private validateContent(content: string): void {
    if (!content || content.trim().length === 0) {
      throw new Error('Conteúdo não pode estar vazio');
    }

    switch (this.format) {
      case 'markdown':
        if (!this.isMarkdown(content)) {
          throw new Error('Conteúdo não está em formato Markdown válido');
        }
        break;
      case 'html':
        if (!this.isHtml(content)) {
          throw new Error('Conteúdo não está em formato HTML válido');
        }
        break;
      case 'json':
        if (!this.isJson(content)) {
          throw new Error('Conteúdo não está em formato JSON válido');
        }
        break;
      case 'text':
        // Texto puro não precisa de validação específica
        break;
      default:
        throw new Error('Formato não suportado');
    }
  }

  setFormat(format: 'markdown' | 'html' | 'text' | 'json'): void {
    if (!['markdown', 'html', 'text', 'json'].includes(format)) {
      throw new Error('Formato não suportado');
    }
    this.format = format;
  }

  getFormat(): 'markdown' | 'html' | 'text' | 'json' {
    return this.format;
  }
}
