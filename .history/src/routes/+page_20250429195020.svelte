<!-- Este es el home -->

<script>
  import { onMount } from "svelte";
  import { base } from '$app/paths';
  import { goto } from "$app/navigation";
  import { gsap } from "gsap";
  import CanvasParticles from '../components/CanvasParticles.svelte';
  import Contador from '../components/Contador.svelte';
  import Scene from '../components/Scene.svelte';
  import { glassTransition } from '../lib/glassTransition';
  import Works from '../components/Secciones home/Works.svelte';
  import About from '../components/Secciones home/About.svelte';
  import Footer from '../components/Secciones home/Footer.svelte';
  import Accordion from '../components/Secciones reutilizables/Accordion.svelte';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  
	let transitionOverlay;
  let scrollY = 0;

  let showWorks = false;
  let showAbout = false;
  let activeTab = null;

  let isDark = false;
  let overlayEl;

  const isSmallScreen = writable(false);

  function updateScreenSize() {
    isSmallScreen.set(window.innerHeight < 850);
  }

  export let scrollContainer;

  function onWheel(e) {
  if (triggered) return;
  scrollProgress += Math.abs(e.deltaY);
  if (scrollProgress > triggerThreshold) {
    triggered = true;
    startDistortionAnimation();
  }
}

  function runIntroAnimation() {
    console.log("Animación de introducción activada");
  }

  onMount(() => {
  const backgroundEl = document.querySelector('.background');
  overlayEl = document.querySelector('.background-overlay');
  const video = document.getElementById('home-video');
  const loadingScreen = document.getElementById('loading-screen');

  updateScreenSize();
  window.addEventListener('resize', updateScreenSize);

  // Verificar si el elemento se encuentra
  console.log('🎯 backgroundEl encontrado:', backgroundEl);

  if (!backgroundEl || !video || !loadingScreen) {
    console.warn('❌ Elemento(s) no encontrados');
    return;
  }

  // Animación de pantalla de carga
  const tl = gsap.timeline({
    onComplete: () => {
      loadingScreen.style.display = 'none';
    }
  });

  tl.to(loadingScreen, {
    y: '100%',
    rotation: 0,
    ease: "power4.in",
    duration: 1.2,
  })
  .to(loadingScreen, {
    scaleX: 1,
    scaleY: 1.15,
    ease: "power2.out",
    duration: 0.2
  }, "-=0.3")
  .to(loadingScreen, {
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
    ease: "elastic.out(1, 0.35)",
    duration: 0.5
  })
  .to(".background-img", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    duration: 1.75,
    ease: "power2.out"
  }, "-=1.25");

  gsap.to('.Complementary-text', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 1.2,
    ease: 'power3.out',
    onStart: () => {
      document.querySelector('.Complementary-text')?.classList.remove('hidden');
    }
  });

  if (transitionOverlay) {
    transitionOverlay.style.clipPath = 'inset(0 0 0 100%)';
  }

  function handleScroll() {
    const scrollY = backgroundEl.scrollTop;
    console.log('📍 scrollY:', scrollY);

    // Mostrar Works
    if (scrollY >= 900 && !showWorks) {
      showWorks = true;
    } else if (scrollY < 750 && showWorks) {
      showWorks = false;
    }

    if (scrollY >= 8500 && !showAbout) {
      showAbout = true;
    } else if (scrollY >= 6500 && !showAbout && $isSmallScreen) {
      showAbout = true;
    } else if (scrollY < 8000 && showAbout && !$isSmallScreen) {
      showAbout = false;
    } else if (scrollY < 6500 && showAbout && $isSmallScreen) {
      showAbout = false;
    }

    // Mostrar dark usando GSAP en el overlay
    if (scrollY > 8000 && isDark) {
      isDark = false;
      gsap.to(overlayEl, { opacity: 0, duration: 1, ease: 'power3.out' });
      console.log('Desactivando modo dark (por scroll muy alto)');
    } else if (scrollY >= 1500 && scrollY <= 8000 && !isDark) {
      isDark = true;
      gsap.to(overlayEl, { opacity: 1, duration: 1, ease: 'power3.out' });
      console.log('Activando modo dark');
    } else if (scrollY < 1500 && isDark) {
      isDark = false;
      gsap.to(overlayEl, { opacity: 0, duration: 1, ease: 'power3.out' });
      console.log('Desactivando modo dark (por scroll bajo)');
    }

    // Escalar video
    const minScroll = 100;
    const maxScroll = 1000;
    if (scrollY >= minScroll && scrollY <= maxScroll) {
      const progress = (scrollY - minScroll) / (maxScroll - minScroll);
      const scale = 1 - progress * 0.5;
      const radius = progress * 16;

      video.style.width = `${scale * 100}%`;
      video.style.height = `${scale * 100}%`;
      video.style.borderRadius = `${radius}px`;
    } else if (scrollY < minScroll) {
      video.style.width = `100%`;
      video.style.height = `100%`;
      video.style.borderRadius = `0px`;
    } else if (scrollY > maxScroll) {
      video.style.width = `50%`;
      video.style.height = `50%`;
      video.style.borderRadius = `16px`;
    }
  }

  backgroundEl.addEventListener('scroll', handleScroll);

  return () => {
    backgroundEl.removeEventListener('scroll', handleScroll);
  };
});

  function restoreHomeAnimation() {
    const hero = document.querySelector('.hero');
    const pageTransition = document.getElementById('page-transition');

    if (hero) {
      hero.style.opacity = '1';
      hero.classList.remove('fade-out');
    }

    if (pageTransition) {
      pageTransition.style.transform = 'translateY(100%)';
    }
  }

  

