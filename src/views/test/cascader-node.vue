<template>
  <li
    class="cascader-node"
    :class="{'in-active-path': inActivePath}"
    @click="handleCheckChange"
  >
    <span style="text-overflow: ellipsis;white-space: nowrap">{{ renderContent() }}</span>
    <i
      v-if="node.children.length"
      :class="['cascader-node__postfix', inActivePath ? 'isShowIcon' : '']">
    </i>
  </li>
</template>
<script>
// import ElCheckbox from 'element-ui/packages/checkbox'
// import ElRadio from 'element-ui/packages/radio'

export default {
  inject: ['panel'],

  components: {
    // ElCheckbox,
    // ElRadio
  },

  props: {
    node: {
      required: true
    },
    nodeId: String,
    renderLabel: Function
  },

  computed: {
    config () {
      return this.panel.config
    },
    inActivePath () {
      return this.isInPath(this.panel.activePath)
    }
  },

  methods: {
    renderContent () {
      const { node } = this
      return node.label
    },
    handleCheckChange () {
      const { panel, node } = this
      panel.handleExpand(node)
    },
    isInPath (pathNodes) {
      const { node } = this
      const selectedPathNode = pathNodes[node.level - 1] || {}
      return selectedPathNode.uid === node.uid
    }
  }
}
</script>
<style scoped lang="less">
.cascader-node {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 30px 0 20px;
  height: 34px;
  line-height: 34px;
  outline: none;
  cursor: pointer;
  .cascader-node__postfix {
    position: absolute;
    right: 10px;
    &:before {
      content: '';
      display: inherit;
      width: 9px;
      height: 9px;
      border-top: 1.5px solid #848588;
      border-right: 1.5px solid #848588;
      transform: rotate(45deg);
    }
  }
  .cascader-node__postfix.isShowIcon:before {
    border-color: #fff;
  }
  &.in-active-path {
    color: #FFF;
    background: #3a8ee6 !important;
  }
  &:hover {
    background: #F5F7FA;
  }
}
</style>
