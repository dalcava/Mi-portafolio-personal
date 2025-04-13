<!-- Este es Works -->

<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { gsap } from "gsap";
  import Slider from '../../components/Slider.svelte';
  import Slider_2 from '../../components/Slider_2.svelte';
  import CanvasParticles from '../../components/CanvasParticles.svelte';
  import Contador from '../../components/Contador.svelte';
  import Tabs from '../../components/Tabs.svelte';


  let activeTab = '3D';

  

  function handleTabChange(event) {
    activeTab = event.detail;
    runIntroAnimation();
    updateDescription();
    animateBackgroundImage();
  }

  function animateBackgroundImage() {
  gsap.fromTo(".background-img",
    { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
    {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 1.2,
      ease: "power2.out",
      delay: 0.5 // 👈 esta es la clave
    }
  );
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
          animateBackgroundImage(); // Aquí también
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
      }, "-=0.3");

      updateDescription();


    document.querySelectorAll(".image-container, .imagen-contenida, .active-gif").forEach((element) => {
      element.addEventListener("click", function () {
        const slide = this.closest(".swiper-slide");
        const nextPage = slide?.getAttribute("data-url");
        if (!nextPage) return;

        const image = slide.querySelector(".imagen-contenida");
        if (!image) return;

        const rect = image.getBoundingClientRect();
        const clone = image.cloneNode(true);

        const tlClick = gsap.timeline({
          onComplete: () => {
            goto(nextPage);
          }
        });

        tlClick
          .to("#page-transition", {
            transform: "translateY(0%)",
            duration: 1,
            ease: "power4.inOut"
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
  });
</script>



<!-- Fondo principal -->
<div class="background">
  <div class="background-img"></div>
<div id="page-transition" class="transition-overlay"></div>
<div class="hero">
  <Tabs on:tabChange={handleTabChange} />
  <CanvasParticles />
  <div class="Quote">
    <h1>Good design is seen. Great design is remembered</h1>
  </div>
    {#if activeTab === '3D'}
      <Slider />
    {:else}
      <Slider_2 />
    {/if}


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
  }

.background-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--blanco);
  background-image: url('/Recursos/Fondos/fondo-works.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  opacity: 1;
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
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
    padding-bottom: 240px;
    background-color: var(--transparent);
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

  .Quote {
    position: absolute;
    top: 72px;
    left: 56px;
    text-align: center;
    z-index: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 39%;
  }
  .Quote h1 {
    font-size: var(--font-size-XXXL);
    background: linear-gradient(45deg, #686880 12%, #2B2B35 39%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: start;
    margin: 0;
    line-height: 96px;
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
