<script>
  export let pretitle = "Next project";
  export let title = "Kinetic rush";
  export let description = "";
  export let extraInfo = "";
  export let imageSrc = "";
  export let imageAlt = "Project preview";
  export let tag = "Passion project";
</script>

<seccion class="Next">
  <div class="Contact">
    <h3 class="pretitle"> Did you <span>like the project?</span></h3>
    <div class="contactLayer">
      <p class="description">Let’s connect! I’d be happy to share the full case study and discuss how my skills and experience can contribute to your team.</p>
    </div>
  
  </div>
  <div class="next-project-section">
    <div class="text-content">
      <h3 class="pretitle">Next <span> project</span></h3>
      <hr />
      <h2 class="title">{title}</h2>
      <p class="description">{description}</p>
      <p class="extra">{extraInfo}</p>
      <span class="tag">{tag}</span>
    </div>
  
    <div class="image-wrapper">
      <img src={imageSrc} alt={imageAlt} />
    </div>
  </div>
</seccion>

<style>
  .Next{
    background: var(--Resalte--muy-oscuro);
    padding: 16px 0px 16px 160px;
    border-radius: 16px 16px 0 0;
  }
  .next-project-section {
    display: flex;
    gap: 3rem;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .text-content {
    flex: 1;
    max-width: 33%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .pretitle {
    color: var(--blanco);
    font-size: var(--font-size-XXL);
    font-family: 'Publica Sans';
    font-weight: 100;
  }
  .pretitle span{
    color: var(--Resalte-claro);
    font-family: 'Publica Sans Thin';
  }

  .Contact{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .contactLayer {
    padding: 2rem 0rem;
    color: white;
    font-size: var(--font-size-XS);
    font-family: 'Publica Sans';
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 3rem;
    border-top: var(--Gris-claro) solid 1px;
    border-bottom: var(--Gris-claro) solid 1px;
    width: 100%;
  }

  .title {
    color: var(--Verde-claro);
    font-size: var(--font-size-L);
    font-family: 'Publica Sans Thin';
    margin-top: -1rem;
  }

  .description, .extra {
    font-size: var(--font-size-S);
    font-family: 'Publica Sans';
    font-weight: 100;
    color: #1f2b3f;
    line-height: 1.5;
  }

  .tag {
    display: inline-block;
    background: var(--Verde-claro);
    color: white;
    padding: 6px 18px;
    border-radius: 999px;
    font-size: var(--font-size-XS);
    font-family: 'Publica Sans';
    font-weight: 500;
    margin-top: 1rem;
    width: fit-content;
  }

  .image-wrapper {
    flex: 1;
    max-width: 1081px;
    min-height: 560px;
    overflow: hidden;
    height: 100%;
  }

  .image-wrapper img {
    width: auto;
    min-height: 560px;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) {
    .next-project-section {
      flex-direction: column;
      padding: 3rem 1rem;
    }

    .image-wrapper {
      order: -1;
    }
  }
</style>
