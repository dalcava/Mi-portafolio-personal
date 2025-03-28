<script>
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import Header from '../components/Header.svelte';
  import Slider from '../components/Slider.svelte';
  import CanvasParticles from '../components/CanvasParticles.svelte';

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
    });
  });
</script>



<!-- Pantalla de carga -->

<div id="loading-screen">
  <div class="dot dot1"></div>
  <div class="dot dot2"></div>
  <div class="dot dot3"></div>
  <div class="dot dot4"></div>
</div>


<!-- Fondo principal -->
<div class="background">
  <!-- Fondo animado con canvas -->
  
  <div class="hero">
    <div class="white-overlay"></div>
    <CanvasParticles />

    <!-- Header superior -->
    <Header />

    <!-- Slider principal -->
    <Slider />

    <!-- Scrollbar opcional -->
    <div class="swiper-scrollbar"></div>
  </div>
</div>

<style>

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
    padding: 0px 32px;
}
.hero {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0px;
    justify-content: flex-start;
    border-radius: 4px 32px 4px 32px; /* Add rounded corners */
    overflow: hidden; /* Ensures child elements respect the clip-path */
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); /* Custom shape */
    z-index: 1;    
    padding-bottom: 240px;
}
.white-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--Verde-claro); /* White transition effect */
    z-index: 999;
    opacity: 0; /* Hidden initially */
    pointer-events: none;
}

</style>