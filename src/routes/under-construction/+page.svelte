<script>
  import { base } from '$app/paths';
  const portfolio = base + '/#works';
</script>

<svelte:head>
  <title>Under construction · David López</title>
</svelte:head>

<main class="construction">
  <div class="stage">
    <img class="staircase" src={base + '/Recursos/Construction/staircase.png'}
      width="1034" height="755" alt="Tiny builders assemble a violet spiral staircase with translucent lime panels." />
    <section class="message">
      <p class="eyebrow">Good things take time</p>
      <h1>Under<br />construction</h1>
      <p class="description">This page is taking shape. I'm working on the details to make the experience worth the wait.</p>
      <div class="actions">
        <a class="return" href={portfolio}>Back to portfolio <span aria-hidden="true">↗</span></a>
        <ul aria-label="Design process">
          <li>Designing</li>
          <li class="current">Testing</li>
          <li>Refining</li>
        </ul>
      </div>
    </section>
  </div>
</main>

<style>
  .construction {
    --violet: #5e00ff;
    color: var(--violet);
    --header-space: 80px;
    padding-bottom: var(--header-space);
    min-height: 100svh;
    background-color: #f6f1ff;
    background-image: linear-gradient(to right, white 6%, transparent 6%),
      linear-gradient(to bottom, transparent calc(100% - 1px), #ece5fa 1px);
    background-size: calc(100% / 12) 100%, 100% 55.5vh;
    background-position: left top, left 27.3vh;
  }
  .eyebrow, li {
    font: 10px/1.4 Arial, sans-serif;
    letter-spacing: 1.25px;
    text-transform: uppercase;
  }
  .description, li { color: #666575; }
  .current { color: var(--violet); }
  a { text-decoration: none; }
  .stage {
    position: relative;
    display: grid;
    align-items: center;
    min-height: max(calc(100svh - var(--header-space)), 48vw);
    isolation: isolate;
    background: radial-gradient(ellipse at 75% 48%, white 33%, transparent 73%);
  }
  .staircase {
    position: absolute;
    z-index: -1;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 65.7%;
    height: auto;
    clip-path: polygon(12% 0, 100% 0, 100% 100%, 0 100%, 0 62%, 12% 55%);
    mask-image: linear-gradient(to bottom, transparent, black 4%, black 96%, transparent);
  }
  .message { width: max-content; max-width: 90%; margin-left: 6.95vw; }
  .eyebrow { display: flex; align-items: center; gap: 12px; }
  .eyebrow::before {
    content: ''; width: 7px; height: 7px; border-radius: 50%;
    background: #a4ed00; box-shadow: 0 0 0 5px #eaf6d2;
  }
  h1 {
    margin: .22em 0 .27em;
    font: 100 clamp(58px, 7vw, 148px)/.83 'Publica Sans Thin', sans-serif;
    letter-spacing: -.057em;
  }
  .description { max-width: 385px; font-size: 15px; line-height: 1.55; }
  .actions, .return { display: flex; align-items: center; }
  .actions { margin-top: 31px; gap: 28px; }
  .return {
    width: 230px; min-height: 56px; justify-content: space-between;
    padding: 0 13px 0 18px; border: 1px solid currentColor; border-radius: 36px;
    background: #ffffffa6; color: var(--violet); font-size: 12px;
  }
  .return span {
    display: grid; place-items: center; width: 28px; height: 28px;
    background: var(--violet); color: white; border-radius: 50%;
  }
  a:hover, a:focus-visible { background: white; outline: 2px solid var(--violet); outline-offset: 2px; }
  ul { display: grid; gap: 6px; list-style: none; }
  li { font-size: 8px; }
  @media (max-width: 760px) {
    .construction { background-size: 25% 100%, 100% 50vh; }
    .stage { display: flex; flex-direction: column; min-height: calc(100svh - var(--header-space)); }
    .message { order: -1; align-self: flex-start; margin: 40px 6vw 0; max-width: 88%; }
    h1 { font-size: clamp(52px, 14.4vw, 96px); }
    .actions { gap: 18px; }
    .return { width: min(53vw, 230px); }
    .staircase { position: relative; top: auto; transform: none; width: 100%; margin-top: 8px; }
  }
</style>
