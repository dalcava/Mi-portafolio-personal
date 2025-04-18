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
    let swiper;

    let isAnimating = false;
    let scrollThrottle = 0;

    let lastSyncedIndex = -1;
    /* Referencias a los elementos del DOM para la descripción */
    let titleElement;
    let categoryElement;
    let textElement;
    const AUTOPLAY_DELAY = 4800;
    let isInitialLoad = true;
    let allowScrollNavigation = false;
    let isProgrammaticScroll = false;


    function generateScrollRanges(start = 2000, step = 400, count = 8) {
        return Array.from({ length: count }, (_, i) => {
            const min = start + i * step;
            const max = min + step;
            return [min, max];
        });
    }

    function handleScrollPositionSync() {
        if (isProgrammaticScroll) return; // <- Evita loop

        let scrollY = scrollContainer?.scrollTop ?? window.scrollY;
        const ranges = generateScrollRanges();
        const index = ranges.findIndex(([min, max]) => scrollY >= min && scrollY < max);

        if (index !== -1 && swiper && swiper.realIndex !== index) {
            if (!isAnimating) {
                isAnimating = true;
                swiper.slideTo(index);
                lastSyncedIndex = index;

                gsap.delayedCall(0.8, () => {
                    isAnimating = false;
                });
            }
        }
        console.log('ScrollY actual:', scrollY);
    }





	function handleClick(event) {
		const slide = event.currentTarget.closest('.swiper-slide');
		const nextPage = slide?.dataset?.url;
		if (nextPage) {
			dispatch('slideClick', { nextPage, image: slide.querySelector('.imagen-contenida') });
		}
	}

    /* ----------------------------------------- Acá irán los textos de las descripciones ---------------------------------------- */
    const descriptions = [
        {
            title: "Onyo App",
            category: "App case study",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            title: "Colmena",
            category: "UX + UI Design",
            text: "This project is a tribute to The Legend of Zelda series, featuring a personalized custom skin for the Nintendo Switch Pro Controller. It showcases a fully 3D animated product presentation, created as a practice piece and an homage to the iconic game franchise. The animation highlights a unique Zelda-themed design, crafted to celebrate the artistic and legendary world of Hyrule."
        },
        {
            title: "Aval Pay Center",
            category: "UX + UI Design",
            text: "Solución integral para pagos digitales con identidad visual sólida y accesibilidad multiplataforma.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
        },
        {
            title: "Craftie Racoon",
            category: "Brand design",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },    
        {
            title: "Kinetic Rush",
            category: "3D Motion",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            title: "Control",
            category: "3D Motion",
            text: "This project is a tribute to The Legend of Zelda series, featuring a personalized custom skin for the Nintendo Switch Pro Controller. It showcases a fully 3D animated product presentation, created as a practice piece and an homage to the iconic game franchise. The animation highlights a unique Zelda-themed design, crafted to celebrate the artistic and legendary world of Hyrule."
        },
        {
            title: "Duraznos",
            category: "Experimental Visual",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
            title: "Chasms call",
            category: "UX Strategy",
            text: "This project is a tribute to The Legend of Zelda series, featuring a personalized custom skin for the Nintendo Switch Pro Controller. It showcases a fully 3D animated product presentation, created as a practice piece and an homage to the iconic game franchise. The animation highlights a unique Zelda-themed design, crafted to celebrate the artistic and legendary world of Hyrule."
        }
    ];

    // Función para animar el cambio de texto con efecto "matrix" (letras aleatorias)
    function scrambleText(element, finalText, duration = 1) {
        if (!element || !finalText) return; // <-- Esta línea evita que se ejecute con valores inválidos

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const frameRate = 32;
        const totalFrames = Math.round(duration * frameRate);
        let frame = 0;

        const interval = setInterval(() => {
            frame++;
            let output = '';
            for (let i = 0; i < finalText.length; i++) {
                if (frame / totalFrames > i / finalText.length) {
                    output += finalText[i];
                } else {
                    output += chars[Math.floor(Math.random() * chars.length)];
                }
            }
            element.textContent = output;
            if (frame >= totalFrames) {
                clearInterval(interval);
                element.textContent = finalText;
            }
        }, 1000 / frameRate);
    }


    function updateDescription() {
        const index = swiper.realIndex;
        const desc = descriptions[index];

        if (desc) {
            scrambleText(titleElement, desc.title, 0.2);
            scrambleText(categoryElement, desc.category, 0.05);
            scrambleText(textElement, desc.text, 0.2);
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

    function toggleQuoteVisibility() {
        const quote = document.querySelector('.quote');
        if (!quote) return;

        const isFirstSlide = swiper?.realIndex === 0;

        quote.classList.toggle('visible', isFirstSlide);
        quote.classList.toggle('hidden', !isFirstSlide);
    }


    function runIntroAnimation() {
        const sliderIntro = gsap.timeline({ delay: isInitialLoad ? 3 : 0 });

        sliderIntro
            .fromTo(
                ".swiper-slide",
                { clipPath: "inset(0 100% 0 0)", y: 250 },
                { clipPath: "inset(0 0% 0 0)", y: 0, duration: 1.5, ease: "elastic.out(1, 0.9)" },
                "-=2.5"
            )
            .fromTo(
                ".swiper",
                { opacity: 0, y: 0 },
                { opacity: 1, y: 0, duration: 0.05, ease: "power4.out", stagger: 0.5 },
                "-=1.5"
            )
            .fromTo(
                ".pagination-container",
                { opacity: 0, y: 0 },
                { opacity: 1, y: 0, duration: 0.35, ease: "power4.out", stagger: 0.5 },
                "-=0.75"
            )
            .fromTo(
                ".project-description",
                { clipPath: "inset(0 100% 0 0)" },
                { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power4.out" },
                "-=1.25"
            )
            .add(() => {
                // ✅ Activamos el scroll de navegación cuando todo haya terminado
                allowScrollNavigation = true;
            });

        isInitialLoad = false;
    }


    /* ----------------------------------------------------------------------------------------------------------
    -------------------------------------------Aquí empieza swiper ----------------------------------------------
    -------------------------------------------------------------------------------------------------------------*/

    onMount(() => {
        
        swiper = new Swiper('.swiper', {
            effect: "slide",
            slidesPerView: '5.7',
            centeredSlides: true,
            initialSlide: 0,
            loop: false,
            spaceBetween: 80,
            pagination: {
                el: '.swiper-pagination',
                clickable: false
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
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
                200: {
                    // >= 1000px
                    slidesPerView: "1",
                },
                1201: {
                    // >= 1200px
                    slidesPerView: "4",
                },
                1360: {
                    // >= 1200px
                    slidesPerView: "5.42",
                },
                1441: {
                    // >= 1440px
                    slidesPerView: "5",
                },
                1921: {
                    // >= 1440px
                    slidesPerView: "6.5",
                },

            },
        });

        
        window.swiper = swiper;
        updateDescription();
        animateBullet();

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScrollPositionSync);
        }


        // También elimina el listener al desmontar
        const cleanup = () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', handleScrollPositionSync);
            }
        };
        




        swiper.on('slideChange', () => {
            const ranges = generateScrollRanges();
            const y = ranges[swiper.realIndex]?.[0]; 


            if (y) {
                isProgrammaticScroll = true;

                const scrollTarget = scrollContainer === window || scrollContainer === document.body || scrollContainer === document.documentElement
                    ? window
                    : scrollContainer;

                scrollTarget.scrollTo({ top: y, behavior: 'smooth' });

                setTimeout(() => {
                    isProgrammaticScroll = false;
                }, 800); // ⏱️ igual o mayor que tu `behavior: smooth`
            }

            updateDescription();
            animateBullet();
            toggleQuoteVisibility();

            if (swiper.isEnd) {
            swiper.autoplay.stop();
        }
        });



        function updateSlidePositions(forceUpdate = false) {
            // Si querés animar, escalar o modificar clases manualmente, lo harías acá.
            // Por ahora, esto lo dejamos vacío para evitar errores.
        }


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
                    activeGif.style.webkitMaskImage = `radial-gradient(circle at ${lastX}% ${lastY}%, black 47.7%, transparent 48%)`;
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

        runIntroAnimation();  
        
        scrambleText(); 
        setTimeout(() => {
            updateDescription();
        }, 1000);

        return cleanup;
        
    });

