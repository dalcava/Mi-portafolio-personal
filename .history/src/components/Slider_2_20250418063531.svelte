<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import Swiper from 'swiper/bundle';
    import 'swiper/css/bundle';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { goto } from '$app/navigation';

    export let scrollContainer;

    let isFirstSlide = true;
    let swiper_2;
    let isAnimating = false;
    let scrollThrottle = 0;
    let lastSyncedIndex = -1;

    let titleElement;
    let categoryElement;
    let textElement;

    let isInitialLoad = true;
    let isProgrammaticScroll = false;

    let allowScrollNavigation = false;


    const AUTOPLAY_DELAY = 4800;

    const descriptions_2 = [
        {
            title: "Onyo App",
            category: "App case study",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            title: "Colmena",
            category: "UX + UI Design",
            text: "This project is a tribute to The Legend of Zelda, crafted to celebrate the artistic and legendary world of Hyrule."
        },
        {
            title: "Aval Pay Center",
            category: "UX + UI Design",
            text: "Solución integral para pagos digitales con foco en experiencia de usuario y accesibilidad."
        },
        // ... repetir descripción por cada slide según Slider.original
    ];

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
                gsap.delayedCall(0.8, () => { isAnimating = false; });
            }
        }
    }

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
                output += (Math.random() < frame / totalFrames)
                    ? finalText[i]
                    : chars[Math.floor(Math.random() * chars.length)];
            }
            element.textContent = output;
            if (frame === totalFrames) {
                clearInterval(interval);
                element.textContent = finalText;
            }
        }, 1000 / frameRate);
    }

    function updateDescription() {
        const index = swiper_2.realIndex;
        const desc = descriptions_2[index];
        if (desc) {
            scrambleText(titleElement, desc.title, 0.2);
            scrambleText(categoryElement, desc.category, 0.05);
            scrambleText(textElement, desc.text, 0.2);
        }
    }

    function animateBullet() {
        gsap.fromTo(
            '.swiper-pagination_2 .swiper-pagination-bullet-active',
            { scale: 0.8, opacity: 0.5 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        document.querySelectorAll('.swiper-pagination_2 .swiper-pagination-bullet').forEach(b => b.innerHTML = '');
        const active = document.querySelector('.swiper-pagination_2 .swiper-pagination-bullet-active');
        if (active) {
            const shape = document.createElement('div');
            shape.classList.add('pagination-shape');
            active.prepend(shape);
            gsap.fromTo(shape, { width: '12px' }, { width: '72px', duration: (AUTOPLAY_DELAY + 600)/1000, ease: 'linear' });
        }
    }

    const navigateSwiper = direction => {
        if (isAnimating) return;
        direction > 0 ? swiper_2.slideNext() : swiper_2.slidePrev();
        isAnimating = true;
        gsap.delayedCall(0.8, () => { isAnimating = false; });
    };

    function runIntroAnimation() {
        const timeline = gsap.timeline({ delay: isInitialLoad ? 3 : 0 });
        timeline
            .fromTo('.swiper_2 .swiper-slide', { clipPath: 'inset(0 100% 0 0)', y: 250 }, { clipPath: 'inset(0 0% 0 0)', y: 0, duration: 1.5, ease: 'elastic.out(1, 0.9)' })
            .fromTo('.project-text', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power4.out' }, '-=0.25')
            .fromTo('.project-description', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power4.out' }, '-=1.25');
        isInitialLoad = false;
    }

    onMount(() => {
        swiper_2 = new Swiper('.swiper_2', {
            effect: 'slide',
            slidesPerView: '5.7',
            centeredSlides: true,
            initialSlide: 0,
            loop: false,
            spaceBetween: 80,
            pagination: { el: '.swiper-pagination_2', clickable: false },
            navigation: { nextEl: '.swiper-button-next_2', prevEl: '.swiper-button-prev_2' },
            autoplay: { delay: AUTOPLAY_DELAY, disableOnInteraction: false, reverseDirection: false },
            speed: 800,
            observer: true,
            observeParents: true,
            breakpoints: { 1360: { slidesPerView: '5.42' }, 1441: { slidesPerView: '5' }, 1921: { slidesPerView: '6.5' } }
        });
        updateDescription();
        animateBullet();
        runIntroAnimation();
        if (scrollContainer) scrollContainer.addEventListener('scroll', handleScrollPositionSync);
        return () => { if (scrollContainer) scrollContainer.removeEventListener('scroll', handleScrollPositionSync); };
    });
</script>

<div class="boolean-container">
  
    <!-- Swiper -->
    <div class="swiper">
        <!-- Swiper content -->

        
        <div class="swiper-wrapper">
            <div class="swiper-slide slide-1" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/Onyo-Static.png" alt="Static Image 1" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/Onyo-Active.gif" alt="Active GIF 1" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Colmena" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/CR.webp" alt="Static Image 2" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/CR-Active.gif" alt="Active GIF 2" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/AvalPayCenter" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/APC.webp" alt="Static Image 3" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/APC-Active.gif" alt="Active GIF 3" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/CraftieRacoon" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/CRacoon.webp" alt="Static Image 4" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/CRacoon-Active.gif" alt="Active GIF 4" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/KineticRush" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/KineticRush-static.webp" alt="Static Image 5" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/KineticRush-active.gif" alt="Active GIF 5" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/Control-static.webp" alt="Static Image 6" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/Control-active.gif" alt="Active GIF 6" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Duraznos" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/Duraznos-static.webp" alt="Static Image 7" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/Duraznos-active.gif" alt="Active GIF 7" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/ChasmsCall" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/ChasmsCall-static.webp" alt="Static Image 8" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/ChasmsCall-active.gif" alt="Active GIF 8" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="Swiper-Extras">

        <div class="control-container">
            <!-- <div class="swiper-button-container">
                <div class="swiper-button-prev">
                    <img src="{base}/Recursos/slider/arrow-left.svg" alt="Previous" class="new-icon" />
                </div>
                <div class="swiper-button-next">
                    <img src="{base}/Recursos/slider/arrow-right.svg" alt="Next" class="new-icon" />
                </div>
            </div> -->
            <div class="pagination-container">
                <div class="swiper-pagination"></div>
            </div>
        </div>
        <div class="Description-container">
            <div class="Lightbulb">
                <img src="{base}/Recursos/header/Scroll.gif" alt="Lightbulb" />
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
                <!-- <div class="project-text">
                  <p bind:this={textElement}>  </p>
                </div> -->
            </div>
        </div>
    </div>    <!-- Controles -->
</div>


<style>

/* Contenedor principal */
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

/* Slider 2 */
.swiper_2 {
    position: relative;
    width: 100%;
    height: 72vh;
    overflow: hidden;
    transition: all 0.1s ease-out;
    transform: translateX(48px) !important;
    border-radius: 16px 0 0 16px;
}

/* Perspectiva 3D */
.swiper_2-3d {
    perspective: 2600px;
}

/* Slides */
.swiper_2 .swiper-slide {
    position: relative;
    width: 320px;
    transition: all 0.5s ease-out;
}
:global(.swiper_2 .swiper-slide-active) {
    width: 58.35% !important;
}
:global(.swiper_2 .swiper-slide .grid) {
    opacity: 0 !important;
}
:global(.swiper_2 .swiper-slide-active .grid) {
    opacity: .25 !important;
}

/* Imagenes dentro de slides */
.swiper_2 .swiper-slide img {
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

/* Slide anterior “en sombra” */
.swiper_2 .swiper-slide-prev {
    z-index: 0;
    height: 100%;
    transform: translate3d(-190px, -70px, -855px) rotateX(0deg) rotateY(0deg) scale(1);
    transition: all 0.2s ease-out;
    pointer-events: none;
}
.swiper_2 .swiper-slide-prev.swiper-slide-next {
    transform: translate3d(190px, -70px, -855px) rotateX(0deg) rotateY(0deg) scale(.5);
}

/* Contenedor de imagen estática */
.swiper_2 .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.swiper_2 .image-container::after {
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
.swiper_2 .grid {
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
.swiper_2 .grid-collumn {
    width: 100%;
    height: 100%;
    border-left: 1px solid var(--blanco);
    opacity: .75;
}
.swiper_2 .swiper-slide-prev .grid-collumn {
    opacity: 0;
    transition: all 0.2s ease;
}
.swiper_2 .swiper-slide-prev .blur {
    border-top: 1px solid rgba(246,246,246,0.1);
}

/* Escala inicial de la imagen estática */
.swiper_2 .image-container .imagen-contenida {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
    transform: scale(1.1);
}

/* Scrollbar oculto */
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


.control-container {
    display: flex;
    width: 100%;
    align-items: center;
    height: 100%;
    z-index: 10;
    justify-content: flex-start;
    flex-direction: row;
    position: relative;
}
.pagination-container {
    display: flex;
    align-items: start;
    justify-content: flex-start;
    position: relative;
    gap: 20px;
    z-index: 10;
    width: 75%;
    height: 100%;
    flex-wrap: nowrap;
    flex-direction: row;
}

/* Imagen estática y GIF activo */
.static-img {
    position: absolute; /* Ensure it remains in the background */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1; /* Always visible unless covered by GIF */
    z-index: 1; /* Behind the GIF */
    transition: all 0.5s ease-in-out;
    border-radius: 16px;
}
.swiper-slide:hover .static-img {
  filter: brightness(0.6);
}
.active-gif {
    position: absolute; /* Overlay on top of the static image */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Hidden by default */
    z-index: 2; /* Above the static image */
    transition: opacity 0.5s ease-out, mask-image 0.5s ease-out;
    border-radius: 16px 16px 16px 16px;
}

/* Blur */
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

/* Extras y descripción de proyecto */
.Swiper-Extras {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    padding: 40px 48px;
}
/*---------------------------------------- Proyects description -----------------------------------------------*/

.Description-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    width: 100%;
    height: auto;
    z-index: 10;
    transform: translateY(-48px);
    min-height: 200px;
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
    align-items: flex-end;
}

.project-category a {
  font-family: 'Publica Sans', sans-serif;
  font-weight: 100;
  font-size: var(--font-size-XS);
  color: var(--Gris-oscuro);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 8px;
  line-height: 0;
  text-align: end;
  width: 100%;
}
.project-title h2 {
    font-family: 'Publica Sans', sans-serif;
  font-weight: Bold;
  font-size: var(--font-size-XL);
  color: var(--Gris-muy-oscuro);
  line-height: 1.2;
}

/* Breakpoints */
@media (max-width: 1360px) {
    .swiper_2 .Description-container {
        width: 60%;
    }
    :global(.swiper_2 .swiper-slide-active) {
        width: 58.6% !important;
    }
}
@media (max-width: 1200px) {
    .swiper_2 {
        width: 100%;
        height: 420px;
        transform: translateX(0) !important;
    }
    :global(.swiper_2 .swiper-slide-active) {
        width: 100% !important;
    }
    .swiper_2 .Description-container {
        width: 80%;
    }
    .swiper_2 .static-img,
    .swiper_2 .active-gif {
        border-radius: 0;
    }
}
@media (max-width: 800px) {
    .swiper_2 .Description-container {
        width: 100%;
    }
    .swiper_2 {
        height: 64vh;
    }
}
@media (max-width: 600px) {
    .swiper_2 .control-container {
        display: none;
    }
    .swiper_2 .Description-container {
        width: 100%;
        justify-content: start;
    }
    .swiper_2 .boolean-container {
        padding-top: 160px;
    }
    .swiper_2 .active-gif,
    .swiper_2 .Lightbulb {
        display: none;
    }
}


</style>