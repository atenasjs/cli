import { readJson, exists, join, clc } from '../../deps.ts';
import { Config } from '../interfaces/config.interface.ts'

export const requireConfig = async (path: any, callback: Function) => {
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
    console.log(clc.bgRed.text("[Atenas]:") + clc.bgBlack.text(clc.red.text(` Could not find Atenas Configuration File "atenas.json". Please, ensure that you are running this command in the appropriate directory (inside Atenas workspace).`)));
    console.log(clc.reset.text(''))
    Deno.exit();
  }
}
