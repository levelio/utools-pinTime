import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-console': 'off',
  },
})
