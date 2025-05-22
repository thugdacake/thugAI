import config from './config.js';

describe('Configuração', () => {
  it('deve ser um objeto', () => {
    expect(typeof config).toBe('object');
  });

  it('deve ter as configurações básicas', () => {
    expect(config).toHaveProperty('env');
    expect(config).toHaveProperty('port');
    expect(config).toHaveProperty('mongodb');
    expect(config).toHaveProperty('auth');
  });
});
