<script>
  import { onMount } from 'svelte';
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/navigation';

  export let images = [];

  // Inicializa los módulos que quieres usar
  SwiperCore.use([Autoplay, Pagination, Navigation]);
</script>

<div class="slideshow-container">
  <Swiper
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    loop={true}
    pagination={{ clickable: true }}
    navigation={{
      nextEl: '.custom-next',
      prevEl: '.custom-prev'
    }}
    spaceBetween={0}
    slidesPerView={1}
    class="custom-swiper"
  >
    {#each images as img}
      <SwiperSlide>
        <div class="slide">
          <img src={img} alt="Slideshow image" />
        </div>
      </SwiperSlide>
    {/each}
  </Swiper>

  <div class="controls">
    <button class="custom-prev">◀</button>
    <button class="custom-next">▶</button>
  </div>
</div>

<style>
  .slideshow-container {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
  }

  .custom-swiper {
    width: 100%;
    height: 100%;
  }

  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .slide img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .controls {
    position: absolute;
    bottom: 50%;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    pointer-events: none;
  }

  .controls button {
    pointer-events: all;
    width: 48px;
    height: 48px;
    color: var(--Resalte);
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .controls button:hover {
    background: var(--Resalte-claro);
    color: var(--blanco);
    border-radius: 16px;
  }

  /* Swiper pagination styles */
  :global(.swiper-pagination-bullet) {
    background: var(--Resalte);
    opacity: 1;
  }

  :global(.swiper-pagination-bullet-active) {
    background: var(--Resalte-claro);
  }
</style>
