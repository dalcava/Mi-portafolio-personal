<!-- Este es Works -->

<script>
  import { onMount } from "svelte";
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { gsap } from "gsap";
  import Accordion from '../../components/Secciones reutilizables/Accordion.svelte';
  import Scene from '../../components/Scene.svelte';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMount(() => {
  gsap.from('.about-content h1', {
    scrollTrigger: {
      trigger: '.about-content h1',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.about-content p', {
    scrollTrigger: {
      trigger: '.about-content p',
      start: 'top 120%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.cv-button', {
    scrollTrigger: {
      trigger: '.cv-button',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.4,
    ease: 'power3.out'
  });
});



</script>



<!-- Fondo principal -->

    <!-- Parte Izquierda: Escena 3D -->
    <!-- Parte izquierda: Scene -->
    <div class="about-visual">
      <Scene />
    </div>

    <!-- Parte derecha: Texto y experiencia -->
    <div class="about-content">
      <h1>My name is David Alfonso López</h1>
      <p>
        Designer and architect passionate about creativity, problem-solving, and user-centered design. 
        My professional journey has allowed me to grow as a consultant specializing in UX/UI design and motion graphics. 
        I bring expertise in user research, graphic design, and 3D modeling.
      </p>

      <h2>Working Experience</h2>
      <ul class="experience-list">
        <Accordion />
      </ul>

      <a href="#contact" class="get-to-know">Get to know me</a>

      <a class="cv-button" href="/CV_DavidAlfonsoLópez.pdf" download>
        Download my CV
      </a>

<!--       <div class="social-links"> -->
        <!-- Aquí puedes poner iconos SVG o imágenes de redes -->
<!--         <a href="#"><i class="icon-dribbble"></i></a>
        <a href="#"><i class="icon-behance"></i></a>
        <a href="#"><i class="icon-facebook"></i></a>
        <a href="#"><i class="icon-instagram"></i></a>
        <a href="#"><i class="icon-linkedin"></i></a>
      </div>

      <a href="#contact" class="contact-link">Contact me</a> -->
    </div>


<style>
 

  /* SCENE 3D */
.about-visual {
  flex: 1;
  position: sticky;
  top: 120px;
  height: 80vh;
  display: flex;
  align-items: flex-start;
}

/* TEXT */
.about-content {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 50%;
}

.about-content h1 {
  font-size: var(--font-size-XXXL);
  font-family: "Publica Sans";
  font-weight: 700;
  color: var(--Gris-muy-oscuro);
  margin-bottom: 32px;
}

.about-content p {
  font-size: var(--font-size-M);
  font-family: "Publica Sans thin";
  color: var(--Gris);
  line-height: 1.6;
  margin-bottom: 48px;
}

.about-content h2 {
  font-size: var(--font-size-XL);
  font-family: "Publica Sans";
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--Gris-muy-oscuro);
}

.experience-list {
  list-style: none;
  padding: 0;
  margin: 0 0 48px 0;
}

.get-to-know {
  color: var(--Verde-claro);
  font-size: var(--font-size-S);
  margin-bottom: 48px;
  text-decoration: none;
}

.cv-button {
  background-color: var(--Verde-claro);
  color: white;
  font-size: 1.6rem;
  font-weight: 800;
  padding: 24px 48px;
  border-radius: 24px;
  display: inline-block;
  margin-bottom: 40px;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.cv-button:hover {
  transform: scale(1.03);
}
</style>
