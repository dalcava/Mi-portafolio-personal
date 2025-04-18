<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import Swiper from 'swiper/bundle';
    import 'swiper/css/bundle';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { goto } from '$app/navigation';

    // Exported prop to optionally synchronize scroll
    export let scrollContainer;

    let swiper_2;
    let isAnimating = false;
    let lastSyncedIndex = -1;

    /* Referencias a los elementos del DOM para la descripción */
    let titleElement;
    let categoryElement;
    let textElement;

    let lastX = 0;
    let lastY = 0;
    let isInside = false;
    let isInitialLoad = true;
    let allowScrollNavigation = false;
    let isProgrammaticScroll = false;

    const AUTOPLAY_DELAY = 4800;

    /* Datos de descripción para los proyectos */
    const descriptions_2 = [
        {
            title: "UX + UI Design",
            category: "First Promoter Header",
            text: "Developed and implemented the header for the first promoter, ensuring responsiveness and accessibility."
        },
        {
            title: "Frontend Development",
            category: "Promoter Banner",
            text: "Built the promoter banner using efficient HTML, CSS, and vanilla JavaScript, optimizing load times."
        },
        {
            title: "UX Research",
            category: "Promoter Card",
            text: "Conducted UX research to determine optimal card layout, improving user interaction by 30%."
        }
    ];

    // Genera rangos para sincronizar scroll con slides
    function generateScrollRanges(start = 2000, step = 400, count = descriptions_2.length) {
        return Array.from({ length: count }, (_, i) => {
            const min = start + i * step;
            const max = min + step;
            return [min, max];
        });
    }

    function handleScrollPositionSync() {
        if (isProgrammaticScroll) return;

        let scrollY = scrollContainer?.scrollTop ?? window.scrollY;
        const ranges = generateScrollRanges();
        const index = ranges.findIndex(([min, max]) => scrollY >= min && scrollY < max);

        if (index !== -1 && swiper_2 && swiper_2.realIndex !== index) {
            if (!isAnimating) {
                isAnimating = true;
                swiper_2.slideTo(index);
                lastSyncedIndex = index;

                gsap.delayedCall(0.8, () => {
                    isAnimating = false;
                });
            }
        }
    }

    // Animación de letras aleatorias al cambiar texto
    function scrambleText(element, finalText, duration = 1) {
        if (!element || !finalText) return;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const frameRate = 32;
        const totalFrames = Math.round(duration * frameRate);
        let frame = 0;

        const interval = setInterval(() => {
            frame++;
            let output = '';
            for (let i = 0; i < finalText.length; i++) {
                if (Math.random() < (frame / totalFrames)) {
                    output += finalText[i];
                } else {
                    output += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.textContent = output;

            if (frame === totalFrames) {
                clearInterval(interval);
                element.textContent = finalText;
            }
        }, 1000 / frameRate);
    }

    // Actualiza la descripción según el slide activo
    function updateDescription() {
        const index = swiper_2.realIndex;
        const desc = descriptions_2[index];

        if (desc) {
            scrambleText(titleElement, desc.title, 0.2);
            scrambleText(categoryElement, desc.category, 0.05);
            scrambleText(textElement, desc.text, 0.2);
        }
    }

    // Anima la forma dentro de la bullet activa
    function animateBullet() {
        gsap.fromTo(
            '.swiper-pagination_2 .swiper-pagination-bullet-active',
            { scale: 0.8, opacity: 0.5 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );

        document.querySelectorAll('.swiper-pagination_2 .swiper-pagination-bullet').forEach(b => (b.innerHTML = ''));

        const active = document.querySelector('.swiper-pagination_2 .swiper-pagination-bullet-active');
        if (active) {
            const shape = document.createElement('div');
            shape.classList.add('pagination-shape');
            active.prepend(shape);

            gsap.fromTo(
                shape,
                { width: '12px' },
                {
                    width: '72px',
                    duration: (AUTOPLAY_DELAY + 600) / 1000,
                    ease: 'linear'
                }
            );
        }
    }

    // Navegación con la rueda del mouse
    const navigateSwiper = (direction) => {
        if (isAnimating) return;

        if (direction > 0) {
            swiper_2.slideNext();
        } else if (direction < 0) {
            swiper_2.slidePrev();
        }

        isAnimating = true;
        gsap.delayedCall(0.8, () => {
            isAnimating = false;
        });
    };

    // Animación inicial de slides al cargar
    function runIntroAnimation() {
        const sliderIntro = gsap.timeline({ delay: isInitialLoad ? 3 : 0 });

        sliderIntro
            .fromTo(
                ".swiper-slide",
                { clipPath: "inset(0 100% 0 0)", y: 250 },
                { clipPath: "inset(0 0% 0 0)", y: 0, duration: 1.5, ease: "elastic.out(1, 0.9)" }
            )
            .fromTo(
                ".project-text",
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.out" },
                "-=0.25"
            )
            .fromTo(
                ".project-description",
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.out" },
                "-=1.25"
            );

        isInitialLoad = false;
    }

    onMount(() => {
        swiper_2 = new Swiper('.swiper_2', {
            effect: "slide",
            slidesPerView: '5.7',
            centeredSlides: true,
            initialSlide: 1,
            loop: false,
            spaceBetween: 4,
            pagination: {
                el: '.swiper-pagination_2',
                clickable: false
            },
            navigation: {
                nextEl: '.swiper-button-next_2',
                prevEl: '.swiper-button-prev_2'
            },
            autoplay: {
                delay: AUTOPLAY_DELAY,
                disableOnInteraction: false,
                reverseDirection: false
            },
            speed: 800,
            simulateTouch: true,
            allowTouchMove: true,
            preventClicks: true,
            observer: true,
            observeParents: true,
            breakpoints: {
                200: { slidesPerView: "1" },
                768: { slidesPerView: "2.7" },
                1024: { slidesPerView: "3.7" },
                1200: { slidesPerView: "4" },
                1360: { slidesPerView: "4.5" }
            }
        });

        updateDescription();
        animateBullet();
        runIntroAnimation();

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScrollPositionSync);
        }

        // Cleanup al desmontar
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScrollPositionSync);
            }
        };
    });
