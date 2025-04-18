<script>
  let openIndex = null;

  const panels = [
    { title: "NTT Data - Europe & Latam" },
    { title: "Construcciones Castañeda" },
    { title: "Famisanar EPS" }
  ];

  function togglePanel(index) {
    openIndex = openIndex === index ? null : index;
  }
</script>

<section class="accordion-wrapper">
  {#each panels as panel, index}
    <div class="panel" on:click={() => togglePanel(index)}>
      <div class="header">
        <h3>{panel.title}</h3>
        <span>{openIndex === index ? "−" : "+"}</span>
      </div>
      {#if openIndex === index}
        <div class="Accordion-content clip-reveal">
          {#if index === 0}
            <p>Este es el contenido del primer panel. Puedes poner lo que quieras aquí.</p>
          {:else if index === 1}
            <ul>
              <li>Responsive</li>
              <li>Animaciones suaves</li>
              <li>Fácil de personalizar</li>
            </ul>
          {:else}
            <p>Este componente fue creado con ❤️ en Svelte. ¡Gracias por verlo!</p>
          {/if}
        </div>
      {/if}
    </div>
  {/each}
</section>

  
  <style>
  .accordion-wrapper {
    max-width: 800px;
    margin: 4rem auto;
    font-family: "Publica Sans", sans-serif;
    width: 100%;
    transition: all 0.5s ease;
  }
  
  .panel {
    border-bottom: 1px solid var(--Gris-claro);
    cursor: pointer;
    padding: 2rem 0;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-XL);
    color: var(--Gris-oscuro);
  }
  
  .header span {
    color: var(--Verde-claro);
  }
  .header h3 {
    font-size: var(--font-size-XL);
    font-family: "Publica Sans";
    font-weight: 700;
    color: var(--Gris-muy-oscuro);
  }
  
  ul {
    margin: 0.5rem 0 0 1rem;
    padding: 0;
    list-style-type: disc;
  }
  
  /* --- Reveal Animation --- */
  .Accordion-content {
    padding: 0.5rem 0 1rem 0;
    font-size: var(--font-size-S);
    color: var(--Gris);
    animation: clipReveal 0.5s ease-out forwards;
    overflow: hidden;
    clip-path: inset(100% 0% 0% 0%);
  }
  
  @keyframes clipReveal {
    from {
      clip-path: inset(0% 0% 100% 0%);
      opacity: 0;
    }
    to {
      clip-path: inset(0% 0% 0% 0%);
      opacity: 1;
    }
  }
  </style>
  