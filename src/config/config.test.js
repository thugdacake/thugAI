const config = {
  // Configurações do projeto
  env: 'test',
  port: 3001,

  // Configurações do banco de dados
  mongodb: {
    uri: 'mongodb://localhost:27017/operante-test',
  },

  // Configurações de autenticação
  auth: {
    jwtSecret: 'test-secret-key',
    jwtExpiration: '1h',
  },

  // Configurações de API
  api: {
    version: 'v1',
    prefix: '/api',
  },

  // Configurações de logs
  logs: {
    level: 'error',
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
    user: 'test@example.com',
    pass: 'test-password',
  },

  // Configurações de armazenamento
  storage: {
    type: 'local',
    path: './uploads-test',
  },

  // Configurações de segurança
  security: {
    corsOrigin: 'http://localhost:3001',
    rateLimitWindow: '15m',
    rateLimitMax: 100,
  },
};

module.exports = config;
