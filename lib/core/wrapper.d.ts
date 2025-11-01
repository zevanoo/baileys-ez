/**
 * @typedef {object} WrapperOptions
 * @property {string} [folderName='sessions'] - The name of the directory to store session files.
 * @property {string} [pairingCode] - Whether to use pairing code for authentication.
 * @property {function} [serializer] - A custom function to serialize incoming messages.
 * @property {Partial<import('baileys').UserFacingSocketConfig>} [baileysConfig={}] - Custom configuration for the Baileys socket.
 */
/**
* @typedef {object} SessionInfo
* @property {string} id
* @property {string} path
* @property {boolean} valid
* @property {string} [reason]
* @property {"base" | "client"} source
*/
/**
 * The main class that manages multiple WhatsApp client instances.
 * It acts as a central hub, forwarding events from all clients and providing
 * aggregate methods to control them. It also extends `SessionManager` to handle
 * the file-based storage and validation of authentication sessions.
 * @extends {SessionManager}
 */
export class Wrapper extends SessionManager {
    /**
     * Creates an instance of the Wrapper.
     * @param {WrapperOptions} options - Configuration options for the wrapper and its clients.
     */
    constructor({ folderName, pairingCode, serializer, baileysConfig }: WrapperOptions);
    serialize: Function | undefined;
    baileysConfig: Partial<import("baileys").UserFacingSocketConfig>;
    clients: Map<any, any>;
    pairingCode: string | undefined;
    /**
     * Adds a Client instance to the wrapper for management.
     * It also sets up event forwarding from the client to the wrapper.
     * @param {import('./client.js').Client} client - The client instance to add.
     */
    addClient(client: import('./client.js').Client): void;
    /**
     * Disconnects and removes a client from the wrapper's management.
     * @param {string} id - The ID of the client to remove.
     * @returns {Promise<void>}
     */
    removeClient(id: string): Promise<void>;
    /**
     * Retrieves a managed client instance by its ID.
     * @param {string} id - The ID of the client to retrieve.
     * @returns {import('./client.js').Client | undefined} The client instance, or undefined if not found.
     */
    getClient(id: string): import('./client.js').Client | undefined;
    /**
     * Gets an array of all currently managed client instances.
     * @returns {import('./client.js').Client[]} An array of all clients.
     */
    getAllClients(): import('./client.js').Client[];
    /**
     * Initiates the connection process for all managed clients simultaneously.
     * @returns {Promise<void>} A promise that resolves when all clients have attempted to connect.
     */
    connectAll(): Promise<void>;
    /**
     * Disconnects all managed clients.
     * @returns {Promise<void>} A promise that resolves when all clients have been disconnected.
     */
    disconnectAll(): Promise<void>;
    /**
     * Retrieves the session file paths for all managed clients.
     * @returns {string[]} An array of absolute paths to the session directories.
     */
    getClientSessionPaths(): string[];
    /**
     * Checks the validity status of all managed client sessions.
     * @returns {Promise<Array<{id: string, path: string, valid: boolean, reason?: string}>>} A promise that resolves with an array of session status objects.
     */
    checkAllClientSessions(): Promise<Array<{
        id: string;
        path: string;
        valid: boolean;
        reason?: string;
    }>>;
    /**
     * Scans and cleans any invalid or corrupt sessions associated with the managed clients.
     * @returns {Promise<number>} A promise that resolves with the number of sessions that were cleaned.
     */
    cleanClientSessions(): Promise<number>;
    /**
     * Lists all sessions, combining those found in the base session directory with those actively managed by clients.
     * @returns {Promise<Omit<SessionInfo, 'source'>[]>} A comprehensive list of all sessions and their status.
     */
    listAllSessionsWithClients(): Promise<Omit<SessionInfo, 'source'>[]>;
    /**
     * Cleans all invalid sessions, including those in the base directory and those managed by active clients.
     * @returns {Promise<number>} A promise resolving to the total number of cleaned sessions.
     */
    cleanAllSessionsWithClients(): Promise<number>;
}
export type WrapperOptions = {
    /**
     * - The name of the directory to store session files.
     */
    folderName?: string | undefined;
    /**
     * - Whether to use pairing code for authentication.
     */
    pairingCode?: string | undefined;
    /**
     * - A custom function to serialize incoming messages.
     */
    serializer?: Function | undefined;
    /**
     * - Custom configuration for the Baileys socket.
     */
    baileysConfig?: Partial<import("baileys").UserFacingSocketConfig> | undefined;
};
export type SessionInfo = {
    id: string;
    path: string;
    valid: boolean;
    reason?: string | undefined;
    source: "base" | "client";
};
import { SessionManager } from '../client/session.js';
