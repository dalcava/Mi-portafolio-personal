<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { gsap } from "gsap";
  import Header from '../components/Header.svelte';
  import Slider from '../components/Slider.svelte';
  import Slider_2 from '../components/Slider_2.svelte';
  import CanvasParticles from '../components/CanvasParticles.svelte';
  import Contador from '../components/Contador.svelte';
  import Tabs from '../components/Tabs.svelte';

  let activeTab = '3D';

  function handleTabChange(event) {
    activeTab = event.detail;
    runIntroAnimation();
    updateDescription();
  }

  function runIntroAnimation() {
    console.log("Animación de introducción activada");
  }

  function scrambleText(element, finalText, duration = 1) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const frameRate = 30;
    const totalFrames = Math.round(duration * frameRate);
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      let output = '';
      for (let i = 0; i < finalText.length; i++) {
        if (frame / totalFrames > i / finalText.length) {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      element.textContent = output;
      if (frame >= totalFrames) {
        clearInterval(interval);
        element.textContent = finalText;
      }
    }, 1000 / frameRate);
  }

  function updateDescription() {
    const element = document.getElementById('scrambled-text');
    if (!element) return;
    const descriptions = {
      '3D': 'Descripción para la pestaña 3D',
      'UX': 'Descripción para la pestaña UX',
      'UI': 'Descripción para la pestaña UI'
    };
    const finalText = descriptions[activeTab] || 'Descripción por defecto';
    element.dataset.finalText = finalText;
    scrambleText(element, finalText, 1);
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
    });

    document.querySelectorAll(".image-container, .imagen-contenida, .active-gif").forEach((element) => {
      element.addEventListener("click", function () {
        const slide = this.closest(".swiper-slide");
        const nextPage = slide?.getAttribute("data-url");
        if (!nextPage) return;

        const image = slide.querySelector(".imagen-contenida");
        if (!image) return;

        const rect = image.getBoundingClientRect();
        const clone = image.cloneNode(true);
        document.body.appendChild(clone);

        const whiteOverlay = document.createElement("div");
        whiteOverlay.classList.add("white-overlay");
        document.body.appendChild(whiteOverlay);

        gsap.set(clone, {
          position: "fixed",
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          zIndex: 1000,
          objectFit: "cover",
          borderRadius: "16px",
          clipPath: "inset(0% 0% 0% 0%)",
        });

        const tlClick = gsap.timeline({
          onComplete: () => {
            goto(nextPage);
          },
        });

        tlClick.to(clone, {
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          duration: 0.8,
          ease: "power2.inOut",
          borderRadius: "16px",
        })
        .to(clone, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.8,
          ease: "power2.inOut",
        }, "-=0.5")
        .to(whiteOverlay, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
        }, "-=0.8");
      });
    });

    updateDescription();

    // Se ha eliminado la funcionalidad de la elipse del fondo
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
    <Tabs on:tabChange={handleTabChange} />
    <div class="white-overlay"></div>
    <CanvasParticles />
    <!-- La imagen de la elipse se ha eliminado -->
    <!-- Dynamic Slider -->
    {#if activeTab === '3D'}
      <Slider />
    {:else}
      <Slider_2 />
    {/if}

    <!-- Header superior -->
    <Header />

    <!-- Scrollbar opcional -->
    <div class="swiper-scrollbar"></div>
  </div>

  <div class="contador-container">
    <Contador />
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
    border-radius: 4px 32px 4px 32px;
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    z-index: 1;    
    padding-bottom: 240px;
  }

  .white-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--Verde-claro);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
  }

  .contador-container {
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1;
  }

  .noisy-gradient {
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
      linear-gradient(135deg, #f6f6f6, #d1d1d6),
      url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
    background-blend-mode: multiply;
    background-size: cover;
    opacity: 0.35;
    pointer-events: none;
    mix-blend-mode: multiply;
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

  .hero-text {
    font-size: 2rem;
    color: var(--blanco);
  }

  .swiper-scrollbar {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  .swiper-scrollbar-drag {
    background-color: var(--Verde-claro);
    border-radius: 10px;
  }
  .swiper-scrollbar-drag::before {
    background-color: var(--Verde-claro);
    border-radius: 10px;
  }
</style>
