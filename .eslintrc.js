module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'comma-dangle': [
      'error',
      'never'
    ],
    'no-unused-vars': [
      'warn'
    ],
    'no-var': [
      'off'
    ],
    'one-var': [
      'off'
    ],
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off'
  }
};
