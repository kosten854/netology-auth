module.exports = { 
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true, 
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': [
      'error',
      { code: 140, tabWidth: 2, ignorePattern: '^import .*' },
    ],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'angle-bracket' },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always', { omitLastInOneLineBlock: true }],
    'array-bracket-newline': ['error', { multiline: true }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], 
  },
  ignorePatterns: ['.eslintrc.js']
};
