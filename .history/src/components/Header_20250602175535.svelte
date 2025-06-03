<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import Tabs from '../components/Tabs.svelte';
  import { base } from '$app/paths';

  let palabraFrente;
  let isMobile = false;
  let menuOpen = false;
  let isBright = false; // 👉 para la clase bright

  $: isHome = $page.url.pathname === "/"; // ✅ Cambiado para detectar home "/"

  const palabras = [
    "a UI/UX Designer", "an Experience Architect", "a 3D Artist", "an Animator", 
    "a Motion Designer", "a Digital Illustrator", "a 3D Modeler", "an Impostor", 
    "an Interaction Designer", "a Prototyper", "an Interface Creator", "a Visual Storyteller", 
    "a Graphic Designer", "a Product Designer", "Obsessive Compulsive", "a VFX Artist", 
    "a User", "a Digital Experience Manager", "an Illustrator", 
    "Motion Graphics", "a Concept Developer", "Parametric", 
    "a Responsive Design", "a Cat"
  ];

  function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function crearPalabra() {
    const index = aleatorio(0, palabras.length - 1);
    gsap.to(palabraFrente, {
      opacity: 0,
      y: -50,
      duration: 0.2,
      onComplete: () => {
        palabraFrente.innerHTML = palabras[index];
        gsap.to(palabraFrente, {
          opacity: 1,
          y: 0,
          duration: 0.3
        });
      }
    });
  }

  onMount(() => {
    crearPalabra();
    const interval = setInterval(crearPalabra, 2400);

    const checkScreenSize = () => {
      isMobile = window.innerWidth < 800;
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // 👉 Detectar el scroll y activar bright SOLO si estamos en home
    let backgroundEl;
    let handleScroll;

    if (isHome) {
      backgroundEl = document.querySelector('.background');
      handleScroll = () => {
        const scrollY = backgroundEl?.scrollTop || 0;
        isBright = scrollY > 1400 && scrollY < 8100;
      };

      backgroundEl?.addEventListener('scroll', handleScroll);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkScreenSize);
      if (isHome && backgroundEl) {
        backgroundEl.removeEventListener('scroll', handleScroll);
      }
    };
  });
</script>



<header id="header" class="header-section start" class:home-background={isHome} class:bright={isBright}>
  <div class="profile-info">
    <div class="personal-photo" on:click={() => goto('/')}>
      <img src="{base}/Recursos/header/personal-photo.svg" alt="Personal photo" />
    </div>
    <h2 class="Header-subtitle">I'm <sp><span bind:this={palabraFrente}></span></h2>
  </div>

  <div class="header-content">
    <div class="icon-buttons">
      <div class="navigation-buttons">

        {#if isMobile}
          <!-- Solo muestra la hamburguesa si estamos en pantalla pequeña -->
          <div class="icon-button menu-hamburger" on:click={() => menuOpen = !menuOpen}>
            <img src="{base}/Recursos/header/hamburger.svg" alt="Menu" />
          </div>

          {#if menuOpen}
            <div class="mobile-menu">
              <div class="icon-button menu work" on:click={() => { goto('/Works'); menuOpen = false; }}>
                <span>Works</span>
              </div>
              <div class="icon-button menu About" on:click={() => { goto('/About'); menuOpen = false; }}>
                <span>About</span>
              </div>
              <div class="icon-button menu contact" on:click={() => { goto('/Contact'); menuOpen = false; }}>
                <span>Contact</span>
              </div>
            </div>
          {/if}
        

        {:else}
          <!-- Vista normal de desktop -->
          <div
            class="icon-button menu work"
            class:active-work={isHome}
            on:click={() => goto('/Works')}
          >
            <span>Works</span>
            <img src="{base}/Recursos/header/Proyects.svg" alt="Projects" />
          </div>

          <div class="icon-button menu About" on:click={() => goto('/About')}>
            <span>About</span>
            <img src="{base}/Recursos/header/About.svg" alt="About" />
          </div>

          <div class="icon-button menu contact" on:click={() => goto('/Contact')}>
            <span>Contact</span>
            <img src="{base}/Recursos/header/contact.svg" alt="Contact" />
          </div>
        {/if}

      </div>
    </div>
  </div>
 <!--  <p class="footer-copy">Copyright © 2025 Built By Me</p> -->
</header>




<!-- Estilos -->
<style>

  
.bright {
  color: white;
  filter: brightness(1); /* o lighten, según el efecto que quieras */
  transition: all 0.3s ease-out;
}

.bright img {
  filter: invert(0) brightness(1.1);
}

.bright span, .bright h2 {
  color: var(--blanco);
}
.bright .Header-subtitle span  {
  color: var(--Resalte-claro);
}

.header-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 76px;
  position: fixed;
  z-index: 10000;
  gap: 25%;
  transition: transform 0.3s ease-out;
  padding: 0px 48px;
  bottom: 0;
  left: 0;
  background: var(--blanco-header) !important;
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--Gris-muy-claro);
}
  .personal-photo {
    min-width: 64px;
    min-height: 64px;
    cursor: pointer;
  }

  .personal-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .personal-photo:hover img {
    scale: 1.1;
    transition: all 0.2s ease-out;
  }

  .profile-info {
  display: flex;
  align-items: center;
  gap: 32px;
  width: 1200px;
  }

  .menu-hamburger img {
  width: 48px !important;
  height: 48px !important;
  cursor: pointer;
}

