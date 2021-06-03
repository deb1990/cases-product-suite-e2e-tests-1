module.exports = {
  extends: ['standard-with-typescript', 'plugin:jsdoc/recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    jsdoc: {
      mode: 'typescript'
    }
  },
  rules: {
    '@typescript-eslint/semi': ['error', 'always'],
    'jsdoc/require-param-type': 0,
    'jsdoc/require-returns-type': 0,
    'jsdoc/require-jsdoc': [1, {
      contexts: [
        'ClassDeclaration', 'FunctionExpression', 'FunctionDeclaration',
        'ArrowFunctionExpression', 'MethodDefinition', 'ClassExpression',
        'FunctionExpression', 'TSInterfaceDeclaration', 'TSMethodSignature'
      ]
    }]
  }
}
