/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 */

import type { IndexAPI } from '@quasar/app-vite';

import { getFlavor } from 'zova-vite';

import type { ConfigContext } from './types.js';

import { extendAfterBuild } from './extendAfterBuild.js';
import { extendFilesOne, extendFilesThree, extendFilesTwo } from './extendFiles.js';
import { extendQuasarConf } from './extendQuasarConf.js';
import { extendSSRWebserverConf } from './extendSSRWebserverConf.js';
import { extendViteConf } from './extendViteConf.js';
import { printBanner } from './printBanner.js';

export async function quasar(api: IndexAPI) {
  // flavor
  const flavor = getFlavor();
  // Capture run ownership before loading application env files.
  const context: ConfigContext = {
    isolated: process.env.ZOVA_ISOLATED === 'true',
  };
  // files
  await extendFilesOne(context, api, flavor)();
  await extendFilesTwo(context, api, flavor)();
  // config
  api.extendQuasarConf(extendQuasarConf(context, flavor));
  api.extendViteConf(extendViteConf(context));
  api.extendSSRWebserverConf(extendSSRWebserverConf(context));
  // before dev
  api.beforeDev(async (api, { quasarConf }) => {
    printBanner(context, flavor, true)(quasarConf, api);
  });
  // before build
  api.beforeBuild(async (api, { quasarConf }) => {
    await extendFilesThree(context, quasarConf, api, flavor)();
  });
  // after build
  api.afterBuild(async (api, { quasarConf }) => {
    printBanner(context, flavor, false)(quasarConf, api);
    await extendAfterBuild(context, flavor)(quasarConf, api);
  });
}
