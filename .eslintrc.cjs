module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    '@typescript-eslint',
    'react',
    'react-refresh',
    // 'import',
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'rules': {
    '@typescript-eslint/no-unused-expressions': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-unused-vars': [0, {
      'caughtErrors': 'none',
    }]
  },
};
