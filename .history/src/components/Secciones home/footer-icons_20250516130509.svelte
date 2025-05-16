<!-- src/lib/Footer.svelte -->
<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

    const images = [
        '/Recursos/Slider/UX/AvalPay-Static.jpg',
        '/Recursos/Slider/UX/Onyo-Static.png',
        '/Recursos/Slider/UX/Colmena-Static.jpg',
        '/Recursos/Slider/UX/CR.webp',
        '/Recursos/Slider/UX/Promigas-Active.png',
        '/Recursos/Slider/3D/Kinetic rush-static.webp',
        '/Recursos/Slider/3D/Control-static.webp',
        '/Recursos/Slider/3D/Duraznos intro.gif',
        '/Recursos/Slider/3D/Chasms call.webp'
    ];

</script>

        <div class="footer-icons">
            <a href="https://www.artstation.com/dalcava" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-layer-group"><img src="{base}/Recursos/Footer/Artstation.svg" alt="Artstation" /></i>
            </a>
            <a href="https://www.behance.net/davidlpez39" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-behance"><img src="{base}/Recursos/Footer/Behance.svg" alt="Behance" /></i>
            </a>
            <a href="https://www.linkedin.com/in/david-a-l%C3%B3pez/" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-linkedin"><img src="{base}/Recursos/Footer/linkedin.svg" alt="LinkedIn" /></i>
            </a>
            <a href="https://www.instagram.com/dalcava/" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-instagram"><img src="{base}/Recursos/Footer/instagram.svg" alt="Instagram" /></i>
            </a>
        </div>

  <style>

.footer {
  background: linear-gradient(180deg, rgba(12, 0, 29, 1) 60%, rgba(59, 0, 153, 1) 130%);
  color: var(--Resalte-claro);
  text-align: center;
  padding: 4rem 0rem;
  font-family: 'Publica Sans', sans-serif;
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  height: 100%;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
}

.footer-title {
  font-size: var(--font-size-XXXL);
  background: linear-gradient(45deg, #5D00FF 15%, #8280FF 79%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  font-family: "Publica Sans thin";
  font-weight: 700;
  line-height: 1;
}

.footer-text {
  font-family: "Publica Sans";
  color: var(--blanco);
  max-width: 600px;
  font-size: var(--font-size-S);
}

.footer-button {
  display: flex;
  padding: 32px 80px;
  background-color: white;
  color: var(--Resalte);
  border-radius: 16px;
  font-family: "Publica Sans", sans-serif;
  font-size: var(--font-size-S) !important;
  font-weight: 600 !important;
  text-decoration: none;
  gap: 16px;
  transition: all 0.3s;
  width: 300px;
}

.footer-button:hover {
  background-color: var(--Resalte-claro);
  color: white;
}

.footer-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.footer-icons a {
  color: var(--blanco);
  font-size: 1.25rem;
  transition: color 0.3s;
}

.footer-icons a:hover {
  color: var(--Resalte);
}

.footer-gallery {
    position: absolute;
    width: 100%;
    overflow: hidden;
    mix-blend-mode: plus-lighter;
    opacity: 0.5;
    height: 310px;
    margin-top: 3rem;
    bottom: 0;
}

.gallery-track {
  display: flex;
  width: calc(200% + 4px); /* Duplica el ancho */
  animation: scroll-gallery 30s linear infinite;
}

.gallery-image {
    flex: 0 0 auto;
    width: calc(100vw / 6);
    height: 310px;
    background-size: cover;
    background-position: center;
    filter: brightness(0.75);
}

/* Animación */
@keyframes scroll-gallery {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-50%);
  }
}




@media (max-width: 850px) {
  .gallery-image {
    width: calc(100vw / 3); /* Menos imágenes visibles */
  }
}
@media (max-width: 450px) {
  .gallery-image {
    width: calc(100vw / 2); /* Menos imágenes visibles */
  }
}

  </style>
