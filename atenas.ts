import { readJson, exists, join, clc } from './deps.ts';
import { Config } from './src/interfaces/config.interface.ts'
import { Start } from './src/scripts/scripts.ts'
/**
 * Set atenas mod filename
 */
let atenasFilename = 'https://raw.githubusercontent.com/atenasjs/atenas/master/mod.ts';

/**
 * Is a development atenas mode?
 */
if(Deno.args.includes('--dev')) {
  /**
   * Warn in console
   */
  console.log(clc.bgYellow.text(clc.black.text("[Atenas]: Running in development mode")) + clc.bgBlack.text(''));

  /**
   * Set Atenas filename dev path
   */
  atenasFilename = 'file:\\\\' + Deno.cwd() +'/../mod.ts'
}

/**
 * Import Atenas
 */
let { Atenas } = await import(atenasFilename)

/**
 * Getting filename
 */
const CONFIG_FILE = join(Deno.cwd(), 'atenas.json');


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

/**
 * Commands available
 */
const scripts = [
  'start'
]

async function main() {
  if (await exists(CONFIG_FILE)) {
      config = Object.assign(config, (await readJson(CONFIG_FILE)) as Config);
      if(Deno.args[0]) {
        switch (Deno.args[0]) {
          case 'start':
            Start(Atenas, config)
            break;

          default:
            console.log(clc.bgYellow.text(clc.black.text("[Atenas]:")) +  clc.bgBlack.text(clc.red.text(" This command not exists")));
            console.log(clc.reset.text(''))
            Deno.exit();
            break;
        }
      } else {
        console.log(clc.bgYellow.text(clc.black.text("[Atenas]:")) +  clc.bgBlack.text(clc.red.text(" You need insert a command")));
        console.log(clc.reset.text(''))
        Deno.exit();
      }
  } else {
    console.log(clc.bgRed.text("[Atenas]:") + clc.bgBlack.text(clc.red.text(` Could not find Atenas Configuration File "atenas.json". Please, ensure that you are running this command in the appropriate directory (inside Atenas workspace).`)));
    console.log(clc.reset.text(''))
    Deno.exit();
  }
}

if (import.meta.main) {
  main();
}
