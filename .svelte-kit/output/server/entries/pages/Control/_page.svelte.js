import { z as push, C as pop, N as ensure_array_like, G as attr, M as escape_html, F as attr_class, P as fallback, K as bind_props, J as stringify } from "../../../chunks/index.js";
import { b as base } from "../../../chunks/paths.js";
import "../../../chunks/client.js";
import "../../../chunks/Accordion.svelte_svelte_type_style_lang.js";
/* empty css                                                 */
import "swiper/bundle";
import "clsx";
import { Clock } from "three";
import "mitt";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
function Scene($$payload, $$props) {
  push();
  new Clock();
  $$payload.out += `<div class="scene-container svelte-1l7gvyo"></div>`;
  pop();
}
function Accordion($$payload) {
  let openIndex = 0;
  const panels = [
    { title: "Education" },
    { title: "Working Experience" },
    { title: "Knowledge" }
  ];
  const each_array = ensure_array_like(panels);
  $$payload.out += `<section class="accordion-wrapper svelte-lgjeb5"><!--[-->`;
  for (let index = 0, $$length = each_array.length; index < $$length; index++) {
    let panel = each_array[index];
    $$payload.out += `<div class="panel svelte-lgjeb5"><div class="header svelte-lgjeb5" role="button" tabindex="0"${attr("aria-expanded", openIndex === index)}${attr("aria-controls", "panel-content-" + index)}${attr("id", "panel-header-" + index)}><h3 class="svelte-lgjeb5">${escape_html(panel.title)}</h3> <span aria-hidden="true"${attr_class("svelte-lgjeb5", void 0, { "rotated": openIndex === index })}>+</span></div> `;
    if (openIndex === index) {
      $$payload.out += "<!--[-->";
      $$payload.out += `<div class="Accordion-content svelte-lgjeb5"${attr("id", "panel-content-" + index)}${attr("aria-labelledby", "panel-header-" + index)}${attr("aria-hidden", openIndex !== index)}>`;
      if (index === 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<h2 class="svelte-lgjeb5">Bachelor of Architecture</h2> <p class="svelte-lgjeb5"><span class="svelte-lgjeb5">Pontifical Javerian University / Bogotá <br> 2017 - 2022</span></p> <p class="svelte-lgjeb5">Comprehensive architectural education focused on design, urban planning, history, and construction systems.</p> <h2 class="svelte-lgjeb5">Informal Education</h2> <div class="position svelte-lgjeb5">Google UX Design Professional Certificate</div> <div class="subtitle svelte-lgjeb5">Coursera</div> <div class="position svelte-lgjeb5">Fundamentals of Programming and Web Development</div> <div class="subtitle svelte-lgjeb5">Platzi (Digital School)</div> <div class="position svelte-lgjeb5">Unique Interface Design Course</div> <div class="subtitle svelte-lgjeb5">Platzi (Digital School)</div> <div class="position svelte-lgjeb5">How to Design for Accessibility: for UX Designers (WCAG 2.2)</div> <div class="subtitle svelte-lgjeb5">Udemy</div> <div class="position svelte-lgjeb5">Technique and Art – Studio Lighting</div> <div class="subtitle svelte-lgjeb5">Zona Cinco (Film and Photography School)</div>`;
      } else if (index === 1) {
        $$payload.out += "<!--[1-->";
        $$payload.out += `<h2 class="svelte-lgjeb5">UX/UI DESIGNER</h2> <p class="svelte-lgjeb5"><span class="svelte-lgjeb5">NTT Data - Europe &amp; Latam</span></p> <p class="svelte-lgjeb5">I have specialized in UX research and interface design, also contributing to projects in consulting, 
            VR application development, graphic and advertising design, and the creation of digital twins.
            Some of my standout projects at NTT Data include:</p> <div class="position svelte-lgjeb5">Virtual Office SurtiGas and GdO</div> <div class="subtitle svelte-lgjeb5">Date: 08/26/2024 - Present</div> <div class="position svelte-lgjeb5">SURA Portals Refactor</div> <div class="subtitle svelte-lgjeb5">Date: 05/07/2024 - 07/31/2024</div> <div class="position svelte-lgjeb5">Assessment UX/UI AvalPay</div> <div class="subtitle svelte-lgjeb5">Date: 01/01/2024 - 04/30/2024</div> <div class="position svelte-lgjeb5">Americas Digital Experience - Digital Twins</div> <div class="subtitle svelte-lgjeb5">Date: 08/23/2023 - 12/31/2023</div> <div class="position svelte-lgjeb5">Banco Caja Social Portal Migration</div> <div class="subtitle svelte-lgjeb5">Date: 09/18/2023 - 01/13/2024</div> <div class="position svelte-lgjeb5">Assessment UX/UI Portal AvalPay</div> <div class="subtitle svelte-lgjeb5">Date: 06/20/2023 - 12/22/2023</div> <h2 class="svelte-lgjeb5">Junior Architect</h2> <p class="svelte-lgjeb5"><span class="svelte-lgjeb5">Construcciones Castañeda SAS</span></p> <p class="svelte-lgjeb5">Responsibilities included on-site supervision for residential projects in Bogotá, Tabio, and La Calera; 
            creation of 2D and 3D representations and renderings; preparation of budgets and commercial proposals; 
            and client relationship management.</p> <h2 class="svelte-lgjeb5">Pre-Professional Internship</h2> <p class="svelte-lgjeb5"><span class="svelte-lgjeb5">Famisanar EPS</span></p> <p class="svelte-lgjeb5">Responsibilities included on-site supervision for residential projects in Bogotá, Tabio, and La Calera; 
            creation of 2D and 3D representations and renderings; preparation of budgets and commercial proposals; 
            and client relationship management.</p> <h2 class="svelte-lgjeb5">Representation Assistant</h2> <p class="svelte-lgjeb5"><span class="svelte-lgjeb5">Construcciones Castañeda SAS</span></p> <p class="svelte-lgjeb5">Developed 2D plans and perspectives for a housing unit in La Calera, oversaw the remodeling of the fifth floor 
            and roof of the Military Housing Fund, and contributed to the design of a contact center for Americas VPS.</p>`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<h2 class="svelte-lgjeb5">Technical Knowledge</h2> <p class="svelte-lgjeb5"><span class="svelte-lgjeb5">Digital Tools &amp; Software</span></p> <div class="position svelte-lgjeb5">3D Modeling</div> <div class="subtitle svelte-lgjeb5">Blender, Grasshopper, SketchUp, ZBrush, Rhino</div> <div class="position svelte-lgjeb5">Rendering</div> <div class="subtitle svelte-lgjeb5">Vray, Twinmotion, Cycles, Unreal Engine, Lumion</div> <div class="position svelte-lgjeb5">Autodesk Software</div> <div class="subtitle svelte-lgjeb5">AutoCAD, Revit</div> <div class="position svelte-lgjeb5">Adobe Suite</div> <div class="subtitle svelte-lgjeb5">Photoshop, Illustrator, Adobe XD, Figma, Premiere Pro, InDesign, After Effects, Audition, Substance Painter</div> <div class="position svelte-lgjeb5">Office Suite</div> <div class="subtitle svelte-lgjeb5">PowerPoint, Word, Excel, Publisher</div> <div class="position svelte-lgjeb5">GIS Software</div> <div class="subtitle svelte-lgjeb5">ArcGIS, Google Earth</div> <div class="position svelte-lgjeb5">Development</div> <div class="subtitle svelte-lgjeb5">HTML5, CSS, JavaScript (Intermediate), Python (Basic)</div> <h2 class="svelte-lgjeb5">Traditional Techniques</h2> <p class="svelte-lgjeb5"><span class="svelte-lgjeb5">Analog Media &amp; Model Making</span></p> <div class="position svelte-lgjeb5">Dry Media</div> <div class="subtitle svelte-lgjeb5">Graphite, Colored Pencils, Markers, Charcoal, Pastels</div> <div class="position svelte-lgjeb5">Wet Media</div> <div class="subtitle svelte-lgjeb5">Watercolors, Oil, Acrylic</div> <div class="position svelte-lgjeb5">Model Making</div> <div class="subtitle svelte-lgjeb5">Cardboard, Acrylics, Wood, Metal</div>`;
      }
      $$payload.out += `<!--]--></div>`;
    } else {
      $$payload.out += "<!--[!-->";
    }
    $$payload.out += `<!--]--></div>`;
  }
  $$payload.out += `<!--]--></section>`;
}
function About_Proj($$payload, $$props) {
  push();
  let imageSrc = fallback($$props["imageSrc"], "");
  let imageAlt = fallback($$props["imageAlt"], "");
  let title = fallback($$props["title"], "About the project");
  let description = fallback($$props["description"], "");
  let purpose = fallback($$props["purpose"], "");
  let category = fallback($$props["category"], "");
  let tools = fallback($$props["tools"], () => [], true);
  const each_array = ensure_array_like(tools);
  $$payload.out += `<div class="proj-description svelte-u55u9n"><div class="description-image svelte-u55u9n"><img${attr("src", imageSrc)}${attr("alt", imageAlt)} class="svelte-u55u9n"></div> <div class="description svelte-u55u9n"><div class="about-project svelte-u55u9n"><h2 class="description-title svelte-u55u9n">${escape_html(title.split(" ")[0])} <span class="svelte-u55u9n">${escape_html(title.split(" ").slice(1).join(" "))}</span></h2> <div class="description-content svelte-u55u9n"><p class="svelte-u55u9n">${html(description)} <br><br> <strong class="svelte-u55u9n">Purpose:</strong> ${html(purpose)}</p></div> <div class="tools svelte-u55u9n"><h3 class="svelte-u55u9n">${escape_html(category)}</h3> <div class="tools-icons svelte-u55u9n"><p class="svelte-u55u9n"><strong>Tools Used:</strong></p> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let tool = each_array[$$index];
    $$payload.out += `<img${attr("src", tool.src)}${attr("alt", tool.alt)} class="svelte-u55u9n">`;
  }
  $$payload.out += `<!--]--></div></div></div></div></div>`;
  bind_props($$props, {
    imageSrc,
    imageAlt,
    title,
    description,
    purpose,
    category,
    tools
  });
  pop();
}
function Seccion_contenido_1($$payload, $$props) {
  let title = fallback($$props["title"], "");
  let subtitle = fallback($$props["subtitle"], "");
  let paragraphs = fallback($$props["paragraphs"], () => [], true);
  let image = fallback($$props["image"], "");
  let alt = fallback($$props["alt"], "Ilustración");
  const each_array = ensure_array_like(paragraphs);
  $$payload.out += `<section class="seccion uno svelte-15zkpbi"><div class="contenido"><h2 class="svelte-15zkpbi">${html(title)}</h2> `;
  if (subtitle) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h3 class="subtitle svelte-15zkpbi">${html(subtitle)}</h3>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let p = each_array[$$index];
    $$payload.out += `<p class="svelte-15zkpbi">${html(p)}</p>`;
  }
  $$payload.out += `<!--]--></div> <div class="imagen svelte-15zkpbi"><img${attr("src", image)}${attr("alt", alt)} class="svelte-15zkpbi"></div></section>`;
  bind_props($$props, { title, subtitle, paragraphs, image, alt });
}
function Seccion_contenido_2($$payload, $$props) {
  let title = fallback($$props["title"], "");
  let subtitle = fallback($$props["subtitle"], "");
  let paragraphs = fallback($$props["paragraphs"], () => [], true);
  let image = fallback($$props["image"], "");
  let alt = fallback($$props["alt"], "Ilustración");
  const each_array = ensure_array_like(paragraphs);
  $$payload.out += `<section class="seccion dos svelte-g6zkoc"><div class="texto svelte-g6zkoc"><div class="cabecera svelte-g6zkoc"><h2 class="svelte-g6zkoc">${html(title)}</h2> `;
  if (subtitle) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h3 class="subtitle svelte-g6zkoc">${html(subtitle)}</h3>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let p = each_array[$$index];
    $$payload.out += `<p class="svelte-g6zkoc">${html(p)}</p>`;
  }
  $$payload.out += `<!--]--></div> <div class="imagen svelte-g6zkoc"><img${attr("src", image)}${attr("alt", alt)} class="svelte-g6zkoc"></div></section>`;
  bind_props($$props, { title, subtitle, paragraphs, image, alt });
}
function Seccion_contenido_3($$payload, $$props) {
  push();
  let title = fallback($$props["title"], "");
  let subtitle = fallback($$props["subtitle"], "");
  let paragraphs = fallback($$props["paragraphs"], () => [], true);
  const each_array = ensure_array_like(paragraphs.slice(0, Math.ceil(paragraphs.length / 2)));
  $$payload.out += `<section class="seccion tres svelte-1e0lwnv"><div class="titulo svelte-1e0lwnv"><h2 class="svelte-1e0lwnv">${html(title)}</h2> `;
  if (subtitle) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h3 class="subtitle svelte-1e0lwnv">${html(subtitle)}</h3>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="doble-texto svelte-1e0lwnv"><div class="columna svelte-1e0lwnv"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let p = each_array[$$index];
    $$payload.out += `<p class="svelte-1e0lwnv">${html(p)}</p>`;
  }
  $$payload.out += `<!--]--></div></div></section>`;
  bind_props($$props, { title, subtitle, paragraphs });
  pop();
}
function Seccion_contenido_4($$payload, $$props) {
  let title = fallback($$props["title"], "");
  let subtitle = fallback($$props["subtitle"], "");
  let image = fallback($$props["image"], "");
  let alt = fallback($$props["alt"], "Ilustración");
  let paragraphs = fallback($$props["paragraphs"], () => [], true);
  const each_array = ensure_array_like(paragraphs);
  $$payload.out += `<section class="seccion cuatro svelte-fakjqh"><div class="top svelte-fakjqh"><div class="titulo svelte-fakjqh"><h2 class="svelte-fakjqh">${html(title)}</h2> `;
  if (subtitle) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h3 class="subtitle svelte-fakjqh">${html(subtitle)}</h3>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="imagen svelte-fakjqh"><img${attr("src", image)}${attr("alt", alt)} class="svelte-fakjqh"></div></div> <div class="columnas svelte-fakjqh"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let p = each_array[$$index];
    $$payload.out += `<p class="svelte-fakjqh">${html(p)}</p>`;
  }
  $$payload.out += `<!--]--></div></section>`;
  bind_props($$props, { title, subtitle, image, alt, paragraphs });
}
function Seccion_contenido_5($$payload, $$props) {
  let title = fallback($$props["title"], "");
  let subtitle = fallback($$props["subtitle"], "");
  let image = fallback($$props["image"], "");
  let alt = fallback($$props["alt"], "Ilustración");
  let paragraphs = fallback($$props["paragraphs"], () => [], true);
  const each_array = ensure_array_like(paragraphs);
  $$payload.out += `<section class="seccion cinco svelte-1ivw1dg"><div class="imagen svelte-1ivw1dg"><img${attr("src", image)}${attr("alt", alt)} class="svelte-1ivw1dg"></div> <div class="texto svelte-1ivw1dg"><h2 class="svelte-1ivw1dg">${html(title)}</h2> `;
  if (subtitle) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h3 class="subtitle svelte-1ivw1dg">${html(subtitle)}</h3>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let p = each_array[$$index];
    $$payload.out += `<p class="svelte-1ivw1dg">${html(p)}</p>`;
  }
  $$payload.out += `<!--]--></div></section>`;
  bind_props($$props, { title, subtitle, image, alt, paragraphs });
}
function Seccion_contenido_6($$payload, $$props) {
  let title = fallback($$props["title"], "");
  let subtitle = fallback($$props["subtitle"], "");
  let image = fallback($$props["image"], "");
  let image2 = fallback($$props["image2"], "");
  let alt = fallback($$props["alt"], "Ilustración");
  let alt2 = fallback($$props["alt2"], "Ilustración");
  let paragraphs = fallback($$props["paragraphs"], () => [], true);
  const each_array = ensure_array_like(paragraphs);
  $$payload.out += `<section class="seccion seis svelte-6wshd8"><div class="cabecera svelte-6wshd8"><div class="title svelte-6wshd8"><h2 class="svelte-6wshd8">${html(title)}</h2> `;
  if (subtitle) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<h3 class="subtitle svelte-6wshd8">${html(subtitle)}</h3>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div> <div class="imagen svelte-6wshd8"><img${attr("src", image)}${attr("alt", alt)} class="svelte-6wshd8"></div></div> <div class="contenido svelte-6wshd8"><div class="imagen svelte-6wshd8"><img${attr("src", image2)}${attr("alt", alt2)} class="svelte-6wshd8"></div> <div class="texto svelte-6wshd8"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let p = each_array[$$index];
    $$payload.out += `<p class="svelte-6wshd8">${html(p)}</p>`;
  }
  $$payload.out += `<!--]--></div></div></section>`;
  bind_props($$props, {
    title,
    subtitle,
    image,
    image2,
    alt,
    alt2,
    paragraphs
  });
}
function NextProject($$payload, $$props) {
  let pretitle = fallback($$props["pretitle"], "Next project");
  let title = fallback($$props["title"], "Kinetic rush");
  let description = fallback($$props["description"], "");
  let extraInfo = fallback($$props["extraInfo"], "");
  let imageSrc = fallback($$props["imageSrc"], "");
  let imageAlt = fallback($$props["imageAlt"], "Project preview");
  let tag = fallback($$props["tag"], "Passion project");
  $$payload.out += `<section class="Contact"><h3 class="pretitle svelte-1stqhpq">Did you <span class="svelte-1stqhpq">like it?</span></h3> <div class="contactLayer svelte-1stqhpq"><p class="description svelte-1stqhpq">${escape_html(description)}</p></div></section> <section class="next-project-section svelte-1stqhpq"><div class="text-content svelte-1stqhpq"><h3 class="pretitle svelte-1stqhpq">Next <span class="svelte-1stqhpq">project</span></h3> <hr> <h2 class="title svelte-1stqhpq">${escape_html(title)}</h2> <p class="description svelte-1stqhpq">${escape_html(description)}</p> <p class="extra svelte-1stqhpq">${escape_html(extraInfo)}</p> <span class="tag svelte-1stqhpq">${escape_html(tag)}</span></div> <div class="image-wrapper svelte-1stqhpq"><img${attr("src", imageSrc)}${attr("alt", imageAlt)} class="svelte-1stqhpq"></div></section>`;
  bind_props($$props, {
    pretitle,
    title,
    description,
    extraInfo,
    imageSrc,
    imageAlt,
    tag
  });
}
function _page($$payload, $$props) {
  push();
  const description = `
    This project is a tribute to <strong>The Legend of Zelda series</strong>, featuring a personalized custom skin for the Nintendo Switch Pro Controller. It showcases a fully 3D animated product presentation, created as a practice piece and an homage to the iconic game franchise. The animation highlights a unique Zelda-themed design, crafted to celebrate the artistic and legendary world of Hyrule.
  `;
  const purpose = `
    This fan-made project is intended for skill development and portfolio showcasing, focusing on 3D product visualization and custom design. It is not affiliated with Nintendo or The Legend of Zelda.
  `;
  const tools = [
    {
      src: `${base}/Recursos/Projects/Control/Blender-Icon.svg`,
      alt: "Blender"
    },
    {
      src: `${base}/Recursos/Projects/Control/Illustrator-Icon.svg`,
      alt: "Illustrator"
    },
    {
      src: `${base}/Recursos/Projects/Control/AE-Icon.svg`,
      alt: "After Effects"
    },
    {
      src: `${base}/Recursos/Projects/Control/PR-Icon.svg`,
      alt: "Premiere Pro"
    }
  ];
  $$payload.out += `<div id="page-transition" class="transition-overlay"></div> <div class="white-overlay"></div> <div id="loading-screen"></div> <section class="body-projects"><section class="hero-project control-content"><div class="hero-content"><div class="hero-text"><p class="main-subtitle">3d Motion Graphic</p> <h1 class="main-title">Pro Controller</h1></div> <div class="hero-image"><div class="video-wrapper"><iframe id="vimeoPlayer" src="https://player.vimeo.com/video/1041647005?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;controls=0" frameborder="0" allow="autoplay; picture-in-picture" allowfullscreen sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups"></iframe></div></div></div></section> <section class="content">`;
  About_Proj($$payload, {
    imageSrc: `${stringify(base)}/Recursos/Projects/Control/Tribal zelda.png`,
    imageAlt: "Tribal Zelda Controller",
    title: "About the project",
    description,
    purpose,
    category: "3D Product Animation / Fan Art",
    tools
  });
  $$payload.out += `<!----> <div class="gallery"><div class="gallery-row 1"><div class="gallery-item"><iframe src="https://giphy.com/embed/5dYTGLaAGroGtDRI6U" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div> <div class="gallery-item"><iframe src="https://giphy.com/embed/dozK2FJXCKS9BYj3YU" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div></div> `;
  Seccion_contenido_1($$payload, {
    title: "01. <strong>Challenges</strong> & Learnings",
    subtitle: "What we learned",
    paragraphs: [
      "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
    ],
    image: `${stringify(base)}/Recursos/Projects/Control/Tribal zelda.png`,
    Alt: "Process image"
  });
  $$payload.out += `<!----> `;
  Seccion_contenido_2($$payload, {
    title: "02. <strong>Challenges</strong> & Learnings",
    subtitle: "What we learned",
    paragraphs: [
      "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
    ],
    image: `${stringify(base)}/Recursos/Projects/Control/Tribal zelda.png`,
    Alt: "Process image"
  });
  $$payload.out += `<!----> `;
  Seccion_contenido_3($$payload, {
    title: "03. <strong>Challenges</strong> & Learnings",
    subtitle: "What we learned",
    paragraphs: [
      "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
    ]
  });
  $$payload.out += `<!----> `;
  Seccion_contenido_4($$payload, {
    title: "04. <strong>Challenges</strong> & Learnings",
    subtitle: "What we learned",
    paragraphs: [
      "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.",
      "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.",
      "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
    ],
    image: `${stringify(base)}/Recursos/Projects/Control/Tribal zelda.png`,
    Alt: "Process image"
  });
  $$payload.out += `<!----> `;
  Seccion_contenido_5($$payload, {
    title: "05. <strong>Challenges</strong> & Learnings",
    subtitle: "What we learned",
    paragraphs: [
      "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.   <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
    ],
    image: `${stringify(base)}/Recursos/Projects/Control/Tribal zelda.png`,
    Alt: "Process image"
  });
  $$payload.out += `<!----> `;
  Seccion_contenido_6($$payload, {
    title: "06. <strong>Challenges</strong> <span?& Learnings</span>",
    subtitle: "What we learned",
    paragraphs: [
      "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
    ],
    image: `${stringify(base)}/Recursos/Projects/Control/Tribal zelda.png`,
    image2: `${stringify(base)}/Recursos/Projects/Control/Tribal zelda.png`,
    Alt: "Process image",
    Alt2: "Process image"
  });
  $$payload.out += `<!----> `;
  Accordion($$payload);
  $$payload.out += `<!----> <div class="scene-container">`;
  Scene($$payload);
  $$payload.out += `<!----></div> `;
  NextProject($$payload, {
    title: "Kinetic rush",
    description: "This project was my submission for the Kinetic Rush challenge organized by Clint Jones. The challenge consisted of creating an animation featuring a character running towards or away from an objective. I decided to tell the story of an angel fleeing a chaotic heaven.",
    extraInfo: "The scene depicts a crumbling celestial realm, ravaged by conflict. In the background, an explosion marks the demise of a cherub, while our protagonist struggles to escape, only to be ultimately captured by its fate.",
    tag: "Passion project",
    imageSrc: `${stringify(base)}/Recursos/Slider/3D/Kinetic rush-static.webp`,
    imageAlt: "Kinetic rush project preview"
  });
  $$payload.out += `<!----></div></section></section>`;
  pop();
}
export {
  _page as default
};
