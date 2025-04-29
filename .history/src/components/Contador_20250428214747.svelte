<script>
  let width;
  let height;
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<div class="contador">
  <p>
    {width} x {height} 
  </p>
<!--   <h2>Screen</h2> -->
</div>

<style>
  .contador {
    position: fixed;
    top: 0;
    left: 0;
    width: 25%;
    padding: 32px 48px;
    z-index: 1000;
    text-align: start;
  }
  h2 {
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-XXS);
    font-weight: 100;
    color: var(--Resalte);
  }
  p {
    font-family: "Publica Sans", sans-serif;
    font-size: var(--font-size-XS);
    font-weight: 100;
    color: var(--Resalte);
  }

  @media (max-width: 1000px) {
    .contador {
      width: 100%;
      padding: 0;
      top: 16px;
      left: 16px;
    }
    h2 {
      font-size: var(--font-size-XXS);
    }
    p {
      font-size: var(--font-size-XS);
    }
  }


</style>
