import { SessionManager } from '../client/session.js';
import { Client } from './client.js';
import type { UserFacingSocketConfig } from 'baileys';
import type { WrapperConfig } from '../index.js';
interface SessionInfo {
    id: string;
    path: string;
    valid: boolean;
    reason?: string;
    source: "base" | "client";
}
interface ClientSessionStatus {
    id: string;
    path: string;
    valid: boolean;
    reason?: string;
}
export declare class Wrapper extends SessionManager {
    serializer?: any;
    baileysConfig: Partial<UserFacingSocketConfig>;
    clients: Map<string, Client>;
    pairingCode?: string;
    constructor({ folderName, pairingCode, serializer, baileysConfig }: WrapperConfig);
    addClient(client: Client): void;
    removeClient(id: string): Promise<void>;
    getClient(id: string): Client | undefined;
    getAllClients(): Client[];
    connectAll(): Promise<void>;
    disconnectAll(): Promise<void>;
    getClientSessionPaths(): string[];
    checkAllClientSessions(): Promise<ClientSessionStatus[]>;
    cleanClientSessions(): Promise<number>;
    listAllSessionsWithClients(): Promise<SessionInfo[]>;
    cleanAllSessionsWithClients(): Promise<number>;
}
export {};
