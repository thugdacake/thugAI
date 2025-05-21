const config = {
  // Configurações do projeto
  env: 'staging',
  port: 3000,

  // Configurações do banco de dados
  mongodb: {
    uri: 'mongodb://localhost:27017/operante-staging',
  },

  // Configurações de autenticação
  auth: {
    jwtSecret: 'staging-secret-key',
    jwtExpiration: '1d',
  },

  // Configurações de API
  api: {
    version: 'v1',
    prefix: '/api',
  },

  // Configurações de logs
  logs: {
    level: 'info',
    format: 'dev',
  },

  // Configurações de cache
  cache: {
    redisUrl: 'redis://localhost:6379',
  },

  // Configurações de email
  email: {
    host: 'smtp.example.com',
    port: 587,
    user: 'staging@example.com',
    pass: 'staging-password',
  },

  // Configurações de armazenamento
  storage: {
    type: 'local',
    path: './uploads-staging',
  },

  // Configurações de segurança
  security: {
    corsOrigin: 'https://staging.operante.example.com',
    rateLimitWindow: '15m',
    rateLimitMax: 500,
  },
};

module.exports = config;
