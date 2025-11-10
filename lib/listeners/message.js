/*!
 * @zevanoo/baileys-ez v1.0.0
 * Copyright (c) 2025 Zevano
 * Licensed under MIT
 */

var o=(a,s)=>{a.ev.on("messages.upsert",e=>{const{messages:m,type:t}=e;if(!m||m.length===0)return;s.emit("messages.upsert",e);const g=m.map(r=>s.serializeMessage(a,r));Promise.all(g).then(r=>{t==="notify"?r.forEach(i=>{i&&(s.emit("message.new",i),s.emit("message",{action:"new",message:i}))}):r.forEach(i=>{i&&s.emit("message",{action:t,message:i})})})}),a.ev.on("messages.update",e=>{s.emit("messages.update",e),e.forEach(m=>{s.emit("message.update",m),s.emit("message",{action:"update",message:m})})}),a.ev.on("messages.delete",e=>{s.emit("messages.delete",e),"keys"in e&&Array.isArray(e.keys)?e.keys.forEach(m=>{s.emit("message.remove",m),s.emit("message",{action:"remove",key:m})}):"jid"in e&&e.jid&&(s.emit("message.remove",{jid:e.jid,all:!0}),s.emit("message",{action:"remove",jid:e.jid,all:!0}))}),a.ev.on("message-receipt.update",e=>{s.emit("message-receipt.update",e),e.forEach(m=>{s.emit("message.receipt",m),s.emit("message",{action:"receipt",receipt:m})})}),a.ev.on("messages.reaction",e=>{s.emit("messages.reaction",e),e.forEach(m=>{s.emit("message.react",m),s.emit("message",{action:"react",reaction:m})})}),a.ev.on("messages.media-update",e=>{s.emit("messages.media-update",e),e.forEach(m=>{s.emit("message.media.update",m)})})};export{o as default};
