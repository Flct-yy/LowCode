/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly PREVIEW_URL: string;
  // 其他环境变量...
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
