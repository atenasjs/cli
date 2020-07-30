import eConsole from './src/utils/Console.ts';
import { Start } from './src/scripts/scripts.ts'
import { requireConfig } from './src/operators/config.ts';
import { Routes } from './src/scripts/commands/routes.ts';
import { New } from './src/scripts/commands/new.ts';
import { Cache } from './src/scripts/commands/cache.ts';

/**
 * Set atenas mod filename
 */
let atenasFilename = 'https://deno.land/x/atenas/mod.ts';

/**
 * Is a development atenas mode?
 */
if(Deno.args.includes('--dev')) {
  /**
   * Warn in console
   */
  eConsole.warn('Running in development mode');

  /**
   * Set Atenas filename dev path
   */
  atenasFilename = 'file:\\\\' + Deno.cwd() +'/../mod.ts'
}

/**
 * Import Atenas
 */
let { Atenas } = await import(atenasFilename)

async function main() {
  if(Deno.args[0]) {
    switch (Deno.args[0]) {
      case 'start':
        requireConfig((config: any) => {
          Start(Atenas, config)
        })
        break;
      case 'new':
        New()
        break;
      case 'cache':
        Cache()
        break;
      case 'routes:list':
        requireConfig((config: any) => {
          Routes(config)
        })
        break;
      case 'feedback':
        // Feedback()
        break;

      default:
        eConsole.error('This command not exists');
        Deno.exit();
        break;
    }
  } else {
    eConsole.warn('You need insert a command')
    Deno.exit();
  }
}

if (import.meta.main) {
  main();
}