</script>

<div class="boolean-container">
    <!-- Slider 2 -->
    <div class="swiper_2">
        <div class="swiper-wrapper">
            <!-- Slide 1 -->
            <div class="swiper-slide" data-url="/FirstPromoter" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/Slider2/FirstPromoter-Static.png" alt="Static Image 1" class="imagen-contenida">
                    <div class="grid">
                        <!-- columnas -->
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                        <div class="grid-collumn"></div>
                    </div>
                </div>
                <img src="{base}/Recursos/Slider/Slider2/FirstPromoter-Active.gif" alt="Active GIF 1" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <!-- Slide 2 -->
            <div class="swiper-slide" data-url="/PromoterBanner" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/Slider2/PromoterBanner-Static.png" alt="Static Image 2" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/Slider2/PromoterBanner-Active.gif" alt="Active GIF 2" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <!-- Slide 3 -->
            <div class="swiper-slide" data-url="/PromoterCard" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/Slider2/PromoterCard-Static.png" alt="Static Image 3" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/Slider2/PromoterCard-Active.gif" alt="Active GIF 3" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="control-container">
        <div class="custom-box-left swiper-button-prev_2"></div>
        <div class="Description-container">
            <div class="project-description">
                <div class="project-description-head">
                    <div class="project-title">
                        <h2 bind:this={titleElement}></h2>
                    </div>
                    <div class="project-category">
                        <a href="#" bind:this={categoryElement}></a>
                    </div>
                </div>
                <div class="project-text">
                    <p bind:this={textElement}></p>
                </div>
            </div>
        </div>
        <div class="custom-box-right swiper-button-next_2"></div>
    </div>
</div>

<style>
    /* Styles aligned with Slider.svelte, using .swiper_2, .swiper-pagination_2, .swiper-button-prev_2, .swiper-button-next_2 selectors */
    .swiper_2 {
        position: relative;
        width: 97.5%;
        height: 400px;
        overflow: hidden;
        transition: all 0.1s ease-out;
        transform: translateX(3%) !important;
        border-radius: 8px 0 0 8px;
    }
    .swiper_2-3d {
        perspective: 2600px;
    }
    .boolean-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    padding-top: 144px;
    gap: 32px;
    display: flex;
    flex-direction: column;
    transform: translateY(-72px);
    z-index: 2;
}

/* Slides */
.swiper-slide {
    position: relative;
    width: 320px;
    transition: all 0.5s ease-out;
}
/* Slide activo */
:global(.swiper-slide-active) {
    width: 58.35% !important;
}
/* Grid oculto salvo en activo */
:global(.swiper-slide .grid) {
    opacity: 0 !important;
}
:global(.swiper-slide-active .grid) {
    opacity: .25 !important;
}

/* Imágenes dentro de cada slide */
.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    transition:
      mask-image 0.5s ease-out,
      -webkit-mask-image 0.5s ease-out,
      transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: mask-image, -webkit-mask-image, filter, transform;
}

/* Slide previo “en sombra” */
.swiper-slide-prev {
    z-index: 0;
    height: 100%;
    transform: translate3d(-190px, -70px, -855px) rotateX(0deg) rotateY(0deg) scale(1);
    transition: all 0.2s ease-out;
    pointer-events: none;
}
.swiper-slide-prev.swiper-slide-next {
    transform: translate3d(190px, -70px, -855px) rotateX(0deg) rotateY(0deg) scale(.5);
}

/* Imagen estática dentro del slide */
.image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.image-container::after {
    content: "";
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(180deg, rgba(255,255,255,0) 50%, rgba(0,0,0,0.75) 100%);
    mix-blend-mode: multiply;
    pointer-events: none;
    z-index: 1;
}
/* Columnas de la cuadrícula */
.grid {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    pointer-events: none;
    z-index: 2;
    transform: translateY(-100%);
    position: relative;
    padding: 0 11.2%;
    opacity: .25;    
}
.grid-collumn {
    width: 100%;
    height: 100%;
    border-left: 1px solid var(--blanco);
    opacity: .75;
}
.swiper-slide-prev .grid-collumn {
    opacity: 0;
    transition: all 0.2s ease;
}
.swiper-slide-prev .blur {
    border-top: 1px solid rgba(246,246,246,0.1);
}

