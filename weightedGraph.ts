//Priority queue - klasse die auf dem array values basiert
class PriorityQueue<T>{
    values: { val: T, priority: number }[] = [];
    enqueue(val: T, priority: number) { //fügt ein Element mit Wert val und Priorität priority zur Queue hinzu und sortiert die Queue danach
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


type Edge<T, U> = { node: T; edge: U }; //definiert einen Typ Edge für die Darstellung einer Kante im gewichteten Graphen

class WeightedGraph<T, U>{ //ist eine generische Klasse für einen gewichteten Graphen, sie verwendet eine Map, um die Adjazenzliste zu repräsentieren
    adjacencyList = new Map<T, Edge<T, U>[]>;
    addVertex(vertex: T) { //fügt einen Knoten zum Graphen hinzu und initialisiert die Adjazenzliste dieses Knotens mit einem leeren Array
        this.adjacencyList.set(vertex, []);
    }
    addEdge(vertex1: T, vertex2: T, weight: U) { //fügt eine gewichtete Kante zwischen vertex1 und vertex2 mit dem Gewicht weight zum Graphen hinzu, dabei wird die Adjazenzliste aktualisiert.
        if (this.adjacencyList.get(vertex1) && this.adjacencyList.get(vertex2)) {
            this.adjacencyList.get(vertex1)?.push({ node: vertex2, edge: weight } as Edge <T, U>);
            this.adjacencyList.get(vertex2)?.push({ node: vertex1, edge: weight } as Edge <T, U>);
        }
    }
    dijkstraSearch(start: T, end: T) { //implementiert den Dijkstra-Algorithmus, um den kürzesten Pfad zwischen start und end zu finden
        const nodes = new PriorityQueue(); //verwendet eine Priority-Queue (nodes) für die Auswahl des Knotens mit der geringsten Entfernung
        const distances: { [key: string]: number } = {};
        const prev: { [key: string]: number | null } = {}; //distances und prev speichern die bisher gefundenen kürzesten Entfernungen und vorherigen Knoten auf dem Pfad
        let smallest: T;
        let nextNode: Edge<T, U>;
        let sum: number = 0;
        let path: T[] = [];
        this.adjacencyList.forEach((_, key) => {
            if (key === start) {
                distances[key as string] = 0;
                nodes.enqueue(key, 0);
            } else {
                distances[key as string] = Infinity;
                nodes.enqueue(key, Infinity);
            }
            prev[key as string] = null;
        });
        //loop through graph
        while (nodes.values.length) {
            smallest = nodes.dequeue()?.val as T;
            // if end
            if (smallest === end) {
                while (prev[smallest as string]) {
                    path.push(smallest);
                    smallest = prev[smallest as string] as T;
                }
                break;
            }
            if (smallest || distances[smallest as string] !== Infinity) {
                for (let neighbor in this.adjacencyList.get(smallest)) {
                    //search for neighbor nodes
                    nextNode = this.adjacencyList.get(smallest)?.at(neighbor as any) as Edge<T, U>;
                    //calculate distances
                    sum = (distances[smallest as string]) as any + nextNode?.edge;
                    //update list
                    if (sum < distances[nextNode?.node as string]) {
                        distances[nextNode?.node as string] = sum;
                        prev[nextNode?.node as string] = smallest as number;
                        nodes.enqueue(nextNode!.node, sum);
                    }
                }
            }
        }
        return path.concat(smallest!).reverse(); //gibt den kürzesten Pfad als Array von Knoten zurück
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

