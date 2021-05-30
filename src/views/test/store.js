import Node from './node'

const flatNodes = (data) => {
  return data.reduce((res, node) => {
    res.push(node)
    if (node.children.length) {
      res = res.concat(flatNodes(node.children))
    }
    return res
  }, [])
}

const coerceTruthyValueToArray = (val) => {
  if (Array.isArray(val)) {
    return val
  } else if (val) {
    return [val]
  } else {
    return []
  }
}

export default class Store {
  constructor (data, config) {
    this.config = config
    this.initNodes(data)
  }

  initNodes (data) {
    data = coerceTruthyValueToArray(data)
    this.nodes = data.map(nodeData => new Node(nodeData, this.config))
    // this.flattedNodes = this.getFlattedNodes(false, false)
    // this.leafNodes = this.getFlattedNodes(true, false)
  }

  appendNode (nodeData, parentNode) {
    const node = new Node(nodeData, this.config, parentNode)
    const children = parentNode ? parentNode.children : this.nodes

    children.push(node)
  }

  appendNodes (nodeDataList, parentNode) {
    // nodeDataList = coerceTruthyValueToArray(nodeDataList)
    // nodeDataList.forEach(nodeData => this.appendNode(nodeData, parentNode))
  }

  getNodes () {
    return this.nodes
  }

  getFlattedNodes () {
    console.log(flatNodes(this.nodes))
    return flatNodes(this.nodes)
  }
}
