import 'utils/index';
import { ActivateModules } from './modules';
// @ts-ignore - TSTL 编译器可以正确解析，但 TypeScript 类型检查器在某些情况下无法解析
import Precache from './utils/precache';

Object.assign(getfenv(), {
    Activate: () => {
        print('========================================');
        print('[GameMode] ADDON GAME MODE ACTIVATING');
        print('[GameMode] About to call ActivateModules()');
        print('========================================');
        try {
            ActivateModules();
            print('[GameMode] ActivateModules() completed successfully');
        } catch (error) {
            print('[GameMode] ERROR in ActivateModules():', error);
        }
        print('[GameMode] Addon activation complete');
    },
    Precache: Precache,
});
