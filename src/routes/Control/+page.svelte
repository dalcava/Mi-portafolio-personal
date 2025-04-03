<!-- Esta es la página de control -->

<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { gsap } from "gsap";
  import Header from '../../components/Header.svelte';
  import AboutProject from '../../components//Secciones reutilizables/About_Proj.svelte';
  import CanvasParticles from '../../components/CanvasParticles 2.svelte';

  const description = `
    This project is a tribute to <strong>The Legend of Zelda series</strong>, featuring a personalized custom skin for the Nintendo Switch Pro Controller. It showcases a fully 3D animated product presentation, created as a practice piece and an homage to the iconic game franchise. The animation highlights a unique Zelda-themed design, crafted to celebrate the artistic and legendary world of Hyrule.
  `;

  const purpose = `
    This fan-made project is intended for skill development and portfolio showcasing, focusing on 3D product visualization and custom design. It is not affiliated with Nintendo or The Legend of Zelda.
  `;

  const tools = [
    { src: "/Projects/Control/Recursos proyecto/Blender-Icon.svg", alt: "Blender" },
    { src: "/Projects/Control/Recursos proyecto/Illustrator-Icon.svg", alt: "Illustrator" },
    { src: "/Projects/Control/Recursos proyecto/AE-Icon.svg", alt: "After Effects" },
    { src: "/Projects/Control/Recursos proyecto/PR-Icon.svg", alt: "Premiere Pro" },
  ];

  
    onMount(() => {
      // ANIMACIONES DE ENTRADA CON GSAP
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
  
      const timeline = gsap.timeline();
      timeline
        .to(".control-content", {
          opacity: 1,
          duration: 0,
          ease: "power4.out",
        })
        .fromTo(
          ".tag-btn",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.75, ease: "power4.out", stagger: 0.1 },
          "-=.35"
        )
        .fromTo(
          ".hero-image",
          { clipPath: "inset(100% 0 0 0)", y: -250 },
          { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.2, ease: "power4.out" },
          "-=.5"
        )
        .fromTo(
          ".main-title",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.25, ease: "power4.out" },
          "-=.75"
        )
        .fromTo(
          ".main-subtitle",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power4.out" },
          "-=1.25"
        );
    });
  </script>
  
  <style>
    @import "./Control.css";
  </style>
  
  <div class="white-overlay"></div>
  <div id="loading-screen"></div>

  <Header />
  
  <section class="hero control-content">
    <div class="hero-content">
      <div class="hero-text">
<!--         <button class="tag-btn">Passion Project</button> -->
        <p class="main-subtitle">
          3d Motion Graphic
          <!-- Unofficial Motion Graphics Presentation Inspired by Nintendo's Iconic
          Designs. -->
        </p>
        <h1 class="main-title">Pro Controller</h1>
      </div>
      <div class="hero-image">
        <iframe
        id="vimeoPlayer"
        src="https://player.vimeo.com/video/1041647005?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;loop=1&amp;muted=1&amp;controls=0"
        frameborder="0"
        allow="autoplay; picture-in-picture"
        allowfullscreen
        sandbox="allow-same-origin allow-scripts allow-pointer-lock allow-forms allow-popups"
        ></iframe>
<!--         <div class="canvas-container">
          <CanvasParticles />
        </div> -->
      </div>
    </div>
  </section>
  
  <section class="content">
    <AboutProject
      imageSrc="/Projects/Control/Recursos proyecto/Tribal zelda.png"
      imageAlt="Zelda controller"
      title="About the project"
      {description}
      {purpose}
      category="3D Product Animation / Fan Art"
      {tools}
    />
  
    <div class="gallery">
      <div class="gallery-row 1">
        <div class="gallery-item">
          <iframe
            src="https://giphy.com/embed/5dYTGLaAGroGtDRI6U"
            width="480"
            height="269"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
        <div class="gallery-item">
          <iframe
            src="https://giphy.com/embed/dozK2FJXCKS9BYj3YU"
            width="480"
            height="269"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
        </div>
      </div>



    </div>
  </section>
  