<!-- Este es el home -->

<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { gsap } from "gsap";
  import CanvasParticles from '../components/CanvasParticles.svelte';
  import Contador from '../components/Contador.svelte';
  import Tabs from '../components/Tabs.svelte';
  import Scene from '../components/Scene.svelte';
  import { glassTransition } from '../lib/glassTransition';


  let activeTab = null;

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
  });

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
<div class="background">
  <div id="page-transition" class="transition-overlay"></div>
  <div class="hero">
    <div class="background-img"></div>
    <Tabs on:tabChange={handleTabChange} />
    <CanvasParticles />

  <div class="scene-wrap">
    <Scene/>
  </div>
  <div class="Complementary-text hidden">

    <h1>Hi!</h1>
    <div class="Compliment">
      <h2>UX/UI designer and 3d artist</h2>
      <h2>Welcome to my portfolio</h2>
      <span>Scroll, click or touch</span>
    </div>
  </div>

    <div class="swiper-scrollbar"></div>
  </div>

  <div class="contador-container">
    <Contador />
  </div>
</div>

<style>

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--blanco);
  z-index: 0;
  opacity: 1;
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
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    z-index: 1;    
    padding: 24px 120px;
    background-color: var(--transparent);
    transition: opacity 0.3s ease;
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
  }

  .Complementary-text.hidden {
  opacity: 0;
  transform: translateY(30px);
}


.Compliment{
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    top: 50%;
    right: 17.4%;
    transform: translate(0 , 156px);
    width: 100%;
}

  .Complementary-text h1 {
    font-size: var(--font-size-XXL);
    color: var(--Verde-claro);
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
    font-size: var(--font-size-S);
    color: var(--Gris-muy-oscuro);
    font-family: "Publica Sans thin";
    line-height: 1.1;
    margin: 0;
    padding: 0;
    opacity: 1;
    transition: transform 0.5s ease, opacity 0.5s ease;
    width: 91%;
    text-align: end;
  }
  .Complementary-text span {
    font-size: var(--font-size-S);
    color: var(--Verde);
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
    width: 100%;
  }

@media (max-width: 1360px) {
  .scene-wrap {
    width: 126%;
  }
}

</style>
