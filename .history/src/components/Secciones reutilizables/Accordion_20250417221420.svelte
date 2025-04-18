<script>
    let openIndex = null;
  
    function togglePanel(index) {
      openIndex = openIndex === index ? null : index;
    }
  </script>
  
  <section class="accordion-wrapper">
    {#each [0, 1, 2, 3] as index}
      <div class="panel" on:click={() => togglePanel(index)}>
        <div class="header">
          <h3>NTT Data - Europe & Latam {index + 1}</h3>
          <span>{openIndex === index ? "−" : "+"}</span>
        </div>
        {#if openIndex === index}
          <div class="Accordion-content clip-reveal">
            {#if index === 0}
              The content for panel 1.
              <ul>
                <li>Some</li>
                <li>List</li>
                <li>Items</li>
              </ul>
            {:else if index === 1}
              The content for panel 2.
            {:else if index === 2}
              The content for panel 3.
              <ul>
                <li>Some</li>
                <li>More</li>
                <li>List</li>
                <li>Items</li>
                <li>To</li>
                <li>Show</li>
                <li>Big</li>
                <li>Height</li>
              </ul>
            {:else}
              If you like this component, you can thank <strong>me</strong> who pushed me to make it. He was right, accordions are awesome! 😄
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </section>
  
  <style>
  .accordion-wrapper {
    max-width: 800px;
    margin: 2rem auto;
    font-family: "Publica Sans", sans-serif;
    width: 100%;
    transition: all 0.5s ease;
  }
  
  .panel {
    border-bottom: 1px solid var(--Gris-claro);
    cursor: pointer;
    padding: 1rem 0;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-M);
    color: var(--Gris-oscuro);
  }
  
  .header span {
    color: var(--Verde-claro);
  }
  .header h3 {
    font-size: var(--font-size-S);
    color: var(--Verde);
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
  