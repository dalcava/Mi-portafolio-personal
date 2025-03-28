<script>
    import { onMount } from 'svelte';
    import Swiper from 'swiper/bundle';
    import 'swiper/css/bundle';
    import gsap from 'gsap';
  
    let swiper;

/* Referencias a los elementos del DOM para la descripción */
    let titleElement;
    let categoryElement;
    let textElement;
  
    function updateDescription() {
        const index = swiper.realIndex;
        const desc = descriptions[index];

        if (desc) {
            titleElement.textContent = desc.title;
            categoryElement.textContent = desc.category;
            textElement.textContent = desc.text;
        }
    }

  
    onMount(() => {
      swiper = new Swiper('.swiper', {
        effect: 'slide',
        grabCursor: true,
        centeredSlides: true,
        initialSlide: 0,
        speed: 800,
        preventClicks: true,
        loop: true,
        slidesPerView: '1',
        spaceBetween: 16,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 4800,
          disableOnInteraction: false
        },
        simulateTouch: true,
        allowTouchMove: true,
        breakpoints: {
          551: { slidesPerView: '1' },
          701: { slidesPerView: '1' },
          1001: { slidesPerView: '1' },
          1201: { slidesPerView: '1.2' },
          1441: { slidesPerView: '1.325' },
          1921: { slidesPerView: '1.5' }
        }
      });
      updateDescription();
  
    swiper.on('slideChange', () => {
        // Animación bullet
        gsap.fromTo(
            '.swiper-pagination-bullet-active',
            { scale: 0.8, opacity: 0.5 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        // Bullet shape
        document.querySelectorAll('.swiper-pagination-bullet').forEach(b => (b.innerHTML = ''));
        const active = document.querySelector('.swiper-pagination-bullet-active');
        if (active) {
            const shape = document.createElement('div');
            shape.classList.add('pagination-shape');
            active.prepend(shape);
            gsap.fromTo(shape, { width: '12px' }, { width: '72px', duration: 5.5, ease: 'linear' });
        }

        swiper.autoplay.start(); // Esto ya está

        // Descripción del slide
        const index = swiper.realIndex; // Ignora duplicados por loop
        const desc = descriptions[index];

        if (desc) {
            titleElement.textContent = desc.title;
            categoryElement.textContent = desc.category;
            textElement.textContent = desc.text;
        }
    });

  
      swiper.on('slideChangeTransitionStart', () => updateSlidePositions(true));
      swiper.on('slideChangeTransitionEnd', () => updateSlidePositions(true));
      swiper.on('sliderMove', () => requestAnimationFrame(() => updateSlidePositions(false)));
  
      let correctionTimeout;
      swiper.on('touchEnd', () => {
        clearTimeout(correctionTimeout);
        correctionTimeout = setTimeout(() => updateSlidePositions(true), 100);
      });
  
      const observer = new MutationObserver(() => updateSlidePositions(true));
      document.querySelectorAll('.swiper-slide').forEach(slide => {
        observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
      });
    });

    
    let descriptions = [
        {
            title: "Kinetic Rush",
            category: "3D Motion",
            text: "Exploración dinámica del movimiento cinético en entornos digitales con efectos de profundidad envolventes."
        },
        {
            title: "Control",
            category: "UI Design",
            text: "This project is a tribute to The Legend of Zelda series, featuring a personalized custom skin for the Nintendo Switch Pro Controller. It showcases a fully 3D animated product presentation, created as a practice piece and an homage to the iconic game franchise. The animation highlights a unique Zelda-themed design, crafted to celebrate the artistic and legendary world of Hyrule."
        },
        {
            title: "Aval Pay Center",
            category: "Branding + App",
            text: "Solución integral para pagos digitales con identidad visual sólida y accesibilidad multiplataforma."
        },
        {
            title: "Duraznos",
            category: "Experimental Visual",
            text: "Una pieza visual poética que mezcla elementos naturales y técnicas de animación abstracta."
        },
        {
            title: "CR Project",
            category: "UX Strategy",
            text: "Estrategia centrada en la experiencia del usuario con diseño minimalista y arquitectura de información clara."
        }
    ];
    
</script>
  
  <!-- HTML de tu slider adaptado -->
  <div class="boolean-container">
  
    <!-- Controles -->
    <div class="control-container">
<!--       <div class="swiper-button-container">
        <div class="swiper-button-prev">
          <img src="/Recursos/slider/arrow-left.svg" alt="Previous" class="new-icon" />
        </div>
        <div class="swiper-button-next">
          <img src="/Recursos/slider/arrow-right.svg" alt="Next" class="new-icon" />
        </div>
      </div> -->
      <div class="pagination-container">
        <div class="swiper-pagination"></div>
      </div>
    </div>
  
    <!-- Swiper -->
    <div class="swiper">
        <!-- Swiper content -->
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <div class="image-container static-img">
                    <img src="/Recursos/Slider/Kinetic rush-static.webp" alt="Static Image 1" class="imagen-contenida">
                    <div class="grid">
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                    </div>
                </div>
                <img src="/Recursos/Slider/Kinetic rush-active.gif" alt="Active GIF 1" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="./Control.html">
                <div class="image-container static-img">
                    <img src="/Recursos/Slider/Control-static.webp" alt="Static Image 2" class="imagen-contenida">
                    <div class="grid">
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                    </div>
                </div>
                <img src="/Recursos/Slider/Control-active.gif" alt="Active GIF 2" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="./Aval_pay_center.html">
                <div class="image-container static-img">
                    <img src="/Recursos/Slider/AvalPay-Static.webp" alt="Static Image 3" class="imagen-contenida">
                    <div class="grid">
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                    </div>
                </div>
                <img src="/Recursos/Slider/AvalPay-Active.gif" alt="Active GIF 3" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="image-container static-img">
                    <img src="/Recursos/Slider/Duraznos intro.gif" alt="Static Image 3" class="imagen-contenida">
                    <div class="grid">
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                    </div>
                </div>
                <img src="/Recursos/Slider/Duraznos active.gif" alt="Active GIF 3" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide">
                <div class="image-container static-img">
                    <img src="/Recursos/Slider/CR.webp" alt="Static Image 4" class="imagen-contenida">
                    <div class="grid">
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                    </div>
                </div>
                <img src="/Recursos/Slider/AvalPay-Active.gif" alt="Active GIF 4" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="project-description">
        <div class="project-description-head">
            <div class="project-title">
              <h2 bind:this={titleElement}>  </h2>
            </div>
            <div class="project-category">
              <a href="#" bind:this={categoryElement}>  </a>
            </div>
        </div>
        <div class="project-text">
          <p bind:this={textElement}>  </p>
        </div>
    </div>
  </div>
  
  <style>

.swiper {
position: relative;
width: 100%;
height: 480px;
border-radius: 16px;
overflow: hidden;
transition: all 0.1s ease-out;
}

.swiper-3d {
    perspective: 2600px;
}

.swiper-slide {
    position: relative;
    width: 1506px;
    aspect-ratio: 3/4;
    transition: height 0.25s ease-in;
    border-radius: 16px;
}
.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1px;
    user-select: none;
    transition: mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth transition */
    will-change: mask-image, -webkit-mask-image, filter, transform; /* Optimize for frequent changes */
    border-radius: 8px;
}

