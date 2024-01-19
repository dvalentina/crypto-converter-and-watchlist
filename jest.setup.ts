import { loadEnvConfig } from '@next/env';

import 'cross-fetch/polyfill';
import '@testing-library/jest-dom';

const loadConfig = async () => {
  const projectDir = process.cwd();
  loadEnvConfig(projectDir);
};

export default loadConfig;
