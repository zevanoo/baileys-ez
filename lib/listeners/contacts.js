/*!
 * @zevanoo/baileys-ez v1.0.0
 * Copyright (c) 2025 Zevano
 * Licensed under MIT
 */

var d=(o,t)=>{o.ev.on("contacts.upsert",a=>{t.emit("contacts.upsert",a),a.forEach(e=>{t.emit("contact.add",e),t.emit("contact",{action:"add",contact:e})})}),o.ev.on("contacts.update",a=>{t.emit("contacts.update",a),a.forEach(e=>{t.emit("contact.update",e),t.emit("contact",{action:"update",contact:e})})})};export{d as default};