</script>

<!-- ---------------------------------------------------------------------------------------------------------------------------
---- --------------------------------------------------Aquí empieza el HTML------------------------------------------------------
---- ----------------------------------------------------------------------------------------------------------------------- -->

<div use:glassTransition style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999;"></div>
<div class="page-transition-overlay" bind:this={transitionOverlay}></div>
<!-- Pantalla de carga -->
<div id="loading-screen">
  <div class="dot dot1"></div>
  <div class="dot dot2"></div>
  <div class="dot dot3"></div>
  <div class="dot dot4"></div>
</div>

<!-- Fondo principal -->
<div class="background" bind:this={scrollContainer}>
  <div class="background-overlay"></div>
  <div class="hero">
    <div class="background-elements">

      <video
        id="home-video"
        class="video-background"
        autoplay
        loop
        muted
        playsinline
      >
        <source src="{base}/Recursos/Fondos/Orbes.mp4" type="video/mp4" />
      </video>
    <CanvasParticles />
    <img
      src="{base}/Recursos/Fondos/Circle-text.gif"
      alt="Circle Text Animation"
      class="circle-text-gif"
    />

    </div>

  <div class="Complementary-text hidden">

    <h1> &nbsp Hi! <br><br> &nbsp I'm <br> <br> <span> David</span></h1>
    <div class="Compliment">
      <h2>UX/UI designer and 3d artist</h2>
      <h3>Welcome to my portfolio</h3>
    </div>
  </div>

    <div class="swiper-scrollbar"></div>
  </div>

<section class="works-wrap">
    <div class="works-container">
      {#if showWorks}
        <Works {scrollContainer} on:slideProgress={(e) => handleSliderProgress(e.detail)} />
      {/if}
    </div>
</section>
<section class="about-wrap {showAbout ? 'show' : ''}">
  <div class="about-container">
    {#if showAbout}
    <About />
    {/if}
    
    
  </div>
</section>
<section class="contact-wrap {showAbout ? 'show' : ''}">


</section>

  

  <div class="contador-container">
    <Contador />
  </div>
</div>


<!-- ---------------------------------------------------------------------------------------------------------------------------
---- --------------------------------------------------Aquí empieza el CSS------------------------------------------------------
---- ----------------------------------------------------------------------------------------------------------------------- -->
<style>
html, body {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 0px;
}

#loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white; /* o lo que uses */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
  pointer-events: none;
}

.page-transition-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: white;
	z-index: 9999;
	pointer-events: none;
	clip-path: inset(0 0 0 100%);
	transition: none;
}

.background-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1;
}

