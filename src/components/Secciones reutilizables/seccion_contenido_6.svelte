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
      <h2>{@html title}</h2>
      {#if subtitle}
      <h3 class="subtitle">{@html subtitle}</h3>
      {/if}
    </div>
    <div class="imagen">
      <img src={image} alt={alt} />
    </div>
  </div>
  <div class="contenido">
    <div class="imagen">
      <img src={image2} alt={alt2} />
    </div>
    <div class="texto">
      {#each paragraphs as p}
        <p>{@html p}</p>
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

  .contenido {
    text-align: left;
    display: flex;
    flex-direction: row;
    gap: 8.4%;
    align-items: center;
  }

  .imagen {
    flex: 1;
    max-height: 280px;
    overflow: hidden;
  }
  .texto {
    flex: 1;
    max-width: 44%;
  }

  img {
    width: 100%;
    background: #e0e4ea;
    object-fit: contain;
  }

  p {
    font-family: 'Publica Sans';
    font-weight: 100;
    font-size: var(--font-size-S);
    color: var(--Gris-oscuro);
    line-height: 140%;
  }

  @media (max-width: 768px) {
    .contenido {
      flex-direction: column;
    }
  }
</style>
