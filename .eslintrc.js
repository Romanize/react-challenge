module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': [2, { "extensions": [".tsx", ".jsx"] }],
    'import/no-unresolved': 0,
    'import/extensions': [2, 'never', {
      'svg': 'always'
    }],
    'no-shadow': 0,
    '@typescript-eslint/no-shadow': 2,
    'no-undef': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 2,
    'no-param-reassign': ['error' , { 'props': false }],
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    'react/function-component-definition': [2, { 'namedComponents': 'arrow-function' }]
  },
};