.video-background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease;
  width: 100%;
  height: 100%;
}
.circle-text-gif {
  position: absolute;
  top: 16px;
  right: 48px;
  object-fit: cover;
  transition: width 0.3s ease, height 0.3s ease, border-radius 0.3s ease;
  width: 160px;
  height: 160px;
}

  .dot {
    width: 16px;
    height: 16px;
    background-color: var(--Resalte-claro);
    border-radius: 50%;
    margin: 0 8px;
    animation: rubberJump 1s infinite ease-in-out;
  }

  .dot1 { animation-delay: 0s; }
  .dot2 { animation-delay: 0.1s; }
  .dot3 { animation-delay: 0.2s; }
  .dot4 { animation-delay: 0.3s; }

  @keyframes rubberJump {
    0%   { transform: translateY(0) scaleY(1); }
    25%  { transform: translateY(-20px) scaleY(1.2); }
    50%  { transform: translateY(0) scaleY(0.8); }
    75%  { transform: translateY(-10px) scaleY(1.1); }
    100% { transform: translateY(0) scaleY(1); }
  }
  .background {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    display: flex;
    flex-direction: column;
    gap: 80px;
    background: var(--blanco);
    scroll-behavior: smooth;
}
.background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(12, 0, 29, 1) 75%, rgba(59, 0, 153, 1) 130%);
    opacity: 0;
    pointer-events: none;
    z-index: 0;
}





  .hero {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0px;
    justify-content: flex-start;
    overflow: visible;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    z-index: 1;    
    padding: 24px 120px;
    background-color: var(--transparent);
    transition: opacity 0.3s ease;
    min-height: 180vh
  }


  .transition-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--blanco);
    z-index: 9999;
    pointer-events: none;
    transform: translateY(100%);
  }



  .contador-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1;
  }
  .Complementary-text {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 36% 0%;
    top: 0%;
    border-left: 1px solid var(--Resalte);
  }

  .Complementary-text.hidden {
    opacity: 0;
    transform: translateY(30px);
  }


  .Compliment {
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: start;
    align-items: center;
    position: absolute;
    top: 30%;
    right: 17.4%;
    transform: translate(0, 150%);
    width: 24%;
    height: fit-content;
    height: fit-content;
    min-width: 120px;
}

  .Complementary-text h1 {
    font-size: var(--font-size-S);
    color: var(--Resalte);
    font-family: "Publica Sans";
    font-weight: 500;
    line-height: 1.2;
    margin: 0;
    padding: 0;
    transform: translateY(-70%) translateX(-6px);
    opacity: 1;
    transition: transform 0.5s ease, opacity 0.5s ease;
    width: 6%;
    mix-blend-mode: difference;
  }
  .Complementary-text h1 span {
    font-size: var(--font-size-XXXL);
    color: var(--Resalte);
    font-family: "Publica Sans thin";
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
    padding: 0;
    opacity: 1;
    transition: transform 0.5s ease, opacity 0.5s ease;
    width: 6%;
  }
  .Complementary-text h2 {
    font-size: var(--font-size-XXXL);
    background: var(--Resalte);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Publica Sans thin";
    font-weight: 700;
    line-height: 1.1;
    margin: 0;
    padding: 0;
    opacity: 1;
    transition: transform 0.5s ease, opacity 0.5s ease;
    text-align: start;
    letter-spacing: 0.5px;
  }
  .Complementary-text h3 {
    font-size: var(--font-size-S);
    color: var(--Resalte);
    font-family: "Publica Sans";
    line-height: 1.1;
    font-weight: 500;
    margin: 0;
    padding: 0;
    opacity: 1;
    transition: transform 0.5s ease, opacity 0.5s ease;
    width: 100%;
    text-align: start;
  }
  .Complementary-text span {
    font-size: var(--font-size-XS);
    color: var(--Gris);
    font-family: "Publica Sans thin";
    line-height: 1.1;
    margin: 0;
    padding: 0;
    opacity: 1;
    transition: transform 0.5s ease, opacity 0.5s ease;
    width: 91%;
    text-align: end;
  }

  .works-wrap {
    position: relative;
    height: 744vh;
    width: 100%;
    z-index: 1;
    overflow: visible;
  }
  .works-container {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 10;
}


  .about-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 120px 80px;
    background-color: var(--blanco);
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }
  
  .about-container {
    display: flex;
    justify-content: end;
    align-items: flex-start;
    width: 100%;
    gap: 80px;
    padding: 8rem 3rem;
  }
  .contact-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 120px 80px;
    background-color: var(--blanco);
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
    min-height: 100vh;
  }

  :global(body) .about-wrap.show {
    opacity: 1;
  }





@media (max-width: 1360px) {

  

}
@media (max-width: 1200px) {

  

}
@media (max-width: 860px) {

  
    .Complementary-text {
        width: 100%;
        height: 100%;
        position: absolute;
        padding: 0% 0%;
        top: 0%;
        left: 10%;
    }
    .Compliment {
      top: 28%;
      right: 16%;
      transform: translate(0, 150%);
      width: 44%;
      height: fit-content;
      height: fit-content;
      min-width: 120px;
    }
    
  .Complementary-text h1 {
    font-size: var(--font-size-M);
    transform: translate(-24px, 54vh);
    width: 6%;
    line-height: 20px;
  }
  .Complementary-text h1 span {
    font-size: var(--font-size-XL);
    line-height: 80px;
    width: 6%;
  }
  .Complementary-text h2 {
    font-size: var(--font-size-XL);
    opacity: 1;
    text-align: start;
  }
  .Complementary-text h3 {
    font-size: var(--font-size-M);
    width: 100%;
    text-align: start;
  }
  .about-wrap {
      padding: 0px;
  }
  .about-container {
      padding: 4rem 1rem;
  }
}
@media (max-width: 480px) {
    .scene-wrap {
        width: 280vw;
        position: sticky;
        transform: translateX(-15.2vh) translateY(0%);
        height: 100vh;
    }
    .Complementary-text {
        width: 100%;
        height: 100%;
        position: absolute;
        padding: 0% 0%;
        top: 4%;
        border: none;
    }
}


</style>
