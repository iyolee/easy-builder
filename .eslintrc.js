module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'react/prefer-stateless-function': 0,
    'no-console': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/aria-role': 0,
    'react/button-has-type': 0,
    'no-return-assign': 0,
    'no-debugger': 0
  }
};
