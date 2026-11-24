<script>
  import { base } from '$app/paths';
  export let href;
  export let pretitle = "Next project";
  export let title = "Kinetic rush";
  export let description = "";
  export let extraInfo = "";
  export let imageSrc = "";
  export let imageAlt = "Project preview";
  export let tag = "Passion project";
  import FooterIcons from '../Secciones home/Footer-icons.svelte';
</script>

<section class="Next">
  <div class="Contact">
    <h3 class="pretitle"> Did you <span>like the project?</span></h3>
    <div class="contactLayer">
      <p class="description"><span>Let’s connect! I’d love to share the case study with your team.</span></p>
      <FooterIcons/>
    </div>
  
  </div>
  <a class="next-project-section" href={base + href}>
    <div class="text-content">
      <h3 class="pretitle">Next <span> project</span></h3>
<!--       <hr /> -->
      <h2 class="title">{title}</h2>
      <p class="description">{description}</p>
      {#if extraInfo}<p class="extra">{extraInfo}</p>{/if}
      <span class="tag">{tag}</span>
    </div>
  
    <div class="image-wrapper">
      <img src={imageSrc} alt={imageAlt} />
    </div>
  </a>
</section>

<style>
  .Next{
    width: 100%;
    background: var(--Resalte--muy-oscuro);
    padding: 16px 0px 0px 160px;
    border-radius: 16px 16px 0 0;
  }
  .next-project-section {
    color: inherit;
    text-decoration: none;
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
  .text-content hr{
    color: var(--Resalte-claro)
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
    padding: 1.5rem 0;
    color: white;
    font-size: var(--font-size-XS);
    font-family: 'Publica Sans';
    font-weight: 500;
    margin-top: 1rem;
    margin-bottom: 2rem;
    border-bottom: var(--Resalte-claro) solid 1px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
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
    color: var(--blanco);
    line-height: 1.5;
    width: fit-content;
  }
  .description span {
    text-align: center;
    max-width: 640px;
    font-weight: 100;
    display: block;
  }

  .tag {
    display: inline-block;
    background: var(--Resalte-claro);
    color: var(--Resalte--muy-oscuro);
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
    border-radius: 16px 0 0 0;
  }

  .image-wrapper img {
    width: auto;
    min-height: 560px;
    object-fit: cover;
    display: block;
  }

  @media (min-width: 769px) {
    .Next {
      display: grid;
      grid-template-rows: auto 1fr;
      min-height: calc(100svh - 80px);
    }
    .text-content { gap: 1rem; }
    .image-wrapper { position: relative; min-height: 0; height: auto; align-self: stretch; }
    .image-wrapper img { position: absolute; inset: 0; width: 100%; height: 100%; min-height: 0; }
  }

  .contactLayer :global(.footer-button) { padding-block: 24px; }
  @media (max-width: 1600px) {
    .contactLayer :global(.footer-button) { padding-block: 16px; }
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
