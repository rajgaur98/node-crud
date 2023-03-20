module.exports = {
  extends: ['standard-with-typescript', 'prettier'],
  root: true,
  parserOptions: { project: './tsconfig.json' },
  ignorePatterns: ['dist/*']
}
