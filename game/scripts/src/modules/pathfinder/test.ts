import { Pathfinder, Grid, Heuristics } from './index';

/**
 * Test suite for the pathfinding module
 * Run this to verify all functionality works correctly
 */
export class PathfindingTests {
    
    /**
     * Test 1: Basic A* pathfinding
     */
    public static testBasicAStar(): boolean {
        print('🧪 Testing Basic A*...');
        
        try {
            const map = [
                [0, 1, 0, 1, 0],
                [0, 1, 0, 1, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ];
            
            const grid = new Grid(map, 0);
            const pathfinder = new Pathfinder(grid, 'ASTAR', 0);
            
            const path = pathfinder.getPath(0, 0, 4, 0);
            
            if (!path) {
                print('❌ Test failed: No path found');
                return false;
            }
            
            if (path.getNodeCount() < 2) {
                print('❌ Test failed: Path too short');
                return false;
            }
            
            print('✅ Basic A* test passed');
            return true;
            
        } catch (error) {
            print('❌ Test failed with error:', error);
            return false;
        }
    }
    
    /**
     * Test 2: Grid validation
     */
    public static testGridValidation(): boolean {
        print('🧪 Testing Grid Validation...');
        
        try {
            const map = [
                [0, 0, 0],
                [0, 0, 0],
            ];
            
            const grid = new Grid(map, 0);
            
            // Test valid positions
            if (!grid.isValidPosition(0, 0) || !grid.isValidPosition(2, 1)) {
                print('❌ Test failed: Valid positions not recognized');
                return false;
            }
            
            // Test invalid positions
            if (grid.isValidPosition(-1, 0) || grid.isValidPosition(3, 1) || grid.isValidPosition(0, 2)) {
                print('❌ Test failed: Invalid positions not recognized');
                return false;
            }
            
            // Test node retrieval
            const node = grid.getNode(1, 1);
            if (!node || node.x !== 1 || node.y !== 1) {
                print('❌ Test failed: Node retrieval failed');
                return false;
            }
            
            print('✅ Grid validation test passed');
            return true;
            
        } catch (error) {
            print('❌ Test failed with error:', error);
            return false;
        }
    }
    
    /**
     * Test 3: Algorithm switching
     */
    public static testAlgorithmSwitching(): boolean {
        print('🧪 Testing Algorithm Switching...');
        
        try {
            const map = [
                [0, 0, 0, 0, 0],
                [0, 1, 1, 1, 0],
                [0, 0, 0, 0, 0],
            ];
            
            const grid = new Grid(map, 0);
            const pathfinder = new Pathfinder(grid, 'ASTAR', 0);
            
            // Test A*
            pathfinder.setAlgorithm('ASTAR');
            const astarPath = pathfinder.getPath(0, 0, 4, 2);
            
            // Test Dijkstra
            pathfinder.setAlgorithm('DIJKSTRA');
            const dijkstraPath = pathfinder.getPath(0, 0, 4, 2);
            
            // Test BFS
            pathfinder.setAlgorithm('BFS');
            const bfsPath = pathfinder.getPath(0, 0, 4, 2);
            
            if (!astarPath || !dijkstraPath || !bfsPath) {
                print('❌ Test failed: One or more algorithms failed to find path');
                return false;
            }
            
            print('✅ Algorithm switching test passed');
            return true;
            
        } catch (error) {
            print('❌ Test failed with error:', error);
            return false;
        }
    }
    
    /**
     * Test 4: Heuristic functions
     */
    public static testHeuristics(): boolean {
        print('🧪 Testing Heuristic Functions...');
        
        try {
            // Test Manhattan
            const manhattan = Heuristics.MANHATTAN(3, 4);
            if (manhattan !== 7) {
                print('❌ Test failed: Manhattan heuristic incorrect');
                return false;
            }
            
            // Test Euclidean
            const euclidean = Heuristics.EUCLIDEAN(3, 4);
            if (Math.abs(euclidean - 5) > 0.001) {
                print('❌ Test failed: Euclidean heuristic incorrect');
                return false;
            }
            
            // Test Chebyshev
            const chebyshev = Heuristics.CHEBYSHEV(3, 4);
            if (chebyshev !== 4) {
                print('❌ Test failed: Chebyshev heuristic incorrect');
                return false;
            }
            
            // Test heuristic getter
            const manhattan2 = Heuristics.get('MANHATTAN');
            if (manhattan2(3, 4) !== 7) {
                print('❌ Test failed: Heuristic getter failed');
                return false;
            }
            
            print('✅ Heuristic functions test passed');
            return true;
            
        } catch (error) {
            print('❌ Test failed with error:', error);
            return false;
        }
    }
    
    /**
     * Test 5: Movement modes
     */
    public static testMovementModes(): boolean {
        print('🧪 Testing Movement Modes...');
        
        try {
            const map = [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ];
            
            const grid = new Grid(map, 0);
            const pathfinder = new Pathfinder(grid, 'ASTAR', 0);
            
            // Test diagonal movement
            pathfinder.setMode('DIAGONAL');
            const diagonalPath = pathfinder.getPath(0, 0, 2, 2);
            
            // Test orthogonal movement
            pathfinder.setMode('ORTHOGONAL');
            const orthogonalPath = pathfinder.getPath(0, 0, 2, 2);
            
            if (!diagonalPath || !orthogonalPath) {
                print('❌ Test failed: Movement modes failed to find path');
                return false;
            }
            
            // Diagonal should be shorter than orthogonal
            if (diagonalPath.getLength() >= orthogonalPath.getLength()) {
                print('❌ Test failed: Diagonal path not shorter than orthogonal');
                return false;
            }
            
            print('✅ Movement modes test passed');
            return true;
            
        } catch (error) {
            print('❌ Test failed with error:', error);
            return false;
        }
    }
    
    /**
     * Test 6: Path properties
     */
    public static testPathProperties(): boolean {
        print('🧪 Testing Path Properties...');
        
        try {
            const map = [
                [0, 0, 0],
                [0, 0, 0],
            ];
            
            const grid = new Grid(map, 0);
            const pathfinder = new Pathfinder(grid, 'ASTAR', 0);
            
            const path = pathfinder.getPath(0, 0, 2, 1);
            
            if (!path) {
                print('❌ Test failed: No path found');
                return false;
            }
            
            // Test path properties
            if (path.isEmpty()) {
                print('❌ Test failed: Path is empty');
                return false;
            }
            
            if (path.getNodeCount() < 2) {
                print('❌ Test failed: Path too short');
                return false;
            }
            
            const positions = path.toPositions();
            if (positions.length !== path.getNodeCount()) {
                print('❌ Test failed: Position conversion failed');
                return false;
            }
            
            // Test start and end nodes
            const startNode = path.getStartNode();
            const endNode = path.getEndNode();
            
            if (!startNode || startNode.x !== 0 || startNode.y !== 0) {
                print('❌ Test failed: Start node incorrect');
                return false;
            }
            
            if (!endNode || endNode.x !== 2 || endNode.y !== 1) {
                print('❌ Test failed: End node incorrect');
                return false;
            }
            
            print('✅ Path properties test passed');
            return true;
            
        } catch (error) {
            print('❌ Test failed with error:', error);
            return false;
        }
    }
    
    /**
     * Run all tests
     */
    public static runAllTests(): void {
        print('🚀 Starting Pathfinding Module Tests\n');
        
        const tests = [
            this.testBasicAStar,
            this.testGridValidation,
            this.testAlgorithmSwitching,
            this.testHeuristics,
            this.testMovementModes,
            this.testPathProperties,
        ];
        
        let passedTests = 0;
        let totalTests = tests.length;
        
        for (const test of tests) {
            if (test()) {
                passedTests++;
            }
            print('');
        }
        
        print(`📊 Test Results: ${passedTests}/${totalTests} tests passed`);
        
        if (passedTests === totalTests) {
            print('🎉 All tests passed! The pathfinding module is working correctly.');
        } else {
            print('⚠️  Some tests failed. Please check the implementation.');
        }
    }
}

// Export for use in other files
export default PathfindingTests;
