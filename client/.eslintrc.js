module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  // plugins: [
  //   'vue',
  // ],
  rules: {
    'import/no-unresolved': 'off',
    'vue/no-unused-components': 'off',
    'vue/multi-word-component-names': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/singleline-html-element-content-newline': 0,
    'timport/no-extraneous-dependencies': 0,
    'no-unused-vars': 0,
    'import/extensions': 0,
    semi: 0,
    'comma-dangle': 0
  }
}
