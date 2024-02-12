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
    'react/jsx-no-target-blank': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-one-expression-per-line': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-indent': 'off',
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true,
      },
    ],

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    'prettier/prettier': 'off',
    'padded-blocks': 'off',
    'nonblock-statement-body-position': 'off',
    'no-trailing-spaces': 'off',
    'lines-between-class-members': 'off',
    // 'operator-linebreak': [
    //   'warn',
    //   'after',
    //   { overrides: { '?': 'after', ':': 'before' } },
    // ],
    indent: 'off',
  },
};
