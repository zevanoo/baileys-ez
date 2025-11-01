/// <reference types="node" resolution-mode="require"/>
/**
 * Manages Baileys authentication sessions stored on the filesystem.
 * Handles validation, cleaning, and retrieval of session data.
 * @extends {EventEmitter}
 */
export class SessionManager extends EventEmitter<[never]> {
    /**
     * Creates an instance of SessionManager.
     * @param {string} [folderName='sessions'] - The name of the folder where session data will be stored, relative to the current working directory.
     */
    constructor(folderName?: string | undefined);
    baseSessionPath: string;
    /**
     * Helper to safely get an error message from an unknown error type.
     * @param {unknown} error - The caught error.
     * @returns {string} The error message.
     */
    _getErrorMessage(error: unknown): string;
    /**
     * Helper to check is the path exist
     * @param {string} filePath - filepath to check
     * @returns {Promise<boolean>} the result
     */
    _pathExists(filePath: string): Promise<boolean>;
    /**
     * Checks the status of an individual session by inspecting its directory and `creds.json` file.
     * @param {string} sessionDirectory - The full path to the session directory.
     * @returns {Promise<{exists: boolean, registered: boolean, valid: boolean, reason?: string}>} An object detailing the session's status.
     * - `exists`: Whether the session directory and `creds.json` file exist.
     * - `registered`: Whether the `registered` flag in `creds.json` is true.
     * - `valid`: Whether the session is both registered and contains all required authentication keys.
     * - `reason`: A string explaining why a session is invalid, if applicable.
     */
    checkIndividualSessionStatus(sessionDirectory: string): Promise<{
        exists: boolean;
        registered: boolean;
        valid: boolean;
        reason?: string;
    }>;
    /**
     * Validates a session and removes its directory if it's found to be invalid or corrupt.
     * @param {string} sessionDirectory - The full path to the session directory to validate and potentially clean.
     * @returns {Promise<void>}
     */
    validateAndCleanIndividualSession(sessionDirectory: string): Promise<void>;
    /**
     * Scans all session directories in the base path and cleans up any that are corrupt or invalid.
     * @returns {Promise<void>}
     */
    cleanupCorruptSessions(): Promise<void>;
    /**
     * Finds all valid and registered sessions in the base session path.
     * @returns {Promise<string[]>} A promise that resolves to an array of valid session IDs (folder names).
     */
    listValidSessions(): Promise<string[]>;
    /**
     * Removes a specific session folder by its ID.
     * @param {string} sessionId - The ID (folder name) of the session to remove.
     * @returns {Promise<boolean>} A promise that resolves to `true` if removal was successful, `false` otherwise.
     */
    removeSession(sessionId: string): Promise<boolean>;
    /**
     * Gets the status information for a specific session by its ID.
     * @param {string} sessionId - The ID of the session to check.
     * @returns {Promise<{exists: boolean, registered: boolean, valid: boolean, reason?: string}>} An object detailing the session's status.
     */
    getSessionInfo(sessionId: string): Promise<{
        exists: boolean;
        registered: boolean;
        valid: boolean;
        reason?: string;
    }>;
    /**
     * Lists all session folders found in the base path and any additional specified paths.
     * @param {string[]} [additionalPaths=[]] - An array of additional absolute paths to scan for session folders.
     * @returns {Promise<Array<{id: string, path: string, valid: boolean, reason?: string}>>} A promise resolving to an array of objects, each representing a session.
     */
    listAllSessions(additionalPaths?: string[] | undefined): Promise<Array<{
        id: string;
        path: string;
        valid: boolean;
        reason?: string;
    }>>;
    /**
     * Cleans all invalid sessions from the base path and any additional specified paths.
     * @param {string[]} [additionalPaths=[]] - An array of additional absolute paths to scan for cleaning.
     * @returns {Promise<number>} A promise that resolves to the number of sessions that were cleaned.
     */
    cleanAllSessions(additionalPaths?: string[] | undefined): Promise<number>;
}
import { EventEmitter } from 'events';
import path from 'path';
