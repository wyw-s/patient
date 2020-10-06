<template>
  <el-tabs class="dictionaries" type="border-card">
    <el-tab-pane label="字典管理">
      <dic-tab></dic-tab>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import dicTab from '@/components/dictionaries/dicTab'
export default {
  name: 'dictionaries',
  components: {
    dicTab
  },
  created () {
    if (!this.$getLocal('dictManages')) {
      this.$setLocal('dictManages', {})
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.dictionaries {
  margin-top: 20px;
}
</style>
