/*!
 * @zevanoo/baileys-ez v1.0.0
 * Copyright (c) 2025 Zevano
 * Licensed under MIT
 */

var h=(m,e)=>{m.ev.on("chats.upsert",t=>{e.emit("chats.upsert",t),t.forEach(a=>{e.emit("chat.add",a),e.emit("chat",{action:"add",chat:a})})}),m.ev.on("chats.update",t=>{e.emit("chats.update",t),t.forEach(a=>{e.emit("chat.update",a),e.emit("chat",{action:"update",chat:a})})}),m.ev.on("chats.delete",t=>{e.emit("chats.delete",t),t.forEach(a=>{e.emit("chat.remove",a),e.emit("chat",{action:"remove",id:a})})}),m.ev.on("messaging-history.set",t=>{e.emit("messaging-history.set",t),e.emit("history.set",t)})};export{h as default};