</script>


  
  <!-- HTML de tu slider adaptado -->
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
                <img src="{base}/Recursos/Slider/UX/Onyo-Active.png" alt="Active GIF 1" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/Colmena-Static.jpg" alt="Static Image 2" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/Colmena-Active.png" alt="Active GIF 2" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/AvalPay-Static.webp" alt="Static Image 3" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/AvalPay-Active.gif" alt="Active GIF 3" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/UX/CR.webp" alt="Static Image 4" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/UX/AvalPay-Active.gif" alt="Active GIF 4" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>


            <div class="swiper-slide" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/3D/Kinetic rush-static.webp" alt="Static Image 5" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/3D/Kinetic rush-active.gif" alt="Active GIF 5" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/3D/Control-static.webp" alt="Static Image 6" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/3D/Control-active.gif" alt="Active GIF 6" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/3D/Duraznos intro.gif" alt="Static Image 7" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/3D/Duraznos active.gif" alt="Active GIF 7" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
            <div class="swiper-slide" data-url="/Control" on:click={handleClick}>
                <div class="image-container static-img">
                    <img src="{base}/Recursos/Slider/3D/Chasms call.webp" alt="Static Image 8" class="imagen-contenida">
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
                <img src="{base}/Recursos/Slider/3D/Chasms call.webp" alt="Active GIF 8" class="active-gif">
                <div class="blur-container">
                    <div class="blur"></div>
                </div>
            </div>
        </div>
    </div>

    <div class="Swiper-Extras">

        <div class="control-container">
    <!--       <div class="swiper-button-container">
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
    <!--             <div class="project-text">
                  <p bind:this={textElement}>  </p>
                </div> -->
            </div>
        </div>
    </div>    <!-- Controles -->
  </div>
  
  <style>

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
.swiper {
position: relative;
width: 97.5%;
height: 72vh;
overflow: hidden;
transition: all 0.1s ease-out;
transform: translateX(-1%) !important;
border-radius: 0px 0 0 0px ;
}

