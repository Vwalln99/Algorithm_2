/*const adjacencyList = new Map();
adjacencyList.set("A", ["B","E"]);
adjacencyList.set("B", ["A","C", "D"]);
console.log(adjacencyList);*/

type AdjacencyList<T> = Map<TemplateStringsArray, T[]>;

class Graph<T>{
    adjacencyList = new Map(); //erstellt neuen Graphen

    addVertex(vertex: T) {
        this.adjacencyList.set(vertex, []); //erstellt Knoten
    }
    addEdge(vertex1: T, vertex2: T) {
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {//abfrage ob es knoten gibt
            this.adjacencyList.get(vertex1).push(vertex2);
            this.adjacencyList.get(vertex2).push(vertex1);
        }
    }
    removeEdge(vertex1: T, vertex2: T) {
        //filter
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.set(vertex1, this.adjacencyList.get(vertex1).filter((a) => a !== vertex2) as T[]);
            this.adjacencyList.set(vertex2, this.adjacencyList.get(vertex2).filter((a) => a !== vertex1) as T[]);
        }
    }
    removeVertex() {
        while (this.adjacencyList.get(vertex).length) {
            this.removeEdge(vertex, this.adjacencyList.get(vertex).pop() as T);
        } this.adjacencyList.delete(vertex);
    }
    dephtFirst(startVertex: T) {
        //iterativ
        const stack = [startVertex];
        const result: T[] = [];
        const visited: { [key: string]: boolean } = {};
        let currentVertex: T | null = null;
        visited[startVertex as string] = true;
        while (stack.length) {
            currentVertex = stack.pop() as T;
            result.push(currentVertex);
            this.adjacencyList.get(currentVertex)?.forEach((neighbor: T) => {
                if (!visited[neighbor as string]) {
                    visited[neighbor as string] = true;
                    stack.push(neighbor);
                }

            });

        }
        return result;
    }
    //recursiv
    dephtFirstRec(startVertex: T): T[] {
        const result: T[] = [];
        const visited: { [key: string]: boolean } = {};
        const dfs = (vertex: T) => {
            if (!vertex) return null;
            visited[vertex as string] = true;
            result.push(vertex);
            this.adjacencyList.get(vertex)?.forEach((neighbor: T) => {
                if (!visited[neighbor as string]) {
                    dfs(neighbor);
                }
            });
        };
        dfs(startVertex);
        return result;
    }
    breadthFirst(startVertex: T) {
        const queue = [startVertex];
        const result: T[] = [];
        const visited: { [key: string]: boolean } = {};
        let currentVertex: T | null = null;
        visited[startVertex as string] = true;
        while (queue.length) {
            currentVertex = queue.shift() as T;
            result.push(currentVertex);
            this.adjacencyList.get(currentVertex)?.forEach((neighbor: T) => {
                if (!visited[neighbor as string]) {
                    visited[neighbor as string] = true;
                    queue.push(neighbor);
                }

            });

        }
        return result;
    }
    //recbreadth
    bradthFirstRec(startVertex: T) {
        const queue = [startVertex];
        let currentVertex:T|null=null;
        const visited: T[] = []
            const bfs = () => {
                currentVertex = queue.shift() as T;
                visited.push(currentVertex);
                this.adjacencyList.get(currentVertex)?.slice()?.reverse()?.forEach((node) => {
                    if (!visited.includes(node) && !queue.includes(node)) {
                        queue.push(node);
                    }
                });
                if (queue.length) bfs();
            };
            bfs();
            return visited;
    }
}


const graph = new Graph<string>();
graph.addVertex("Berlin");
graph.addVertex("Wien");
graph.addVertex("London");
graph.addVertex("Barcelona");
graph.addEdge("Berlin", "London");
graph.addEdge("Wien", "Barcelona");
console.log(graph.dephtFirst("Berlin"));
console.log(graph.breadthFirst("Berlin"));
console.log(graph.adjacencyList);