<script>
  export let title = "";
  export let subtitle = "";
  export let image = "";
  export let image2 = "";
  export let alt = "Ilustración";
  export let alt2 = "Ilustración";
  export let paragraphs = [];
</script>

<section class="seccion seis">
  <div class="cabecera">
    <div class="title">

      <h2 class="split-tittle">{@html title}</h2>

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
  <div class="contenido">
    <div class="imagen">
      <img src={image2} alt={alt2} class="fade-in-img" />
    </div>
    <div class="texto">
      {#each paragraphs as p}
        <p class="split-text">{@html p}</p>
      {/each}
    </div>
  </div>
</section>

<style>
  .seccion.seis {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 3rem 1rem;
    max-width: 1760px;
    margin: 0 auto;
  }

  .cabecera {
    text-align: left;
    display: flex;
    flex-direction: row;
    gap: 8.4%;
    align-items: center;
}

  .title {
    flex: 1;
    max-width: 44%;
  }
  .title span{
    color: var(--Resalte);
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

  .contenido {
    text-align: left;
    display: flex;
    flex-direction: row;
    gap: 8.4%;
    align-items: center;
  }

  .imagen {
    flex: 1;
    max-height: 400px;
    overflow: hidden;
  }
  .texto {
    flex: 1;
    max-width: 44%;
  }

  img {
    width: 100%;
    object-fit: contain;
  }

  p {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-S);
    color: var(--Gris-muy-oscuro);
    line-height: 140%;
  }

  @media (max-width: 768px) {
    .contenido {
      flex-direction: column;
    }
  }
</style>
