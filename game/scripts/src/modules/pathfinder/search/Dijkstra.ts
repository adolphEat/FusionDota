import { SearchFunction, Pathfinder, PathNode } from '../types';

/**
 * Dijkstra's algorithm implementation
 * Finds shortest path without using heuristics
 */
export class Dijkstra {
    /**
     * Dijkstra search function
     */
    public static search: SearchFunction = (
        finder: Pathfinder,
        startNode: PathNode,
        endNode: PathNode,
        toClear: Set<PathNode>,
        tunnel: boolean = false
    ): PathNode | null => {
        // Initialize start node
        startNode.g = 0;
        startNode.f = 0;
        startNode.opened = true;
        toClear.add(startNode);

        // Use a simple array as open list
        const openList: PathNode[] = [startNode];
        
        while (openList.length > 0) {
            // Find node with lowest G cost (since no heuristic, F = G)
            let currentIndex = 0;
            for (let i = 1; i < openList.length; i++) {
                if (openList[i].g < openList[currentIndex].g) {
                    currentIndex = i;
                }
            }
            
            const currentNode = openList.splice(currentIndex, 1)[0];
            currentNode.closed = true;
            
            // Check if we reached the goal
            if (currentNode === endNode) {
                return currentNode;
            }
            
            // Get neighbors
            const neighbors = finder.grid.getNeighbours(
                currentNode, 
                finder.walkable, 
                finder.allowDiagonal, 
                tunnel
            );
            
            for (const neighbor of neighbors) {
                if (neighbor.closed) {
                    continue;
                }
                
                toClear.add(neighbor);
                
                // Calculate tentative G cost
                const tentativeG = currentNode.g + this.calculateCost(currentNode, neighbor);
                
                if (!neighbor.opened || tentativeG < neighbor.g) {
                    // This path is better than any previous one
                    neighbor.parent = currentNode;
                    neighbor.g = tentativeG;
                    neighbor.f = tentativeG; // F = G for Dijkstra
                    
                    if (!neighbor.opened) {
                        openList.push(neighbor);
                        neighbor.opened = true;
                    }
                }
            }
        }
        
        // No path found
        return null;
    };

    /**
     * Calculate movement cost between two adjacent nodes
     */
    private static calculateCost(from: PathNode, to: PathNode): number {
        const dx = Math.abs(to.x - from.x);
        const dy = Math.abs(to.y - from.y);
        
        if (dx === 0 || dy === 0) {
            // Orthogonal movement
            return 1;
        } else {
            // Diagonal movement
            return Math.SQRT2;
        }
    }
}