/* Escala inicial de la imagen estática */
.image-container .imagen-contenida {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    transform: scale(1.1);
}

/* Scrollbar (oculto) */
.swiper-horizontal > .swiper-scrollbar,
.swiper-scrollbar.swiper-scrollbar-horizontal {
    display: none;
}

/* Botones custom */
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

/* Controles y descripción */
.control-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    z-index: 10;
    flex-direction: column;
}
.Description-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 40%;
    transform: translateY(13px);
    min-height: 200px;
    z-index: 10;
}

/* Paginación */
:global(.swiper-pagination_2) {
    display: flex;
    justify-content: center;
    pointer-events: none;
}
:global(.swiper-pagination_2 .swiper-pagination-bullets,
        .swiper-pagination_2 .swiper-pagination-custom,
        .swiper-pagination_2 .swiper-pagination-fraction) {
    bottom: var(--swiper-pagination-bottom, 8px);
    top: var(--swiper-pagination-top, auto);
    left: 0;
    width: 100%;
    gap: 8px;
}
:global(.swiper-pagination_2 .swiper-pagination-bullet) {
    width: 12px;
    height: 12px;
    border: 1px solid var(--Verde-oscuro);
    background-color: var(--Transparente);
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
}
:global(.swiper-pagination_2 .swiper-pagination-bullet-active) {
    background-color: var(--Transparente);
    transform: scale(1);
    opacity: 1;
}
:global(.pagination-shape) {
    position: absolute;
    left: -18px;
    top: 50%;
    transform: translateY(-50%) translateX(10px);
    height: 14px;
    background-color: var(--Gris-muy-oscuro);
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
}

/* Wrapper de slides */
:global(.swiper-wrapper) {
    transition-timing-function: ease-out !important;
}

/* Imagen estática y GIF activo */
.static-img {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 1;
    z-index: 1;
    border-radius: 16px;
    transition: all 0.5s ease-in-out;
}
:global(.swiper-slide-active .static-img),
:global(.swiper-slide-active .active-gif) {
    border-radius: 16px 0 0 16px;
}
.swiper-slide:hover .static-img {
    filter: brightness(0.6);
}
.active-gif {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0;
    z-index: 2;
    transition: opacity 0.5s ease-out, mask-image 0.5s ease-out;
    border-radius: 16px;
}

/* Efecto de desenfoque */
.blur-container {
    width: 200.5%;
    height: 120px;
    border-top: 1px solid #f6f6f625;
    background: linear-gradient(180deg, rgba(144,144,144,0) 0%, rgba(246,246,246,0.01) 37.15%);
    transform: translateY(16px);
    backdrop-filter: blur(2px);
    z-index: 2;
    position: relative;
    border-bottom: 1px solid #f6f6f625;
}
.blur {
    width: 200.5%;
    height: 120px;
    background: linear-gradient(180deg, rgba(144,144,144,0) 0%, rgba(246,246,246,0.01) 37.15%);
    z-index: 2;
    position: relative;
}

/* Extras y descripción de proyecto */
.Swiper-Extras {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 40px 48px;
}
.Lightbulb {
    min-width: 80px;
    cursor: pointer;
    z-index: 10;
    margin: 56px;
    filter: saturate(0);
    max-width: 80px;
    display: none;
}
.Lightbulb:hover {
    filter: saturate(1);
    transition: filter 0.25s ease-in-out;
}
.project-description {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
}
.project-category a {
    font-family: 'Publica Sans', sans-serif;
    font-weight: 100;
    font-size: var(--font-size-XS);
    color: var(--Gris-oscuro);
    text-decoration: none;
    margin-bottom: 8px;
    text-align: end;
}
.project-title h2 {
    font-family: 'Publica Sans', sans-serif;
    font-weight: bold;
    font-size: var(--font-size-XL);
    color: var(--Gris-muy-oscuro);
    line-height: 1.2;
}

/* Breakpoints */
@media (max-width: 1360px) {
    .Description-container {
        width: 60%;
    }
    :global(.swiper-slide-active) {
        width: 58.6% !important;
    }
}
@media (max-width: 1200px) {
    .swiper_2 {
        width: 100%;
        height: 420px;
        transform: translateX(0) !important;
    }
    :global(.swiper-slide-active) {
        width: 100% !important;
    }
    .Description-container {
        width: 80%;
    }
    .static-img,
    .active-gif {
        border-radius: 0;
    }
}
@media (max-width: 800px) {
    .Description-container {
        width: 100%;
    }
    .swiper_2 {
        height: 64vh;
    }
}
@media (max-width: 600px) {
    .control-container {
        display: none;
    }
    .Description-container {
        width: 100%;
        justify-content: start;
    }
    .boolean-container {
        padding-top: 160px;
    }
    .active-gif,
    .Lightbulb {
        display: none;
    }
}

</style>