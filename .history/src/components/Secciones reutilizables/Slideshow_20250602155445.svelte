<script>
  import { onMount } from 'svelte';
  import Swiper from 'swiper/bundle';
  import 'swiper/css/bundle';
  import gsap from 'gsap';

  export let images = [];

  let swiper;

  onMount(() => {
    swiper = new Swiper('.swiper', {
        effect: "slide",
        slidesPerView: '1.85',
        centeredSlides: false,
        initialSlide: 0,
        loop: true,
        spaceBetween: 8,
        pagination: {
            el: '.swiper-pagination-slideshow',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 0, // ¡Sin pausa entre slides!
          disableOnInteraction: false
        },
        speed: 2400,
        simulateTouch: true,
        allowTouchMove: true,
        preventClicks: true,
        observer: true,
        observeParents: true,
    });
    
    const swiperEl = document.querySelector('.swiper');

    swiperEl.addEventListener('mouseenter', () => {
      swiper.autoplay.stop();
    });

    swiperEl.addEventListener('mouseleave', () => {
      swiper.autoplay.start();
    });
  });
</script>

<div class="slider-container">
  <div class="swiper">
    <div class="swiper-wrapper">
      {#each images as img}
        <div class="swiper-slide">
          <img src={img} alt="Slide" />
        </div>
      {/each}
    </div>

    <!-- Controls -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
<!--     <div class="swiper-pagination-slideshow"></div> -->

  </div>
</div>

<style>
  .slider-container {
    width: 100%;
    position: relative;
    overflow: hidden;
    min-height: 560px;
    max-height: 560px;
}

  .swiper {
    height: 560px;
  }
  .swiper-wrapper {
      transition-timing-function: linear !important;
      padding-left: 0%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    max-height: 100%;
  }

  .swiper-slide img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 16px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    font-size: 24px;
    cursor: pointer;
    color: var(--Resalte);
    border-radius: 50%;
    padding: 32px;
    background: var(--Gris-muy-oscuro);
    transition: all 0.5s;
  }
  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    padding: 40px;
    background: var(--Resalte);
  }

  .swiper-button-prev {
    left: 0px;
  }

  .swiper-button-next {
    right: 0px;
  }


.swiper-button-prev::after,
.swiper-button-next::after {
  font-size: 16px; 
  color: var(--blanco);
}

  :global(.swiper-pagination-slideshow) {
      bottom: var(--swiper-pagination-bottom, 8px);
      top: 95% !important;
      left: 48% !important;
      width: 100%;
      justify-content: start !important;
      height: 100%;
      gap: 8px;
      position: absolute;
      z-index: 2;
  }

</style>
