import { 
    Pathfinder as IPathfinder, 
    Grid, 
    Path, 
    PathNode, 
    SearchAlgorithm, 
    SearchMode, 
    HeuristicFunction 
} from './types';
import { Heuristics } from './core/Heuristics';
import { Path as PathClass } from './core/Path';
import { AStar } from './search/AStar';
import { Dijkstra } from './search/Dijkstra';
import { BFS } from './search/BFS';
import { DFS } from './search/DFS';

/**
 * Main pathfinder class that integrates all search algorithms
 * Provides a unified interface for different pathfinding methods
 * Based on zizouqi autochess project's pathfinder architecture
 */
export class Pathfinder implements IPathfinder {
    public grid: Grid;
    public algorithm: SearchAlgorithm = 'ASTAR';
    public walkable: number | ((value: any) => boolean) = 0;
    public allowDiagonal: boolean = true;
    public heuristic: HeuristicFunction = Heuristics.MANHATTAN;

    private toClear: Set<PathNode> = new Set();
    private lastPathCost: number = 0;

    constructor(
        grid: Grid,
        algorithm: SearchAlgorithm = 'ASTAR',
        walkable: number | ((value: any) => boolean) = 0
    ) {
        this.setGrid(grid);
        this.setAlgorithm(algorithm);
        this.setWalkable(walkable);
        this.setMode('DIAGONAL');
        this.setHeuristic('MANHATTAN');
    }

    /**
     * Set the grid for pathfinding
     * Based on zizouqi project's grid management
     */
    public setGrid(grid: Grid): Pathfinder {
        this.grid = grid;
        return this;
    }

    /**
     * Get the current grid
     */
    public getGrid(): Grid {
        return this.grid;
    }

    /**
     * Set the search algorithm
     * Based on zizouqi project's algorithm selection
     */
    public setAlgorithm(algorithm: SearchAlgorithm): Pathfinder {
        const validAlgorithms: SearchAlgorithm[] = ['ASTAR', 'DIJKSTRA', 'BFS', 'DFS', 'JPS'];
        if (!validAlgorithms.includes(algorithm)) {
            throw new Error(`Invalid algorithm: ${algorithm}. Valid options: ${validAlgorithms.join(', ')}`);
        }
        this.algorithm = algorithm;
        return this;
    }

    /**
     * Get the current algorithm
     */
    public getAlgorithm(): SearchAlgorithm {
        return this.algorithm;
    }

    /**
     * Get all available algorithms
     * Based on zizouqi project's supported algorithms
     */
    public getAlgorithms(): SearchAlgorithm[] {
        return ['ASTAR', 'DIJKSTRA', 'BFS', 'DFS', 'JPS'];
    }

    /**
     * Set the walkable value or function
     * Based on zizouqi project's walkable criteria system
     */
    public setWalkable(walkable: number | ((value: any) => boolean)): Pathfinder {
        this.walkable = walkable;
        return this;
    }

    /**
     * Get the current walkable value
     */
    public getWalkable(): number | ((value: any) => boolean) {
        return this.walkable;
    }

    /**
     * Set the search mode (diagonal or orthogonal)
     * Based on zizouqi project's movement mode system
     */
    public setMode(mode: SearchMode): Pathfinder {
        this.allowDiagonal = mode === 'DIAGONAL';
        return this;
    }

    /**
     * Get the current mode
     */
    public getMode(): SearchMode {
        return this.allowDiagonal ? 'DIAGONAL' : 'ORTHOGONAL';
    }

    /**
     * Get all available modes
     */
    public getModes(): SearchMode[] {
        return ['DIAGONAL', 'ORTHOGONAL'];
    }

    /**
     * Set the heuristic function
     * Based on zizouqi project's heuristic system
     */
    public setHeuristic(heuristic: HeuristicFunction | string): Pathfinder {
        if (typeof heuristic === 'string') {
            this.heuristic = Heuristics.get(heuristic);
        } else {
            this.heuristic = heuristic;
        }
        return this;
    }

    /**
     * Get the current heuristic function
     */
    public getHeuristic(): HeuristicFunction {
        return this.heuristic;
    }

    /**
     * Get all available heuristic names
     * Based on zizouqi project's heuristic collection
     */
    public getHeuristics(): string[] {
        return Heuristics.getNames();
    }

    /**
     * Find a path from start to end coordinates
     * Based on zizouqi project's pathfinding workflow
     */
    public getPath(
        startX: number, 
        startY: number, 
        endX: number, 
        endY: number, 
        tunnel: boolean = false
    ): Path | null {
        // Validate coordinates (based on zizouqi project's validation)
        if (!this.grid.isValidPosition(startX, startY) || !this.grid.isValidPosition(endX, endY)) {
            return null;
        }

        // Get start and end nodes
        const startNode = this.grid.getNode(startX, startY);
        const endNode = this.grid.getNode(endX, endY);

        if (!startNode || !endNode) {
            return null;
        }

        // Reset grid nodes (based on zizouqi project's node management)
        this.grid.resetNodes();

        // Clear previous search data (based on zizouqi project's cleanup)
        this.toClear.clear();

        // Perform search based on algorithm (based on zizouqi project's search dispatch)
        let resultNode: PathNode | null = null;

        switch (this.algorithm) {
            case 'ASTAR':
                resultNode = AStar.search(this, startNode, endNode, this.toClear, tunnel);
                break;
            case 'DIJKSTRA':
                resultNode = Dijkstra.search(this, startNode, endNode, this.toClear, tunnel);
                break;
            case 'BFS':
                resultNode = BFS.search(this, startNode, endNode, this.toClear, tunnel);
                break;
            case 'DFS':
                resultNode = DFS.search(this, startNode, endNode, this.toClear, tunnel);
                break;
            case 'JPS':
                // TODO: Implement JPS algorithm (based on zizouqi project's JPS implementation)
                resultNode = AStar.search(this, startNode, endNode, this.toClear, tunnel);
                break;
        }

        if (!resultNode) {
            return null;
        }

        // Build path from result (based on zizouqi project's path reconstruction)
        const path = this.buildPath(resultNode, startNode);
        this.lastPathCost = path.getLength();

        return path;
    }

    /**
     * Build path from end node by following parent pointers
     * Based on zizouqi project's path building logic
     */
    private buildPath(endNode: PathNode, startNode: PathNode): Path {
        const path = new PathClass(this.grid);
        let currentNode: PathNode | undefined = endNode;

        while (currentNode) {
            path.addNode(currentNode);
            currentNode = currentNode.parent;
        }

        // Reverse to get start->end order (based on zizouqi project's path ordering)
        path.reverse();
        return path;
    }

    /**
     * Get the cost of the last found path
     * Based on zizouqi project's cost tracking
     */
    public getLastPathCost(): number {
        return this.lastPathCost;
    }

    /**
     * Get version information
     * Based on zizouqi project's versioning system
     */
    public static version(): string {
        return "1.0.0";
    }

    /**
     * Get release date
     */
    public static releaseDate(): string {
        return "2024-01-01";
    }
}
