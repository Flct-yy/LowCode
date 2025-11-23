module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // Prettier 集成（必须放在最后）
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.base.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.base.json',
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  rules: {
    // 添加 Prettier 规则
    'prettier/prettier': 'error',
  },
};