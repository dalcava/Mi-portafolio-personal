<!-- Este es Works -->

<script>
  import { onMount } from "svelte";
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { gsap } from "gsap";
  import Tabs from '../../components/Tabs.svelte';
  import Slider from '../../components/Slider.svelte';
  import Slider_2 from '../../components/Slider_2.svelte';

  let isFirstSlide = true;
  let activeTab = '3D';
  export let scrollContainer;

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
      const parentScrollable = scrollContainer;


      function handleScroll() {
        const scrollY = parentScrollable?.scrollTop || 0;
        const worksBackground = document.querySelector('.background-works');
      }

      parentScrollable?.addEventListener('scroll', handleScroll);

      return () => {
        parentScrollable?.removeEventListener('scroll', handleScroll);
      };



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
<div class="background-works">
  <div class="Works">
    <div class="quote visible">
      <h2>My Works</h2>
      <h3>Good design is seen. Great design is remembered</h3>
      <p><b>Disclaimer:</b> Some of the projects shown here were created as part of a larger team. I played an important role in bringing them to life and believe I can be a strong asset to your team as well.</p>
    </div>
    <div class="scroll-gif">
      <img
        src="{base}/Recursos/Fondos/Circle-text-white.gif"
        alt="Circle Text Animation"
        class="circle-text-gif"
      />
    </div>

    <div class="tabs-container-fixed">
      <Tabs on:tabChange={handleTabChange} />
    </div>

    {#if activeTab === 'UX'}
      <Slider {scrollContainer} on:isFirstSlideChange={(e) => isFirstSlide = e.detail} />
    {:else}
      <Slider_2 {scrollContainer} on:isFirstSlideChange={(e) => isFirstSlide = e.detail} />
    {/if}

    <div class="swiper-scrollbar"></div>
  </div>
  <div class="background-img"></div>
  <div id="page-transition" class="transition-overlay"></div>

</div>


<style>

  @keyframes rubberJump {
    0%   { transform: translateY(0) scaleY(1); }
    25%  { transform: translateY(-20px) scaleY(1.2); }
    50%  { transform: translateY(0) scaleY(0.8); }
    75%  { transform: translateY(-10px) scaleY(1.1); }
    100% { transform: translateY(0) scaleY(1); }
  }
  .background-works {
    width: 100%;
    padding-top: 120px;
    height: 800vh;
  }


/*   .background-img {
    position: sticky;
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
  } */


  .Works {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 0px;
    justify-content: flex-start;
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

  .scroll-gif {
    width: 160px;
    height: 160px;
    position: fixed;
    top: 632px;
    left: 39%;
    z-index: 3;
    mix-blend-mode: difference;
  }

  .quote {
    position: absolute;
    top: 0px;
    left: 120px;
    text-align: center;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 24%;
    height: 100%;
    opacity: 1;
    transition: opacity 0.5s ease;
    border-left: 1px solid var(--Resalte);
    gap: 160px;
    padding-top: 72px;
  }
  .quote h2 {
    font-size: var(--font-size-XXXL);
    background: linear-gradient(45deg, #5D00FF 27%, #8280FF 79%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Publica Sans thin";
    transform: translateX(-6px);
    text-align: start;
    margin: 0;
    font-weight: 700;
    line-height: 1.1;
  }
  .quote h3 {
    font-family: 'Publica Sans', sans-serif;
    font-weight: 500;
    font-size: var(--font-size-XL);
    color: var(--blanco);
    line-height: 1.2;
    text-align: start;
    margin: 0;
  }
  .quote p {
    font-family: 'Publica Sans Thin', sans-serif;
    font-size: var(--font-size-XS);
    color: var(--blanco);
    line-height: 1.5;
    text-align: start;
    margin: 0;
    letter-spacing: 0.5px;
  }
  .quote p b {
    color: var(--Resalte);
  }

  :global(.quote.hidden) {
    opacity: 0;
    pointer-events: none;
  }

  :global(.quote.visible) {
    opacity: 1;
    pointer-events: auto;
  }

  .swiper-scrollbar {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }

  .tabs-container-fixed {
    position: static;
    top: 0px; /* ajustá según tu layout */
    left: 48px;
    z-index: 100;
    border-radius: 8px;
    transition: opacity 0.3s ease;
  }


  @media (max-width: 1200px) {
    .quote {
        opacity: 0;
        pointer-events: none;
    }

  }

  @media (min-height: 800px) {
    .background-works {
      height: 810vh;
    }
    
}

</style>
