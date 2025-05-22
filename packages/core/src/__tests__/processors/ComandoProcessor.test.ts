import { ComandoProcessor } from '../../processors/ComandoProcessor';

describe('ComandoProcessor', () => {
  let processor: ComandoProcessor;

  beforeEach(() => {
    processor = new ComandoProcessor();
  });

  describe('process', () => {
    it('deve processar comando válido', async () => {
      const input = 'ls -la';
      const result = await processor.process(input);
      expect(result.type).toBe('comando');
      expect(result.content).toBe(input);
      expect(result.metadata.shell).toBe('bash');
      expect(result.metadata.timestamp).toBeDefined();
      expect(result.metadata.version).toBe('1.0');
      expect(result.metadata.command).toBe('ls');
    });

    it('deve normalizar quebras de linha', async () => {
      const input = 'ls\r\n-la';
      const result = await processor.process(input);
      expect(result.content).toBe('ls\n-la');
    });

    it('deve lançar erro para comando vazio', async () => {
      const input = '   ';
      await expect(processor.process(input)).rejects.toThrow('Comando não pode estar vazio');
    });

    it('deve lançar erro para comando não permitido', async () => {
      const input = 'rm -rf /';
      await expect(processor.process(input)).rejects.toThrow('Comando não permitido');
    });

    it('deve lançar erro para comando com caracteres perigosos', async () => {
      const input = 'ls; rm -rf /';
      await expect(processor.process(input)).rejects.toThrow('Comando contém caracteres perigosos');
    });

    it('deve lançar erro para comando com redirecionamento', async () => {
      const input = 'ls > arquivo.txt';
      await expect(processor.process(input)).rejects.toThrow('Redirecionamentos não são permitidos');
    });
  });

  describe('shell', () => {
    it('deve permitir alterar o shell para powershell', () => {
      processor.setShell('powershell');
      expect(processor.getShell()).toBe('powershell');
    });

    it('deve manter o shell padrão como bash', () => {
      expect(processor.getShell()).toBe('bash');
    });

    it('deve lançar erro ao tentar definir shell inválido', () => {
      // @ts-ignore
      expect(() => processor.setShell('cmd')).toThrow('Shell não suportado');
    });
  });

  describe('allowedCommands', () => {
    it('deve permitir adicionar novo comando', () => {
      processor.addAllowedCommand('mkdir');
      expect(processor.getAllowedCommands()).toContain('mkdir');
    });

    it('deve permitir remover comando', () => {
      processor.removeAllowedCommand('ls');
      expect(processor.getAllowedCommands()).not.toContain('ls');
    });

    it('deve retornar lista de comandos permitidos', () => {
      const commands = processor.getAllowedCommands();
      expect(commands).toContain('ls');
      expect(commands).toContain('cd');
      expect(commands).toContain('pwd');
    });
  });
});
