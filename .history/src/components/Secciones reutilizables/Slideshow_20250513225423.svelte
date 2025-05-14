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
        slidesPerView: '1.5',
        centeredSlides: false,
        initialSlide: 0,
        loop: true,
        spaceBetween: 80,
        pagination: {
            el: '.swiper-pagination-slideshow',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 100000, // en milisegundos
          disableOnInteraction: false
        },
        speed: 800,
        simulateTouch: true,
        allowTouchMove: true,
        preventClicks: true,
        observer: true,
        observeParents: true,
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
    <div class="swiper-pagination-slideshow"></div>

  </div>
</div>

<style>
  .slider-container {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .swiper {
    width: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }

  .swiper-slide img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    font-size: 24px;
    cursor: pointer;
    background: var(--Resalte-claro, #ccc);
    color: var(--blanco, #fff);
    border-radius: 50%;
    padding: 12px;
  }

  .swiper-button-prev {
    left: 16px;
  }

  .swiper-button-next {
    right: 16px;
  }

  :global(.swiper-pagination-slideshow) {
      bottom: var(--swiper-pagination-bottom, 8px);
      top: 90%;
      left: 50%;
      width: 100%;
      justify-content: start !important;
      height: 100%;
      gap: 8px;
  }

</style>
