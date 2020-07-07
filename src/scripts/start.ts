import { Config } from "../interfaces/config.interface.ts";

export const Start = (atenas: any, config: Config) => {
  new atenas(config);
}
