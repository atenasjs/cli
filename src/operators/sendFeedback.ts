import { readJson, exists, join } from '../../deps.ts';
import { denock } from 'https://deno.land/x/denock/mod.ts';

export async function sendFeedback(to: 'start' | 'new') {
  const path = join(import.meta.url, '../../../config.json').split(
    'file:\\'
  )[1];
  let config: any = {};

  if (await exists(path)) {
    config = Object.assign(config, await readJson(path));
  } else {
    config = {
      feedback: {
        enabled: true,
        url: 'https://log-atenasjs.netlify.app/.netlify/functions/server/',
      },
    };
  }

  if (config.feedback.enabled) {
    const response = await fetch(config.feedback.url + to, {
      method: 'GET',
    });

    try {
      const body = await response.json();
    } catch (err) {
      console.log(err);
    }
  }
}
