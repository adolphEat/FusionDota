import { SearchFunction, Pathfinder, PathNode } from '../types';

/**
 * Breadth-First Search algorithm implementation
 * Explores all nodes at current depth before moving to next level
 */
export class BFS {
    /**
     * BFS search function
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
        startNode.opened = true;
        toClear.add(startNode);

        // Use queue for BFS (FIFO)
        const queue: PathNode[] = [startNode];
        
        while (queue.length > 0) {
            // Get first node from queue (FIFO)
            const currentNode = queue.shift()!;
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
                if (neighbor.opened || neighbor.closed) {
                    continue;
                }
                
                toClear.add(neighbor);
                
                // Set parent and add to queue
                neighbor.parent = currentNode;
                neighbor.g = currentNode.g + 1; // Each step costs 1
                neighbor.opened = true;
                queue.push(neighbor);
            }
        }
        
        // No path found
        return null;
    };
}
