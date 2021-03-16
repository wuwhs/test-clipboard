module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  plugins: ['vue'],
  env: {
    browser: true,
  },
  globals: {
    require: true,
    NODE_ENV: true,
    module: true,
    process: true,
  },
  rules: {
    ignoreChainWithDepth: 0,
    'no-debugger': 'off',
    'no-console': 'off',
    'no-useless-escape': 'off',
  },
};
