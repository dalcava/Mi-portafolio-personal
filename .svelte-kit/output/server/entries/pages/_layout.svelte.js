import { D as getContext, z as push, E as store_get, F as attr_class, G as attr, I as unsubscribe_stores, C as pop, J as stringify, K as bind_props } from "../../chunks/index.js";
import "../../chunks/client.js";
import { b as base } from "../../chunks/paths.js";
/* empty css                                              */
import "clsx";
/* empty css                                                  */
const getStores = () => {
  const stores$1 = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores$1.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores$1.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores$1.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
function Header($$payload, $$props) {
  push();
  var $$store_subs;
  let isHome;
  let isBright = false;
  isHome = store_get($$store_subs ??= {}, "$page", page).url.pathname === "/";
  $$payload.out += `<header id="header"${attr_class("header-section start svelte-1hv3lno", void 0, { "home-background": isHome, "bright": isBright })}><div class="profile-info svelte-1hv3lno"><div class="personal-photo svelte-1hv3lno"><img${attr("src", `${stringify(base)}/Recursos/header/personal-photo.svg`)} alt="Personal photo" class="svelte-1hv3lno"></div> <h2 class="Header-subtitle svelte-1hv3lno">I'm <sp><span class="svelte-1hv3lno"></span></sp></h2></div> <div class="header-content svelte-1hv3lno"><div class="icon-buttons svelte-1hv3lno"><div class="navigation-buttons svelte-1hv3lno">`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div${attr_class("icon-button menu work svelte-1hv3lno", void 0, { "active-work": isHome })}><span class="svelte-1hv3lno">Works</span> <img${attr("src", `${stringify(base)}/Recursos/header/Proyects.svg`)} alt="Projects" class="svelte-1hv3lno"></div> <div class="icon-button menu About svelte-1hv3lno"><span class="svelte-1hv3lno">About</span> <img${attr("src", `${stringify(base)}/Recursos/header/About.svg`)} alt="About" class="svelte-1hv3lno"></div> <div class="icon-button menu contact svelte-1hv3lno"><span class="svelte-1hv3lno">Contact</span> <img${attr("src", `${stringify(base)}/Recursos/header/contact.svg`)} alt="Contact" class="svelte-1hv3lno"></div>`;
  }
  $$payload.out += `<!--]--></div></div></div></header>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function CustomCursor($$payload, $$props) {
  push();
  $$payload.out += `<div class="custom-cursor svelte-e1tl17"></div>`;
  pop();
}
function _layout($$payload, $$props) {
  const prerender = false;
  let { children } = $$props;
  CustomCursor($$payload);
  $$payload.out += `<!----> `;
  Header($$payload);
  $$payload.out += `<!----> `;
  children($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { prerender });
}
export {
  _layout as default
};
