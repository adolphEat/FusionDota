import { Path as IPath, PathNode, Grid } from '../types';
import { Node } from './Node';

/**
 * Represents a path found by pathfinding algorithms
 */
export class Path implements IPath {
    public nodes: PathNode[] = [];
    public length: number = 0;
    public grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    /**
     * Get the total length of the path
     */
    public getLength(): number {
        if (this.length > 0) {
            return this.length;
        }

        this.length = 0;
        for (let i = 1; i < this.nodes.length; i++) {
            const prev = this.nodes[i - 1];
            const curr = this.nodes[i];
            this.length += this.calculateDistance(prev, curr);
        }

        return this.length;
    }

    /**
     * Get all nodes in the path
     */
    public getNodes(): PathNode[] {
        return [...this.nodes];
    }

    /**
     * Add a node to the path
     */
    public addNode(node: PathNode): void {
        this.nodes.push(node);
        this.length = 0; // Reset length to recalculate
    }

    /**
     * Clear all nodes from the path
     */
    public clear(): void {
        this.nodes = [];
        this.length = 0;
    }

    /**
     * Get the start node of the path
     */
    public getStartNode(): PathNode | undefined {
        return this.nodes[0];
    }

    /**
     * Get the end node of the path
     */
    public getEndNode(): PathNode | undefined {
        return this.nodes[this.nodes.length - 1];
    }

    /**
     * Get a specific node by index
     */
    public getNode(index: number): PathNode | undefined {
        return this.nodes[index];
    }

    /**
     * Get the number of nodes in the path
     */
    public getNodeCount(): number {
        return this.nodes.length;
    }

    /**
     * Check if the path is empty
     */
    public isEmpty(): boolean {
        return this.nodes.length === 0;
    }

    /**
     * Reverse the path direction
     */
    public reverse(): void {
        this.nodes.reverse();
    }

    /**
     * Get a sub-path from start to end index
     */
    public getSubPath(startIndex: number, endIndex: number): Path {
        const subPath = new Path(this.grid);
        const start = Math.max(0, startIndex);
        const end = Math.min(this.nodes.length, endIndex);
        
        for (let i = start; i < end; i++) {
            subPath.addNode(this.nodes[i]);
        }
        
        return subPath;
    }

    /**
     * Calculate distance between two nodes
     */
    private calculateDistance(a: PathNode, b: PathNode): number {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Convert path to array of positions
     */
    public toPositions(): { x: number; y: number }[] {
        return this.nodes.map(node => ({ x: node.x, y: node.y }));
    }

    /**
     * Convert path to string representation
     */
    public toString(): string {
        return `Path[${this.nodes.length} nodes, length: ${this.getLength().toFixed(2)}]`;
    }
}
