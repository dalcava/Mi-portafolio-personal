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
<!--             <p>Este es el contenido del primer panel. Puedes poner lo que quieras aquí.</p> -->

              <h2>UX/UI DESIGNER</h2>
              <p><span>NTT Data - Europe & Latam</span></p>
              <p>
                I have specialized in UX research and interface design, also contributing to projects in consulting, 
                VR application development, graphic and advertising design, and the creation of digital twins. 
                Some of my standout projects at NTT Data include:
              </p>

              <div class="position">DX - Virtual Office SurtiGas and GdO</div>
              <div class="subtitle">Date: 08/26/2024 - Present</div>

              <div class="position">DX - SURA Portals Refactor</div>
              <div class="subtitle">Date: 05/07/2024 - 07/31/2024</div>

              <div class="position">DX - Assessment UX/UI AvalPay</div>
              <div class="subtitle">Date: 01/01/2024 - 04/30/2024</div>

              <div class="position">Americas Digital Experience - Digital Twins</div>
              <div class="subtitle">Date: 08/23/2023 - 12/31/2023</div>

              <div class="position">DX - Banco Caja Social Portal Migration</div>
              <div class="subtitle">Date: 09/18/2023 - 01/13/2024</div>

              <div class="position">DX - Assessment UX/UI Portal AvalPay</div>
              <div class="subtitle">Date: 06/20/2023 - 12/22/2023</div>



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
    transition: all 0.3s ease;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--font-size-XL);
    color: var(--Gris-oscuro);
    transition: all 0.3s ease;
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
    color: var(--Gris-muy-oscuro);
    animation: clipReveal 0.5s ease-out forwards;
    overflow: hidden;
    clip-path: inset(100% 0% 0% 0%);
  }

  .Accordion-content h2 {
    font-size: var(--font-size-M);
    font-family: "Publica Sans";
    font-weight: 700;
    color: var(--Gris-muy-oscuro);
    margin-bottom: 16px;
  }
  .Accordion-content p {
    font-size: var(--font-size-XS);
    font-family: "Publica Sans";
    margin: 0.5rem 0;
  }
  .Accordion-content p span{
    color: var(--Verde-oscuro);
  }
  .position {
    font-size: var(--font-size-S);
    font-family: "Publica Sans";
    font-weight: 700;
    color: var(--Gris-muy-oscuro);
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: var(--font-size-XS);
    font-family: "Publica Sans";
    color: var(--Gris-muy-oscuro);
    margin-bottom: 16px;
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
  