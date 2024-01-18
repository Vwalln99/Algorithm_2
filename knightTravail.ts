//Knight Travails mit breadth-first

//Knight
class Knight {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    validMoves(): { x: number, y: number }[] { //gibt mir die anzahl der möglichen Zügen vom startpunkt 0,0 
        const moves = [
            { x: 2, y: 1 },
            { x: -2, y: 1 },
            { x: 2, y: -1 },
            { x: -2, y: -1 },
            { x: 1, y: 2 },
            { x: -1, y: 2 },
            { x: 1, y: -2 },
            { x: -1, y: -2 }
        ];
        return moves.map(move => ({
            x: this.x + move.x,
            y: this.y + move.y
        }));
    }
    //breadthFirst
    bfs(start: { x: number, y: number }, end: { x: number, y: number }, chessboard: Board): { distance: number, path: { x: number, y: number }[] } {
        const queue = [{ position: start, distance: 0, path: [start] }]; //distance wird inkrementiert und gibt somit die anzahl der züge aus
        const visited: boolean[][] = Array.from({ length: chessboard.size }, () => Array(chessboard.size).fill(false));//kopiert array und setzt alle kästchen auf false
        while (queue.length > 0) {
            const { position, distance, path } = queue.shift()!;
            const { x, y } = position;
            if (x === end.x && y === end.y) {
                return { distance, path };
            }
            if (!visited[x][y]) {
                visited[x][y] = true; //!visited setzt kästchen von false auf true, also von not visited zu visited - verhindert das zurückspringen
                const validMoves = this.validMoves().filter(move =>
                    chessboard.validPosition(move.x, move.y)
                );

                for (const move of validMoves) {
                    queue.push({
                        position: move,
                        distance: distance + 1,
                        path: path.concat([move])
                    });
                }
            }
        }
        return { distance: -1, path: [] }; //wenn man sich ausserhalb des Spielfeldes befindet
    }
}

//Board
class Board {
    size: number;

    constructor(size: number) {
        this.size = size;
    }

    validPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.size && y >= 0 && y < this.size; //kontrolliert, ob man sich noch innerhalb des Spielfeldes sich befindet
    }
}



//output
const chessboard = new Board(8); //8 = size
const start = { x: 3, y: 3};
const end = { x: 0, y: 0 };

const knight = new Knight(start.x, start.y);

const shortestDistance = knight.bfs(start, end, chessboard);

console.log(shortestDistance.distance, shortestDistance.path);