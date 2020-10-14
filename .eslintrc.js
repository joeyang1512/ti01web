/**
 * 0 关闭 
 * 2 waring
 * 2 error
 */


module.exports = {
  parserOptions: {
    'ecmaVersion': 7,
    'sourceType': 'module'
  },
  rules: {
    // 自定义的规则
    quotes: [2, 'single'], // 单引号
    // 'no-console': 0,
    'no-unreachable': 2, // 禁止不可达代码
    'no-multiple-empty-lines': 2, // 最多2连续空行
    'eol-last': 2, // 文件必须以空行结束
    'no-var': 2, // 不允许使用var
    'no-tabs': 2, // 不允许使用tab
    'no-spaced-func': 2, // 函数调用 小括号和函数名无空格
    'space-before-function-paren': [2, { anonymous: 'always', named: 'never', asyncArrow: 'always', }], // 函数定义和括号间无空格
    'brace-style': [ 2, '1tbs', { allowSingleLine: true }], // 大括号风格
    'space-before-blocks': 2, // 大括号（块）前空格
    'rest-spread-spacing': [2, 'never'], // 扩展符前无空格
    'no-multi-spaces': 2, // 禁止多个空格
    'comma-spacing': [2, { before: false, after: true }], // 逗号后的空格
    'computed-property-spacing': [2, 'never'], // 计算属性的空格
    'array-bracket-spacing': [2, 'never'], // 数组括号如何空格
    'arrow-spacing': 2, // 箭头函数的箭头空格
    'semi-spacing': [2, { before: false, after: true, }], // 分号前后的空格
    'object-curly-spacing': [2, 'always'], // 对象大括号边的空格
    'keyword-spacing': 2, // 关键字边的空格
    'template-curly-spacing': 2, // 模板字符串大括号间的空格
    // template-tag-spacing  这个没搞明白是啥
    'switch-colon-spacing': 2, // switch 中冒号的空格
    'spaced-comment': 2, // 注释的空格
    'space-unary-ops': 2, // 一元操作符边的空格
    'space-infix-ops': 2, // 操作符的空格
  }
};
