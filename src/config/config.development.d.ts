declare module '@thugdacake/operante/config/development' {
  interface Config {
    // Configurações do projeto
    env: 'development';
    port: 3000;

    // Configurações do banco de dados
    mongodb: {
      uri: string;
    };

    // Configurações de autenticação
    auth: {
      jwtSecret: string;
      jwtExpiration: string;
    };

    // Configurações de API
    api: {
      version: string;
      prefix: string;
    };

    // Configurações de logs
    logs: {
      level: string;
      format: string;
    };

    // Configurações de cache
    cache: {
      redisUrl: string;
    };

    // Configurações de email
    email: {
      host: string;
      port: number;
      user: string;
      pass: string;
    };

    // Configurações de armazenamento
    storage: {
      type: string;
      path: string;
    };

    // Configurações de segurança
    security: {
      corsOrigin: string;
      rateLimitWindow: string;
      rateLimitMax: number;
    };
  }

  const config: Config;
  export default config;
}
