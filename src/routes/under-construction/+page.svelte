<script>
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Under construction · David López</title>
</svelte:head>

<main class="construction">
  <img class="artwork" src={base + '/Recursos/Construction/UNDER CONSTRUCTION PAGE.png'}
    width="1920" height="1080" alt="" />
  <section aria-labelledby="construction-title">
    <p class="eyebrow">Page in progress</p>
    <h1 id="construction-title">Under<br />construction.</h1>
    <p class="description">I'm building the next part of the experience. It will be ready to explore soon.</p>
    <a href={base + '/#works'}>Back to portfolio <span aria-hidden="true">⟶</span></a>
  </section>
</main>

<style>
  .construction {
    position: relative;
    isolation: isolate;
    display: grid;
    align-content: center;
    min-height: 100vh;
    min-height: 100dvh;
    --guide-offset: clamp(24px, 8.35vw, 120px);
    padding: clamp(68px, 15vh, 160px) var(--guide-offset) 100px;
    color: white;
    background: #000;
  }
  .artwork, .construction::before {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .artwork { z-index: -2; object-fit: cover; object-position: center; }
  .construction::before {
    content: '';
    z-index: -1;
    pointer-events: none;
    background:
      repeating-linear-gradient(90deg, #080a1026 0 .6vw, transparent .6vw calc(100vw / 12)),
      linear-gradient(90deg, #0a0d15cf, #0a0d1580 48%, #0a0d1540),
      linear-gradient(0deg, #090d1480, transparent 55%);
  }
  section { min-width: 0; }
  .construction::after {
    content: '';
    position: absolute;
    inset: 0 auto 0 var(--guide-offset);
    z-index: -1;
    border-left: 1px solid var(--Resalte);
    pointer-events: none;
  }
  a { font: 700 10px/1.4 Arial, sans-serif; text-transform: uppercase; letter-spacing: 1.2px; }
  .eyebrow {
    font: 500 var(--font-size-S)/1.2 'Publica Sans', sans-serif;
    color: var(--Resalte);
    margin: 0;
    padding-left: 6px;
    width: 6%;
    min-width: max-content;
    transform: translateY(-70%) translateX(-6px);
    opacity: 1;
    transition: transform .5s ease, opacity .5s ease;
    mix-blend-mode: difference;
  }
  h1 {
    margin: .27em 0 .32em;
    font: 700 var(--font-size-XXXL)/1.1 'Publica Sans Thin', sans-serif;
    letter-spacing: 1px;
    transform: translateX(-6px);
    width: fit-content;
    background: linear-gradient(45deg, #c5a3ff 27%, #ff7e7e 79%);
    background-clip: text;
    color: transparent;
  }
  .description { max-width: 390px; color: #f3f2f4; font-size: 16px; line-height: 1.55; }
  a {
    margin-top: 30px; display: inline-flex; min-height: 48px; min-width: 218px;
    align-items: center; justify-content: space-between; padding: 0 20px;
    color: var(--blanco);
    background: var(--Resalte);
    border-top-right-radius: 16px;
    border-bottom-right-radius: 16px;
    text-decoration: none;
  }
  a span { font: 22px/1 Arial, sans-serif; }
  a:hover, a:focus-visible { background: var(--Resalte-oscuro); }
  a:focus-visible { outline: 2px solid white; outline-offset: 4px; }
  @media (max-width: 600px) {
    .construction { --guide-offset: 6vw; }
    h1 { font-size: clamp(30px, 10vw, 60px); }
    .description { max-width: 32ch; }
    .artwork { object-position: 60% center; }
  }
</style>
