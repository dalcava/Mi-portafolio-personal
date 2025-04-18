<!-- Este es Works -->

<script>
  import { onMount } from "svelte";
  import { base } from '$app/paths';
  import { goto } from '$app/navigation';
  import { gsap } from "gsap";
  import Accordion from '../../components/Secciones reutilizables/Accordion.svelte';
  import Scene from '../../components/Scene.svelte';



onMount(() => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

  tl.from(".about-content h2", {
    opacity: 0,
    y: 40
  })
  .from(".about-content h4", {
    opacity: 0,
    y: 30
  }, "-=0.6") 
  .from(".about-content p", {
    opacity: 0,
    y: 30
  }, "-=0.6");
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
      <h2>About me</h2>
      <h4>My name is David Alfonso López</h4>
      <p>
        Designer and architect passionate about creativity, problem-solving, and user-centered design. 
        My professional journey has allowed me to grow as a consultant specializing in UX/UI design and motion graphics. 
        I bring expertise in user research, graphic design, and 3D modeling.
      </p>

      <ul class="experience-list">
        <Accordion />
      </ul>

<!--       <a href="#contact" class="get-to-know">Get to know me</a> -->

      <div class="button-wrapper">
        <a class="cv-button" href={`${base}/DAVID ALFONSO LÓPEZ CASTAÑEDA - CV.pdf`} download>
          <!-- SVG del ícono de descarga va aquí -->
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20">...</svg>
          Download my CV
        </a>

        <a class="in-button" href="https://www.linkedin.com/in/david-a-l%C3%B3pez/" target="_blank" rel="noopener">
          <!-- SVG de LinkedIn va aquí -->
          <svg class="icon" viewBox="0 0 24 24" width="20" height="20">...</svg>
          Stalk my LinkedIn
        </a>
      </div>

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
      max-width: 100%;
      justify-content: flex-start;
      flex-direction: column;
  }

/* TEXT */
.about-content {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 45%;
  max-width: 758px;
}

.about-content h2 {
  font-size: var(--font-size-XL);
  font-family: "Publica Sans";
  font-weight: 700;
  color: var(--Gris-muy-oscuro);
  margin-bottom: 0px;
}
.about-content h4 {
  font-family: 'Publica Sans', sans-serif;
  font-weight: 100;
  font-size: var(--font-size-XS);
  color: var(--Gris-oscuro);
  text-decoration: none;
  margin-bottom: 32px;
  line-height: 0px;
}

.about-content p {
  font-size: var(--font-size-M);
  font-family: "Publica Sans";
  color: var(--Gris-muy-oscuro);
  line-height: 1.6;
  margin-bottom: 48px;
}

.about-content h3 {
  font-size: var(--font-size-M);
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

.button-wrapper {
    display: flex;
    gap: 32px;
    margin-bottom: 40px;
    /* flex-wrap: wrap; */
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
}

.cv-button,
.in-button {
  display: inline-flex;
  align-items: center;
  font-family: "Publica Sans", sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 16px 16px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  gap: 12px;
  width:100%;
}

.cv-button {
  background-color: var(--Verde-oscuro);
  color: white;
  border: none;
}

.cv-button:hover {
  background-color: var(--Verde);
  transform: scale(1.03);
}

.in-button {
  background-color: transparent;
  color: var(--Verde-oscuro);
  border: 2px solid var(--Verde-oscuro);
}

.in-button:hover {
  background-color: var(--Verde-claro-transparente); /* si tienes esta variable */
  transform: scale(1.03);
}

.icon {
  display: inline-block;
  vertical-align: middle;
}



</style>