.swiper-slide-prev {
    z-index: 0;
    height: 100%;
    transform: translate3d(-190px, -70px, -855px) rotateX(0deg) rotateY(0deg) scale(1);
    z-index: 0;
    transition: all 0.2s ease-out;
    pointer-events: none;
}

.swiper-slide .imagen-contenida {
    position: relative;
    z-index: 1;
    display: block;
}


.image-container {
    position: relative;
    width: 100%; /* Asegura que ocupe todo el espacio asignado */
    height: 100%;
    overflow: hidden; /* Evita que el zoom de la imagen salga del contenedor */
    border-radius: 8px; /* Bordes redondeados */
/*     transform: translateX(312px); */
}

.image-container::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, .75) 100%); /* Gradiente */
    mix-blend-mode: multiply; /* Combina el gradiente con la imagen base */
    pointer-events: none; /* Evita interferir con interacciones */
    z-index: 1; /* Asegura que esté sobre la imagen */
}

.grid {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    pointer-events: none;
    z-index: 2;
    transform: translateY(-100%);
    position: relative;
    padding: 0% 11.2%;
    opacity: .25;    
}
.grid-collumn {
    width: 100%;
    height: 100%;
    border-left: 1px solid var(--blanco);
    z-index: 1;
    opacity: .75;
}

.swiper-slide-prev .grid-collumn {
    opacity: 0;
    transition: all 0.2s ease;
}

.swiper-slide-prev .blur {
    border-top: 1px solid rgba(246, 246, 246, 0.1);
}

/* Estilo de las imágenes dentro del contenedor */
.image-container .imagen-contenida {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    transform: scale(1.1);
}
/* Estilo de las imágenes activas dentro del contenedor */
.swiper-horizontal>.swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal {
    position: absolute;
    left: var(--swiper-scrollbar-sides-offset, 1%);
    bottom: var(--swiper-scrollbar-bottom, 4px);
    top: var(--swiper-scrollbar-top, auto);
    z-index: 50;
    height: var(--swiper-scrollbar-size, 4px);
    width: calc(100% - 2* var(--swiper-scrollbar-sides-offset, 1%));
    display: none;
}

.boolean-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow: hidden;
    padding-top: 136px;
    gap: 16px;
    display: flex;
    flex-direction: column;
}
.custom-box-left,
.custom-box-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 517px;
    height: 72px;
    background: transparent; /* No es necesario pintar */
    z-index: 10;
    pointer-events: none; /* No bloqueará la interacción con el slider */
}


