import { PathNode } from '../types';

/**
 * Represents a single cell/node in the pathfinding grid
 * Based on zizouqi autochess project's node implementation
 */
export class Node implements PathNode {
    public x: number;
    public y: number;
    public g: number = 0;
    public h: number = 0;
    public f: number = 0;
    public parent?: PathNode;
    public opened: boolean = false;
    public closed: boolean = false;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Reset node properties for reuse
     * Based on zizouqi project's node recycling system
     */
    public reset(): void {
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.parent = undefined;
        this.opened = false;
        this.closed = false;
    }

    /**
     * Compare nodes by F-cost for heap sorting
     * Based on zizouqi project's node comparison logic
     */
    public static compare(a: Node, b: Node): number {
        return a.f - b.f;
    }

    /**
     * Check if two nodes are at the same position
     * Based on zizouqi project's node equality check
     */
    public equals(other: PathNode): boolean {
        return this.x === other.x && this.y === other.y;
    }

    /**
     * Get distance to another node
     * Based on zizouqi project's distance calculation
     */
    public distanceTo(other: PathNode): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Get Manhattan distance to another node
     * Based on zizouqi project's Manhattan distance implementation
     */
    public manhattanDistanceTo(other: PathNode): number {
        return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
    }
}
