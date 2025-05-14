<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { onMount } from 'svelte';

  export let images = [];

  let current = 0;
  let x = tweened(0, { duration: 300, easing: cubicOut });

  let startX;
  let containerWidth = 0;

  const next = () => {
    current = (current + 1) % images.length;
    x.set(-current * containerWidth);
  };

  const prev = () => {
    current = (current - 1 + images.length) % images.length;
    x.set(-current * containerWidth);
  };

  function handleTouchStart(e) {
    startX = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    const delta = e.touches[0].clientX - startX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? prev() : next();
      startX = e.touches[0].clientX;
    }
  }

  onMount(() => {
    const resize = () => {
      containerWidth = document.querySelector('.slideshow-container').offsetWidth;
      x.set(-current * containerWidth);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  });
</script>

<div class="slideshow-container" on:touchstart={handleTouchStart} on:touchmove={handleTouchMove}>
  <div class="slideshow-track" style="transform: translateX({$x}px);">
    {#each images as img}
      <div class="slide">
        <img src={img} alt="Slideshow image" />
      </div>
    {/each}
  </div>
  <div class="controls">
    <button on:click={prev}>◀</button>
    <button on:click={next}>▶</button>
  </div>
</div>

<style>
  .slideshow-container {
    overflow: hidden;
    width: 100%;
    position: relative;
    touch-action: pan-y;
  }

  .slideshow-track {
    display: flex;
    transition: transform 0.3s ease;
    will-change: transform;
  }

  .slide {
    min-width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slide img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .controls {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    width: 100%;
    justify-content: space-between;
  }

  .controls button {
    background: var(--Resalte);
    background: var(--Resalte);
    border: none;
    padding: 8px 16px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.5s ease;
    border-radius: 16px;
  }
  
  .controls button:hover {
    background: var(--Resalte-claro);
    color: var(--blanco);
    border-radius: 50%;
  }
</style>
