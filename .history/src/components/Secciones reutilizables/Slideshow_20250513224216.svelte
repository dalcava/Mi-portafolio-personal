<script>
  import { onMount } from 'svelte';
  import Swiper from 'swiper/bundle';
  import 'swiper/css/bundle';
  import gsap from 'gsap';

  export let images = [];

  let swiper;

  onMount(() => {
    swiper = new Swiper('.swiper', {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      grabCursor: true
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
<!--     <div class="swiper-button-prev">◀</div>
    <div class="swiper-button-next">▶</div> -->
    <div class="swiper-pagination"></div>
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

  .swiper-pagination {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }
</style>
