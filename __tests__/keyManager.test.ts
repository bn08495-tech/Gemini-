import { keyManager } from '../src/keyManager';

describe('KeyManager', () => {
  test('parses keys from env variables', () => {
    // set env temporarily
    process.env.DEEPSEEK_KEYS = 'a,b,c';
    process.env.GEMINI_KEYS = 'g1';
    // re-create module to pick up env (simple approach)
    jest.resetModules();
    const km = require('../src/keyManager').keyManager;
    expect(km.list('deepseek').length).toBeGreaterThanOrEqual(3);
    expect(km.list('gemini')[0]).toBe('g1');
    // rotation returns an item and rotates
    const first = km.getKey('deepseek');
    expect(first).not.toBeNull();
    expect(km.list('deepseek').length).toBeGreaterThanOrEqual(3);
  });
});
