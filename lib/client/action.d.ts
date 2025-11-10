import { WASocket, AnyMessageContent, proto, MessageRelayOptions } from 'baileys';
import { Buffer } from 'buffer';
interface BasicButtonData {
    text?: string;
    footer?: string;
    title?: string;
    subtitle?: string;
    buttons?: any[];
}
interface ContactObject {
    name: string;
    number: string;
    about?: string;
}
export declare class Action {
    sock: WASocket;
    constructor(sock: WASocket);
    decodeJid(jid: string): string;
    sendText(jid: string, text: string, options?: {}): Promise<proto.IWebMessageInfo | undefined>;
    react(jid: string, key: proto.IMessageKey, emoji: string): Promise<proto.IWebMessageInfo | undefined>;
    sendContact(jid: string, contacts: ContactObject[], options?: {}): Promise<proto.IWebMessageInfo | undefined>;
    sendButtons(jid: string, data: BasicButtonData, options?: MessageRelayOptions): Promise<proto.IWebMessageInfo>;
    sendInteractiveMessage(jid: string, content: AnyMessageContent, options?: MessageRelayOptions): Promise<proto.IWebMessageInfo>;
    downloadMediaMessage(message: any): Promise<Buffer>;
    parseMention(text: string): string[];
    sendMedia(jid: string, url: string | Buffer, quoted?: proto.IWebMessageInfo | string, options?: any): Promise<proto.IWebMessageInfo | undefined>;
}
export {};
