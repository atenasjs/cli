export interface Config {
  host: string;
  port: number;
  root: string;
  path: PathConfig;
}

interface PathConfig {
  meta: string;
}
