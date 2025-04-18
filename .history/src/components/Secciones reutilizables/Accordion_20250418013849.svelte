<script>
  import { slide } from 'svelte/transition';

  let openIndex = 0;

  const panels = [
    { title: "Working Experience" },
    { title: "Education" },
    { title: "Program knowledge" }
  ];

  function togglePanel(index) {
    openIndex = openIndex === index ? null : index;
  }

  function handleKey(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePanel(index);
    }
  }
</script>

<section class="accordion-wrapper">
  {#each panels as panel, index}
    <div class="panel">
      <div
        class="header"
        role="button"
        tabindex="0"
        aria-expanded={openIndex === index}
        aria-controls={"panel-content-" + index}
        on:click={() => togglePanel(index)}
        on:keydown={(e) => handleKey(e, index)}
        id={"panel-header-" + index}
      >
        <h3>{panel.title}</h3>
        <span class:rotated={openIndex === index} aria-hidden="true">+</span>
      </div>

      {#if openIndex === index}
        <div
          class="Accordion-content"
          id={"panel-content-" + index}
          aria-labelledby={"panel-header-" + index}
          aria-hidden={openIndex !== index}
          transition:slide
        >
          {#if index === 0}
            <h2>UX/UI DESIGNER</h2>
            <p><span>NTT Data - Europe & Latam</span></p>
            <p>
              I have specialized in UX research and interface design, also contributing to projects in consulting, 
              VR application development, graphic and advertising design, and the creation of digital twins.
              Some of my standout projects at NTT Data include:
            </p>

            <div class="position">Virtual Office SurtiGas and GdO</div>
            <div class="subtitle">Date: 08/26/2024 - Present</div>

            <div class="position">SURA Portals Refactor</div>
            <div class="subtitle">Date: 05/07/2024 - 07/31/2024</div>

            <div class="position">Assessment UX/UI AvalPay</div>
            <div class="subtitle">Date: 01/01/2024 - 04/30/2024</div>

            <div class="position">Americas Digital Experience - Digital Twins</div>
            <div class="subtitle">Date: 08/23/2023 - 12/31/2023</div>

            <div class="position">Banco Caja Social Portal Migration</div>
            <div class="subtitle">Date: 09/18/2023 - 01/13/2024</div>

            <div class="position">Assessment UX/UI Portal AvalPay</div>
            <div class="subtitle">Date: 06/20/2023 - 12/22/2023</div>

            <h2>Junior Architect</h2>
            <p><span>Construcciones Castañeda SAS</span></p>
            <p>
              Responsibilities included on-site supervision for residential projects in Bogotá, Tabio, and La Calera; 
              creation of 2D and 3D representations and renderings; preparation of budgets and commercial proposals; 
              and client relationship management.
            </p>

            <h2>Pre-Professional Internship</h2>
            <p><span>Famisanar EPS</span></p>
            <p>
              Responsibilities included on-site supervision for residential projects in Bogotá, Tabio, and La Calera; 
              creation of 2D and 3D representations and renderings; preparation of budgets and commercial proposals; 
              and client relationship management.
            </p>

            <h2>Representation Assistant</h2>
            <p><span>Construcciones Castañeda SAS</span></p>
            <p>
              Developed 2D plans and perspectives for a housing unit in La Calera, oversaw the remodeling of the fifth floor 
              and roof of the Military Housing Fund, and contributed to the design of a contact center for Americas VPS.
            </p>

          {:else if index === 1}
            <h2>Bachelor of Architecture</h2>
            <p><span>Universidad Nacional de Colombia</span></p>
            <p>
              Comprehensive architectural education focused on design, urban planning, history, and construction systems.
            </p>

            <h2>UX/UI Specialization</h2>
            <p><span>Platzi / Coursera</span></p>
            <p>
              Courses in user research, interface design, accessibility, usability heuristics, interaction patterns, and design systems.
            </p>

          {:else}
            <ul>
              <li>Figma, Adobe XD, Illustrator, Photoshop</li>
              <li>After Effects, Blender, Twinmotion</li>
              <li>HTML, CSS, Svelte, JavaScript</li>
              <li>UX Research, Usability Testing, Design Thinking</li>
            </ul>
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
}

.panel {
  border-bottom: 1px solid var(--Gris-claro);
  padding: 2rem 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-XL);
  color: var(--Gris-oscuro);
  cursor: pointer;
  outline: none;
}

.header h3 {
  font-size: var(--font-size-XL);
  font-weight: 700;
  color: var(--Gris-muy-oscuro);
  margin: 0;
}

.header span {
  font-size: 2rem;
  font-weight: bold;
  transition: transform 0.3s ease;
  display: inline-block;
  margin-left: 1rem;
  color: var(--Verde-claro);
}

.header:focus {
  outline: 2px solid var(--Verde-claro);
  outline-offset: 4px;
}

.rotated {
  transform: rotate(45deg);
}

.Accordion-content {
  padding: 0.5rem 0 1rem 0;
  font-size: var(--font-size-S);
  color: var(--Gris-muy-oscuro);
}

.Accordion-content h2 {
  font-size: var(--font-size-M);
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}

.Accordion-content p {
  font-size: var(--font-size-M);
  margin: 0.5rem 0;
}

.Accordion-content p span {
  font-size: var(--font-size-XS);
  color: var(--Gris-oscuro);
}

.position {
  font-size: var(--font-size-M);
  font-weight: 700;
  color: var(--Gris-muy-oscuro);
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-bottom: 0;
}

.subtitle {
  font-size: var(--font-size-XS);
  color: var(--Gris-oscuro);
  margin-left: 1rem;
  margin-bottom: 1rem;
}
</style>
