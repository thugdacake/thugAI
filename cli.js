#!/usr/bin/env node
import { Operante } from './index.js';

const operante = new Operante();

const arg = process.argv[2];

switch (arg) {
case 'iniciar':
  operante.iniciar();
  break;
case 'interceptar':
  operante.interceptAI();
  break;
default:
  console.log('Uso: operante <iniciar|interceptar>');
  break;
}
