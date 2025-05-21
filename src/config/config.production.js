const config = {
  // Configurações do projeto
  env: 'production',
  port: 3000,

  // Configurações do banco de dados
  mongodb: {
    uri: 'mongodb://localhost:27017/operante-prod',
  },

  // Configurações de autenticação
  auth: {
    jwtSecret: 'prod-secret-key',
    jwtExpiration: '7d',
  },

  // Configurações de API
  api: {
    version: 'v1',
    prefix: '/api',
  },

  // Configurações de logs
  logs: {
    level: 'info',
    format: 'combined',
  },

  // Configurações de cache
  cache: {
    redisUrl: 'redis://localhost:6379',
  },

  // Configurações de email
  email: {
    host: 'smtp.example.com',
    port: 587,
    user: 'prod@example.com',
    pass: 'prod-password',
  },

  // Configurações de armazenamento
  storage: {
    type: 's3',
    path: 'operante-prod',
  },

  // Configurações de segurança
  security: {
    corsOrigin: 'https://operante.example.com',
    rateLimitWindow: '15m',
    rateLimitMax: 1000,
  },
};

module.exports = config;
