// 使用 ES 模块导入
import launchDota2 from './launchDota2';

(async () => {
    let addon_name: string | undefined;
    let map_name: string | undefined;

    console.log('process.argv:', process.argv);

    // 简化参数解析逻辑 - 直接从 process.argv 获取参数
    if (process.argv.length > 2) {
        const args = process.argv.slice(2); // 跳过 node 和脚本路径
        console.log('Command line args:', args);
        
        if (args.length === 1) {
            map_name = args[0];
        } else if (args.length >= 2) {
            addon_name = args[0];
            map_name = args[1];
        }
    }

    // 设置默认值
    if (!addon_name) {
        addon_name = 'fusion'; // 默认 addon 名称
    }
    
    if (!map_name) {
        map_name = 'battlemap'; // 默认地图名称
    }

    console.log('Final arguments:', { addon_name, map_name });
    await launchDota2(addon_name, map_name);
})().catch((error: Error) => {
    console.error(error);
    process.exit(1);
});
