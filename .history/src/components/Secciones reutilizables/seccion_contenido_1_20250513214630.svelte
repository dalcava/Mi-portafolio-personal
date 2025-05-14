<script>
  export let title = "";
  export let subtitle = ""; // NUEVO
  export let paragraphs = [];
  export let image = "";
  export let alt = "Ilustración";
</script>

<section class="seccion uno">
  <div class="contenido">
    <h2>{@html title}</h2>
    {#if subtitle}
      <h3 class="subtitle">{@html subtitle}</h3>
    {/if}
    
    {#each paragraphs as p}
      <p>{@html p}</p>
    {/each}
  </div>
  <div class="imagen">
    <img src={image} alt={alt} />
  </div>
</section>

<style>
  .seccion.uno {
    display: flex;
    flex-direction: column;
    gap: 8rem;
    padding: 3rem 1rem;
    max-width: 1760px;
    margin: 0 auto;
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

  p {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-S);
    color: var(--Gris-muy-oscuro);
    line-height: 140%;
    max-width: 1009px;
    width: 54%;
  }

  .imagen {
    min-width: 100%;
    max-height: 480px;
    overflow: hidden;
  }
  .imagen img {
    min-width: 100%;
    object-fit: contain;
    height: auto;
  }
</style>
