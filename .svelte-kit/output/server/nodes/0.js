import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.BuBgHp6q.js","_app/immutable/chunks/CN6mjgg6.js","_app/immutable/chunks/L3iNzFve.js","_app/immutable/chunks/PDKNl8jx.js","_app/immutable/chunks/CCNfrWU9.js","_app/immutable/chunks/BzB-qqFr.js","_app/immutable/chunks/7wjPKNSe.js"];
export const stylesheets = ["_app/immutable/assets/Tabs.YJOiXDq6.css","_app/immutable/assets/0.BHk6rboY.css","_app/immutable/assets/Contador.Dmw1LWcN.css"];
export const fonts = [];
