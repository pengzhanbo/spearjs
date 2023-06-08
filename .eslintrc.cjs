module.exports = {
  root: true,
  extends: ['@pengzhanbo/eslint-config-vue'],
  overrides: [
    {
      files: [
        './packages/server/src/**/*.ts',
        './packages/server/test/**/*.ts',
      ],
      rules: {
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
}
