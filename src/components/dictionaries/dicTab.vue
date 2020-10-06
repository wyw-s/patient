<template>
  <div class="dicTab">
    <div class="tag-group">
      <span class="tag-group__title">治疗方案：</span>
      <w-tag :items="dicProject" @delete="onDel" @newAdd="onNewTag"></w-tag>
    </div>
    <div class="tag-group">
      <span class="tag-group__title">治疗医生：</span>
      <w-tag :items="dicProject" @delete="onDel" @newAdd="onNewTag"></w-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dicTab',
  data () {
    return {
      dicProject: ['中药外敷', '正骨理疗']
    }
  },
  watch: {
    dicProject () {
      let value = JSON.parse(this.$getLocal('dictManages'))
      value.treatProject = this.dicProject
      this.$setLocal('dictManages', value)
    }
  },
  created () {
    let value = this.$getLocal('dictManages').treatProject
    if (!value) {
      value = JSON.parse(this.$getLocal('dictManages'))
      value.treatProject = []
      this.$setLocal('dictManages', value)
    }
    this.dicProject = value.treatProject
  },
  methods: {
    onDel (index) {
      this.dicProject.splice(index, 1)
    },
    onNewTag (value) {
      this.dicProject.push(value)
    }
  }
}
</script>

<style lang="less" scoped>
.dicTab {
  .tag-group {
    margin-bottom: 12px;
  }
}
</style>
