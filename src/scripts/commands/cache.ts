import { Config } from '../../interfaces/config.interface.ts';
import eConsole from '../../utils/Console.ts';

export const Cache = async () => {
  eConsole.log('Cleaning cache...');
  let version =
    'https://raw.githubusercontent.com/atenasjs/atenas/master/mod.ts';
  const cache = Deno.run({
    cmd: ['deno', 'run', '--reload', version],
  });
  const cacheResult = await cache.status();
  if (!cacheResult.success) {
    eConsole.error(
      'Error on cleaning cache, set the correct version to reload cache'
    );
  } else {
    eConsole.success('Successfully clear the cache');
  }
  Deno.exit(1);
};
