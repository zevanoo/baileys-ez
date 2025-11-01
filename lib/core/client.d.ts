/**
* @callback SerializerFunc
* @param {import('../client/action.js').Action} client
* @param {import('baileys').proto.IWebMessageInfo} msg
* @returns {Promise<import('../client/serialize.js').SerializedMessage>}
*/
/**
 * @typedef {object} ClientOptions
 * @property {string} id - A unique identifier for this client session.
 * @property {string} number - The phone number to use for pairing code authentication.
 * @property {string} pairingCode - Custom code to pairing code for authentication.
 * @property {Partial<import('baileys').UserFacingSocketConfig>} [baileysConfig={}] - Custom configuration options for the Baileys socket.
 * @property {SerializerFunc} [serializer] - An optional custom function to serialize incoming messages.
 */
/**
 * Represents a WhatsApp client instance, wrapping the Baileys socket functionality.
 * Manages connection, events, and actions for a single WhatsApp account session.
 * @extends {EventEmitter}
 */
export class Client extends EventEmitter<[never]> {
    /**
     * Creates an instance of the Client.
     * @param {ClientOptions} options - The configuration options for the client.
     */
    constructor({ id, number, pairingCode, baileysConfig, serializer }: ClientOptions);
    /** @type {string} */
    id: string;
    /** @type {string} */
    number: string;
    /** @type {string} */
    pairingCode: string;
    /** @type {Partial<import('baileys').UserFacingSocketConfig>} */
    baileysConfig: Partial<import('baileys').UserFacingSocketConfig>;
    /** @type {SerializerFunc | undefined} */
    serializer: SerializerFunc | undefined;
    /** @type {import('baileys').WASocket | null} */
    sock: import('baileys').WASocket | null;
    /** @type {string | null} */
    sessionPath: string | null;
    /**
     * Initializes and connects the WhatsApp client.
     * Sets up authentication, binds event listeners, and handles the connection lifecycle.
     * @fires Client#connection
     * @fires Client#error
     * @returns {Promise<void>}
     */
    connect(): Promise<void>;
    /**
     * Binds methods from the `Action` class to the `sock` instance for direct access.
     * This acts as a shortcut for `new Action(sock).method()`.
     * @private
     * @throws {Error} If called before the socket is connected.
     */
    private _bindActionMethods;
    /**
     * Disconnects the client from WhatsApp and cleans up the socket instance.
     * @returns {Promise<void>}
     */
    disconnect(): Promise<void>;
    /**
     * Dynamically loads and attaches all event listeners from the listeners directory.
     * @private
     * @param {import('baileys').WASocket} sock
     * @param {ClientOptions} client
     */
    private loadListeners;
    /**
     * Serializes a raw Baileys message object into a more convenient format.
     * It uses a custom serializer if provided, falls back to a global one,
     * and finally uses a default serializer.
     * @param {import('baileys').WASocket & import('../client/action.js').Action} sock
     * @param {import('baileys').proto.IWebMessageInfo} m The raw message object.
     * @returns {Promise<import('../client/serialize.js').SerializedMessage | undefined>} The serialized message object.
     */
    serializeMessage(sock: import('baileys').WASocket & import('../client/action.js').Action, m: import('baileys').proto.IWebMessageInfo): Promise<import('../client/serialize.js').SerializedMessage | undefined>;
}
export type SerializerFunc = (client: import('../client/action.js').Action, msg: import('baileys').proto.IWebMessageInfo) => Promise<import('../client/serialize.js').SerializedMessage>;
export type ClientOptions = {
    /**
     * - A unique identifier for this client session.
     */
    id: string;
    /**
     * - The phone number to use for pairing code authentication.
     */
    number: string;
    /**
     * - Custom code to pairing code for authentication.
     */
    pairingCode: string;
    /**
     * - Custom configuration options for the Baileys socket.
     */
    baileysConfig?: Partial<import("baileys").UserFacingSocketConfig> | undefined;
    /**
     * - An optional custom function to serialize incoming messages.
     */
    serializer?: SerializerFunc | undefined;
};
import { EventEmitter } from 'events';
