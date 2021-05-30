<template>
  <div
    :class="['cascader-panel','is-bordered']">
    <cascader-menu
      ref="menu"
      v-for="(menu, index) in menus"
      :index="index"
      :key="index"
      :nodes="menu"></cascader-menu>
  </div>
</template>

<script>
import CascaderMenu from './cascader-menu'
import Store from './store'
export default {
  name: 'ElCascaderPanel',

  components: {
    CascaderMenu
  },

  props: {
    value: {},
    options: Array,
    props: Object,
    border: {
      type: Boolean,
      default: true
    },
    renderLabel: Function
  },

  provide () {
    return {
      panel: this
    }
  },

  data () {
    return {
      checkedValue: null,
      checkedNodePaths: [],
      store: [],
      menus: [],
      activePath: [],
      loadCount: 0
    }
  },

  computed: {
    renderLabelFn () {
      return this.renderLabel || this.$scopedSlots.default
    }
  },

  watch: {
    options: {
      handler: function () {
        this.initStore()
      },
      immediate: true,
      deep: true
    },
    checkedValue (val) {
      if (this.value) {
        this.checkStrictly && this.calculateCheckedNodePaths()
      }
    }
  },

  methods: {
    initStore () {
      this.store = new Store(this.options)
      this.menus = [this.store.getNodes()]
    },
    handleCheckChange (value) {
      this.checkedValue = value
    },
    handleExpand (node) {
      const { activePath } = this
      const { level } = node
      const path = activePath.slice(0, level - 1)
      const menus = this.menus.slice(0, level)
      if (node.children.length) {
        menus.push(node.children)
      }
      path.push(node)
      this.activePath = path
      this.menus = menus
      // const pathValues = path.map(node => node.getValue())
      this.$emit('expand-change', path)
    },
    getFlattedNodes () {
      return this.store.getFlattedNodes()
    }
  }
}
</script>
<style scoped lang=less>
.cascader-panel {
  display: flex;
  border-radius: 4px;
  font-size: 14px;
  border: solid 1px #E4E7ED;
}
</style>
