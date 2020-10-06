<template>
  <div class="w-tag-group">
    <span
      :class="['w-tag', type ? 'w-tag'+ type : '']"
      :style="{backgroundColor: background}"
      v-for="(item, index) in items"
      :key="index">
      {{ item }}
      <i v-if="closable" @click="onDelete(index)" class="w-tag-icon el-icon-close"></i>
    </span>
    <input v-if="add && newTag" v-model.trim="addValue" ref="inp" class="w-tag-input" @blur="newTag = false"
           @keyup.enter="onNewAdd"/>
    <span v-if="add" class="w-tag-add" @click="onAddTag">
      <i class="el-icon-plus"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'WTag',
  props: {
    type: String,
    closable: {
      type: Boolean,
      default: true
    },
    background: String,
    size: String,
    add: {
      type: Boolean,
      default: true
    },
    items: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      newTag: false,
      addValue: ''
    }
  },
  methods: {
    onNewAdd () {
      if (!this.addValue) return
      this.newTag = false
      this.$emit('newAdd', this.addValue)
    },

    onAddTag () {
      this.newTag = true
      this.$nextTick(() => {
        this.$refs['inp'].focus()
      })
      this.addValue = ''
    },

    onDelete (value) {
      this.$emit('delete', value)
    }
  }
}
</script>

<style lang="less" scoped>
.w-tag-group {
  display: inline-block;
  font-size: 12px;
  color: #409eff;

  .w-tag {
    display: inherit;
    height: 32px;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    margin-right: 10px;
    background-color: #ecf5ff;

    .w-tag-icon {
      position: relative;
      right: -3px;
      cursor: pointer;
      height: 16px;
      width: 16px;
      text-align: center;
      line-height: 16px;
      border-radius: 50%;
    }

    .w-tag-icon:hover {
      color: #ffffff;
      background-color: #409eff;
    }
  }

  .w-tag-success {
    color: #67c23a;
    border: 1px solid #e1f3d8;
    background-color: #f0f9eb;
  }

  .w-tag-info {
    color: #909399;
    border: 1px solid #e9e9eb;
    background-color: #f4f4f5;
  }

  .w-tag-input {
    height: 30px;
    width: 100px;
    border-radius: 4px;
    margin-right: 10px;
  }

  .w-tag-add {
    display: inline-block;
    cursor: pointer;
    text-align: center;
    height: 30px;
    line-height: 30px;
    width: 20px;
    border: 1px solid #cccccc;
    border-radius: 4px;
  }
}
</style>
