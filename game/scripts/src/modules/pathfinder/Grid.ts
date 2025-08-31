import { Grid as IGrid, PathNode } from './types';
import { Node } from './core/Node';

/**
 * 2D grid representation for pathfinding
 * Manages nodes and provides neighbor access
 * Based on zizouqi autochess project's grid implementation
 */
export class Grid implements IGrid {
    public width: number;
    public height: number;
    public nodes: PathNode[][];
    public walkableValue: number | ((value: any) => boolean);
    private originalMap: number[][] | string[]; // Store original map data

    constructor(
        map: number[][] | string[],
        walkableValue: number | ((value: any) => boolean) = 0
    ) {
        this.walkableValue = walkableValue;
        this.originalMap = map;
        
        if (Array.isArray(map) && map.length > 0) {
            if (typeof map[0] === 'string') {
                // String map (like "000\n111\n000")
                this.initializeFromStringMap(map as string[]);
            } else {
                // Number map (like [[0,1,0], [1,0,1]])
                this.initializeFromNumberMap(map as number[][]);
            }
        } else {
            throw new Error('Invalid map format. Expected 2D array or string array.');
        }
    }

    /**
     * Initialize grid from string map
     */
    private initializeFromStringMap(stringMap: string[]): void {
        this.height = stringMap.length;
        this.width = stringMap[0].length;
        this.nodes = [];

        for (let y = 0; y < this.height; y++) {
            this.nodes[y] = [];
            const row = stringMap[y];
            
            for (let x = 0; x < this.width; x++) {
                const value = parseInt(row[x]);
                this.nodes[y][x] = new Node(x, y);
            }
        }
    }

    /**
     * Initialize grid from number map
     */
    private initializeFromNumberMap(numberMap: number[][]): void {
        this.height = numberMap.length;
        this.width = numberMap[0].length;
        this.nodes = [];

        for (let y = 0; y < this.height; y++) {
            this.nodes[y] = [];
            const row = numberMap[y];
            
            for (let x = 0; x < this.width; x++) {
                this.nodes[y][x] = new Node(x, y);
            }
        }
    }

    /**
     * Get node at specific coordinates
     */
    public getNode(x: number, y: number): PathNode | null {
        if (!this.isValidPosition(x, y)) {
            return null;
        }
        return this.nodes[y][x];
    }

    /**
     * Check if position is valid within grid bounds
     */
    public isValidPosition(x: number, y: number): boolean {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    /**
     * Check if position is walkable
     * Based on zizouqi project's walkable logic
     */
    public isWalkable(x: number, y: number): boolean {
        if (!this.isValidPosition(x, y)) {
            return false;
        }

        if (typeof this.walkableValue === 'function') {
            return this.walkableValue(this.getMapValue(x, y));
        }

        // For number-based walkable values
        const mapValue = this.getMapValue(x, y);
        return mapValue === this.walkableValue;
    }

    /**
     * Get original map value at coordinates
     */
    private getMapValue(x: number, y: number): number {
        if (typeof this.originalMap[0] === 'string') {
            const stringMap = this.originalMap as string[];
            return parseInt(stringMap[y][x]);
        } else {
            const numberMap = this.originalMap as number[][];
            return numberMap[y][x];
        }
    }

    /**
     * Get all valid neighbors of a node
     * Based on zizouqi project's neighbor logic
     */
    public getNeighbours(
        node: PathNode, 
        walkable: number | ((value: any) => boolean), 
        allowDiagonal: boolean, 
        tunnel: boolean
    ): PathNode[] {
        const neighbours: PathNode[] = [];
        const directions = this.getDirections(allowDiagonal);

        for (const [dx, dy] of directions) {
            const nx = node.x + dx;
            const ny = node.y + dy;

            if (!this.isValidPosition(nx, ny)) {
                continue;
            }

            const neighbor = this.nodes[ny][nx];
            
            if (this.isWalkable(nx, ny)) {
                neighbours.push(neighbor);
            } else if (tunnel && allowDiagonal && dx !== 0 && dy !== 0) {
                // Check if we can tunnel through diagonal walls
                // Based on zizouqi project's tunnel logic
                const canTunnel = this.isWalkable(node.x + dx, node.y) && 
                                 this.isWalkable(node.x, node.y + dy);
                if (canTunnel) {
                    neighbours.push(neighbor);
                }
            }
        }

        return neighbours;
    }

    /**
     * Get movement directions based on diagonal allowance
     * Based on zizouqi project's direction logic
     */
    private getDirections(allowDiagonal: boolean): [number, number][] {
        const orthogonal: [number, number][] = [
            [-1, 0], [1, 0], [0, -1], [0, 1]  // Left, Right, Up, Down
        ];

        if (!allowDiagonal) {
            return orthogonal;
        }

        const diagonal: [number, number][] = [
            [-1, -1], [-1, 1], [1, -1], [1, 1]  // Diagonal directions
        ];

        return [...orthogonal, ...diagonal];
    }

    /**
     * Reset all nodes in the grid
     * Based on zizouqi project's reset logic
     */
    public resetNodes(): void {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // Cast to Node to access reset method
                (this.nodes[y][x] as any).reset();
            }
        }
    }

    /**
     * Get grid dimensions
     */
    public getDimensions(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }

    /**
     * Check if grid is empty
     */
    public isEmpty(): boolean {
        return this.width === 0 || this.height === 0;
    }

    /**
     * Get grid as string representation
     */
    public toString(): string {
        return `Grid[${this.width}x${this.height}]`;
    }
}
