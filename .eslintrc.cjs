module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  overrides: [
    {
      env: { node: true },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: { sourceType: 'script' },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-refresh'],
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-no-target-blank': 'warn',
    'operator-linebreak': [
      'warn',
      'after',
      { overrides: { '?': 'after', ':': 'before' } },
    ],
    indent: ['warn', 2, { ignoreNodes: ['ConditionalExpressions'] }],
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'padded-blocks': 'off',
    'prettier/prettier': 'off',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
  },
};
