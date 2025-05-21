const config = {
  // Configurações do projeto
  env: 'development',
  port: 3000,

  // Configurações do banco de dados
  mongodb: {
    uri: 'mongodb://localhost:27017/operante',
  },

  // Configurações de autenticação
  auth: {
    jwtSecret: 'your-secret-key',
    jwtExpiration: '1d',
  },

  // Configurações de API
  api: {
    version: 'v1',
    prefix: '/api',
  },

  // Configurações de logs
  logs: {
    level: 'debug',
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
    user: 'user@example.com',
    pass: 'your-password',
  },

  // Configurações de armazenamento
  storage: {
    type: 'local',
    path: './uploads',
  },

  // Configurações de segurança
  security: {
    corsOrigin: 'http://localhost:3000',
    rateLimitWindow: '15m',
    rateLimitMax: 100,
  },
};

module.exports = config;
