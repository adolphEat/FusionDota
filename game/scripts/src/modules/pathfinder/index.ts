// Pathfinding module main entry point
// Exports all public interfaces and classes

// Core classes
export { Pathfinder } from './Pathfinder';
export { Grid } from './Grid';
export { Path } from './core/Path';
export { Node } from './core/Node';
export { BinaryHeap } from './core/BinaryHeap';
export { Heuristics } from './core/Heuristics';

// Search algorithms
export { AStar } from './search/AStar';
export { Dijkstra } from './search/Dijkstra';
export { BFS } from './search/BFS';
export { DFS } from './search/DFS';

// Types and interfaces
export * from './types';

// Utility functions
export const createPathfinder = (
    grid: any,
    algorithm: string = 'ASTAR',
    walkable: any = 0
) => {
    const { Pathfinder: PathfinderClass, Grid: GridClass } = require('./Pathfinder');
    const { Grid: GridImpl } = require('./Grid');
    
    let gridInstance: any;
    if (grid instanceof GridImpl) {
        gridInstance = grid;
    } else {
        gridInstance = new GridImpl(grid, walkable);
    }
    
    return new PathfinderClass(gridInstance, algorithm, walkable);
};

// Example usage function
export const exampleUsage = () => {
    console.log(`
// Pathfinding Module Usage Example

// 1. Create a collision map
const map = [
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
];

// 2. Create grid and pathfinder
const grid = new Grid(map, 0); // 0 = walkable
const pathfinder = new Pathfinder(grid, 'ASTAR', 0);

// 3. Find path
const path = pathfinder.getPath(0, 0, 4, 0);

if (path) {
    console.log('Path found! Length:', path.getLength());
    console.log('Path nodes:', path.toPositions());
} else {
    console.log('No path found');
}

// 4. Change algorithm
pathfinder.setAlgorithm('DIJKSTRA');
pathfinder.setHeuristic('EUCLIDEAN');

// 5. Find path with different settings
const path2 = pathfinder.getPath(0, 0, 4, 0);
    `);
};
