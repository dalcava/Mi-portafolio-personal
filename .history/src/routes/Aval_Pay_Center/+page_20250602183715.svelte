<!-- Esta es la página de control -->

<script>
  import { onMount } from "svelte";
  import { base } from '$app/paths';
  import { goto } from "$app/navigation";
  import { gsap } from "gsap";
  import AboutProject from '../../components//Secciones reutilizables/About_Proj.svelte';
  import CanvasParticles from '../../components/CanvasParticles 2.svelte';
  import Section1 from '../../components/Secciones reutilizables/seccion_contenido_1.svelte';
  import Section2 from '../../components/Secciones reutilizables/seccion_contenido_2.svelte';
  import Section3 from '../../components/Secciones reutilizables/seccion_contenido_3.svelte';
  import Section4 from '../../components/Secciones reutilizables/seccion_contenido_4.svelte';
  import Section5 from '../../components/Secciones reutilizables/seccion_contenido_5.svelte';
  import Section6 from '../../components/Secciones reutilizables/seccion_contenido_6.svelte';
  import Slideshow from '../../components/Secciones reutilizables/Slideshow.svelte';
  import NextProject from '../../components/Secciones reutilizables/NextProject.svelte';
  import Accordion from '../../components/Secciones reutilizables/Accordion.svelte';
  import Works from '../../components/Secciones home/Works.svelte';
  import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


  const challengeTitle = `03. <strong>Challenges</strong> & Learnings`;


  const description = `
    <span> Transforming the platform to make user interaction more intuitive and enjoyable. </span>
    We implemented a cleaner, more accessible design, simplifying navigation and ensuring that every user can quickly and efficiently find what they need.
  `;

  const purpose = `
    Payment Portal Redesign <br>

    Bogotá, Colombia – 2024

    UX Design | UI Design | Concept

  `;

  const tools = [
    { src: `${base}/Recursos/Projects/Control/Blender-Icon.svg`, alt: "Blender" },
    { src: `${base}/Recursos/Projects/Control/Illustrator-Icon.svg`, alt: "Illustrator" },
    { src: `${base}/Recursos/Projects/Control/AE-Icon.svg`, alt: "After Effects" },
    { src: `${base}/Recursos/Projects/Control/PR-Icon.svg`, alt: "Premiere Pro" },
  ];

  
  onMount(() => {
  const loadingScreen = document.getElementById("loading-screen");
  const themeClass = "tema-AvalPay"; // Cambiar esto por el tema

  document.body.classList.add(themeClass);


  if (loadingScreen) {
    gsap.to(loadingScreen, {
      x: "-100%",
      duration: 0.5,
      ease: "ease-out",
      onComplete: () => {
        loadingScreen.style.display = "none";
      },
    });
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;

  // Hero Intro Animation

  const tl = gsap.timeline();

      tl.fromTo(
        ".hero-image",
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(
        ".main-title",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1, ease: "power4.out" },
        "=1.5" // Se solapa un poco con el final del anterior
      )
      .fromTo(
        ".main-subtitle",
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1, ease: "power4.out" },
        "-=0.5"
      );

      gsap.set(".gallery-fade", { opacity: 0, y: 40 });

      gsap.to(".gallery-fade", {
        scrollTrigger: {
          trigger: ".image-gallery",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray(".fade-in-img").forEach((img) => {
        gsap.set(img, { opacity: 0, y: 40 });

        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out"
        });
      });

      gsap.utils.toArray(".split-line").forEach((el) => {
          const words = el.innerText.trim().split(" ");
          el.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");

          gsap.set(el.querySelectorAll(".word"), { opacity: 0, y: 30 });

          gsap.to(el.querySelectorAll(".word"), {
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
          });
        });
      
    return () => {
      document.body.classList.remove(themeClass);
    };


});



  </script>
  
  <style>


    @import "../Control/Control.css";

    :global(.seccion.dos) {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 195px;
        padding: 0rem 1rem !important;
        max-width: 1760px;
        width: 100%;
        margin: 0 auto;
        border-bottom: 1px solid var(--Gris-claro);
    }
    :global(.gallery-row img) {
      padding: 40px;
    }
  </style>
  
<div id="page-transition" class="transition-overlay"></div>
  <div class="white-overlay"></div>
  <div id="loading-screen"></div>


<section class="body-projects">
  <section class="hero-project control-content">
    <div class="hero-content">
      <div class="hero-text">
        <p class="main-subtitle">
          UX + UI Design
        </p>
        <h1 class="main-title">Aval Pay Center</h1>
      </div>
      <div class="Section-video">
        <div class="video-wrapper">
          <iframe
            id="vimeoPlayer"
            src="https://player.vimeo.com/video/1034343177?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;controls=0"
            frameborder="0"
            allow="autoplay; picture-in-picture"
            allowfullscreen
            sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups"
          ></iframe>
        </div>
      </div>
      
    </div>
  </section>
  
  <section class="content">
    <AboutProject
      imageSrc="{base}/Recursos/Projects/Aval_Pay_Center/Aval pay description.png"
      imageAlt="Tribal Zelda Controller"
      title="Looking for a change"
      {description}
      {purpose}
      category="3D Product Animation / Fan Art"
      {tools}
    />
    <Section2
      title="<span>Challenges</span> & Learnings"
      subtitle="Enhancing the simplicity of the payment portal was essential"
      paragraphs={[
        "The main challenge centered on improving payment conversion, user satisfaction, and operational efficiency. The previous portal struggled with usability, operating costs, and the perceived user experience, directly impacting users’ trust and confidence when making online transactions. <br><br>We identified our users’ needs through research, data analysis, and competitive benchmarking. These activities allowed us to uncover the main pain points users experienced when interacting with the most widely used payment portal in Colombia."
      ]}
      image="{base}/Recursos/Projects/Aval_Pay_Center/Aval pay challenge.png"
      Alt="Process image"
    />
  
    <div class="gallery">
      <div class="gallery-row 1">
      </div>
      
      <Section1
      title="How did we do it?"
      subtitle="Methodology"
      paragraphs={[
        "We identified our users’ needs through research, data analysis, and competitive benchmarking. These activities allowed us to uncover the main pain points users experienced when interacting with the most widely used payment portal in Colombia."
      ]}
      />
      <img src="/Recursos/Projects/Aval_Pay_Center/Metodología.png" alt="methodology">
<!--       <img src="/Recursos/Projects/Aval_Pay_Center/AvalPay1.png" alt="methodology"> -->
      
      
      
      
      
      <Section4
      title="What we dream"
      subtitle="What we learned"
      paragraphs={[
        "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.",
        "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
      ]}
      />
      <Slideshow images={["/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 01.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 02.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 03.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 04.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 05.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 06.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 07.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 08.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 09.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 10.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 11.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 12.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 13.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 14.png", "/Recursos/Projects/Aval_Pay_Center/Wireframes/Wireframe 15.png"]} />
      
      
      <img src="/Recursos/Projects/Aval_Pay_Center/NuevoLF.png" alt="Look & Feel">
      
      <Section6
        title="What we accomplished"
        subtitle="Taking care of the details"
        paragraphs={[
          "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
        ]}        
        image="/Recursos/Projects/Aval_Pay_Center/Diagram 1.png" alt="UI diagram"
        image2="/Recursos/Projects/Aval_Pay_Center/Diagram 2.png"
        Alt="Process image"
        Alt2="Process image"
      />
      <div class="Section-video">
        <div class="video-wrapper">
          <iframe          
            class="video"
            id="vimeoPlayer"
            src="https://player.vimeo.com/video/1060508382?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;controls=0"
            frameborder="0"
            allow="autoplay; picture-in-picture"
            allowfullscreen
            sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups"
          ></iframe>
        </div>
      </div>

      <div class="image-gallery">
        <img class="gallery-fade" src="/Recursos/Projects/Aval_Pay_Center/Pantallas 1.png" alt="Pantallas 1" />
        <img class="gallery-fade" src="/Recursos/Projects/Aval_Pay_Center/Pantallas 2.png" alt="Pantallas 2" />
        <img class="gallery-fade" src="/Recursos/Projects/Aval_Pay_Center/Pantallas 3.png" alt="Pantallas 3" />
        <img class="gallery-fade" src="/Recursos/Projects/Aval_Pay_Center/Pantallas 4.png" alt="Pantallas 4" />
      </div>



 
    
      
      
      
      
    </div>
  </section>
  <NextProject
    title="Kinetic rush"
    description="This project was my submission for the Kinetic Rush challenge organized by Clint Jones. The challenge consisted of creating an animation featuring a character running towards or away from an objective. I decided to tell the story of an angel fleeing a chaotic heaven."
    extraInfo="The scene depicts a crumbling celestial realm, ravaged by conflict. In the background, an explosion marks the demise of a cherub, while our protagonist struggles to escape, only to be ultimately captured by its fate."
    tag="Passion project"
    imageSrc="{base}/Recursos/Slider/3D/Kinetic rush-static.webp"
    imageAlt="Kinetic rush project preview"
  />
</section>
  