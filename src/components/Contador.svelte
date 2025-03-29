<script>
  let width;
  let height;
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="contador">
  <h1>Screen Size</h1>
  <p>
    {width} x {height} px
  </p>
</div>

<style>
  .contador {
    position: fixed;
    top: 0;
    left: 0;
    width: 50%;
    padding: 40px 48px;
    z-index: 1000;
    text-align: start;
  }
  h1 {
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-XXS);
    font-weight: 100;
    color: var(--Gris-oscuro);
  }
  p {
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-S);
    font-weight: 300;
    color: var(--Gris-oscuro);
  }
</style>