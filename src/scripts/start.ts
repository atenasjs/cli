import { Config } from "../interfaces/config.interface.ts";
import { sendFeedback } from '../operators/sendFeedback.ts'

export const Start = async (atenas: any, config: Config) => {
  await sendFeedback('start')
  new atenas(config);
}
