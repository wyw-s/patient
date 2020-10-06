import { Message } from 'element-ui'

// 全局提示语；
export function tooltip (message, type = 'success', duration = 2000) {
  Message({
    message,
    type,
    duration
  })
}
