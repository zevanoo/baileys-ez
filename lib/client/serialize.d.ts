/**
 * @param {import('baileys').WASocket & Action} client
 * @param {IWebMessageInfo} msg
 * @returns {Promise<SerializedMessage | undefined>}
 */
export function serialize(client: import('baileys').WASocket & Action, msg: IWebMessageInfo): Promise<SerializedMessage | undefined>;
export type IWebMessageInfo = import('baileys').proto.IWebMessageInfo;
export type MessageGenerationOptions = import('baileys').MessageGenerationOptions;
export type Client = import('../core/client.js').Client;
export type Action = import('./action.js').Action;
export type SerializedMessage = {
    raw: IWebMessageInfo;
    message: IWebMessageInfo['message'];
    key: import('baileys').proto.IMessageKey;
    from: string;
    fromMe: boolean;
    id: string;
    device: string;
    isBaileys: boolean;
    isGroup: boolean;
    participant: string;
    sender: string;
    pushName: string;
    type: string | undefined;
    msg: any;
    mentions: string[];
    body: string | null;
    prefix: string | null;
    prefixes: string[];
    command: string | null;
    args: string[];
    text: string;
    argsParsed: Record<string, string | boolean>;
    expiration: number;
    timestamp: number;
    isMedia: boolean;
    mimetype: string | undefined | null;
    size: number | Long | undefined | null;
    height: number | undefined | null;
    width: number | undefined | null;
    isAnimated: boolean | undefined | null;
    reply: (text: string, options?: MessageGenerationOptions) => Promise<IWebMessageInfo | undefined>;
    download: () => Promise<Buffer>;
    react: (emoji: string) => Promise<IWebMessageInfo | undefined>;
    isQuoted: boolean;
    quoted: SerializedMessage | null;
};
export type ParsedMessage = {
    body: string;
    prefix: string | null;
    prefixes: string[];
    command: string | null;
    arg: string[];
    args: string[];
    text: string;
    argsParsed: Record<string, string | boolean>;
};
