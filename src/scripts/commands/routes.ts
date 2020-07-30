import { join } from '../../../deps.ts';
import { Config } from '../../interfaces/config.interface.ts';
import eConsole from '../../utils/Console.ts';
import { Table } from 'https://deno.land/x/tbl/mod.ts';

export const Routes = async (config: Config) => {
  const supportedRoutes = ['web'];

  let routeName = 'web';

  if (Deno.args[1]) {
    if (supportedRoutes.includes(Deno.args[1])) {
      routeName = Deno.args[1];
    } else {
      eConsole.error('Router name not is valid');
      Deno.exit(1);
    }
  }
  const table = new Table({
    header: ['methods', 'path'],
  });
  const web = await import('file:\\\\' + join(config.root, 'routes/web.ts'));
  const routes = web.default.stacks().filter((i: any) => {
    return i.path.length > 0 && i.methods.length > 0;
  });
  table.fromObjects(routes);
  console.log(table.toString());
  Deno.exit(1);
};
