<script>
  export let label = "Let's work together!";
</script>

<div class="tooltip-container">
  <slot />
  <div class="tooltip">{label}</div>
</div>

<style>
  .tooltip-container {
    position: relative;
    display: inline-block;
  }

  .tooltip {
    position: absolute;
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%) translateY(10px) scale(0.8);
    background-color: var(--Resalte--muy-oscuro);
    color: white;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    animation: none;
    transform-origin: center bottom;
  }

  .tooltip-container:hover .tooltip {
    animation: bouncePop 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  }

  @keyframes bouncePop {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(10px) scale(0.8) rotate(-2deg);
    }
    40% {
      opacity: 1;
      transform: translateX(-50%) translateY(-4px) scale(1.05) rotate(1deg);
    }
    70% {
      transform: translateX(-50%) translateY(2px) scale(0.97) rotate(-1deg);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0px) scale(1) rotate(0deg);
    }
  }
</style>
