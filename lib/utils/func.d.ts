import { Buffer } from 'buffer';
interface FetchedBufferInfo {
    data: Buffer;
    size: number;
    name: string;
    mime: string | undefined;
    ext: string | false;
}
declare class Functions {
    constructor();
    sleep(ms: number): Promise<void>;
    getFile(PATH: string | Buffer, save?: boolean): Promise<any | undefined>;
    fetchBuffer(source: string | Buffer): Promise<FetchedBufferInfo | undefined>;
    parseArgs(input: string): Record<string, string | boolean>;
}
export declare const Func: Functions;
export {};
