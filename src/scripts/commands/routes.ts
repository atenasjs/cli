import { join } from '../../../deps.ts';
import { Config } from "../../interfaces/config.interface.ts";

export const Routes = async (config: Config) => {
  const web = await import('file:\\\\' + join(config.root, 'routes/web.ts'));
  console.log(web)
}
