  import { Pathfinder, Grid, Heuristics } from '../index';

/**
 * Basic pathfinding usage examples
 * Demonstrates how to use the pathfinding module
 */
export class PathfindingExamples {
    
    /**
     * Example 1: Simple A* pathfinding
     */
    public static simpleAStar(): void {
        console.log('=== Simple A* Pathfinding Example ===');
        
        // Create a simple 5x4 map (0 = walkable, 1 = obstacle)
        const map = [
            [0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ];
        
        // Create grid and pathfinder
        const grid = new Grid(map, 0); // 0 = walkable
        const pathfinder = new Pathfinder(grid, 'ASTAR', 0);
        
        // Find path from top-left to top-right
        const path = pathfinder.getPath(0, 0, 4, 0);
        
        if (path) {
            console.log('✅ Path found!');
            console.log('Path length:', path.getLength().toFixed(2));
            console.log('Number of nodes:', path.getNodeCount());
            console.log('Path positions:', path.toPositions());
        } else {
            console.log('❌ No path found');
        }
        
        console.log('');
    }
    
    /**
     * Example 2: Different algorithms comparison
     */
    public static algorithmComparison(): void {
        console.log('=== Algorithm Comparison Example ===');
        
        // Create a more complex map
        const map = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        
        const grid = new Grid(map, 0);
        const algorithms: Array<'ASTAR' | 'DIJKSTRA' | 'BFS' | 'DFS'> = ['ASTAR', 'DIJKSTRA', 'BFS', 'DFS'];
        
        for (const algorithm of algorithms) {
            const pathfinder = new Pathfinder(grid, algorithm, 0);
            const startTime = Date.now();
            
            const path = pathfinder.getPath(0, 0, 7, 6);
            const endTime = Date.now();
            
            if (path) {
                console.log(`${algorithm}: Path found in ${endTime - startTime}ms, Length: ${path.getLength().toFixed(2)}`);
            } else {
                console.log(`${algorithm}: No path found in ${endTime - startTime}ms`);
            }
        }
        
        console.log('');
    }
    
    /**
     * Example 3: Different heuristics comparison
     */
    public static heuristicComparison(): void {
        console.log('=== Heuristic Comparison Example ===');
        
        const map = [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ];
        
        const grid = new Grid(map, 0);
        const pathfinder = new Pathfinder(grid, 'ASTAR', 0);
        
        const heuristics = ['MANHATTAN', 'EUCLIDEAN', 'CHEBYSHEV', 'OCTILE'];
        
        for (const heuristic of heuristics) {
            pathfinder.setHeuristic(heuristic);
            const path = pathfinder.getPath(0, 0, 4, 2);
            
            if (path) {
                console.log(`${heuristic}: Path length ${path.getLength().toFixed(2)}`);
            } else {
                console.log(`${heuristic}: No path found`);
            }
        }
        
        console.log('');
    }
    
    /**
     * Example 4: Diagonal vs Orthogonal movement
     */
    public static movementModes(): void {
        console.log('=== Movement Modes Example ===');
        
        const map = [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ];
        
        const grid = new Grid(map, 0);
        const pathfinder = new Pathfinder(grid, 'ASTAR', 0);
        
        // Diagonal movement
        pathfinder.setMode('DIAGONAL');
        const diagonalPath = pathfinder.getPath(0, 0, 4, 2);
        
        // Orthogonal movement
        pathfinder.setMode('ORTHOGONAL');
        const orthogonalPath = pathfinder.getPath(0, 0, 4, 2);
        
        if (diagonalPath) {
            console.log('Diagonal movement: Path length', diagonalPath.getLength().toFixed(2));
        }
        
        if (orthogonalPath) {
            console.log('Orthogonal movement: Path length', orthogonalPath.getLength().toFixed(2));
        }
        
        console.log('');
    }
    
    /**
     * Example 5: Custom walkable function
     */
    public static customWalkableFunction(): void {
        console.log('=== Custom Walkable Function Example ===');
        
        // Create a map with different terrain types
        const map = [
            [0, 1, 2, 3, 4], // 0=grass, 1=water, 2=forest, 3=mountain, 4=wall
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
            [0, 1, 2, 3, 4],
        ];
        
        // Custom walkable function - only grass and forest are walkable
        const walkableFunction = (value: any) => {
            return value === 0 || value === 2; // grass or forest
        };
        
        const grid = new Grid(map, walkableFunction);
        const pathfinder = new Pathfinder(grid, 'ASTAR', walkableFunction);
        
        const path = pathfinder.getPath(0, 0, 4, 3);
        
        if (path) {
            console.log('✅ Path found with custom walkable function!');
            console.log('Path length:', path.getLength().toFixed(2));
        } else {
            console.log('❌ No path found with custom walkable function');
        }
        
        console.log('');
    }
    
    /**
     * Run all examples
     */
    public static runAllExamples(): void {
        console.log('🚀 Running Pathfinding Module Examples\n');
        
        this.simpleAStar();
        this.algorithmComparison();
        this.heuristicComparison();
        this.movementModes();
        this.customWalkableFunction();
        
        console.log('✨ All examples completed!');
    }
}

// Export for use in other files
export default PathfindingExamples;
