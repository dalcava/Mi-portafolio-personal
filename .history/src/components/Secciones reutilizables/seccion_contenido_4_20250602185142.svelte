<script>
  export let title = "";
  export let subtitle = "";
  export let image = "";
  export let alt = "Ilustración";
  export let paragraphs = []; // 3 columnas de texto
</script>

<section class="seccion cuatro">
  <div class="top">
    <div class="titulo">

      <h2 class="split-line">{@html title}</h2>

      {#if subtitle}
        <h3 class="subtitle split-line">{@html subtitle}</h3>
      {/if}
      
    </div>
    {#if image}
      <div class="imagen">
        <img src={image} alt={alt} class="fade-in-img" />
      </div>
    {/if}
  </div>
  <div class="columnas">
    {#each paragraphs as p}
      <p>{@html p}</p>
    {/each}
  </div>
</section>

<style>
  .seccion.cuatro {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem 1rem;
    max-width: 1760px;
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
    min-width: 50%;
  }

  .imagen {
    min-width: 50%;
    max-height: 480px;
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
    line-height: 140%;
  }

  .subtitle {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-M);
    color: var(--Resalte);
    margin-bottom: 1rem;
  }

  .columnas {
    display: flex;
    gap: 2rem;
  }

  .columnas p {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-S);
    color: var(--Gris-muy-oscuro);
    line-height: 140%;
  }

  @media (max-width: 768px) {
    .top, .columnas {
      flex-direction: column;
    }
  }
</style>
