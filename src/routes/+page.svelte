<!-- Este es el home -->

<script>
  import { onMount } from "svelte";
  import { base } from '$app/paths';
  import { goto } from "$app/navigation";
  import { gsap } from "gsap";
  import CanvasParticles from '../components/CanvasParticles.svelte';
  import Contador from '../components/Contador.svelte';
  import Tabs from '../components/Tabs.svelte';
  import Scene from '../components/Scene.svelte';
  import { glassTransition } from '../lib/glassTransition';
  import Works from '../components/Secciones home/Works.svelte';

  let showWorks = false;
  let activeTab = null;

  function enableWorks() {
    showWorks = true;
  }
  function disableWorks() {
  showWorks = false;

  const hero = document.querySelector('.hero');
  const complementary = document.querySelector('.Complementary-text');

  if (hero) {
    gsap.to(hero, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    });
    hero.classList.remove('fade-out');
  }

  if (complementary) {
    complementary.classList.add('hidden'); // Esconder primero
    gsap.to(complementary, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      onStart: () => {
        complementary.classList.remove('hidden');
      }
    });
  }
}



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

    function handleScroll() {
      const scrollY = document.querySelector('.background')?.scrollTop || 0;

      if (backgroundWorks) {
        if (scrollY >= 1700 && scrollY <= 2700) {
          backgroundWorks.classList.add('fixed-mode');
        } else {
          backgroundWorks.classList.remove('fixed-mode');
        }
      }
    }

    const backgroundEl = document.querySelector('.background');
    backgroundEl?.addEventListener('scroll', handleScroll);

    return () => {
      backgroundEl?.removeEventListener('scroll', handleScroll);
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

<div use:glassTransition style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999;"></div>
<!-- Pantalla de carga -->
<div id="loading-screen">
  <div class="dot dot1"></div>
  <div class="dot dot2"></div>
  <div class="dot dot3"></div>
  <div class="dot dot4"></div>
</div>

<!-- Fondo principal -->
<div class="background" use:glassTransition={{ onComplete: enableWorks, onReverse: disableWorks }}>
  <div id="page-transition" class="transition-overlay"></div>
  <div class="hero">
    <div class="background-img"></div>
    <CanvasParticles />

  <div class="scene-wrap">
    <Scene/>
  </div>
  <div class="Complementary-text hidden">

    <h1>Hi! <span>I'm David</span></h1>
    <div class="Compliment">
      <h2>UX/UI designer and 3d artist</h2>
      <h3>Welcome to my portfolio</h3>
    </div>
  </div>

    <div class="swiper-scrollbar"></div>
  </div>


  {#if showWorks}
    <Works onReverse={restoreHomeAnimation} />
  {/if}
  

  <div class="contador-container">
    <Contador />
  </div>
</div>

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
    -webkit-overflow-scrolling: touch;
  }
  
  .background {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
  }

  .background::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }


  .background-img {
  position: fixed;
  top: 40px;
  left: 0;
  width: 115%;
  height: 96%;
  background-color: var(--blanco);
  background-image: url('/Recursos/Fondos/fondo-home.png');
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  z-index: 0;
  opacity: 1;
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  transition: clip-path 1.5s ease; 
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
    padding: 10% 16%;
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
    color: var(--Gris-claro);
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
    background: linear-gradient(90deg, #2B2B35 27%, #7E7E9B 59%);
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
    color: var(--Gris-claro);
    font-family: "Publica Sans thin";
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
  .scene-wrap {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 10; /* antes: 1 */
    pointer-events: none;
  }



@media (max-width: 1360px) {
  .scene-wrap {
    width: 200vw;
    position: sticky;
    height: 100vh;
  }
}
@media (max-width: 860px) {
    .scene-wrap {
        width: 250%;
        position: sticky;
        transform: translateX(-20px);
    }
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