.swiper-3d {
    perspective: 2600px;
}

.swiper-slide {
    position: relative;
    width: 320px;
    transition: all 0.5s ease-out;
}
:global(.swiper-slide-active) {
    width: 58.35% !important;
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
    user-select: none;
    transition: mask-image 0.5s ease-out, -webkit-mask-image 0.5s ease-out, transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); /* Smooth transition */
    will-change: mask-image, -webkit-mask-image, filter, transform;
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
    overflow: hidden;
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

:global(.swiper-pagination) {
    display: flex;
    justify-content: center;
    pointer-events: none;
}
:global(.swiper-horizontal>.swiper-pagination-bullets, .swiper-pagination-bullets.swiper-pagination-horizontal, .swiper-pagination-custom, .swiper-pagination-fraction) {
    bottom: var(--swiper-pagination-bottom, 8px);
    top: var(--swiper-pagination-top, auto);
    left: 0;
    width: 100%;
    justify-content: start !important;
    height: 100%;
    gap: 8px;
}

:global(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  border: 1px solid var(--transparent);
  background-color: var(--Gris-muy-oscuro);
  border-radius: 50%;
  opacity: 1;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

/* Bullet activo */
:global(.swiper-pagination-bullet-active) {
    background-color: var(--transparent);
    border: 1px solid var(--Gris-muy-oscuro);
    transform: scale(1);
    opacity: 1;
    border-radius: 8px;
    transition: all 0.4s ease-out;
    width: 64px;
    height: 8px;
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
:global(.swiper-wrapper) {
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
    border-radius: 16px;
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

.Swiper-Extras {
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: row;
    padding: 40px 56px;
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
    align-items: flex-start;
    padding: 0 3%;
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
}
.project-title h2 {
    font-family: 'Publica Sans', sans-serif;
  font-weight: Bold;
  font-size: var(--font-size-XL);
  color: var(--Gris-muy-oscuro);
  line-height: 1.2;
}


/* .project-text p {
  font-family: 'Publica Sans', sans-serif;
  font-weight: 100;
  font-size: var(--font-size-XS);
  color: var(--Gris-muy-oscuro);
  line-height: 120%;
  max-width: 540px;
} */



/*--------------------------------------------------------------------------------------------------------------------
------------------------------------------- Aquí empiezan los breackpoints -------------------------------------------
--------------------------------------------------------------------------------------------------------------------*/

@media (max-width: 1360px) {
    .Description-container{
        width: 60%;
    }
    :global(.swiper-slide-active) {
        width: 58.6% !important;
    }
}
@media (max-width: 1200px) {
    .swiper {
        width: 100%;
        height: 420px;
        transform: translateX(0%) !important;
    }
    :global(.swiper-slide-active) {
        width: 100% !important;
    }
    .Description-container{
        width: 80%;
    }
    .static-img {
        border-radius: 0px;
    }

    .active-gif {
        border-radius: 0px;
    }
}

@media (max-width: 800px) {
    .Description-container{
        width: 100%;
    }
    .swiper {
        height: 64vh;
    }
}

@media (max-width: 600px) {
    .control-container {
        display: none;
    }
    .Description-container{
        width: 100%;
        justify-content: start;
    }
    .boolean-container {
        padding-top: 160px;
    }
    .active-gif{
        display: none;
    }
    .Lightbulb {
        display: none;
    }
/*     .project-text p {
        display: none;
    } */
}


  </style>
  