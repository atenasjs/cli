import { readJson, exists, join, clc } from './deps.ts';
import { Config } from './src/interfaces/config.interface.ts'
import { Start } from './src/scripts/scripts.ts'
import { requireConfig } from './src/operators/config.ts';
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


async function main() {
  if(Deno.args[0]) {
    switch (Deno.args[0]) {
      case 'start':
        requireConfig(CONFIG_FILE, (config: any) => {
          Start(Atenas, config)
        })
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
}

if (import.meta.main) {
  main();
}
