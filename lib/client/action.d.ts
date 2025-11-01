/**
 * A helper class that encapsulates common WhatsApp actions, providing a simplified interface over the Baileys socket.
 */
export class Action {
    /**
     * @param {import('baileys').WASocket} sock - The Baileys socket instance.
     */
    constructor(sock: import('baileys').WASocket);
    sock: {
        communityMetadata: (jid: string) => Promise<import("baileys").GroupMetadata>;
        communityCreate: (subject: string, body: string) => Promise<import("baileys").GroupMetadata | null>;
        communityCreateGroup: (subject: string, participants: string[], parentCommunityJid: string) => Promise<import("baileys").GroupMetadata | null>;
        communityLeave: (id: string) => Promise<void>;
        communityUpdateSubject: (jid: string, subject: string) => Promise<void>;
        communityLinkGroup: (groupJid: string, parentCommunityJid: string) => Promise<void>;
        communityUnlinkGroup: (groupJid: string, parentCommunityJid: string) => Promise<void>;
        communityFetchLinkedGroups: (jid: string) => Promise<{
            communityJid: string;
            isCommunity: boolean;
            linkedGroups: {
                id: string | undefined;
                subject: string;
                creation: number | undefined;
                owner: string | undefined;
                size: number | undefined;
            }[];
        }>;
        communityRequestParticipantsList: (jid: string) => Promise<{
            [key: string]: string;
        }[]>;
        communityRequestParticipantsUpdate: (jid: string, participants: string[], action: "approve" | "reject") => Promise<{
            status: string;
            jid: string | undefined;
        }[]>;
        communityParticipantsUpdate: (jid: string, participants: string[], action: import("baileys").ParticipantAction) => Promise<{
            status: string;
            jid: string | undefined;
            content: import("baileys").BinaryNode;
        }[]>;
        communityUpdateDescription: (jid: string, description?: string | undefined) => Promise<void>;
        communityInviteCode: (jid: string) => Promise<string | undefined>;
        communityRevokeInvite: (jid: string) => Promise<string | undefined>;
        communityAcceptInvite: (code: string) => Promise<string | undefined>;
        communityRevokeInviteV4: (communityJid: string, invitedJid: string) => Promise<boolean>;
        communityAcceptInviteV4: (key: string | import("baileys").WAMessageKey, inviteMessage: proto.Message.IGroupInviteMessage) => Promise<any>;
        communityGetInviteInfo: (code: string) => Promise<import("baileys").GroupMetadata>;
        communityToggleEphemeral: (jid: string, ephemeralExpiration: number) => Promise<void>;
        communitySettingUpdate: (jid: string, setting: "locked" | "announcement" | "not_announcement" | "unlocked") => Promise<void>;
        communityMemberAddMode: (jid: string, mode: "admin_add" | "all_member_add") => Promise<void>;
        communityJoinApprovalMode: (jid: string, mode: "on" | "off") => Promise<void>;
        communityFetchAllParticipating: () => Promise<{
            [_: string]: import("baileys").GroupMetadata;
        }>;
        logger: import("baileys/lib/Utils/logger.js").ILogger;
        getOrderDetails: (orderId: string, tokenBase64: string) => Promise<import("baileys").OrderDetails>;
        getCatalog: ({ jid, limit, cursor }: import("baileys").GetCatalogOptions) => Promise<{
            products: import("baileys").Product[];
            nextPageCursor: string | undefined;
        }>;
        getCollections: (jid?: string | undefined, limit?: number | undefined) => Promise<{
            collections: import("baileys").CatalogCollection[];
        }>;
        productCreate: (create: import("baileys").ProductCreate) => Promise<import("baileys").Product>;
        productDelete: (productIds: string[]) => Promise<{
            deleted: number;
        }>;
        productUpdate: (productId: string, update: import("baileys").ProductUpdate) => Promise<import("baileys").Product>;
        updateBussinesProfile: (args: import("baileys/lib/Types/Bussines.js").UpdateBussinesProfileProps) => Promise<any>;
        updateCoverPhoto: (photo: import("baileys").WAMediaUpload) => Promise<number>;
        removeCoverPhoto: (id: string) => Promise<any>;
        sendMessageAck: ({ tag, attrs, content }: import("baileys").BinaryNode, errorCode?: number | undefined) => Promise<void>;
        sendRetryRequest: (node: import("baileys").BinaryNode, forceIncludeKeys?: boolean | undefined) => Promise<void>;
        rejectCall: (callId: string, callFrom: string) => Promise<void>;
        fetchMessageHistory: (count: number, oldestMsgKey: import("baileys").WAMessageKey, oldestMsgTimestamp: number | import("../../node_modules/long/umd/types.js").Long) => Promise<string>;
        requestPlaceholderResend: (messageKey: import("baileys").WAMessageKey) => Promise<string | undefined>;
        messageRetryManager: import("baileys").MessageRetryManager | null;
        getPrivacyTokens: (jids: string[]) => Promise<any>;
        assertSessions: (jids: string[]) => Promise<boolean>;
        relayMessage: (jid: string, message: proto.IMessage, { messageId: msgId, participant, additionalAttributes, additionalNodes, useUserDevicesCache, useCachedGroupMetadata, statusJidList }: import("baileys").MessageRelayOptions) => Promise<string>;
        sendReceipt: (jid: string, participant: string | undefined, messageIds: string[], type: import("baileys").MessageReceiptType) => Promise<void>;
        sendReceipts: (keys: import("baileys").WAMessageKey[], type: import("baileys").MessageReceiptType) => Promise<void>;
        readMessages: (keys: import("baileys").WAMessageKey[]) => Promise<void>;
        refreshMediaConn: (forceGet?: boolean | undefined) => Promise<import("baileys").MediaConnInfo>;
        waUploadToServer: import("baileys").WAMediaUploadFunction;
        fetchPrivacySettings: (force?: boolean | undefined) => Promise<{
            [_: string]: string;
        }>;
        sendPeerDataOperationMessage: (pdoMessage: proto.Message.IPeerDataOperationRequestMessage) => Promise<string>;
        createParticipantNodes: (recipientJids: string[], message: proto.IMessage, extraAttrs?: {
            [key: string]: string;
        } | undefined, dsmMessage?: proto.IMessage | undefined) => Promise<{
            nodes: import("baileys").BinaryNode[];
            shouldIncludeDeviceIdentity: boolean;
        }>;
        getUSyncDevices: (jids: string[], useCache: boolean, ignoreZeroDevices: boolean) => Promise<(import("baileys").JidWithDevice & {
            jid: string;
        })[]>;
        updateMediaMessage: (message: import("baileys").WAMessage) => Promise<import("baileys").WAMessage>;
        sendMessage: (jid: string, content: import("baileys").AnyMessageContent, options?: import("baileys").MiscMessageGenerationOptions | undefined) => Promise<import("baileys").WAMessage | undefined>;
        newsletterCreate: (name: string, description?: string | undefined) => Promise<import("baileys").NewsletterMetadata>;
        newsletterUpdate: (jid: string, updates: import("baileys").NewsletterUpdate) => Promise<unknown>;
        newsletterSubscribers: (jid: string) => Promise<{
            subscribers: number;
        }>;
        newsletterMetadata: (type: "jid" | "invite", key: string) => Promise<import("baileys").NewsletterMetadata | null>;
        newsletterFollow: (jid: string) => Promise<unknown>;
        newsletterUnfollow: (jid: string) => Promise<unknown>;
        newsletterMute: (jid: string) => Promise<unknown>;
        newsletterUnmute: (jid: string) => Promise<unknown>;
        newsletterUpdateName: (jid: string, name: string) => Promise<unknown>;
        newsletterUpdateDescription: (jid: string, description: string) => Promise<unknown>;
        newsletterUpdatePicture: (jid: string, content: import("baileys").WAMediaUpload) => Promise<unknown>;
        newsletterRemovePicture: (jid: string) => Promise<unknown>;
        newsletterReactMessage: (jid: string, serverId: string, reaction?: string | undefined) => Promise<void>;
        newsletterFetchMessages: (jid: string, count: number, since: number, after: number) => Promise<any>;
        subscribeNewsletterUpdates: (jid: string) => Promise<{
            duration: string;
        } | null>;
        newsletterAdminCount: (jid: string) => Promise<number>;
        newsletterChangeOwner: (jid: string, newOwnerJid: string) => Promise<void>;
        newsletterDemote: (jid: string, userJid: string) => Promise<void>;
        newsletterDelete: (jid: string) => Promise<void>;
        groupMetadata: (jid: string) => Promise<import("baileys").GroupMetadata>;
        groupCreate: (subject: string, participants: string[]) => Promise<import("baileys").GroupMetadata>;
        groupLeave: (id: string) => Promise<void>;
        groupUpdateSubject: (jid: string, subject: string) => Promise<void>;
        groupRequestParticipantsList: (jid: string) => Promise<{
            [key: string]: string;
        }[]>;
        groupRequestParticipantsUpdate: (jid: string, participants: string[], action: "approve" | "reject") => Promise<{
            status: string;
            jid: string | undefined;
        }[]>;
        groupParticipantsUpdate: (jid: string, participants: string[], action: import("baileys").ParticipantAction) => Promise<{
            status: string;
            jid: string | undefined;
            content: import("baileys").BinaryNode;
        }[]>;
        groupUpdateDescription: (jid: string, description?: string | undefined) => Promise<void>;
        groupInviteCode: (jid: string) => Promise<string | undefined>;
        groupRevokeInvite: (jid: string) => Promise<string | undefined>;
        groupAcceptInvite: (code: string) => Promise<string | undefined>;
        groupRevokeInviteV4: (groupJid: string, invitedJid: string) => Promise<boolean>;
        groupAcceptInviteV4: (key: string | import("baileys").WAMessageKey, inviteMessage: proto.Message.IGroupInviteMessage) => Promise<any>;
        groupGetInviteInfo: (code: string) => Promise<import("baileys").GroupMetadata>;
        groupToggleEphemeral: (jid: string, ephemeralExpiration: number) => Promise<void>;
        groupSettingUpdate: (jid: string, setting: "locked" | "announcement" | "not_announcement" | "unlocked") => Promise<void>;
        groupMemberAddMode: (jid: string, mode: "admin_add" | "all_member_add") => Promise<void>;
        groupJoinApprovalMode: (jid: string, mode: "on" | "off") => Promise<void>;
        groupFetchAllParticipating: () => Promise<{
            [_: string]: import("baileys").GroupMetadata;
        }>;
        createCallLink: (type: "video" | "audio", event?: {
            startTime: number;
        } | undefined, timeoutMs?: number | undefined) => Promise<string | undefined>;
        getBotListV2: () => Promise<import("baileys").BotListInfo[]>;
        processingMutex: {
            mutex<T>(code: () => T | Promise<T>): Promise<T>;
        };
        upsertMessage: (msg: import("baileys").WAMessage, type: import("baileys").MessageUpsertType) => Promise<void>;
        appPatch: (patchCreate: import("baileys").WAPatchCreate) => Promise<void>;
        sendPresenceUpdate: (type: import("baileys").WAPresence, toJid?: string | undefined) => Promise<void>;
        presenceSubscribe: (toJid: string, tcToken?: Buffer | undefined) => Promise<void>;
        profilePictureUrl: (jid: string, type?: "image" | "preview" | undefined, timeoutMs?: number | undefined) => Promise<string | undefined>;
        fetchBlocklist: () => Promise<(string | undefined)[]>;
        fetchStatus: (...jids: string[]) => Promise<import("baileys").USyncQueryResultList[] | undefined>;
        fetchDisappearingDuration: (...jids: string[]) => Promise<import("baileys").USyncQueryResultList[] | undefined>;
        updateProfilePicture: (jid: string, content: import("baileys").WAMediaUpload, dimensions?: {
            width: number;
            height: number;
        } | undefined) => Promise<void>;
        removeProfilePicture: (jid: string) => Promise<void>;
        updateProfileStatus: (status: string) => Promise<void>;
        updateProfileName: (name: string) => Promise<void>;
        updateBlockStatus: (jid: string, action: "block" | "unblock") => Promise<void>;
        updateDisableLinkPreviewsPrivacy: (isPreviewsDisabled: boolean) => Promise<void>;
        updateCallPrivacy: (value: import("baileys").WAPrivacyCallValue) => Promise<void>;
        updateMessagesPrivacy: (value: import("baileys").WAPrivacyMessagesValue) => Promise<void>; /**
         * Sends a message with interactive quick reply buttons.
         * @param {string} jid - The JID of the recipient.
         * @param {Object} data - The message data, including text, footer, and buttons.
         * @param {import('baileys').AnyMessageContent} [options={}] - Additional message generation options.
         * @returns {Promise<import('baileys').proto.WebMessageInfo>} A promise that resolves with the sent message info object.
         */
        updateLastSeenPrivacy: (value: import("baileys").WAPrivacyValue) => Promise<void>;
        updateOnlinePrivacy: (value: import("baileys").WAPrivacyOnlineValue) => Promise<void>;
        updateProfilePicturePrivacy: (value: import("baileys").WAPrivacyValue) => Promise<void>;
        updateStatusPrivacy: (value: import("baileys").WAPrivacyValue) => Promise<void>;
        updateReadReceiptsPrivacy: (value: import("baileys").WAReadReceiptsValue) => Promise<void>;
        updateGroupsAddPrivacy: (value: import("baileys").WAPrivacyGroupAddValue) => Promise<void>;
        updateDefaultDisappearingMode: (duration: number) => Promise<void>;
        getBusinessProfile: (jid: string) => Promise<void | import("baileys").WABusinessProfile>;
        resyncAppState: (collections: readonly ("critical_unblock_low" | "regular_high" | "regular_low" | "critical_block" | "regular")[], isInitialSync: boolean) => Promise<void>;
        chatModify: (mod: import("baileys").ChatModification, jid: string) => Promise<void>;
        cleanDirtyBits: (type: "account_sync" | "groups", fromTimestamp?: string | number | undefined) => Promise<void>;
        addOrEditContact: (jid: string, contact: proto.SyncActionValue.IContactAction) => Promise<void>;
        removeContact: (jid: string) => Promise<void>;
        addLabel: (jid: string, labels: import("baileys/lib/Types/Label.js").LabelActionBody) => Promise<void>;
        addChatLabel: (jid: string, labelId: string) => Promise<void>;
        removeChatLabel: (jid: string, labelId: string) => Promise<void>;
        addMessageLabel: (jid: string, messageId: string, labelId: string) => Promise<void>;
        removeMessageLabel: (jid: string, messageId: string, labelId: string) => Promise<void>;
        star: (jid: string, messages: {
            id: string;
            fromMe?: boolean | undefined;
        }[], star: boolean) => Promise<void>;
        addOrEditQuickReply: (quickReply: any) => Promise<void>;
        removeQuickReply: (timestamp: string) => Promise<void>;
        type: "md";
        ws: import("baileys/lib/Socket/Client/websocket.js").WebSocketClient;
        ev: import("baileys").BaileysEventEmitter & {
            process(handler: (events: Partial<import("baileys").BaileysEventMap>) => void | Promise<void>): () => void;
            buffer(): void;
            createBufferedFunction<A extends any[], T_1>(work: (...args: A) => Promise<T_1>): (...args: A) => Promise<T_1>;
            flush(): boolean;
            isBuffering(): boolean;
        };
        authState: {
            creds: import("baileys").AuthenticationCreds;
            keys: import("baileys").SignalKeyStoreWithTransaction;
        };
        signalRepository: import("baileys").SignalRepositoryWithLIDStore;
        user: import("baileys").Contact | undefined;
        generateMessageTag: () => string;
        query: (node: import("baileys").BinaryNode, timeoutMs?: number | undefined) => Promise<any>;
        waitForMessage: <T_2>(msgId: string, timeoutMs?: number | undefined) => Promise<T_2 | undefined>;
        waitForSocketOpen: () => Promise<void>;
        sendRawMessage: (data: Buffer | Uint8Array) => Promise<void>;
        sendNode: (frame: import("baileys").BinaryNode) => Promise<void>;
        logout: (msg?: string | undefined) => Promise<void>;
        end: (error: Error | undefined) => void;
        onUnexpectedError: (err: Error | import("baileys/node_modules/@hapi/boom").Boom<any>, msg: string) => void;
        uploadPreKeys: (count?: number | undefined, retryCount?: number | undefined) => Promise<void>;
        uploadPreKeysToServerIfRequired: () => Promise<void>;
        requestPairingCode: (phoneNumber: string, customPairingCode?: string | undefined) => Promise<string>;
        wamBuffer: import("baileys").BinaryInfo;
        waitForConnectionUpdate: (check: (u: Partial<import("baileys").ConnectionState>) => Promise<boolean | undefined>, timeoutMs?: number | undefined) => Promise<void>;
        sendWAMBuffer: (wamBuffer: Buffer) => Promise<any>;
        executeUSyncQuery: (usyncQuery: import("baileys").USyncQuery) => Promise<import("baileys").USyncQueryResult | undefined>;
        onWhatsApp: (...phoneNumber: string[]) => Promise<{
            jid: string;
            exists: boolean;
        }[] | undefined>;
    };
    /**
     * Normalizes a JID, especially useful for JIDs from group participant updates that might contain colons.
     * @param {string} jid - The JID to decode/normalize.
     * @returns {string} The normalized JID.
     */
    decodeJid(jid: string): string;
    /**
     * Sends a simple text message.
     * @param {string} jid - The JID of the recipient.
     * @param {string} text - The text to send.
     * @param {import('baileys').AnyMessageContent} [options={}] - Additional message generation options.
     * @returns {Promise<import('baileys').proto.WebMessageInfo>} A promise that resolves with the sent message info object.
     */
    sendText(jid: string, text: string, options?: import("baileys").AnyMessageContent | undefined): Promise<import('baileys').proto.WebMessageInfo>;
    /**
     * Sends a reaction to a specific message.
     * @param {string} jid - The JID of the chat where the message is.
     * @param {import('baileys').proto.IMessageKey} key - The key of the message to react to.
     * @param {string} emoji - The emoji to use for the reaction.
     * @returns {Promise<import('baileys').proto.WebMessageInfo>} A promise that resolves with the sent reaction message info object.
     */
    react(jid: string, key: import('baileys').proto.IMessageKey, emoji: string): Promise<import('baileys').proto.WebMessageInfo>;
    /**
     * Sends one or more contacts as a vCard.
     * @param {string} jid - The JID of the recipient.
     * @param {Array<{name: string, number: string, about?: string}>|{name: string, number: string, about?: string}} contacts - A single contact object or an array of contact objects.
     * @param {import('baileys').AnyMessageContent} [options={}] - Additional message generation options.
     * @returns {Promise<import('baileys').proto.WebMessageInfo>} A promise that resolves with the sent message info object.
     */
    sendContact(jid: string, contacts: Array<{
        name: string;
        number: string;
        about?: string;
    }> | {
        name: string;
        number: string;
        about?: string;
    }, options?: import("baileys").AnyMessageContent | undefined): Promise<import('baileys').proto.WebMessageInfo>;
    /**
     * Sends a message with interactive quick reply buttons.
     * @param {string} jid - The JID of the recipient.
     * @param {Object} data - The message data, including text, footer, and buttons.
     * @param {import('baileys').AnyMessageContent} [options={}] - Additional message generation options.
     * @returns {Promise<import('baileys').proto.WebMessageInfo>} A promise that resolves with the sent message info object.
     */
    sendButtons(jid: string, data: Object, options?: import("baileys").AnyMessageContent | undefined): Promise<import('baileys').proto.WebMessageInfo>;
    /**
     * Sends a complex interactive message. This is a class method wrapper for the standalone `sendInteractiveMessage` function.
     * @param {string} jid - The JID of the recipient.
     * @param {Object} content - The message content object.
     * @param {import('baileys').AnyMessageContent} [options={}] - Additional message generation options.
     * @returns {Promise<import('baileys').proto.WebMessageInfo>} A promise that resolves with the sent message info object.
     */
    sendInteractiveMessage(jid: string, content: Object, options?: import("baileys").AnyMessageContent | undefined): Promise<import('baileys').proto.WebMessageInfo>;
    /**
     * Fetches the display name for a given JID.
     * It checks for a contact name, then a group subject, and finally falls back to the number part of the JID.
     * @param {string} jid - The JID to get the name for.
     * @returns {Promise<string>} A promise that resolves to the name.
     */
    getName(jid: string): Promise<string>;
    /**
     * Downloads media from a message and returns it as a buffer.
     * @param {import('baileys').proto.IWebMessageInfo} message - The message object containing the media to download.
     * @param {string} [filename] - This parameter is not used in the current implementation.
     * @returns {Promise<Buffer>} A promise that resolves to a buffer containing the media data.
     */
    downloadMediaMessage(message: import('baileys').proto.IWebMessageInfo, filename?: string | undefined): Promise<Buffer>;
    /**
     * Extracts all mentioned JIDs from a text string.
     * @param {string} text - The text containing mentions (e.g., "Hello @1234567890").
     * @returns {string[]} An array of mentioned JIDs in the format `number@s.whatsapp.net`.
     */
    parseMention(text: string): string[];
    sendMedia(jid: any, url: any, quoted?: string, options?: {}): Promise<unknown>;
}
import { proto } from 'baileys';
