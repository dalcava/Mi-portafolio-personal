<script>
  import { onMount } from 'svelte';
  import { Swiper, SwiperSlide } from 'swiper/svelte';
  import SwiperCore, { Autoplay, Pagination } from 'swiper';

  import 'swiper/css';
  import 'swiper/css/pagination';

  export let images = [];

  // Inicializa los módulos que quieres usar
  SwiperCore.use([Autoplay, Pagination]);
</script>

<Swiper
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  loop={true}
  pagination={{ clickable: true }}
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

<style>
  .custom-swiper {
    width: 100%;
    height: 400px;
    position: relative;
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

  /* Personaliza la paginación si lo deseas */
  .swiper-pagination-bullet {
    background: var(--Resalte);
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background: var(--Resalte-claro);
  }
</style>
