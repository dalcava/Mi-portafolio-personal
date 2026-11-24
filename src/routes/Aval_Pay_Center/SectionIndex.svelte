<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  const sections = [
    ['overview', 'Aval Pay Center'],
    ['context', 'Looking for a change'],
    ['challenge', 'Challenges and learnings'],
    ['methodology', 'Methodology'],
    ['wireframes', 'Concept and wireframes'],
    ['visual-design', 'Look and feel'],
    ['details', 'Design details'],
    ['walkthrough', 'Product walkthrough'],
    ['screens', 'Final screens']
  ];

  let active = 'overview';
  let rail;
  let covered = 100;
  let coveredFromBottom = 0;

  onMount(() => {
    const targets = sections.map(([id]) => document.getElementById(id));
    const cover = targets[0].querySelector('.video-wrapper') ?? targets[0];
    const nextProject = document.getElementById('next-project');
    let frame = 0;
    function sync() {
      frame = 0;
      const bounds = rail.getBoundingClientRect();
      covered = Math.min(100, Math.max(0, (cover.getBoundingClientRect().bottom - bounds.top) / bounds.height * 100));
      const finalSectionTop = nextProject.getBoundingClientRect().top - 12;
      coveredFromBottom = Math.min(100, Math.max(0, (bounds.bottom - finalSectionTop) / bounds.height * 100));
      const readingLine = window.innerHeight * 0.35;
      const current = targets.findLast(section => section.getBoundingClientRect().top <= readingLine);
      active = current?.id ?? 'overview';
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(sync);
    }
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    observer.observe(cover);
    observer.observe(rail);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    sync();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  });
</script>

<nav bind:this={rail} style:--covered={covered + '%'} style:--covered-bottom={coveredFromBottom + '%'}
  class:concealed={covered + coveredFromBottom >= 100}
  aria-label="Aval Pay Center section index">
  {#each sections as [id, label]}
    <a href={'#' + id} aria-label={label} aria-current={active === id ? 'location' : undefined}>
      <img alt="" width="240" height="144" src={base + '/Recursos/Projects/Aval_Pay_Center/index/' + id + '.jpg'} />
    </a>
  {/each}
</nav>

<style>
  nav {
    position: fixed;
    z-index: 50;
    right: 9px;
    top: calc(50% - 36px);
    transform: translateY(-50%) scale(1.2);
    transform-origin: right center;
    display: grid;
    gap: 2px;
    padding: 4px;
    max-height: calc((100dvh - 100px) / 1.2);
    overflow-y: auto;
    background: rgb(255 255 255 / 92%);
    border-radius: 5px;
  }
  nav { clip-path: inset(var(--covered) -12px var(--covered-bottom) -12px); }
  nav.concealed { visibility: hidden; }
  a {
    position: relative;
    transition: transform 180ms ease-out;
    width: 46px;
    height: clamp(24px, 3.6vh, 36px);
    display: block;
    padding: 2px;
    border: 2px solid transparent;
    border-radius: 3px;
  }
  img { width: 100%; height: 100%; object-fit: cover; opacity: .58; transition: opacity .15s; }
  a[aria-current], a:focus-visible { border-color: #0b7dbb; }
  a[aria-current] img, a:hover img, a:focus-visible img { opacity: 1; }
  @media (hover: hover) {
    nav { padding-inline: 5px; }
    a:hover { transform: scale(1.2); z-index: 1; }
  }
  @media (prefers-reduced-motion: reduce) {
    a { transition: none; }
  }
  @media (max-width: 760px) {
    nav { right: 2px; gap: 0; padding: 1px; }
    a { width: 26px; height: 24px; padding: 1px; }
  }
</style>
