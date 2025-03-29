<script>
    import { onMount } from 'svelte';
    import Swiper from 'swiper/bundle';
    import 'swiper/css/bundle';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    let swiper;

    let isAnimating = false;
    let scrollThrottle = 0;

    /* Referencias a los elementos del DOM para la descripción */
    let titleElement;
    let categoryElement;
    let textElement;

    const descriptions = [
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
        },
        {
            title: "Chasms call",
            category: "UX Strategy",
            text: "This project is a tribute to The Legend of Zelda series, featuring a personalized custom skin for the Nintendo Switch Pro Controller. It showcases a fully 3D animated product presentation, created as a practice piece and an homage to the iconic game franchise. The animation highlights a unique Zelda-themed design, crafted to celebrate the artistic and legendary world of Hyrule."
        }
    ];

    function updateDescription() {
        const index = swiper.realIndex;
        const desc = descriptions[index];

        if (desc) {
            titleElement.textContent = desc.title;
            categoryElement.textContent = desc.category;
            textElement.textContent = desc.text;
        }
    }

    const navigateSwiper = (direction) => {
        if (isAnimating) return;

        if (direction > 0) {
            swiper.slideNext();
        } else if (direction < 0) {
            swiper.slidePrev();
        }

        isAnimating = true;
        gsap.delayedCall(0.8, () => {
            isAnimating = false;
        });
    };

    function animateBullet() {
        gsap.fromTo(
            '.swiper-pagination-bullet-active',
            { scale: 0.8, opacity: 0.5 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        document.querySelectorAll('.swiper-pagination-bullet').forEach(b => (b.innerHTML = ''));
        const active = document.querySelector('.swiper-pagination-bullet-active');
        if (active) {
            const shape = document.createElement('div');
            shape.classList.add('pagination-shape');
            active.prepend(shape);
            gsap.fromTo(shape, { width: '12px' }, { width: '72px', duration: 5.5, ease: 'linear' });
        }
    }

    function handleWheel(e) {
        const now = Date.now();
        if (now - scrollThrottle < 200) return;
        scrollThrottle = now;

        const direction = Math.sign(e.deltaY);
        navigateSwiper(direction);
    }

    onMount(() => {
        swiper = new Swiper('.swiper', {
            effect: "slide",
            slidesPerView: 'auto',
            centeredSlides: true,
            initialSlide: 0,
            loop: false,
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
                disableOnInteraction: false,
                reverseDirection: true
            },
            speed: 800,
            simulateTouch: true,
            allowTouchMove: true,
            preventClicks: true,
            observer: true,
            observeParents: true,
        });

        updateDescription();
        animateBullet();
        swiper.autoplay.start();

        window.addEventListener("wheel", handleWheel, { passive: true });

        swiper.on('slideChange', () => {
            updateDescription();
            animateBullet();
            swiper.autoplay.start();
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

        document.querySelectorAll(".swiper-slide").forEach((slide) => {
            const staticImg = slide.querySelector(".static-img");
            const activeGif = slide.querySelector(".active-gif");

            if (!activeGif || !staticImg) return;

            let lastX = 100;
            let lastY = 100;
            let isInside = false;

            function removeEffect() {
                activeGif.style.maskImage = "none";
                activeGif.style.webkitMaskImage = "none";
                activeGif.style.opacity = "0";
                staticImg.style.opacity = "1";
                staticImg.style.filter = "brightness(1)";
            }

            window.addEventListener("mousemove", (e) => {
                if (!slide.classList.contains("swiper-slide-active")) {
                    removeEffect();
                    return;
                }

                const rect = slide.getBoundingClientRect();
                const isInsideBounds =
                    e.clientX >= rect.left &&
                    e.clientX <= rect.right &&
                    e.clientY >= rect.top &&
                    e.clientY <= rect.bottom;

                if (isInsideBounds) {
                    isInside = true;
                    let offsetX = e.clientX - rect.left - 15;
                    let offsetXPercentage = (offsetX / rect.width) * 100;
                    lastX = Math.min(100, Math.max(0, offsetXPercentage));
                    lastY = ((e.clientY - rect.top) / rect.height) * 100;

                    activeGif.style.maskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black 24%, transparent 48%)`;
                    activeGif.style.webkitMaskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black 47%, transparent 48%)`;
                    activeGif.style.opacity = "1";
                    staticImg.style.opacity = "1";
                    staticImg.style.filter = "brightness(0.85) saturate(0.5)";
                }
            });

            slide.addEventListener("mouseleave", () => {
                if (slide.classList.contains("swiper-slide-prev")) {
                    removeEffect();
                    return;
                }

                isInside = false;
                let scale = 36.5;
                let interval = setInterval(() => {
                    if (isInside || scale <= 0) {
                        clearInterval(interval);
                        removeEffect();
                    } else {
                        scale -= 24;
                        activeGif.style.maskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black ${scale}%, transparent ${scale + 1}%)`;
                        activeGif.style.webkitMaskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black ${scale}%, transparent ${scale + 1}%)`;
                    }
                }, 30);
            });
        });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    });
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
            <div class="swiper-slide">
                <div class="image-container static-img">
                    <img src="/Recursos/Slider/Chasms call.webp" alt="Static Image 5" class="imagen-contenida">
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
                <img src="/Recursos/Slider/Chasms call.webp" alt="Active GIF 5" class="active-gif">
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
width: 95.5%;
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
    width: 320px;
    transition: all 0.5s ease-out;
    border-radius: 16px;
}
:global(.swiper-slide-active) {
    width: 1048px !important;
}
:global(.swiper-slide .grid) {
    opacity: 0 !important;
}
:global(.swiper-slide-active .grid) {
    opacity: .25 !important;
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

.swiper-slide-prev.swiper-slide-next {
    transform: translate3d(190px, -70px, -855px) rotateX(0deg) rotateY(0deg) scale(.5);
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
    background: transparent;
    z-index: 10;
    pointer-events: none;
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
  border: 1px solid var(--Verde-claro);
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
    transform: scale(1);
    opacity: 1;
    border-radius: 8px;
    transition: all 0.4s ease-out;
    width: 64px;
}

:global(.pagination-shape) {
    position: absolute;
    left: -18px;
    top: 50%;
    transform: translateY(-50%) translateX(10px);
    height: 14px;
    background-color: var(--Verde-claro); 
    border-radius: 8px;
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
    padding: 0 4.5%;
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
  