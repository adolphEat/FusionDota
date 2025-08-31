// 基于zizouqi项目的棋子寻路测试文件
// 展示棋子如何使用寻路模块进行移动

import { Pathfinder, Grid, Heuristics } from './index';

/**
 * 模拟zizouqi项目的坐标系统
 * 基于8x8的棋盘网格，每个格子128x128单位
 */
class ChessCoordinateSystem {
    private baseVector = { x: 0, y: 0, z: 256 }; // 棋盘基准点
    private gridSize = 128; // 每个格子的大小
    
    /**
     * 将网格坐标转换为世界坐标 (基于zizouqi项目的XY2Vector函数)
     */
    public gridToWorld(x: number, y: number): { x: number, y: number, z: number } {
        return {
            x: this.baseVector.x + ((x - 1) * this.gridSize),
            y: this.baseVector.y + ((y - 1) * this.gridSize),
            z: this.baseVector.z
        };
    }
    
    /**
     * 将世界坐标转换为网格坐标 (基于zizouqi项目的Vector2X/Vector2Y函数)
     */
    public worldToGrid(worldPos: { x: number, y: number, z: number }): { x: number, y: number } {
        const relativeX = worldPos.x - this.baseVector.x;
        const relativeY = worldPos.y - this.baseVector.y;
        
        return {
            x: Math.floor((relativeX + 192) / this.gridSize),
            y: Math.floor((relativeY + 192) / this.gridSize)
        };
    }
    
    /**
     * 检查坐标是否在有效范围内 (基于zizouqi项目的IsInMap函数)
     */
    public isValidPosition(x: number, y: number): boolean {
        return x >= 1 && x <= 8 && y >= 1 && y <= 8;
    }
    
    /**
     * 检查是否在防守区域 (基于zizouqi项目的IsInDefendArea函数)
     */
    public isInDefendArea(x: number, y: number): boolean {
        return x >= 1 && x <= 8 && y >= 1 && y <= 4;
    }
    
    /**
     * 检查是否在进攻区域 (基于zizouqi项目的IsInAttackArea函数)
     */
    public isInAttackArea(x: number, y: number): boolean {
        return x >= 1 && x <= 8 && y >= 5 && y <= 8;
    }
}

/**
 * 模拟棋子类 (基于zizouqi项目的棋子实现)
 */
class ChessPiece {
    public x: number;
    public y: number;
    public teamId: number;
    public name: string;
    public isMoving: boolean = false;
    
    constructor(name: string, x: number, y: number, teamId: number) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.teamId = teamId;
    }
    
    /**
     * 获取棋子的网格位置
     */
    public getGridPosition(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
    
    /**
     * 获取棋子的世界位置
     */
    public getWorldPosition(coordinateSystem: ChessCoordinateSystem): { x: number, y: number, z: number } {
        return coordinateSystem.gridToWorld(this.x, this.y);
    }
    
    /**
     * 移动棋子到新位置 (基于zizouqi项目的ChangeUnitPosition函数)
     */
    public moveTo(newX: number, newY: number, coordinateSystem: ChessCoordinateSystem): void {
        if (!coordinateSystem.isValidPosition(newX, newY)) {
            print(`❌ 无效的移动位置: (${newX}, ${newY})`);
            return;
        }
        
        print(`♟️ ${this.name} 从 (${this.x}, ${this.y}) 移动到 (${newX}, ${newY})`);
        
        // 更新网格位置
        this.x = newX;
        this.y = newY;
        
        // 获取新的世界坐标
        const worldPos = coordinateSystem.gridToWorld(newX, newY);
        print(`🌍 世界坐标: (${worldPos.x.toFixed(1)}, ${worldPos.y.toFixed(1)}, ${worldPos.z.toFixed(1)})`);
    }
}

/**
 * 基于zizouqi项目的棋子寻路测试
 */
