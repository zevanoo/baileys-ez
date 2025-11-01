export { Client } from "./core/client.js";
export * from "baileys";
export function createWrapper(config: WrapperConfig): Wrapper;
export type WrapperConfig = {
    /**
     * - The name of the directory where session files will be stored.
     */
    folderName?: string | undefined;
    /**
     * - An optional code to use pairing code for authentication.
     */
    pairingCode?: string | undefined;
    /**
     * - An optional custom function to serialize incoming messages.
     */
    serializer?: Function | undefined;
    /**
     * - An optional custom configuration options for the Baileys socket.
     */
    baileysConfig?: import("baileys").UserFacingSocketConfig | undefined;
};
import { Wrapper } from './core/wrapper.js';
