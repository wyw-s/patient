module.exports = {
  // 反向代理
  devServer: {
    proxy: 'http://106.12.205.155'
  },
  // webpack配置: 关闭哈希值
  filenameHashing: false
}
