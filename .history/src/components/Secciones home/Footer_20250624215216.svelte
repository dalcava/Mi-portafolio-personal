<!-- src/lib/Footer.svelte -->
<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import FooterIcons from './Footer-icons.svelte';

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

<section class="footer">
    <div class="footer-content">
        <h2 class="footer-title">Do you like what you see?</h2>
        <p class="footer-text">
        Let's connect! I'd be happy to share my experience and discuss how my skills and expertise can contribute to your team.
        </p>
        <FooterIcons/>
      </div>

    <div class="footer-gallery">
    <div class="gallery-track">
        {#each images as image}
        <div class="gallery-image" style={`background-image: url('${base}${image}')`}></div>
        {/each}
        {#each images as image}
        <div class="gallery-image" style={`background-image: url('${base}${image}')`}></div>
        {/each}
    </div>
    </div>


</section>

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


@media (max-width: 1600px) {
  .footer-title {
    font-size: var(--font-size-XXL);
  }
  .footer-text {
    font-size: var(--font-size-XS);
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
