import { exec } from 'https://cdn.depjs.com/exec/mod.ts'
import Prompt from "https://deno.land/x/prompt/mod.ts";
import Console from './src/utils/Console.ts';

await exec('deno install -f --allow-net --allow-read --allow-write --allow-run http://git.io/atenas-cli')

const answers = await Prompt.prompts([
  { type: "confirm", name: "feedback", message: 'Do you want to share your Atenas usage information with our team? \nThis information is used only for counting users who create new projects, \ndownloaded athenas and run athenas, information like your ip will not be \nsaved in our database.', defaultValue: true },
]);

if(!answers.feedback) {
  await exec('atenas feedback --disable')
  Console.warn('You can enable this option again using: $ atenas feedback --enable');
}
