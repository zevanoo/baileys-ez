import { EventEmitter } from 'events';
interface SessionStatus {
    exists: boolean;
    registered: boolean;
    valid: boolean;
    reason?: string;
}
interface ListedSession {
    id: string;
    path: string;
    valid: boolean;
    reason?: string;
}
export declare class SessionManager extends EventEmitter {
    baseSessionPath: string;
    constructor(folderName?: string);
    private _getErrorMessage;
    private _pathExists;
    checkIndividualSessionStatus(sessionDirectory: string): Promise<SessionStatus>;
    validateAndCleanIndividualSession(sessionDirectory: string): Promise<void>;
    cleanupCorruptSessions(): Promise<void>;
    listValidSessions(): Promise<string[]>;
    removeSession(sessionId: string): Promise<boolean>;
    getSessionInfo(sessionId: string): Promise<SessionStatus>;
    listAllSessions(additionalPaths?: string[]): Promise<ListedSession[]>;
    cleanAllSessions(additionalPaths?: string[]): Promise<number>;
}
export {};
