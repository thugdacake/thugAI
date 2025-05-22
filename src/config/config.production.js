const config = {
  // Configurações do projeto
  env: 'production',
  port: process.env.PORT || 3000,

  // Configurações do banco de dados
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/operante-prod',
  },

  // Configurações de autenticação
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'prod-secret-key',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  },

  // Configurações de API
  api: {
    version: 'v1',
    prefix: '/api',
  },

  // Configurações de logs
  logs: {
    level: process.env.LOG_LEVEL || 'error',
    format: 'combined',
  },

  // Configurações de cache
  cache: {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  // Configurações de email
  email: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER || 'prod@example.com',
    pass: process.env.EMAIL_PASS || 'prod-password',
  },

  // Configurações de armazenamento
  storage: {
    type: process.env.STORAGE_TYPE || 's3',
    path: process.env.STORAGE_PATH || 'uploads-prod',
  },

  // Configurações de segurança
  security: {
    corsOrigin: process.env.CORS_ORIGIN || 'https://example.com',
    rateLimitWindow: '15m',
    rateLimitMax: 100,
  },
};

export default config;
