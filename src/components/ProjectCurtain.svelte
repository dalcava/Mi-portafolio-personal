<script>
  import { onNavigate } from '$app/navigation';

  let curtain;
  let sequence = 0;
  let animation;

  onNavigate(async ({ from, to }) => {
    if (!from || !to || from.url.pathname === to.url.pathname) return;
    const current = ++sequence;
    animation?.cancel();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const home = to.route.id === '/';
    curtain.hidden = false;
    if (!reduced) {
      animation = curtain.animate(
        [{ transform: 'translateY(100%)' }, { transform: 'none' }],
        { duration: home ? 120 : 200, easing: 'cubic-bezier(.45,0,.15,1)' }
      );
      await animation.finished.catch(() => {});
    }

    return () => {
      if (current !== sequence) return;
      if (reduced) {
        curtain.hidden = true;
        return;
      }
      animation = curtain.animate(
        [{ transform: 'none' }, { transform: 'translateY(-100%)' }],
        { duration: home ? 400 : 1050, easing: 'cubic-bezier(.16,1,.3,1)' }
      );
      animation.onfinish = () => {
        if (current === sequence) curtain.hidden = true;
      };
    };
  });
</script>

<div bind:this={curtain} class="project-curtain" hidden aria-hidden="true"></div>

<style>
  .project-curtain {
    position: fixed;
    inset: 0;
    background: white;
    z-index: 2147483647;
    touch-action: none;
  }
</style>
