import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carrega o arquivo .env baseado no ambiente
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Importa a configuração baseada no ambiente
const env = process.env.NODE_ENV || 'development';

const config = {
  // Configurações do projeto
  env: env,
  port: process.env.PORT || 3000,

  // Configurações do banco de dados
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/operante',
  },

  // Configurações de autenticação
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-key',
    jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  },

  // Configurações de API
  api: {
    version: 'v1',
    prefix: '/api',
  },

  // Configurações de logs
  logs: {
    level: process.env.LOG_LEVEL || 'debug',
    format: 'dev',
  },

  // Configurações de cache
  cache: {
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
  },

  // Configurações de email
  email: {
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER || 'dev@example.com',
    pass: process.env.EMAIL_PASS || 'dev-password',
  },

  // Configurações de armazenamento
  storage: {
    type: process.env.STORAGE_TYPE || 'local',
    path: process.env.STORAGE_PATH || './uploads',
  },

  // Configurações de segurança
  security: {
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    rateLimitWindow: '15m',
    rateLimitMax: 100,
  },
};

export default config;
