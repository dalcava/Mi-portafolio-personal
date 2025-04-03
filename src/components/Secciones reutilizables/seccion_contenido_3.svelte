<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  export let title = "";
  export let subtitle = "";
  export let paragraphs = [];

  let sectionRef;
  let titleRef;
  let subtitleRef;
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
        ease: 'power3.out'
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

    if (paragraphRefs.length > 0) {
      tl.fromTo(paragraphRefs, {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0
      }, {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        stagger: 0.2
      }, "-=0.4");
    }
  });
</script>

<section bind:this={sectionRef} class="seccion tres">
  <div class="titulo">
    <h2 bind:this={titleRef}>{@html title}</h2>
    {#if subtitle}
      <h3 class="subtitle" bind:this={subtitleRef}>{@html subtitle}</h3>
    {/if}
  </div>
  <div class="doble-texto">
    {#each paragraphs as p, i}
      <p bind:this={(el) => paragraphRefs[i] = el}>{@html p}</p>
    {/each}
    {#each paragraphs as p, i}
      <p bind:this={(el) => paragraphRefs[paragraphs.length + i] = el}>{@html p}</p>
    {/each}
  </div>
</section>

<style>
  .seccion.tres {
    display: flex;
    gap: 3rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1rem;
  }

  .titulo {
    flex: 1;
  }

  .doble-texto {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h2,
  .subtitle,
  p {
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
    margin-bottom: 1rem;
  }

  p {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-S);
    color: #1f2b3f;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    .seccion.tres {
      flex-direction: column;
    }
  }
</style>
