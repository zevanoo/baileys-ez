/*!
 * @zevanoo/baileys-ez v1.0.0
 * Copyright (c) 2025 Zevano
 * Licensed under MIT
 */

import{Wrapper as o}from"./core/wrapper.js";import{Client as n}from"./core/client.js";export*from"baileys";const s=r=>{const e=new o(r);return global.WrapperInstance=e,global.sessionFolder=r.folderName||"sessions",e};export{n as Client,s as createWrapper};
