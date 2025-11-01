/**
 * A singleton instance of the Functions class, providing access to utility methods.
 */
export const Func: Functions;
/**
 * A utility class containing various helper functions.
 */
declare class Functions {
    /**
      * Pauses the execution for a specified number of milliseconds.
      * @param {number} ms - The number of milliseconds to sleep.
      * @returns {Promise<void>} A promise that resolves after the specified duration.
      */
    sleep(ms: number): Promise<void>;
    /**
     * Fetches a file from a given path or URL and optionally saves it to a temporary directory.
     * @param {string|Buffer} PATH - The URL, file path, or Buffer of the file.
     * @param {boolean} save - If true, saves the file to the 'temp' folder.
     * @returns {Promise<{filename: string|null, data: Buffer, size: number, name: string, mime: string, ext: string}>} An object containing file information and data.
     */
    getFile(PATH: string | Buffer, save: boolean): Promise<{
        filename: string | null;
        data: Buffer;
        size: number;
        name: string;
        mime: string;
        ext: string;
    }>;
    /**
     * Fetches content from various sources (URL, base64, file path, Buffer) and returns it as a buffer along with metadata.
     * @param {string|Buffer} string - The input source. Can be a URL, base64 string, local file path, or a Buffer.
     * @returns {Promise<{data: Buffer, size: number, name: string, mime: string, ext: string}>} An object containing the buffer and file metadata.
     * @throws {Error} Throws an error if the input type is invalid or fetching fails.
     */
    fetchBuffer(string: string | Buffer): Promise<{
        data: Buffer;
        size: number;
        name: string;
        mime: string;
        ext: string;
    }>;
    /**
     * Parses a string for command-line style arguments.
     * Supports formats like `--flag`, `--key=value`, `--key "value with spaces"`.
     * @param {string} input - The string to parse.
     * @returns {any} An object containing the parsed arguments.
     */
    parseArgs(input: string): any;
}
export {};
