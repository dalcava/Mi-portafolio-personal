<!-- Este es About -->

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
          <img src="{base}/Recursos/About/Download.svg" alt="Projects" />
          Download my CV
        </a>

        <a class="in-button" href="https://www.linkedin.com/in/david-a-l%C3%B3pez/" target="_blank" rel="noopener">
          <!-- SVG de LinkedIn va aquí -->
          <img src="{base}/Recursos/About/LinkedIn.svg" alt="Projects" />
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
  color: var(--Resalte);
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
  color: var(--Resalte-claro);
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
    justify-content: center;
    width: 100%;
}

.cv-button,
.in-button {
  display: inline-flex;
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-M);
    font-weight: 600;
    padding: 16px 16px;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    gap: 12px;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
}

.cv-button {
  background-color: var(--Resalte);
  color: white;
  border: none;
}

.cv-button:hover {
  background-color: var(--Resalte--muy-oscuro);
  transform: scale(1.03);
  box-shadow: 2.64px 7.29px 0px 0px #BBBAE0;
}

.in-button {
  background-color: transparent;
  color: var(--Resalte);
  border: 2px solid var(--Resalte);
}

.in-button:hover {
  transform: scale(1.03);
  box-shadow: 2.64px 7.29px 0px 0px #BBBAE0;
}

.icon {
  display: inline-block;
  vertical-align: middle;
}

@media (max-width: 1600px) {
  .about-visual {
    height: 70vh;
  }

  .about-content h2 {
    font-size: var(--font-size-XL);
    margin-bottom: 8px;
  }

  .about-content h4 {
    font-size: var(--font-size-S);
  }

  .about-content p {
    font-size: var(--font-size-S);
  }

}

@media (max-width: 1200px) {
  .about-visual {
    display: none; /* Ocultamos la escena 3D */
  }

  .about-content {
    max-width: 100%;
    margin-bottom: 0px;
  }

  .about-content h2 {
    font-size: var(--font-size-L);
  }

  .about-content h4 {
    font-size: var(--font-size-XXS);
  }

  .about-content p {
    font-size: var(--font-size-S);
  }

  .about-content h3 {
    font-size: var(--font-size-S);
  }

  .button-wrapper {
    gap: 24px;
    flex-wrap: wrap;
  }

  .cv-button,
  .in-button {
    font-size: var(--font-size-S);
    padding: 12px 16px;
  }
}

@media (max-width: 860px) {
  .about-content {
    padding: 0 24px;
  }

  .button-wrapper {
    flex-direction: column;
    align-items: stretch;
  }

  .cv-button,
  .in-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about-content h2 {
    font-size: var(--font-size-XXL);
  }

  .about-content h4 {
    font-size: var(--font-size-XS);
  }

  .about-content p {
    font-size: var(--font-size-XS);
  }

  .cv-button,
  .in-button {
    font-size: var(--font-size-XS);
    padding: 10px 14px;
  }
}



</style>
