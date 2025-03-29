<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import Tabs from '../components/Tabs.svelte';

  let palabraFrente;

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

<header id="header" class="header-section start">
  <div class="profile-info">
    <div class="personal-photo">
      <img src="/Recursos/header/personal-photo.svg" alt="Personal photo" />
    </div>
    <h2 class="main-subtitle">I'm <sp><span bind:this={palabraFrente}></span></h2>
  </div>

  <div class="header-content">
    <div class="icon-buttons">
      <div class="navigation-buttons">
        <div class="icon-button menu work" data-url="/">
          <span>Works</span>
          <img src="/Recursos/header/Proyects.svg" alt="Projects" />
        </div>
        <div class="icon-button menu contact">
          <span>Contact</span>
          <img src="/Recursos/header/contact.svg" alt="Contact" />
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
  height: 100px;
  position: fixed;
  z-index: 3;
  gap: 25%;
  transition: transform 0.3s ease-out;
  padding: 0px 80px;
  bottom: 0;
  left: 0;
  background: #f6f6f625;
  backdrop-filter: blur(8px);
  border-top: 1px solid #f6f6f625;
  border-bottom: 1px solid #f6f6f625;
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

  .main-subtitle {
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-XS);
    font-weight: 300;
    color: var(--Gris-oscuro);
  }
  .main-subtitle span{
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-XS);
    font-weight: 300;
    color: var(--Verde-claro);
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
    font-weight: 300 !important;
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

  .work {
    color: var(--Verde-claro);
  }

  .contact {
    color: var(--Gris);
  }

  

</style>