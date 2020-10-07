import { Message } from 'element-ui'

// 全局提示语；
export function tooltip (message, type = 'success', duration = 2000) {
  Message({
    message,
    type,
    duration
  })
}

export function numFormat (type, value) {
  // 确保输入的是数字
  value = value.replace(/[^\d.]/g, '')
  // 确保第一个输入的是数字
  value = value.replace(/^\./g, '')

  if (type === 'int') { // 正数
    // 确保不能输入小数点
    value = value.replace(/\./g, '')
  } else if (type === 'dot') { // 带小数
    // 确保不能输入两个小数点
    value = value.replace(/\.{2,}/g, '.')
    // 保证小数点只出现一次，而不能出现两次以上
    value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    // 确保只能输入两位小数
    // eslint-disable-next-line no-useless-escape
    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
  }

  // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的数字
  if (value.indexOf('.') < 0 && value !== '') {
    value = parseFloat(value)
  }
  return value
}
