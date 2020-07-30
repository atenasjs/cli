import { readJson, exists, join } from '../../deps.ts';
import eConsole from '../utils/Console.ts'
import { Config } from '../interfaces/config.interface.ts'

export const requireConfig = async (callback: Function) => {
  const path = join(Deno.cwd(), 'atenas.json');
  console.log(path)

  /**
   * Set default configs
   */
  let config: Config = {
    host: '127.0.0.1',
    port: 3000,
    root: Deno.cwd(),
    path: {
      meta: import.meta.url
    }
  };

  if (await exists(path)) {
    config = Object.assign(config, (await readJson(path)));
    callback(config)
  } else {
    eConsole.error(`Could not find Atenas Configuration File "atenas.json".
Please, ensure that you are running this command in the appropriate
directory (inside Atenas workspace).`);
  }
}
