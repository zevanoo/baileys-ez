import { Wrapper } from './core/wrapper.js';
import type { UserFacingSocketConfig } from 'baileys';
export { Client } from './core/client.js';
export * from 'baileys';
export interface WrapperConfig {
    folderName?: string;
    pairingCode?: string;
    serializer?: any;
    baileysConfig?: Partial<UserFacingSocketConfig>;
}
export declare const createWrapper: (config: WrapperConfig) => Wrapper;
