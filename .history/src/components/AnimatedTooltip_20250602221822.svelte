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
    transform: translateX(-50%) translateY(10px) scale(0.95);
    background-color: var(--Resalte--muy-oscuro);
    color: white;
    padding: 6px 12px;
    border-radius: 16px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.4s ease,
      transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); /* ⚡ estilo Aceternity */
  }

  .tooltip-container:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0px) scale(1);
  }
</style>
