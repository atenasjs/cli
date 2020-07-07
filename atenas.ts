import { readJson } from 'https://deno.land/std/fs/read_json.ts';
import { exists } from 'https://deno.land/std/fs/exists.ts';
import { join } from 'https://deno.land/std/path/mod.ts';
import clc from 'https://deno.land/x/color/index.ts';
import StartScript from './start.ts';
let atenasPath = 'https://raw.githubusercontent.com/atenasjs/atenas/master/mod.ts';

if(Deno.args.includes('--dev')) {
  atenasPath = 'file:\\\\' + Deno.cwd() +'/../mod.ts'
}

let { Atenas } = await import(atenasPath)
const CONFIG_FILE = join(Deno.cwd(), 'atenas.json');

let config: Config = {
  host: '127.0.0.1',
  port: 3000,
  root: Deno.cwd(),
  path: {
    meta: import.meta.url
  }
};

const scripts = [
  'start'
]

async function main() {
  if (await exists(CONFIG_FILE)) {
      config = Object.assign(config, (await readJson(CONFIG_FILE)) as Config);
      if(scripts.includes(Deno.args[0])) {
        switch (Deno.args[0]) {
          case 'start':
            StartScript(Atenas, config)
            break;
        
          default:
            console.log(clc.bgYellow.text("[Atenas]: ") +  clc.bgBlack.text(clc.red.text("This command not exists")));
            console.log(clc.reset.text(''))
            Deno.exit();
            break;
        }
      } else {
        console.log(clc.bgYellow.text("[Atenas]: ") +  clc.bgBlack.text(clc.red.text("You need insert a command")));
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

export interface Config {
  host: string;
  port: number;
  root: string;
  path: PathConfig;
}

interface PathConfig {
  meta: string
}
