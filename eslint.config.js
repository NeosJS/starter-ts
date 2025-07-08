import neosjs from '@neosjs/eslint-config'

export default neosjs(
  {
    formatters: true
  },
  {
    rules: {
      'import/order': 'off',
      'prefer-rest-params': 'off',
      'ts/no-use-before-define': 'off',
      'node/no-deprecated-api': 'off',
      'no-template-curly-in-string': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'style/no-tabs': 'off'
    }
  }
)
