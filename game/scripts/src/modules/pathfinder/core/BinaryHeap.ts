import { BinaryHeap as IBinaryHeap } from '../types';

/**
 * Binary heap implementation for efficient priority queue operations
 * Used in A* algorithm for managing the open list
 */
export class BinaryHeap<T> implements IBinaryHeap<T> {
    private items: T[] = [];
    private compareFn: (a: T, b: T) => number;

    constructor(compareFn: (a: T, b: T) => number) {
        this.compareFn = compareFn;
    }

    /**
     * Add item to heap
     */
    public push(item: T): void {
        this.items.push(item);
        this.bubbleUp(this.items.length - 1);
    }

    /**
     * Remove and return top item from heap
     */
    public pop(): T | undefined {
        if (this.items.length === 0) {
            return undefined;
        }

        const top = this.items[0];
        const last = this.items.pop()!;

        if (this.items.length > 0) {
            this.items[0] = last;
            this.bubbleDown(0);
        }

        return top;
    }

    /**
     * Clear all items from heap
     */
    public clear(): void {
        this.items = [];
    }

    /**
     * Check if heap is empty
     */
    public empty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Get number of items in heap
     */
    public size(): number {
        return this.items.length;
    }

    /**
     * Get top item without removing it
     */
    public peek(): T | undefined {
        return this.items[0];
    }

    /**
     * Bubble up item at given index to maintain heap property
     */
    private bubbleUp(index: number): void {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.compareFn(this.items[index], this.items[parentIndex]) >= 0) {
                break;
            }

            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    /**
     * Bubble down item at given index to maintain heap property
     */
    private bubbleDown(index: number): void {
        while (true) {
            let smallest = index;
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;

            if (leftChild < this.items.length && 
                this.compareFn(this.items[leftChild], this.items[smallest]) < 0) {
                smallest = leftChild;
            }

            if (rightChild < this.items.length && 
                this.compareFn(this.items[rightChild], this.items[smallest]) < 0) {
                smallest = rightChild;
            }

            if (smallest === index) {
                break;
            }

            this.swap(index, smallest);
            index = smallest;
        }
    }

    /**
     * Swap two items in the heap
     */
    private swap(i: number, j: number): void {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}
