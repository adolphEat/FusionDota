import { SearchFunction, Pathfinder, PathNode } from '../types';

/**
 * Depth-First Search algorithm implementation
 * Explores as far as possible along each branch before backtracking
 */
export class DFS {
    /**
     * DFS search function
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

        // Use stack for DFS (LIFO)
        const stack: PathNode[] = [startNode];
        
        while (stack.length > 0) {
            // Get last node from stack (LIFO)
            const currentNode = stack.pop()!;
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
                
                // Set parent and add to stack
                neighbor.parent = currentNode;
                neighbor.g = currentNode.g + 1; // Each step costs 1
                neighbor.opened = true;
                stack.push(neighbor);
            }
        }
        
        // No path found
        return null;
    };
}
