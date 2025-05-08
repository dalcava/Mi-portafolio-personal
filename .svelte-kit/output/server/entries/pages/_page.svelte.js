import { M as escape_html, z as push, C as pop, N as ensure_array_like, G as attr, O as attr_style, J as stringify, F as attr_class, K as bind_props } from "../../chunks/index.js";
import { b as base } from "../../chunks/paths.js";
import "../../chunks/client.js";
import "clsx";
/* empty css                                                  */
import "../../chunks/Accordion.svelte_svelte_type_style_lang.js";
import "mitt";
/* empty css                                              */
import "swiper/bundle";
function Contador($$payload) {
  let width;
  let height;
  $$payload.out += `<div class="contador svelte-3zqdc2"><p class="svelte-3zqdc2">${escape_html(width)} x ${escape_html(height)}</p></div>`;
}
function CanvasParticles($$payload, $$props) {
  push();
  $$payload.out += `<canvas id="canvas" class="svelte-xxw4da"></canvas>`;
  pop();
}
function Footer($$payload) {
  const images = [
    "/Recursos/Slider/UX/AvalPay-Static.jpg",
    "/Recursos/Slider/UX/Onyo-Static.png",
    "/Recursos/Slider/UX/Colmena-Static.jpg",
    "/Recursos/Slider/UX/CR.webp",
    "/Recursos/Slider/UX/Promigas-Active.png",
    "/Recursos/Slider/3D/Kinetic rush-static.webp",
    "/Recursos/Slider/3D/Control-static.webp",
    "/Recursos/Slider/3D/Duraznos intro.gif",
    "/Recursos/Slider/3D/Chasms call.webp"
  ];
  const each_array = ensure_array_like(images);
  const each_array_1 = ensure_array_like(images);
  $$payload.out += `<section class="footer svelte-s94qas"><div class="footer-content svelte-s94qas"><h2 class="footer-title svelte-s94qas">Do you like what you see?</h2> <p class="footer-text svelte-s94qas">Let's connect! I'd be happy to share my experience and discuss how my skills and expertise can contribute to your team.</p> <a href="mailto:dalcava96@gmail.com" class="footer-button svelte-s94qas"><img${attr("src", `${stringify(base)}/Recursos/Footer/Mail.svg`)} alt="About"> Contact me</a> <div class="footer-icons svelte-s94qas"><a href="https://www.artstation.com/dalcava" target="_blank" rel="noopener noreferrer" class="svelte-s94qas"><i class="fa-solid fa-layer-group"><img${attr("src", `${stringify(base)}/Recursos/Footer/Artstation.svg`)} alt="Artstation"></i></a> <a href="https://www.behance.net/davidlpez39" target="_blank" rel="noopener noreferrer" class="svelte-s94qas"><i class="fa-brands fa-behance"><img${attr("src", `${stringify(base)}/Recursos/Footer/Behance.svg`)} alt="Behance"></i></a> <a href="https://www.linkedin.com/in/david-a-l%C3%B3pez/" target="_blank" rel="noopener noreferrer" class="svelte-s94qas"><i class="fa-brands fa-linkedin"><img${attr("src", `${stringify(base)}/Recursos/Footer/linkedin.svg`)} alt="LinkedIn"></i></a> <a href="https://www.instagram.com/dalcava/" target="_blank" rel="noopener noreferrer" class="svelte-s94qas"><i class="fa-brands fa-instagram"><img${attr("src", `${stringify(base)}/Recursos/Footer/instagram.svg`)} alt="Instagram"></i></a></div></div> <div class="footer-gallery svelte-s94qas"><div class="gallery-track svelte-s94qas"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let image = each_array[$$index];
    $$payload.out += `<div class="gallery-image svelte-s94qas"${attr_style(`background-image: url('${base}${image}')`)}></div>`;
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let image = each_array_1[$$index_1];
    $$payload.out += `<div class="gallery-image svelte-s94qas"${attr_style(`background-image: url('${base}${image}')`)}></div>`;
  }
  $$payload.out += `<!--]--></div></div></section>`;
}
function _page($$payload, $$props) {
  push();
  let scrollContainer = $$props["scrollContainer"];
  $$payload.out += `<div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999;" class="svelte-1d4yc0c"></div> <div class="page-transition-overlay svelte-1d4yc0c"></div> <div id="loading-screen" class="svelte-1d4yc0c"><div class="dot dot1 svelte-1d4yc0c"></div> <div class="dot dot2 svelte-1d4yc0c"></div> <div class="dot dot3 svelte-1d4yc0c"></div> <div class="dot dot4 svelte-1d4yc0c"></div></div> <div class="background svelte-1d4yc0c"><div class="background-overlay svelte-1d4yc0c"></div> <div class="hero svelte-1d4yc0c"><div class="background-elements svelte-1d4yc0c"><video id="home-video" class="video-background svelte-1d4yc0c" autoplay loop muted playsinline><source${attr("src", `${stringify(base)}/Recursos/Fondos/Orbes.mp4`)} type="video/mp4" class="svelte-1d4yc0c"></video> `;
  CanvasParticles($$payload);
  $$payload.out += `<!----> <img${attr("src", `${stringify(base)}/Recursos/Fondos/Circle-text.gif`)} alt="Circle Text Animation" class="circle-text-gif svelte-1d4yc0c"></div> <div class="Complementary-text hidden svelte-1d4yc0c"><h1 class="svelte-1d4yc0c">  Hi! <br class="svelte-1d4yc0c"><br class="svelte-1d4yc0c">   I'm <br class="svelte-1d4yc0c"> <br class="svelte-1d4yc0c"> <span class="svelte-1d4yc0c">David</span></h1> <div class="Compliment svelte-1d4yc0c"><h2 class="svelte-1d4yc0c">UX/UI designer and 3d artist</h2> <h3 class="svelte-1d4yc0c">Welcome to my portfolio</h3></div></div> <div class="swiper-scrollbar svelte-1d4yc0c"></div></div> <section class="works-wrap svelte-1d4yc0c"><div class="works-container svelte-1d4yc0c">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></section> <section${attr_class(`about-wrap ${stringify("")}`, "svelte-1d4yc0c")}><div class="about-container svelte-1d4yc0c">`;
  {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></section> <section${attr_class(`footer-wrap ${stringify("")}`, "svelte-1d4yc0c")}>`;
  Footer($$payload);
  $$payload.out += `<!----></section> <div class="contador-container svelte-1d4yc0c">`;
  Contador($$payload);
  $$payload.out += `<!----></div></div>`;
  bind_props($$props, { scrollContainer });
  pop();
}
export {
  _page as default
};
