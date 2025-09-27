import { Provider, GenerateOptions } from './abstract';
import { createHttpClient } from '../utils/http';
import { keyManager } from '../keyManager';

/**
 * OpenRouterProvider
 * Example uses openrouter api pattern; adjust based on exact API docs and models.
 */
export class OpenRouterProvider implements Provider {
  name = 'openrouter';
  client = createHttpClient('https://api.openrouter.ai');

  async generate(prompt: string, model = 'gpt-5', options: GenerateOptions = {}): Promise<string> {
    const key = keyManager.getKey(this.name);
    if (!key) throw new Error('No OpenRouter API key configured.');

    try {
      const payload = {
        model,
        prompt,
        ...options
      };
      // Example path; update to the real route (chat/completions etc.)
      const res = await this.client.post('/v1/chat/completions', payload, {
        headers: { Authorization: `Bearer ${key}` }
      });
      return (
        res.data?.choices?.[0]?.message?.content ??
        res.data?.choices?.[0]?.text ??
        JSON.stringify(res.data)
      );
    } catch (err: any) {
      throw new Error(`OpenRouter generate failed: ${err?.message || err}`);
    }
  }
}