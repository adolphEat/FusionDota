// Pathfinding module types and interfaces
// Based on zizouqi autochess project's type system

export interface Vector2 {
    x: number;
    y: number;
}

export interface PathNode extends Vector2 {
    g: number;        // Cost from start to this node
    h: number;        // Heuristic cost from this node to goal
    f: number;        // Total cost (g + h)
    parent?: PathNode; // Parent node for path reconstruction
    opened: boolean;   // Whether node is in open list
    closed: boolean;   // Whether node has been processed
}

export interface Path {
    nodes: PathNode[];
    length: number;
    grid: Grid;
    
    getLength(): number;
    getNodes(): PathNode[];
    addNode(node: PathNode): void;
    clear(): void;
    getStartNode(): PathNode | undefined;
    getEndNode(): PathNode | undefined;
    getNode(index: number): PathNode | undefined;
    getNodeCount(): number;
    isEmpty(): boolean;
    reverse(): void;
    getSubPath(startIndex: number, endIndex: number): Path;
    calculateDistance(): number;
    toPositions(): Array<{x: number, y: number}>;
    toString(): string;
}

export interface Grid {
    width: number;
    height: number;
    nodes: PathNode[][];
    walkableValue: number | ((value: any) => boolean);
    
    getNode(x: number, y: number): PathNode | null;
    getNeighbours(node: PathNode, walkable: number | ((value: any) => boolean), allowDiagonal: boolean, tunnel: boolean): PathNode[];
    isWalkable(x: number, y: number): boolean;
    isValidPosition(x: number, y: number): boolean;
    resetNodes(): void;
}

export interface Pathfinder {
    grid: Grid;
    algorithm: SearchAlgorithm;
    walkable: number | ((value: any) => boolean);
    allowDiagonal: boolean;
    heuristic: HeuristicFunction;
    
    setGrid(grid: Grid): Pathfinder;
    setAlgorithm(algorithm: SearchAlgorithm): Pathfinder;
    setWalkable(walkable: number | ((value: any) => boolean)): Pathfinder;
    setMode(mode: SearchMode): Pathfinder;
    setHeuristic(heuristic: HeuristicFunction): Pathfinder;
    getPath(startX: number, startY: number, endX: number, endY: number, tunnel?: boolean): Path | null;
}

export type SearchAlgorithm = 'ASTAR' | 'DIJKSTRA' | 'BFS' | 'DFS' | 'JPS';
export type SearchMode = 'DIAGONAL' | 'ORTHOGONAL';
export type HeuristicFunction = (dx: number, dy: number) => number;

export interface BinaryHeap<T> {
    push(item: T): void;
    pop(): T | undefined;
    clear(): void;
    empty(): boolean;
    size(): number;
}

export interface SearchFunction {
    (finder: Pathfinder, startNode: PathNode, endNode: PathNode, toClear: Set<PathNode>, tunnel?: boolean): PathNode | null;
}
