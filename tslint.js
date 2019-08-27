module.exports = {
  setupGuideFrom:
    'https://medium.com/maxime-heckel/getting-started-with-typescript-on-gatsby-8544b47c1d27',
  defaultSeverity: 'error',
  jsRules: {
    'object-literal-sort-keys': false,
  },
  rulesDirectory: ['tslint-plugin-prettier'],
  extends: ['tslint:latest', 'tslint-react', 'tslint-config-prettier'],
  rules: {
    prettier: true,
    'jsx-no-multipline-js': false,
    'jsx-no-lambda': false,
    'import-name': false,
    'no-boolean-literal-compare': false,
    'object-literal-sort-keys': false,
  },
}