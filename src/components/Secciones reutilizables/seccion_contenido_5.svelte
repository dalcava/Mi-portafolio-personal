<script>
  export let title = "";
  export let subtitle = "";
  export let image = "";
  export let alt = "Ilustración";
  export let paragraphs = [];
</script>

<section class="seccion cinco">
  <div class="imagen">
    <img src={image} alt={alt} />
  </div>
  <div class="texto">
    <h2>{@html title}</h2>
    {#if subtitle}
      <h3 class="subtitle">{@html subtitle}</h3>
    {/if}
    {#each paragraphs as p}
      <p>{@html p}</p>
    {/each}
  </div>
</section>

<style>
  .seccion.cinco {
    display: flex;
    gap: 12rem;
    padding: 3rem 1rem;
    max-width: 1760px;
    margin: 0 auto;
    align-items: center;
  }

  .imagen, .texto {
    flex: 1;
    min-width: 41.7%;
    height: 800px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  h2 {
    font-family: 'Publica Sans Bold';
    font-size: var(--font-size-XXL);
    font-weight: bold;
    color: var(--Gris-muy-oscuro);
    line-height: 140%;
  }

  .subtitle {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-M);
    color: var(--Verde-claro);
    margin-bottom: 1rem;
  }

  p {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-S);
    color: var(--Gris-oscuro);
    line-height: 140%;
  }

  @media (max-width: 768px) {
    .seccion.cinco {
      flex-direction: column;
    }
  }
</style>
