<template>
 <div class="caseHistory">
  <el-card>
    <div slot="header">病历管理</div>
    <history-case></history-case>
  </el-card>
 </div>
</template>

<script>
import historyCase from '@/components/common/historyCase'
export default {
  components: {
    historyCase
  }
}
</script>

<style lang="less" scoped></style>
