<script>
  let width;
  let height;
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<h1>Screen Size</h1>
<p>
  {width} x {height} px
</p>

<style>
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