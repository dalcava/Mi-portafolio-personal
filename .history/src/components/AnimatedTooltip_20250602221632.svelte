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
    transform: translateX(-50%) translateY(10px);
    background-color: var(--Resalte-oscuro);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .tooltip-container:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
</style>