.mobile-menu {
  position: fixed;
  bottom: 80px;
  right: 0px;
  z-index: 9999;
  width: 100%;
  height: 30vh;
  padding-bottom: 32px;
  border-radius: 0px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

  .Header-subtitle {
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-XS);
    font-weight: 500;
    color: var(--Gris-muy-oscuro);
  }
  .Header-subtitle span {
  font-family: "Publica Sans", sans-serif;
  font-size: var(--font-size-XS);
  color: var(--Resalte);
}


  .header-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100%;
  }

  .icon-buttons {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    height: 64px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s ease-out;
    position: relative;
  }
  .icon-button span {
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-XS) !important;
    font-weight: 600 !important;
  }
  .icon-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s ease-out;
    position: relative;
    top: 16px;
  }
  .icon-button:hover {
    top: 0px;
  }

  .icon-button img {
    width: 16px;
    height: 24px;
    opacity: 0;
    transform: translateX(-55%);
    clip-path: inset(10px 20px 30px 40px);
    transition: all 0.2s ease-out;
  }

  .icon-button:hover img {
    opacity: 1;
    transform: translateX(-10%) scale(1.05);
    clip-path: inset(0);
  }

  .icon-button span {
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.2s ease-out;
  }

  .icon-button:hover span {
    opacity: 0;
  }

  .navigation-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 80%;
    max-width: 320px;
    width: 100%;
    flex-direction: row;
  }

  .icon-button.work {
    color: var(--Gris-muy-oscuro);
    transition: all 0.5s ease-out;
  }

  .icon-button.work.active-work {
    color: var(--Resalte);
  }


  .contact {
    color: var(--Gris-muy-oscuro);
  }
  .About {
    color: var(--Gris-muy-oscuro);
  }

  .header-section.home-background {
    background: var(--blanco);
  }

/* ---------------------------------------------------------------------------------------------------------- */
  @media (max-width: 799px) {
  .navigation-buttons {
    gap: 16px;
    justify-content: flex-end;
    max-width: none;
    width: auto;
    flex-direction: row;
  }

  
  .header-section {
    height: 80px;
    gap: 5%;
    padding: 0px 16px;
  }
  .mobile-menu {
      position: fixed;
      bottom: 80px;
      right: 0px;
      z-index: 9999;
      width: 100%;
      height: 30vh;
      padding-bottom: 0px;
      border-radius: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .mobile-menu .icon-button {
    background: var(--blanco-header);
    border-radius: 8px;
    padding: 8px 12px;
    min-width: 120px;
  }

  .icon-button.menu-hamburger img {
    opacity: 1;
    transform: none;
    clip-path: none;
  }

  .icon-button.menu-hamburger {
    top: 0;
  }

  .icon-button span {
    opacity: 1 !important;
  }

  .icon-button:hover span {
    opacity: 1;
  }
}



</style>