export function chessPathfindingTest(): void {
    print('♟️ 运行基于zizouqi项目的棋子寻路测试...\n');
    
    try {
        // 1. 创建坐标系统 (基于zizouqi项目的坐标系统)
        const coordinateSystem = new ChessCoordinateSystem();
        
        // 2. 创建8x8棋盘地图 (基于zizouqi项目的棋盘布局)
        // 0 = 可行走, 1 = 障碍物, 2 = 特殊地形
        const chessMap = [
            [0, 0, 0, 0, 0, 0, 0, 0], // 第1行 - 防守区域
            [0, 1, 0, 1, 0, 1, 0, 1], // 第2行 - 防守区域
            [0, 0, 0, 0, 0, 0, 0, 0], // 第3行 - 防守区域
            [0, 1, 0, 1, 0, 1, 0, 1], // 第4行 - 防守区域
            [0, 0, 0, 0, 0, 0, 0, 0], // 第5行 - 进攻区域
            [0, 1, 0, 1, 0, 1, 0, 1], // 第6行 - 进攻区域
            [0, 0, 0, 0, 0, 0, 0, 0], // 第7行 - 进攻区域
            [0, 1, 0, 1, 0, 1, 0, 1], // 第8行 - 进攻区域
        ];
        
        print('🏁 创建8x8棋盘地图:');
        chessMap.forEach((row, index) => {
            print(`第${index + 1}行: [${row.join(', ')}]`);
        });
        print('');
        
        // 3. 创建网格和寻路器 (基于zizouqi项目的pathfinder使用)
        const grid = new Grid(chessMap, 0); // 0 = 可行走
        const pathfinder = new Pathfinder(grid, 'ASTAR', 0);
        
        // 设置启发式函数 (基于zizouqi项目的默认设置)
        pathfinder.setHeuristic('MANHATTAN');
        pathfinder.setMode('DIAGONAL');
        
        print('🧭 寻路器配置:');
        print(`- 算法: ${pathfinder.getAlgorithm()}`);
        print(`- 启发式: ${pathfinder.getHeuristics().indexOf('MANHATTAN') >= 0 ? 'MANHATTAN' : '默认'}`);
        print(`- 移动模式: ${pathfinder.getMode()}`);
        print('');
        
        // 4. 创建棋子 (基于zizouqi项目的棋子系统)
        const chessPieces = [
            new ChessPiece('战士', 1, 1, 1),    // 防守区域左上角
            new ChessPiece('法师', 8, 1, 1),    // 防守区域右上角
            new ChessPiece('射手', 1, 4, 1),    // 防守区域左下角
            new ChessPiece('坦克', 8, 4, 1),    // 防守区域右下角
        ];
        
        print('♟️ 创建棋子:');
        chessPieces.forEach(piece => {
            const worldPos = piece.getWorldPosition(coordinateSystem);
            print(`- ${piece.name}: 网格(${piece.x}, ${piece.y}) -> 世界(${worldPos.x.toFixed(1)}, ${worldPos.y.toFixed(1)})`);
        });
        print('');
        
        // 5. 测试棋子寻路 (基于zizouqi项目的寻路场景)
        print('🛤️ 测试棋子寻路:');
        
        // 测试1: 战士移动到进攻区域
        print('\n📋 测试1: 战士从防守区域移动到进攻区域');
        const warriorPath = pathfinder.getPath(1, 1, 1, 8);
        if (warriorPath) {
            print(`✅ 找到路径! 长度: ${warriorPath.getLength().toFixed(2)}`);
            print(`📊 节点数量: ${warriorPath.getNodes().length}`);
            
            // 模拟棋子沿路径移动 (基于zizouqi项目的移动逻辑)
            const pathPositions = warriorPath.toPositions();
            print('🔄 移动路径:');
            pathPositions.forEach((pos, index) => {
                const worldPos = coordinateSystem.gridToWorld(pos.x, pos.y);
                print(`  步骤${index + 1}: 网格(${pos.x}, ${pos.y}) -> 世界(${worldPos.x.toFixed(1)}, ${worldPos.y.toFixed(1)})`);
            });
            
            // 移动棋子到目标位置
            chessPieces[0].moveTo(1, 8, coordinateSystem);
        } else {
            print('❌ 未找到路径');
        }
        
        // 测试2: 法师对角线移动
        print('\n📋 测试2: 法师对角线移动到中心位置');
        const magePath = pathfinder.getPath(8, 1, 4, 5);
        if (magePath) {
            print(`✅ 找到路径! 长度: ${magePath.getLength().toFixed(2)}`);
            print(`📊 节点数量: ${magePath.getNodes().length}`);
            
            const pathPositions = magePath.toPositions();
            print('🔄 移动路径:');
            pathPositions.forEach((pos, index) => {
                const worldPos = coordinateSystem.gridToWorld(pos.x, pos.y);
                print(`  步骤${index + 1}: 网格(${pos.x}, ${pos.y}) -> 世界(${worldPos.x.toFixed(1)}, ${worldPos.y.toFixed(1)})`);
            });
            
            chessPieces[1].moveTo(4, 5, coordinateSystem);
        } else {
            print('❌ 未找到路径');
        }
        
        // 测试3: 不同算法的性能比较 (基于zizouqi项目的算法选择)
        print('\n📋 测试3: 不同算法的性能比较');
        const algorithms: Array<'ASTAR' | 'DIJKSTRA' | 'BFS' | 'DFS'> = ['ASTAR', 'DIJKSTRA', 'BFS', 'DFS'];
        const startPos = { x: 1, y: 4 };
        const endPos = { x: 8, y: 5 };
        
        algorithms.forEach(algorithm => {
            pathfinder.setAlgorithm(algorithm);
            const startTime = Date.now();
            
            const path = pathfinder.getPath(startPos.x, startPos.y, endPos.x, endPos.y);
            const endTime = Date.now();
            
            if (path) {
                print(`${algorithm}: 找到路径，耗时${endTime - startTime}ms，长度${path.getLength().toFixed(2)}`);
            } else {
                print(`${algorithm}: 未找到路径，耗时${endTime - startTime}ms`);
            }
        });
        
        // 测试4: 障碍物避让 (基于zizouqi项目的实际游戏场景)
        print('\n📋 测试4: 障碍物避让测试');
        pathfinder.setAlgorithm('ASTAR'); // 恢复A*算法
        
        // 在路径上添加临时障碍物
        chessMap[2][4] = 1; // 在路径中间添加障碍物
        grid.resetNodes(); // 重置网格状态
        
        const obstaclePath = pathfinder.getPath(1, 1, 8, 8);
        if (obstaclePath) {
            print(`✅ 成功避开障碍物! 路径长度: ${obstaclePath.getLength().toFixed(2)}`);
            const pathPositions = obstaclePath.toPositions();
            print('🔄 避障路径:');
            pathPositions.forEach((pos, index) => {
                const worldPos = coordinateSystem.gridToWorld(pos.x, pos.y);
                print(`  步骤${index + 1}: 网格(${pos.x}, ${pos.y}) -> 世界(${worldPos.x.toFixed(1)}, ${worldPos.y.toFixed(1)})`);
            });
        } else {
            print('❌ 无法避开障碍物');
        }
        
        print('\n✨ 基于zizouqi项目的棋子寻路测试完成!');
        print('📝 这个测试展示了:');
        print('   - 8x8棋盘网格系统');
        print('   - 网格坐标与世界坐标转换');
        print('   - 棋子的寻路和移动');
        print('   - 不同算法的性能比较');
        print('   - 障碍物避让能力');
        
    } catch (error) {
        print('❌ 测试失败，错误:', error);
    }
}

/**
 * 运行所有测试
 */
export function runAllTests(): void {
    print('🚀 运行所有寻路测试\n');
    chessPathfindingTest();
}

// 导出测试函数
export default {
    chessPathfindingTest,
    runAllTests
};

