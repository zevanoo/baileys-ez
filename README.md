# Baileys-ez

A powerful and easy-to-use wrapper for the [Baileys](https://github.com/WhiskeySockets/Baileys) WhatsApp Web API library. This wrapper simplifies multi-device bot management, enhances interactive message capabilities, and streamlines session handling.

## Features

*   **Multi-Client Management**: Easily manage multiple WhatsApp accounts using a single `Wrapper` instance created with `createWrapper`.
*   **Simplified Event Handling**: Unified event system for both single and multi-client setups with simplified event names (e.g., `contact.add`, `message.remove`).
*   **Enhanced Interactive Messages**: Send rich interactive buttons (Quick Replies, CTAs, Single Select, etc.)
*   **Automatic Session Management**: Connect, validate, clean, and remove sessions automatically or manually via the `createWrapper`.
*   **Direct Baileys Access**: Access all original Baileys functions via `client.sock` for advanced use cases.
*   **Action Helpers**: Convenient methods like `sendButtons`, `sendInteractiveMessage`, `sendContact`, `react`, etc., are bound to the `client.sock` instance.
*   **Re-exports Baileys**: All functions, types, and objects from `baileys` are available directly from this package.

## Installation

- Using npm:
    ```bash
    npm install @zevanoo/baileys-ez
    ```
    
- Using yarn:
    ```bash
    yarn add @zevanoo/baileys-ez
    ```

## Usage

### Connection

```javascript
import { Client, Browsers } from '@zevanoo/baileys-ez';

const socket = new Client({
    id: 'my_bot',
    number: '6281234567890', // WhatsApp number
    baileysConfig: {
      browser: Browsers.ubuntu('Chrome')
      // other baileys config
    },
    pairingCode: '12345678' // must 8 char, no more or less
    serializer: (sock, m) => {
      return m
    } // function to serialize message
});

socket.on('connection', (data) => {
    console.log('Connection status:', data.status);
    
    if (data.status === 'connecting') {
      console.log('Connecting to number')
    }
    
    if (data.status === 'pairing-code') {
      console.log(data.code)
    }
    
    if (data.status === 'open') {
      console.log('Connection open')
    }
    
    if (data.status === 'close') {
      console.log(data.statusCode)
      console.log(data.reason)
    }
});

await socket.connect();
// await socket.disconnect(); // disconnect connection
```

### Multi-Client with Wrapper

```javascript
import { createWrapper, Client, Browsers } from '@zevanoo/baileys-ez';

const wrapper = createWrapper({
    folderName: 'sessions', // Folder to store session data
    serializer: (sock, m) => {
      return m
    },
    pairingCode: '12345678' // same pairing code for all number
    baileysConfig: {
      browser: Browsers.ubuntu('Chrome'),
      // other baileys config
    }
});

const socket = new Client({ id: 'bot1', number: '6281234567890' });
const socket1 = new Client({ id: 'bot2', number: '6281234567891' });

wrapper.on('message.new', (message) => {
    console.log(`Message from ${message.clientId}:`, message.text);
});

wrapper.on('connection', (data) => {
    if (data.status === 'connecting') {
      console.log(`id ${data.clientId} is connecting`)
    }
    
    if (data.status === 'pairing-code') {
      console.log(`pairing code for id ${data.clientId}: ${data.data.code}`)
    }
    
    if (data.status === 'open') {
      console.log('Connection open for id: ', data.clientId)
    }
    
    if (data.status === 'close') {
      console.log(`Connection closed for id ${data.clientId}: ${data.data.statusCode} ${data.data.reason}`)
    }
});

await wrapper.connectAll();
```

#### Connection Management (via Wrapper)

The `Wrapper` provides methods for managing connection of its managed clients.

```javascript
import { createWrapper, Client } from '@zevanoo/baileys-ez';

const wrapper = createWrapper({
    folderName: 'sessions',
});

const socket = new Client({ id: 'bot1', number: '6281234567890' });

// connect all number
await wrapper.connectAll();

// get instance client
const client = await wrapper.getClient('bot1');

// get all instance client
const info = await wrapper.getAllClients();

// disconnect all number
await wrapper.disconnectAll();

// await wrapper.removeClient('bot1'); // remove from list and disconnect
```

#### Session Management (via Wrapper)

The `Wrapper` provides methods for managing sessions of its managed clients.

```javascript
import { createWrapper, Client } from '@zevanoo/baileys-ez';

const wrapper = createWrapper({
    folderName: 'sessions',
});

const client1 = new Client({ id: 'bot1', number: '6281234567890' });

await wrapper.cleanupCorruptSessions();

const sessions = await wrapper.listValidSessions();
console.log('Valid sessions in base folder:', sessions);

const info = await wrapper.getSessionInfo('bot1');
console.log('Session info for bot1 (from base):', info);

await wrapper.connectAll();
const clientSessionInfo = await wrapper.checkAllClientSessions();
console.log('Client session statuses:', clientSessionInfo);

await wrapper.cleanClientSessions();

// await wrapper.removeSession('bot_to_remove');
```


### Handling Events

#### Generic Events
```javascript
socket.on('connection', ctx => console.log(ctx));
socket.on('error', ctx => console.log(ctx));
socket.on('chat', ctx => console.log(ctx));
socket.on('contact', ctx => console.log(ctx));
socket.on('group', ctx => console.log(ctx));
socket.on('message', ctx => console.log(ctx));
socket.on('call', ctx => console.log(ctx));
socket.on('presence.update', ctx => console.log(ctx));
socket.on('blocklist', ctx => console.log(ctx));
socket.on('label', ctx => console.log(ctx));
socket.on('newsletter', ctx => console.log(ctx));
socket.on('session.removed', ctx => console.log(ctx));
```

#### Specific Events
```javascript
socket.on('chat.add', ctx => console.log(ctx));
socket.on('chat.update', ctx => console.log(ctx));
socket.on('chat.remove', ctx => console.log(ctx));
socket.on('history.set', ctx => console.log(ctx));

socket.on('contact.add', ctx => console.log(ctx));
socket.on('contact.update', ctx => console.log(ctx));

socket.on('group.add', ctx => console.log(ctx));
socket.on('group.update', ctx => console.log(ctx));
socket.on('group.member.add', ctx => console.log(ctx));
socket.on('group.member.remove', ctx => console.log(ctx));
socket.on('group.member.promote', ctx => console.log(ctx));
socket.on('group.member.demote', ctx => console.log(ctx));
socket.on('group.request.join', ctx => console.log(ctx));

socket.on('message.new', ctx => console.log(ctx));
socket.on('message.update', ctx => console.log(ctx));
socket.on('message.remove', ctx => console.log(ctx));
socket.on('message.receipt', ctx => console.log(ctx));
socket.on('message.react', ctx => console.log(ctx));
socket.on('message.media.update', ctx => console.log(ctx));

socket.on('blocklist.set', ctx => console.log(ctx));
socket.on('blocklist.add', ctx => console.log(ctx));
socket.on('blocklist.remove', ctx => console.log(ctx));

socket.on('label.edit', ctx => console.log(ctx));
socket.on('label.association.add', ctx => console.log(ctx));
socket.on('label.association.remove', ctx => console.log(ctx));

socket.on('newsletter.reaction', ctx => console.log(ctx));
socket.on('newsletter.view', ctx => console.log(ctx));
socket.on('newsletter-participants.update', ctx => console.log(ctx));
socket.on('newsletter-settings.update', ctx => console.log(ctx));
```

> Note: All events also added to wrapper.on()

### Messages Function

   ```javascript
    const client = socket.sock;
    
    await client.sendText(jid, 'Example', options);
    
    await client.react(jid, m.key, '🗿');
    
    await client.sendContact(jid, [{
      name: 'zevanoo',
      number: '12345678',
      about: 'About'
    }], options);
    
    await client.getName(jid);
    
    await client.downloadMediaMessage(m);
    
    client.parseMention(m);
    
    client.decodeJid(jid);
    
    // buttons
    await client.sendButtons(jid, {
        text: 'Pick one',
        buttons: [
            { id: 'yes', text: 'Yes' },
            { id: 'no', text: 'No' }
        ]
    });
    
    // media
    await client.sendMedia(jid, 'https://telegra.ph/file/906c47ef4ab5bb9ccbe48.jpg', m, { mimetype: 'image/png' });
    await client.sendMedia(jid, 'https://telegra.ph/file/906c47ef4ab5bb9ccbe48.jpg', m, { mimetype: 'image/png', asDocument: true });
    
    // interactive message
    await client.sendInteractiveMessage(jid, {
      text: 'Contact actions',
      footer: 'Footer',
      interactiveButtons: [
        { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Docs', url: 'https://example.com' }) },
        { name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: 'Copy Code', copy_code: 'ABC-123' }) },
        { name: 'cta_call', buttonParamsJson: JSON.stringify({ display_text: 'Call Support', phone_number: '+1234567890' }) },
        { name: 'send_location', buttonParamsJson: JSON.stringify({ display_text: 'Share Location' }) },
        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: 'Hello', id: 'hi' }) },
            { name: 'single_select', buttonParamsJson: JSON.stringify({
                title: 'Menu',
                sections: [{
                    title: 'Options',
                    rows: [
                        { id: 'opt1', title: 'Option 1', description: 'Desc 1' },
                        { id: 'opt2', title: 'Option 2', description: 'Desc 2' }
                    ]
                }]
            })}
      ]
    });
```

### Accessing Original Baileys Functions

All exports from `baileys` are available from this package.

```javascript
import { DisconnectReason, Client } from '@zevanoo/baileys-ez';

const singleClient = new Client({...});
await singleClient.sock.sendMessage(...);
```

### Message Metadata

```JSON
{
  "raw": {
    "key": {
      "remoteJid": "jid@s.whatsapp.net",
      "remoteJidAlt": "lid@lid",
      "fromMe": false,
      "id": "unique",
      "participant": "",
      "addressingMode": "pn"
    },
    "messageTimestamp": number,
    "pushName": "name",
    "broadcast": false,
    "message": {
      "extendedTextMessage": {
        "text": ".testt a --p a --t",
        "previewType": "NONE",
        "contextInfo": {
          "expiration": 0,
          "ephemeralSettingTimestamp": "number",
          "disappearingMode": {
            "initiator": "CHANGED_IN_CHAT",
            "trigger": "UNKNOWN"
          }
        },
        "inviteLinkGroupTypeV2": "DEFAULT"
      },
      "messageContextInfo": {
        "deviceListMetadata": {
          "senderKeyHash": "unique",
          "senderTimestamp": "number",
          "recipientKeyHash": "unique",
          "recipientTimestamp": "number"
        },
        "deviceListMetadataVersion": number,
        "messageSecret": "unique"
      }
    }
  },
  "key": {
    "remoteJid": "jid@s.whatsapp.net",
    "remoteJidAlt": "lid@lid",
    "fromMe": false,
    "id": "unique",
    "participant": "",
    "addressingMode": "pn"
  },
  "message": {
    "extendedTextMessage": {
      "text": ".testt a --p a --t",
      "previewType": "NONE",
      "contextInfo": {
        "expiration": 0,
        "ephemeralSettingTimestamp": "number",
        "disappearingMode": {
          "initiator": "CHANGED_IN_CHAT",
          "trigger": "UNKNOWN"
        }
      },
      "inviteLinkGroupTypeV2": "DEFAULT"
    },
    "messageContextInfo": {
      "deviceListMetadata": {
        "senderKeyHash": "unique",
        "senderTimestamp": "number",
        "recipientKeyHash": "unique",
        "recipientTimestamp": "number"
      },
      "deviceListMetadataVersion": number,
      "messageSecret": "unique"
    }
  },
  "from": "jid@s.whatsapp.net",
  "fromMe": false,
  "id": "unique",
  "device": "android",
  "isBaileys": false,
  "isGroup": false,
  "participant": null,
  "sender": "jid@s.whatsapp.net",
  "pushName": "name",
  "type": "extendedTextMessage",
  "msg": {
    "text": ".testt a --p a --t",
    "previewType": "NONE",
    "contextInfo": {
      "expiration": 0,
      "ephemeralSettingTimestamp": "number",
      "disappearingMode": {
        "initiator": "CHANGED_IN_CHAT",
        "trigger": "UNKNOWN"
      }
    },
    "inviteLinkGroupTypeV2": "DEFAULT"
  },
  "mentions": [],
  "expiration": 0,
  "isQuoted": false,
  "isMedia": false,
  "body": ".testt a --p a --t",
  "prefix": ".",
  "prefixes": [
    ".",
    "!",
    "#",
    "/"
  ],
  "command": "testt",
  "args": [
    "a",
    "--p",
    "a",
    "--t"
  ],
  "text": "a --p a --t",
  "argsParsed": {
    "p": "a",
    "t": true
  },
  "timestamp": number,
  "quoted": null
}
```