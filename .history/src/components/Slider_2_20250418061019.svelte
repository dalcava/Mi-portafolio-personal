<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import Swiper from 'swiper/bundle';
    import 'swiper/css/bundle';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { goto } from '$app/navigation';

    export let scrollContainer;

    let swiper_2;
    let isAnimating = false;
    let lastSyncedIndex = -1;

    let titleElement;
    let categoryElement;
    let textElement;

    let isInitialLoad = true;
    let isProgrammaticScroll = false;

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
    <div class="swiper_2">
        <div class="swiper-wrapper">
            <!-- Repite para cada slide del Slider original -->
            <div class="swiper-slide" data-url="/OnyoApp" on:click={e => goto(e.currentTarget.dataset.url)}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/Onyo-Static.png" alt="Onyo App Static" class="imagen-contenida">
                    <div class="grid"> <!-- columnas -->
                        <div class="grid-collumn"></div>
                        <!-- ... -->
                    </div>
                </div>
                <img src="{base}/Recursos/Slider/UX/Onyo-Active.gif" alt="Onyo App Active" class="active-gif">
                <div class="blur-container"><div class="blur"></div></div>
            </div>
            <!-- ... más slides ... -->
        </div>
    </div>
    <div class="control-container">
        <div class="custom-box-left swiper-button-prev_2"></div>
        <div class="Description-container">
            <div class="project-description">
                <div class="project-description-head">
                    <div class="project-title"><h2 bind:this={titleElement}></h2></div>
                    <div class="project-category"><a href="#" bind:this={categoryElement}></a></div>
                </div>
                <div class="project-text"><p bind:this={textElement}></p></div>
            </div>
        </div>
        <div class="custom-box-right swiper-button-next_2"></div>
    </div>
</div>

<style>
/* Aquí añadiremos los estilos tras confirmar la estructura */
</style>