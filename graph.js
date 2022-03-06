class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vert of vertexArray) {
      this.nodes.add(vert);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent = new Set([...v1.adjacent, v2]);
    v2.adjacent = new Set([...v2.adjacent, v1]);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (let node of vertex.adjacent){
      node.adjacent.delete(vertex)
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let values = []
    let visited = new Set();
    function traverse(node=start){
      if (node == null) return
      if (!visited.has(node.value)){
        visited.add(node.value)
        values.push(node.value)
        for (let adj of node.adjacent){          
          traverse(adj)
        }
      }
    }
    traverse()
    return values
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start]
    let values = []
    let visited = new Set()
    while (queue.length) {
      let current = queue.shift();
      if (!visited.has(current.value)){
        for (let node of current.adjacent){
          if (!visited.has(node.value)){
            queue.push(node)
          }
        }
        visited.add(current.value);
        values.push(current.value)
      }
    }

    return values
  }
}

module.exports = { Graph, Node };
