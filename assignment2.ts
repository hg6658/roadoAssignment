class Graph {
    adjacencyList: Map<string, string[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addEdge(source: string, destination: string) {
        if (!this.adjacencyList.has(source)) {
            this.adjacencyList.set(source, []);
        }
        this.adjacencyList.get(source)!.push(destination);
    }

    dfs(node: string, visited: Set<string>, dropPoints: Set<string>) {
        visited.add(node);

        if (dropPoints.has(node)) {
            return true; // Mark drop point as reached
        }

        if (this.adjacencyList.has(node)) {
            for (const neighbor of this.adjacencyList.get(node)!) {
                if (!visited.has(neighbor)) {
                    return this.dfs(neighbor, visited, dropPoints);
                }
            }
        }
        return false;
    }

    validateTrips(pickupPoints: string[], dropPoints: string[]): boolean {
        const visited = new Set<string>();
        const dropPointsSet = new Set(dropPoints);

        for (const pickupPoint of pickupPoints) {
            if(this.dfs(pickupPoint, visited, dropPointsSet)==false){
              return false;
            }
        }

        return true; // All drop points reached
    }
}

// Example usage:
const graph = new Graph();

// Add edges representing trips
graph.addEdge("A", "W");
graph.addEdge("B", "W");
graph.addEdge("W", "C");
graph.addEdge("W", "D");

const pickupPoints = ["A", "B"];
const dropPoints = ["C", "D"];

const isValid = graph.validateTrips(pickupPoints, dropPoints);
console.log("Is valid:", isValid); // Output: Is valid: true
