<template>
  <div class="cascader-menu">
    <div class="cascader-menu__wrap">
      <ul class="cascader-menu__list">
        <cascader-node
          v-for="(node, index) in nodes"
          :key="index"
          :node="node"
        ></cascader-node>
      </ul>
    </div>
  </div>
</template>
<script>
import CascaderNode from './cascader-node.vue'

export default {
  name: 'ElCascaderMenu',

  components: {
    CascaderNode
  },

  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: Number
  },

  data () {
    return {
      activeNode: null,
      hoverTimer: null,
      isEmpty: false
    }
  }

}
</script>
<style scoped lang="less">
.cascader-menu {
  min-width: 180px;
  box-sizing: border-box;
  color: #606266;
  border-right: solid 1px #E4E7ED;
  &:last-child {
    border-right: none;
    .cascader-node {
      padding-right: 20px;
    }
  }
  .cascader-menu__wrap {
    height: 204px;
    overflow: auto;
    .cascader-menu__list {
      position: relative;
      min-height: 100%;
      margin: 0;
      padding: 6px 0;
      list-style: none;
      box-sizing: border-box;
    }
  }
}
</style>
