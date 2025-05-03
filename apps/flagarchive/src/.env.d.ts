declare interface ImportMetaEnv {
  readonly NODE_ENV: string;
  [key: string]: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
