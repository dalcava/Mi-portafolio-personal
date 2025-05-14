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
  import NextProject from '../../components/Secciones reutilizables/NextProject.svelte';
  import Accordion from '../../components/Secciones reutilizables/Accordion.svelte';
  import Works from '../../components/Secciones home/Works.svelte';

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
      <div class="hero-image">
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
        "The main challenge centered on improving payment conversion, user satisfaction, and operational efficiency. The previous portal struggled with usability, operating costs, and the perceived user experience, directly impacting users’ trust and confidence when making online transactions."
      ]}
      image="{base}/Recursos/Projects/Aval_Pay_Center/Aval pay challenge.png"
      Alt="Process image"
    />
  
    <div class="gallery">
      <div class="gallery-row 1">
        <img src="/Recursos/Projects/Aval_Pay_Center/AvalPay1.png" alt="methodology">
      </div>

      <Section1
        title="01. <strong>Challenges</strong> & Learnings"
        subtitle="What we learned"
        paragraphs={[
          "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
        ]}
        image="{base}/Recursos/Projects/Control/Tribal zelda.png"
        Alt="Process image"
      />
    
      <Section3
        title="03. <strong>Challenges</strong> & Learnings"
        subtitle="What we learned"
        paragraphs={[
          "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
        ]}
      />
      <Section4
        title="04. <strong>Challenges</strong> & Learnings"
        subtitle="What we learned"
        paragraphs={[
          "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.",
          "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.",
          "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
        ]}
        image="{base}/Recursos/Projects/Control/Tribal zelda.png"
        Alt="Process image"
      />
      <Section5
        title="05. <strong>Challenges</strong> & Learnings"
        subtitle="What we learned"
        paragraphs={[
          "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.   <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
        ]}
        image="{base}/Recursos/Projects/Control/Tribal zelda.png"
        Alt="Process image"
      />
      <Section6
        title="06. <strong>Challenges</strong> <span?& Learnings</span>"
        subtitle="What we learned"
        paragraphs={[
          "We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading.  <br><br>  We explored advanced rigging for animation. Lighting setups were crucial for product realism. We optimized render times without losing quality. Experimented with camera motion and timing Learned effective storytelling in 10 seconds. Polished composition and color grading."
        ]}        
        image="{base}/Recursos/Projects/Control/Tribal zelda.png"
        image2="{base}/Recursos/Projects/Control/Tribal zelda.png"
        Alt="Process image"
        Alt2="Process image"
      />

      <Accordion/>
    
      
      <NextProject
        title="Kinetic rush"
        description="This project was my submission for the Kinetic Rush challenge organized by Clint Jones. The challenge consisted of creating an animation featuring a character running towards or away from an objective. I decided to tell the story of an angel fleeing a chaotic heaven."
        extraInfo="The scene depicts a crumbling celestial realm, ravaged by conflict. In the background, an explosion marks the demise of a cherub, while our protagonist struggles to escape, only to be ultimately captured by its fate."
        tag="Passion project"
        imageSrc="{base}/Recursos/Slider/3D/Kinetic rush-static.webp"
        imageAlt="Kinetic rush project preview"
      />
    
    
      
    </div>
  </section>
</section>
  