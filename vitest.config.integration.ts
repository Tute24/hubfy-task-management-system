import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['__tests__/integration/**/*.test.ts'],
    pool: 'forks',
    maxWorkers: 1, // isso aqui evita que os testes rodem em paralelo e quebrem o banco de dados de teste
    setupFiles: ['__tests__/helpers/setup.ts'],
  },
});
