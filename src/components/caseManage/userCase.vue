<template>
  <el-card>
    <template slot="header">
      <el-page-header @back="$router.back()">
        <template slot="content">
          <span style="color: #ed1c24">{{ caseName }}</span>
          的历史病例
        </template>
      </el-page-header>
    </template>
    <div style="margin-bottom: 12px">
      <el-button size="small" type="info" plain icon="el-icon-plus" @click="onNewAddSase">新增病例</el-button>
    </div>
    <history-case ref="historyCase"></history-case>
  </el-card>
</template>

<script>
import historyCase from '@/components/common/historyCase'
export default {
  name: 'userCase',
  components: {
    historyCase
  },
  data () {
    return {
      caseName: this.$route.query.caseName
    }
  },
  methods: {
    onNewAddSase () {
      this.$nextTick(() => {
        this.$refs['historyCase'].onNewAddSase()
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
