import { readJson, writeJson, exists, join } from '../../../deps.ts';
import Console from '../../utils/Console.ts';
export const feedback = async () => {
  const path = join(import.meta.url, '../../../../config.json').split(
    'file:\\'
  )[1];
  let config: any = {};

  if (!Deno.args.includes('--disable') && !Deno.args.includes('--enable')) {
    Console.log(
      'Available options:\n --enable  -> Enable feedback\n --disable -> Disable feedback\n '
    );
    return true;
  }

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

  if (Deno.args.includes('--disable')) {
    Console.warn(
      'You can enable this option again using: $ atenas feedback --enable'
    );
    config.feedback.enabled = false;
  }

  if (Deno.args.includes('--enable')) {
    Console.warn(
      'You can disable this option again using: $ atenas feedback --disable'
    );
    config.feedback.enabled = true;
  }

  await writeJson(path, config);
};
