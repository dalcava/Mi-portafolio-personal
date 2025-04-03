<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  export let title = "";
  export let subtitle = "";
  export let paragraphs = [];
  export let image = "";
  export let alt = "Ilustración";

  let sectionRef;
  let titleRef;
  let subtitleRef;
  let imageRef;
  let paragraphRefs = [];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      defaults: {
        duration: 0.8,
        ease: 'power3.out',
      }
    });

    tl.fromTo(titleRef, {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1
    });

    if (subtitle) {
      tl.fromTo(subtitleRef, {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0
      }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1
      }, "-=0.4");
    }

    tl.fromTo(imageRef, {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1
    }, "-=0.5");

    tl.fromTo(paragraphRefs, {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0
    }, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      stagger: 0.2
    }, "-=0.4");
  });
</script>

<section bind:this={sectionRef} class="seccion cuatro">
  <div class="top">
    <div class="titulo">
      <h2 bind:this={titleRef}>{@html title}</h2>
      {#if subtitle}
        <h3 class="subtitle" bind:this={subtitleRef}>{@html subtitle}</h3>
      {/if}
    </div>
    <div class="imagen">
      <img bind:this={imageRef} src={image} alt={alt} />
    </div>
  </div>
  <div class="columnas">
    {#each paragraphs as p, i}
      <p bind:this={(el) => paragraphRefs[i] = el}>{@html p}</p>
    {/each}
  </div>
</section>

<style>
  .seccion.cuatro {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
  }

  .titulo {
    flex: 1;
  }

  .imagen {
    flex: 1;
  }

  .imagen img {
    width: 100%;
    background: #e0e4ea;
    object-fit: contain;
  }

  h2,
  .subtitle,
  p,
  img {
    clip-path: inset(100% 0% 0% 0%);
    opacity: 0;
    will-change: clip-path, opacity;
  }

  h2 {
    font-family: 'Publica Sans Bold';
    font-size: var(--font-size-XXL);
    font-weight: bold;
    color: #001537;
  }

  .subtitle {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-M);
    color: #888;
    margin-top: 0.5rem;
  }

  .columnas {
    display: flex;
    gap: 2rem;
  }

  .columnas p {
    flex: 1;
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-S);
    color: #1f2b3f;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .top,
    .columnas {
      flex-direction: column;
    }
  }
</style>
