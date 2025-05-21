const path = require('path');
const dotenv = require('dotenv');

// Carrega o arquivo .env baseado no ambiente
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Importa a configuração baseada no ambiente
const env = process.env.NODE_ENV || 'development';
const config = require(`./config.${env}`);

module.exports = config;
