import { HeuristicFunction } from '../types';

/**
 * Collection of heuristic functions for pathfinding algorithms
 * These functions estimate the cost from a node to the goal
 */
export class Heuristics {
    /**
     * Manhattan distance heuristic
     * Good for grid-based movement with no diagonal movement
     */
    public static MANHATTAN: HeuristicFunction = (dx: number, dy: number): number => {
        return Math.abs(dx) + Math.abs(dy);
    };

    /**
     * Euclidean distance heuristic
     * Good for continuous movement and diagonal movement
     */
    public static EUCLIDEAN: HeuristicFunction = (dx: number, dy: number): number => {
        return Math.sqrt(dx * dx + dy * dy);
    };

    /**
     * Chebyshev distance heuristic
     * Good for 8-directional movement
     */
    public static CHEBYSHEV: HeuristicFunction = (dx: number, dy: number): number => {
        return Math.max(Math.abs(dx), Math.abs(dy));
    };

    /**
     * Octile distance heuristic
     * Good for 8-directional movement with diagonal cost = sqrt(2)
     */
    public static OCTILE: HeuristicFunction = (dx: number, dy: number): number => {
        const F = Math.SQRT2 - 1;
        return (dx < dy) ? (F * dx + dy) : (F * dy + dx);
    };

    /**
     * Diagonal distance heuristic
     * Good for 8-directional movement with diagonal cost = 2
     */
    public static DIAGONAL: HeuristicFunction = (dx: number, dy: number): number => {
        return Math.max(Math.abs(dx), Math.abs(dy)) + (Math.SQRT2 - 1) * Math.min(Math.abs(dx), Math.abs(dy));
    };

    /**
     * Zero heuristic (Dijkstra's algorithm)
     * Always returns 0, making it equivalent to Dijkstra's algorithm
     */
    public static ZERO: HeuristicFunction = (dx: number, dy: number): number => {
        return 0;
    };

    /**
     * Get heuristic function by name
     */
    public static get(name: string): HeuristicFunction {
        const heuristics: { [key: string]: HeuristicFunction } = {
            'MANHATTAN': this.MANHATTAN,
            'EUCLIDEAN': this.EUCLIDEAN,
            'CHEBYSHEV': this.CHEBYSHEV,
            'OCTILE': this.OCTILE,
            'DIAGONAL': this.DIAGONAL,
            'ZERO': this.ZERO
        };

        return heuristics[name.toUpperCase()] || this.MANHATTAN;
    }

    /**
     * Get all available heuristic names
     */
    public static getNames(): string[] {
        return ['MANHATTAN', 'EUCLIDEAN', 'CHEBYSHEV', 'OCTILE', 'DIAGONAL', 'ZERO'];
    }
}
