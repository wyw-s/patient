
let uid = 0

export default class Node {
  constructor (data, config, parentNode) {
    this.data = data
    this.config = config
    this.parent = parentNode || null
    this.level = !this.parent ? 1 : this.parent.level + 1
    this.uid = uid++

    this.initState()
    this.initChildren()
  }

  initState () {
    this.value = this.data['value']
    this.label = this.data['label']
    this.pathNodes = this.calculatePathNodes()
    this.path = this.pathNodes.map(node => node.value)
    this.pathLabels = this.pathNodes.map(node => node.label)
  }

  initChildren () {
    const { config } = this
    const childrenData = this.data['children']
    this.hasChildren = Array.isArray(childrenData)
    this.children = (childrenData || []).map(child => new Node(child, config, this))
  }

  calculatePathNodes () {
    const nodes = [this]
    let parent = this.parent

    while (parent) {
      nodes.unshift(parent)
      parent = parent.parent
    }

    return nodes
  }

  getPath () {
    return this.path
  }

  getValue () {
    return this.value
  }

  getText () {
    return this.pathLabels.join(` / `)
  }

  onChildCheck () {
    const { children } = this
    const validChildren = children.filter(child => !child.isDisabled)
    const checked = validChildren.length
      ? validChildren.every(child => child.checked)
      : false

    this.setCheckState(checked)
  }

  setCheckState (checked) {
    const totalNum = this.children.length
    const checkedNum = this.children.reduce((c, p) => {
      const num = p.checked ? 1 : (p.indeterminate ? 0.5 : 0)
      return c + num
    }, 0)

    this.checked = checked
    this.indeterminate = checkedNum !== totalNum && checkedNum > 0
  }
}
