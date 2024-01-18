"use strict";
/*const adjacencyList = new Map();
adjacencyList.set("A", ["B","E"]);
adjacencyList.set("B", ["A","C", "D"]);
console.log(adjacencyList);*/
class Graph {
    constructor() {
        this.adjacencyList = new Map(); //erstellt neuen Graphen
    }
    addVertex(vertex) {
        this.adjacencyList.set(vertex, []); //erstellt Knoten
    }
    addEdge(vertex1, vertex2) {
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) { //abfrage ob es knoten gibt
            this.adjacencyList.get(vertex1).push(vertex2);
            this.adjacencyList.get(vertex2).push(vertex1);
        }
    }
    removeEdge(vertex1, vertex2) {
        //filter
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.set(vertex1, this.adjacencyList.get(vertex1).filter((a) => a !== vertex2));
            this.adjacencyList.set(vertex2, this.adjacencyList.get(vertex2).filter((a) => a !== vertex1));
        }
    }
    removeVertex() {
        while (this.adjacencyList.get(vertex).length) {
            this.removeEdge(vertex, this.adjacencyList.get(vertex).pop());
        }
        this.adjacencyList.delete(vertex);
    }
    dephtFirst(startVertex) {
        var _a;
        //iterativ
        const stack = [startVertex];
        const result = [];
        const visited = {};
        let currentVertex = null;
        visited[startVertex] = true;
        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);
            (_a = this.adjacencyList.get(currentVertex)) === null || _a === void 0 ? void 0 : _a.forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            });
        }
        return result;
    }
    //recursiv
    dephtFirstRec(startVertex) {
        const result = [];
        const visited = {};
        const dfs = (vertex) => {
            var _a;
            if (!vertex)
                return null;
            visited[vertex] = true;
            result.push(vertex);
            (_a = this.adjacencyList.get(vertex)) === null || _a === void 0 ? void 0 : _a.forEach((neighbor) => {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            });
        };
        dfs(startVertex);
        return result;
    }
    breadthFirst(startVertex) {
        var _a;
        const queue = [startVertex];
        const result = [];
        const visited = {};
        let currentVertex = null;
        visited[startVertex] = true;
        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);
            (_a = this.adjacencyList.get(currentVertex)) === null || _a === void 0 ? void 0 : _a.forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }
    //recbreadth
    bradthFirstRec(startVertex) {
        const queue = [startVertex];
        let currentVertex = null;
        const visited = [];
        const bfs = () => {
            var _a, _b, _c;
            currentVertex = queue.shift();
            visited.push(currentVertex);
            (_c = (_b = (_a = this.adjacencyList.get(currentVertex)) === null || _a === void 0 ? void 0 : _a.slice()) === null || _b === void 0 ? void 0 : _b.reverse()) === null || _c === void 0 ? void 0 : _c.forEach((node) => {
                if (!visited.includes(node) && !queue.includes(node)) {
                    queue.push(node);
                }
            });
            if (queue.length)
                bfs();
        };
        bfs();
        return visited;
    }
}
const graph = new Graph();
graph.addVertex("Berlin");
graph.addVertex("Wien");
graph.addVertex("London");
graph.addVertex("Barcelona");
graph.addEdge("Berlin", "London");
graph.addEdge("Wien", "Barcelona");
console.log(graph.dephtFirst("Berlin"));
console.log(graph.breadthFirst("Berlin"));
console.log(graph.adjacencyList);
//# sourceMappingURL=graph.js.map