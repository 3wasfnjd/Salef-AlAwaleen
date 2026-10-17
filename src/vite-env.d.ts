/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Voice token server base URL, injected at build time (see .github/workflows/pages.yml). */
  readonly VITE_API_BASE?: string;
}
