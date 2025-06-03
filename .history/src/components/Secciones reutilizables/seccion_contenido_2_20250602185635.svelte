<script>
  export let title = "";
  export let subtitle = "";
  export let paragraphs = [];
  export let image = "";
  export let alt = "Ilustración";
</script>

<section class="seccion dos">
  <div class="texto">
    <div class="cabecera">
      
      <h2 class="split-line">{@html title}</h2>

      {#if subtitle}
        <h3 class="subtitle split-line">{@html subtitle}</h3>
      {/if}

    </div>
    {#each paragraphs as p}
      <p class="split-text">{@html p}</p>
    {/each}
  </div>
  <div class="imagen">
        <img src={image} alt={alt} class="fade-in-img" />
  </div>
</section>

<style>
  .seccion.dos {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 195px;
    padding: 3rem 1rem;
    max-width: 1760px;
    width: 100%;
    margin: 0 auto;
  }

  .texto {
    flex: 1;
    min-width: 725px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .cabecera {
    text-align: left;
  }

  .imagen {
    max-width: 865px;
    max-height: 725px;
    overflow: hidden;
  }
  .imagen img {
    min-width: 100%;
    object-fit: contain;
    height: auto;
  }

  h2 {
    font-family: 'Publica Sans';
    font-size: var(--font-size-XXL);
    font-weight: 100;
    color: var(--Gris-muy-oscuro);
  }
  .subtitle {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-M);
    color: var(--Resalte);
    margin-bottom: 1rem;
  }

  p {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-S);
    color: var(--Gris-muy-oscuro);
    line-height: 140%;
  }

  @media (max-width: 768px) {
    .seccion.dos {
      flex-direction: column;
    }
  }
</style>
