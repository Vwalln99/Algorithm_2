"use strict";
//Priority queue - klasse die auf dem array values basiert
class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }
    dequeue() {
        return this.values.shift(); //entfernt und gibt das Element mit der höchsten Priorität aus der Queue zurück
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority); //sortiert die Queue nach der Priorität der Elemente
    }
}
class WeightedGraph {
    constructor() {
        this.adjacencyList = new Map;
    }
    addVertex(vertex) {
        this.adjacencyList.set(vertex, []);
    }
    addEdge(vertex1, vertex2, weight) {
        var _a, _b;
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            (_a = this.adjacencyList.get(vertex1)) === null || _a === void 0 ? void 0 : _a.push({ node: vertex2, edge: weight });
            (_b = this.adjacencyList.get(vertex2)) === null || _b === void 0 ? void 0 : _b.push({ node: vertex1, edge: weight });
        }
    }
    dijkstraSearch(start, end) {
        var _a, _b;
        const nodes = new PriorityQueue(); //verwendet eine Priority-Queue (nodes) für die Auswahl des Knotens mit der geringsten Entfernung
        const distances = {};
        const prev = {}; //distances und prev speichern die bisher gefundenen kürzesten Entfernungen und vorherigen Knoten auf dem Pfad
        let smallest;
        let nextNode;
        let sum = 0;
        let path = [];
        this.adjacencyList.forEach((_, key) => {
            if (key === start) {
                distances[key] = 0;
                nodes.enqueue(key, 0);
            }
            else {
                distances[key] = Infinity;
                nodes.enqueue(key, Infinity);
            }
            prev[key] = null;
        });
        //loop through graph
        while (nodes.values.length) {
            smallest = (_a = nodes.dequeue()) === null || _a === void 0 ? void 0 : _a.val;
            // if end
            if (smallest === end) {
                while (prev[smallest]) {
                    path.push(smallest);
                    smallest = prev[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList.get(smallest)) {
                    //search for neighbor nodes
                    nextNode = (_b = this.adjacencyList.get(smallest)) === null || _b === void 0 ? void 0 : _b.at(neighbor);
                    //calculate distances
                    sum = (distances[smallest]) + (nextNode === null || nextNode === void 0 ? void 0 : nextNode.edge);
                    //update list
                    if (sum < distances[nextNode === null || nextNode === void 0 ? void 0 : nextNode.node]) {
                        distances[nextNode === null || nextNode === void 0 ? void 0 : nextNode.node] = sum;
                        prev[nextNode === null || nextNode === void 0 ? void 0 : nextNode.node] = smallest;
                        nodes.enqueue(nextNode.node, sum);
                    }
                }
            }
        }
        return path.concat(smallest).reverse(); //gibt den kürzesten Pfad als Array von Knoten zurück
        //console.log("distances: ", distances, "nodes: ", nodes, "previous: ", prev);
    }
}
const graph1 = new WeightedGraph();
//create Vertices
graph1.addVertex("A");
graph1.addVertex("B");
graph1.addVertex("C");
graph1.addVertex("D");
graph1.addVertex("E");
graph1.addVertex("F");
//create edges
graph1.addEdge("A", "B", 5);
graph1.addEdge("A", "C", 3);
graph1.addEdge("B", "E", 3);
graph1.addEdge("C", "D", 2);
graph1.addEdge("C", "F", 5);
graph1.addEdge("D", "F", 1);
graph1.addEdge("D", "E", 3);
graph1.addEdge("E", "F", 1);
//
console.log(graph1.dijkstraSearch("A", "E"));
console.log(graph1.adjacencyList);
//# sourceMappingURL=weightedGraph.js.map