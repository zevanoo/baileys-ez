import { WASocket, UserFacingSocketConfig, proto } from 'baileys';
import { EventEmitter } from 'events';
import { SerializedMessage } from '../client/serialize.js';
import { Action } from '../client/action.js';
interface ClientOptions {
    id: string;
    number: string;
    pairingCode: string;
    baileysConfig?: Partial<UserFacingSocketConfig>;
    serializer?: any;
}
export declare class Client extends EventEmitter {
    id: string;
    number: string;
    pairingCode: string;
    baileysConfig: Partial<UserFacingSocketConfig>;
    serializer?: any;
    sock: (WASocket & Action) | null;
    sessionPath: string | null;
    constructor({ id, number, pairingCode, baileysConfig, serializer }: ClientOptions);
    connect(): Promise<void>;
    private _bindActionMethods;
    disconnect(): Promise<void>;
    private loadListeners;
    serializeMessage(sock: WASocket & Action, m: proto.IWebMessageInfo): Promise<SerializedMessage | Record<string, string | any> | undefined>;
}
export {};
