import { readJson } from 'https://deno.land/std/fs/read_json.ts';
import { exists } from 'https://deno.land/std/fs/exists.ts';
import { join } from 'https://deno.land/std/path/mod.ts';
import clc from 'https://deno.land/x/color/index.ts'

let atenasPath = 'https://raw.githubusercontent.com/atenasjs/atenas/master/mod.ts';
if(Deno.args.includes('--dev')) {
  atenasPath = '../mod.ts'
  try {
    await Deno.stat(atenasPath);
  } catch (error) {
    console.log(clc.green.text("[Atenas]: ") + clc.red.text("Error on finding Atenas Class, try remove --dev flag"));
  }
}

let { Atenas } = await import(atenasPath)
const CONFIG_FILE = join(Deno.cwd(), 'atlas.json');

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
      config = (await readJson(CONFIG_FILE)) as Config;
      if(scripts.includes(Deno.args[0])) {
        switch (Deno.args[0]) {
          case 'start':
            start()
            break;
        
          default:
            console.log(clc.green.text("[Atenas]: ") + clc.red.text("This command not exists"));
            Deno.exit();
            break;
        }
      } else {
        console.log(clc.green.text("[Atenas]: ") + clc.red.text("You need insert a command"));
        Deno.exit();
      }
  } else {
    console.log(clc.green.text("[Atenas]: ") + clc.red.text("Config file does not exists"));
    Deno.exit();
  }
}

function start(){
  (new Atenas(config));
}

if (import.meta.main) {
  main();
}

interface Config {
  host: string;
  port: number;
  root: string;
  path: PathConfig;
}

interface PathConfig {
  meta: string
}
