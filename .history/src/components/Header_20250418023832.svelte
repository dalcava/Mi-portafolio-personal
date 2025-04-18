<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import Tabs from '../components/Tabs.svelte';
  import { base } from '$app/paths';

  let palabraFrente;

  $: isHome = $page.url.pathname === "/Works";


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
    return () => clearInterval(interval);
  });
  
</script>


<header id="header" class="header-section start" class:home-background={isHome}>
  <div class="profile-info">
    <div class="personal-photo" on:click={() => goto('/')}>
      <img src="{base}/Recursos/header/personal-photo.svg" alt="Personal photo" />
    </div>
    <h2 class="Header-subtitle">I'm <sp><span bind:this={palabraFrente}></span></h2>
  </div>

  <div class="header-content">
    <div class="icon-buttons">
      <div class="navigation-buttons">
        <div
          class="icon-button menu work"
          class:active-work={isHome}
          on:click={() => goto('/Works')}
        >

          <span>Works</span>
          <img src="{base}/Recursos/header/Proyects.svg" alt="Projects" />
        </div>
        <div class="icon-button menu contact">
          <span>Contact</span>
          <img src="{base}/Recursos/header/contact.svg" alt="Contact" />
        </div>
        <div class="icon-button menu About">
          <span>About</span>
          <img src="{base}/Recursos/header/About.svg" alt="Contact" />
        </div>
      </div>
    </div>
  </div>
</header>


<!-- Estilos -->
<style>

  
.header-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 88px;
  position: fixed;
  z-index: 10000;
  gap: 25%;
  transition: transform 0.3s ease-out;
  padding: 0px 80px;
  bottom: 0;
  left: 0;
  background: var(--blanco-header);
  backdrop-filter: blur(8px);
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
  width: 600px;
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

  background: var(--Verde-oscuro);
  background-size: 200%;
  background-position: 0% 50%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: shine 6s ease-in-out infinite;
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

  .Lightbulb {
    min-width: 100px;
    height: 64px;
    cursor: pointer;
  }

  .Lightbulb img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* o 'cover' si quieres llenado completo */
    display: block;
  }


  .Lightbulb:hover img {
    transform: scale(1.1);
    transition: all 0.2s ease-out;
  }

  .icon-button.work {
    color: var(--Gris-muy-oscuro);
    transition: all 0.5s ease-out;
  }

  .icon-button.work.active-work {
    color: var(--Verde);
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


</style>