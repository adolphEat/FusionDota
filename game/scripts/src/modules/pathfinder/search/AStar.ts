import { SearchFunction, Pathfinder, PathNode } from '../types';
import { Heuristics } from '../core/Heuristics';

/**
 * A* pathfinding algorithm implementation
 * Combines the best of Dijkstra's algorithm and greedy best-first search
 * Based on zizouqi autochess project's A* implementation
 */
export class AStar {
    /**
     * A* search function
     * Based on zizouqi project's A* search logic
     */
    public static search: SearchFunction = (
        finder: Pathfinder,
        startNode: PathNode,
        endNode: PathNode,
        toClear: Set<PathNode>,
        tunnel: boolean = false
    ): PathNode | null => {
        const heuristic = finder.heuristic;
        
        // Initialize start node (based on zizouqi project's initialization)
        startNode.g = 0;
        startNode.h = heuristic(endNode.x - startNode.x, endNode.y - startNode.y);
        startNode.f = startNode.g + startNode.h;
        startNode.opened = true;
        toClear.add(startNode);

        // Use a simple array as open list for now (can be optimized with BinaryHeap)
        // Based on zizouqi project's open list management
        const openList: PathNode[] = [startNode];
        
        while (openList.length > 0) {
            // Find node with lowest F cost (based on zizouqi project's node selection)
            let currentIndex = 0;
            for (let i = 1; i < openList.length; i++) {
                if (openList[i].f < openList[currentIndex].f) {
                    currentIndex = i;
                }
            }
            
            const currentNode = openList.splice(currentIndex, 1)[0];
            currentNode.closed = true;
            
            // Check if we reached the goal (based on zizouqi project's goal check)
            if (currentNode === endNode) {
                return currentNode;
            }
            
            // Get neighbors (based on zizouqi project's neighbor expansion)
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
                
                // Calculate tentative G cost (based on zizouqi project's cost calculation)
                const tentativeG = currentNode.g + this.calculateCost(currentNode, neighbor);
                
                if (!neighbor.opened || tentativeG < neighbor.g) {
                    // This path is better than any previous one
                    // Based on zizouqi project's path improvement logic
                    neighbor.parent = currentNode;
                    neighbor.g = tentativeG;
                    neighbor.h = heuristic(endNode.x - neighbor.x, endNode.y - neighbor.y);
                    neighbor.f = neighbor.g + neighbor.h;
                    
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
     * Based on zizouqi project's cost calculation system
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
