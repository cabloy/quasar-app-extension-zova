import type { ZovaConfigMeta } from '@cabloy/module-info';
import type { defineConfig } from '@quasar/app-vite/wrappers';
import type { ZovaViteConfigOptions, ZovaViteConfigResult } from 'zova-vite';

export interface ConfigContext {
  isolated: boolean;
  outDir?: string;
  configMeta?: ZovaConfigMeta;
  configOptions?: ZovaViteConfigOptions;
  zovaViteMeta?: ZovaViteConfigResult;
}

export type QuasarConf = Awaited<ReturnType<ReturnType<typeof defineConfig>>>;
