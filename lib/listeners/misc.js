/*!
 * @zevanoo/baileys-ez v1.0.0
 * Copyright (c) 2025 Zevano
 * Licensed under MIT
 */

var s=(i,t)=>{i.ev.on("call",e=>{t.emit("call",e)}),i.ev.on("presence.update",e=>{t.emit("presence.update",e)}),i.ev.on("blocklist.set",e=>{t.emit("blocklist.set",e),t.emit("blocklist",{action:"set",data:e})}),i.ev.on("blocklist.update",e=>{t.emit("blocklist.update",e),e.type==="add"?t.emit("blocklist.add",e):e.type==="remove"&&t.emit("blocklist.remove",e),t.emit("blocklist",{action:e.type,data:e})}),i.ev.on("labels.edit",e=>{t.emit("labels.edit",e),t.emit("label.edit",e),t.emit("label",{action:"edit",data:e})}),i.ev.on("labels.association",e=>{t.emit("labels.association",e),e.type==="add"?t.emit("label.association.add",e):e.type==="remove"&&t.emit("label.association.remove",e),t.emit("label",{action:"association",data:e})}),i.ev.on("newsletter.reaction",e=>{t.emit("newsletter.reaction",e),t.emit("newsletter",{action:"reaction",data:e})}),i.ev.on("newsletter.view",e=>{t.emit("newsletter.view",e),t.emit("newsletter",{action:"view",data:e})}),i.ev.on("newsletter-participants.update",e=>{t.emit("newsletter-participants.update",e),t.emit("newsletter",{action:"participants.update",data:e})}),i.ev.on("newsletter-settings.update",e=>{t.emit("newsletter-settings.update",e),t.emit("newsletter",{action:"settings.update",data:e})})};export{s as default};
