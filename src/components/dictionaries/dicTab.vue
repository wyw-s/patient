<template>
  <div class="dicTab">
    <div
      v-for="(item, index) in viewData"
      :key="index"
      class="tag-group">
      <span class="tag-group__title">{{ item.dicName }}</span>
      <w-tag
        :items="item.dicData"
        @delete="onDel($event, item)"
        @newAdd="onNewTag($event, item)">
      </w-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dicTab',
  data () {
    return {
      viewData: [
        { prop: 'dicProject', dicName: '治疗方案：', dicData: ['中药外敷', '正骨理疗'] },
        { prop: 'dicDoctor', dicName: '诊治医生：', dicData: ['王建设', '赵珍'] }
      ],
      allLOcalData: JSON.parse(this.$getLocal('dictManages'))
    }
  },
  created () {
    this.viewData.forEach(item => {
      let next = true
      for (const key in this.allLOcalData) {
        if (item.prop === key) {
          item.dicData = this.allLOcalData[key]
          next = false
        }
      }
      if (next) {
        this.allLOcalData[item.prop] = item.dicData
      }
    })
  },
  methods: {
    onDel (index, item) {
      item.dicData.splice(index, 1)
      this.$setLocal('dictManages', this.allLOcalData)
    },
    onNewTag (value, item) {
      item.dicData.push(value)
      this.$setLocal('dictManages', this.allLOcalData)
    }
  }
}
</script>

<style lang="less" scoped>
.dicTab {
  .tag-group {
    display: flex;
    margin-bottom: 12px;
    .tag-group__title {
      width: 80px;
      flex-shrink: 0;
    }
    /deep/.w-tag-group {
      .w-tag {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
