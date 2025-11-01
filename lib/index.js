/*!
 * @zevanoo/baileys-ez v1.0.0
 * Copyright (c) 2025 Zevano
 * Licensed under MIT
 */

import{Wrapper as o}from"./core/wrapper.js";global.WrapperInstance=null,global.sessionFolder="sessions";import{Client as n}from"./core/client.js";export*from"baileys";const p=r=>{const e=new o(r);return global.WrapperInstance=e,global.sessionFolder=r.folderName,e};export{n as Client,p as createWrapper};
