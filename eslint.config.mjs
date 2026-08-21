// @ts-check

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default defineConfig(
  {
    files: ['**/*.{js,ts}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
    ],

    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: ['tests/**'],
    extends: [playwright.configs['flat/recommended']],
     rules: {
            ...playwright.configs['flat/recommended'].rules,
      // ...
        },
  },
);