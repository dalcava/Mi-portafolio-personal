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
  import Accordion from '../components/Secciones reutilizables/Accordion.svelte';

  let showWorks = false;
  let showAbout = false;
  let activeTab = null;

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
    const video = document.getElementById('home-video');
    const loadingScreen = document.getElementById('loading-screen');
  
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

    const backgroundWorks = document.querySelector('.background-works');
    const worksContainer = document.querySelector('.works-container');




      backgroundEl?.addEventListener('scroll', handleScroll);

      return () => {
        backgroundEl?.removeEventListener('scroll', handleScroll);
      };

      function handleScroll() {
        const scrollY = backgroundEl?.scrollTop || 0;

          // 👉 Mostrar Works cuando el scroll sea 1400 o más
        if (scrollY >= 900 && !showWorks) {
          showWorks = true;
        } else if (scrollY < 750 && showWorks) {
          showWorks = false;
        }

        // 👉 Mostrar About cuando el scroll sea 5400 o más
        if (scrollY >= 5200 && !showAbout) {
          showAbout = true;
        } else if (scrollY < 5200 && showAbout) {
          showAbout = false;
        }


        // ——— 2. Lógica para animar el video ———
        const minScroll = 100;
        const maxScroll = 1000;

        if (scrollY >= minScroll && scrollY <= maxScroll) {
          const progress = (scrollY - minScroll) / (maxScroll - minScroll);
          const scale = 1 - progress * 0.5; // reduce hasta 91%
          const radius = progress * 16; // aumenta hasta 18px

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


    backgroundEl?.addEventListener('scroll', handleScroll);
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
<!-- Pantalla de carga -->
<div id="loading-screen">
  <div class="dot dot1"></div>
  <div class="dot dot2"></div>
  <div class="dot dot3"></div>
  <div class="dot dot4"></div>
</div>

<!-- Fondo principal -->
<div class="background" bind:this={scrollContainer}>
  <div id="page-transition" class="transition-overlay"></div>
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
    </div>

  <div class="Complementary-text hidden">

    <h1>Hi! <span>I'm David</span></h1>
    <div class="Compliment">
      <h2>UX/UI designer and 3d artist</h2>
<!--       <h3>Welcome to my portfolio</h3> -->
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
}

.fade-out {
  opacity: 0;
  transition: opacity 1s ease;
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


  #loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--blanco);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
  }

  .dot {
    width: 16px;
    height: 16px;
    background-color: var(--Verde-claro);
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
    gap: 0px;
    background-color: var(--blanco);
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

  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .Complementary-text {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 16% 0%;
    top: 15%;
  }

  .Complementary-text.hidden {
  opacity: 0;
  transform: translateY(30px);
}


.Compliment{
  display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: start;
    align-items: center;
    position: absolute;
    top: 30%;
    right: 17.4%;
    transform: translate(0, 156px);
    width: 24%;
    height: fit-content;
    height: fit-content;
    min-width: 120px;
}

  .Complementary-text h1 {
    font-size: var(--font-size-XXL);
    color: var(--Gris);
    font-family: "Publica Sans";
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
    padding: 0;
    transform: translateY(0);
    opacity: 1;
    transition: transform 0.5s ease, opacity 0.5s ease;
    width: 6%;
    mix-blend-mode: difference;
  }
  .Complementary-text h1 span {
    font-size: var(--font-size-XXL);
    color: var(--Gris-muy-oscuro);
    font-family: "Publica Sans";
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
    padding: 0;
    transform: translateY(0);
    opacity: 1;
    transition: transform 0.5s ease, opacity 0.5s ease;
    width: 6%;
  }
  .Complementary-text h2 {
    font-size: var(--font-size-XXXL);
    background: linear-gradient(45deg, #2B2B35 27%, #7E7E9B 79%);
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
  }
  .Complementary-text h3 {
    font-size: var(--font-size-XXL);
    color: var(--Gris-oscuro);
    font-family: "Publica Sans";
    line-height: 1.1;
    font-weight: 700;
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
    height: 440vh;
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
  }
  
  .about-container {
    display: flex;
    justify-content: end;
    align-items: flex-start;
    width: 100%;
    gap: 80px;
    padding: 10rem 3rem;
  }
  .about-wrap {
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
  }

  :global(body) .about-wrap.show {
    opacity: 1;
  }





@media (max-width: 1360px) {

  

}
@media (max-width: 860px) {

  
    .Complementary-text {
        width: 100%;
        height: 100%;
        position: absolute;
        padding: 0% 0%;
        top: 15%;
        left: 10%;
    }

    
  .Complementary-text h1 {
    font-size: var(--font-size-XL);
    transform: translateY(0);
    width: 6%;
  }
  .Complementary-text h1 span {
    font-size: var(--font-size-XL);
    transform: translateY(0);
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
}
@media (max-width: 425px) {
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
    }
    .Complementary-text h2 {
      font-size: var(--font-size-L);
    }
    .Complementary-text h3 {
      font-size: var(--font-size-M);
    }
}


</style>
