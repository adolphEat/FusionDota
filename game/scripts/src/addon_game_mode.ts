import 'utils/index';
import { ActivateModules } from './modules';
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
