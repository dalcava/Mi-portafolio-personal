<script>
  export let title = "";
  export let subtitle = "";
  export let paragraphs = [];
</script>

<section class="seccion tres">
  <div class="titulo">
      <h2 class="split-line">{@html title}</h2>

      {#if subtitle}
        <h3 class="subtitle split-line">{@html subtitle}</h3>
      {/if}
  </div>

  <div class="doble-texto">
    <div class="columna">
      {#each paragraphs.slice(0, Math.ceil(paragraphs.length / 2)) as p}
        <p>{@html p}</p>
      {/each}
    </div>
   <!--  <div class="columna">
      {#each paragraphs.slice(Math.ceil(paragraphs.length / 2)) as p}
        <p>{@html p}</p>
      {/each}
    </div> -->
  </div>
</section>

<style>
.seccion.tres {
    display: flex;
    gap: 20px;
    max-width: 1760px;
    margin: 0 auto;
    padding: 3rem 1rem;
    width: 100%;
}

  .titulo {
    flex: 1;
    max-width: 864px;
    min-width: 42%;
  }

  .doble-texto {
    flex: 2;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    width: 100%;
    max-width: 1217px;
}

  .columna {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 32px 56px;
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
    .seccion.tres {
      flex-direction: column;
    }

    .doble-texto {
      flex-direction: column;
    }
  }
</style>
