<script>
    export let imageSrc = "";
    export let imageAlt = "";
    export let title = "About the project";
    export let description = "";
    export let purpose = "";
    export let category = "";
    export let tools = []; // Array de objetos: [{ src: "/ruta", alt: "nombre" }]
  </script>
  
  <div class="proj-description">
    <div class="description-image">
      <img src={imageSrc} alt={imageAlt} />
    </div>
    <div class="description">
      <div class="about-project">
        <h2 class="description-title">
          {title.split(' ')[0]} <span>{title.split(' ').slice(1).join(' ')}</span>
        </h2>
        <div class="description-content">
          <p>
            {@html description}
            <br /><br />
            <strong>Purpose:</strong> {@html purpose}
          </p>
        </div>
        <div class="tools">
          <h3>{category}</h3>
          <div class="tools-icons">
            <p><strong>Tools Used:</strong></p>
            {#each tools as tool}
              <img src={tool.src} alt={tool.alt} />
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Pega aquí directamente los estilos que ya pasaste */
    .proj-description {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding:32px 24px  24px 0px;
    }
    .description-image {
      display: flex;
      width: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .description-image img{
      object-fit: cover;
      width: 100%;
    }
    .description {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Publica Sans";
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  
    .about-project {
      max-width: 800px;
      margin: 40px auto;
      padding-right: 24%;
    }
  
    .description-title {
      color: var(--Verde-claro);
      padding-bottom: 32px;
      font-family: "Publica Sans bold";
      font-size: var(--font-size-XXL);
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      border-bottom: 1px solid var(--Gris-claro);
    }
  
    .description-title span {
      color: var(--Gris);
    }
  
    .description-content {
      margin: 32px 0px;
    }
  
    .description-content p {
      color: var(--Gris-oscuro);
      font-family: "Publica Sans";
      font-size: var(--font-size-S);
      font-style: normal;
      font-weight: 300;
      line-height: 140%;
    }
  
    .description-content p strong {
      color: var(--Verde-claro);
      font-weight: 100;
    }
  
    .tools {
      border-top: 1px solid var(--Gris-claro);
    }
  
    .tools h3{
      color: var(--Verde-claro);
      font-family: "Publica Sans";
      font-size: var(--font-size-M);
      font-style: normal;
      font-weight: 300;
      line-height: normal;
      margin: 32px 0px;
    }
  
    .tools p{
      color: var(--Verde-oscuro);
      font-family: Satoshi;
      font-size: 16.104px;
      font-style: normal;
      font-weight: 900;
      line-height: 140%;
    }
  
    .tools-icons {
      display: flex;
      gap: 16px;
      align-items: center;
    }
  
    .tools-icons img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
  </style>
  