.control-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 100%;
    z-index: 10;
    justify-content: space-between;
    flex-direction: column;
}

.pagination-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    gap: 20px;
    z-index: 10;
    width: 75%;
    height: 100%;
    flex-wrap: nowrap;
    flex-direction: row;
}

:global(.swiper-pagination) {
    display: flex;
    justify-content: center;
}
:global(.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction) {
    bottom: var(--swiper-pagination-bottom, 8px);
    top: var(--swiper-pagination-top, auto);
    left: 0;
    width: 100%;
    justify-content: center;
    height: 100%;
    gap: 8px;
}

:global(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  border: 1px solid var(--Verde-claro); /* Borde visible */
  background-color: var(--Transparente);
  border-radius: 50%;
  opacity: 1;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

/* Bullet activo */
:global(.swiper-pagination-bullet-active) {
    background-color: var(--Transparente);
    transform: scale(1); /* Aumenta ligeramente el tamaño */
    opacity: 1;
    border-radius: 8px;
    transition: all 0.4s ease-out;
    width: 64px;
}

:global(.pagination-shape) {
    position: absolute;
    left: -18px; /* Moves shape in front of bullet */
    top: 50%;
    transform: translateY(-50%) translateX(10px);
    height: 14px;
    background-color: var(--Verde-claro); /* Adjust color */
    border-radius: 8px; /* Change to square for different shapes */
    transition: all 0.3s ease-in-out;
}
:global(.swiper-button-container) {
    display: flex;
    align-items: center;
    justify-content: start;
    position: relative;
    z-index: 10;
    width: 0%;
    padding-right: 0.5%;
    gap: 56px;
    left: 80px;
    transform: translateY(10px);
    opacity: 0;
}

.swiper-button-prev, .swiper-button-next {
    background: none;
    border: none;
    color: rgb(255, 255, 255, 0);
    width: 40px;
    height: 24px;
    display: block;
    transition: transform 0.3s ease, background-color 0.3s ease;
    pointer-events: auto;
    position: relative;
    transform: scale(.75);
}
.swiper-button-prev img:hover,
.swiper-button-next img:hover,
.swiper-pause img:hover {
    filter: brightness(0) invert(1); /* Inverts the color */
    cursor: pointer;
}

.new-icon {
    width: 24px;
    height: auto;
    object-fit: contain;
    transition: transform 0.15s ease-in;
    /* transform: scale(0.75); */
    filter: brightness(8.5);
}
.swiper-button-prev:hover .new-icon,
.swiper-button-next:hover .new-icon {
    transform: scaleX(1.25) scaleY(1); /* Slightly enlarge on hover */
}
.swiper-wrapper {
    transition-timing-function: ease-out !important; /* Smooth easing effect */
}

.static-img {
    position: absolute; /* Ensure it remains in the background */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1; /* Always visible unless covered by GIF */
    z-index: 1; /* Behind the GIF */
}
.swiper-slide:hover .static-img {
    filter: brightness(0.75);
    transition: all 0.5s ease-in-out;
}

.active-gif {
    position: absolute; /* Overlay on top of the static image */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Hidden by default */
    z-index: 2; /* Above the static image */
    transition: opacity 0.5s ease-out, mask-image 0.5s ease-out; /* Smooth transition */
    border-radius: 8px; /* Rounded corners */
}

.blur-container {
    width: 200.5%;
    height: 120px;
    border-top: 1px solid #f6f6f625;
    background: linear-gradient(180deg, rgba(144, 144, 144, 0.00) 0%, rgba(246, 246, 246, 0.01) 37.15%);
    transform: translateY(16px);    
    backdrop-filter: blur(2px);
    z-index: 2;
    position: relative;
    border-bottom: 1px solid #f6f6f625;
}
.blur {
    width: 200.5%;
    height: 120px;
    background: linear-gradient(180deg, rgba(144, 144, 144, 0.00) 0%, rgba(246, 246, 246, 0.01) 37.15%);
    z-index: 2;
    position: relative;
}

/*Proyects description*/
.project-description {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    padding: 0 37.5%;
}

.project-title h2 {
  font-family: 'Publica Sans', sans-serif;
  font-weight: bold;
  font-size: 24px;
  color: var(--Gris-muy-oscuro);
  line-height: 1.2;
}
.project-category a {
  font-family: 'Publica Sans', sans-serif;
  font-weight: 100;
  font-size: 12px;
  color: var(--Verde-claro);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 8px;
}
.project-text p {
  font-family: 'Publica Sans', sans-serif;
  font-weight: 100;
  font-size: 14px;
  color: var(--Gris-oscuro);
  line-height: 120%;
  max-width: 540px;
}


  </style>
  