import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import {defineConfig, globalIgnores} from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Underscore-prefixed args/vars mark intentional placeholders (e.g. unimplemented
      // service stubs, callbacks whose signature is dictated by an external contract).
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // Empty interfaces are the canonical way to augment third-party module types
      // (see src/app/themes/emotion.d.ts) — allow them when extending another interface.
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      // Component files in this project routinely co-export their prop types and
      // small helpers alongside the component (see naming-conventions.md — types
      // colocate with the component). Allowing constant exports keeps HMR happy
      // without splitting every module in two.
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // React Compiler ships an aggressive "no setState in useEffect" rule that
      // flags the standard fetch-with-loading-flag pattern our data hooks are
      // built around (see hooks/useWorkout, useWorkouts, useExercises). We
      // deliberately reset loading/error at the top of the effect on every
      // dependency change, which is idiomatic for this style. Downgrading to a
      // warning so the intent is visible without failing the build.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
])
