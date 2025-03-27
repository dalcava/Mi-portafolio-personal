<script>
  // Aquí podrías manejar navegación o eventos más adelante
</script>

<header id="header" class="header-section start">
  <div class="personal-photo">
    <img src="/Recursos/header/personal-photo.svg" alt="Personal photo" />
  </div>

  <div class="header-content">
    <div class="icon-buttons">
      <div class="navigation-buttons">
        <div class="icon-button menu work" data-url="/">
          <span>Works</span>
          <img src="/Recursos/header/Proyects.svg" alt="Projects" />
        </div>
        <div class="icon-button menu contact">
          <span>Contact</span>
          <img src="/Recursos/header/contact.svg" alt="Contact" />
        </div>
      </div>
    </div>
  </div>

  <div class="icon-button Lightbulb">
    <img src="/Recursos/header/Scroll.gif" alt="Lightbulb" />
  </div>
</header>


<style>
  .header-section {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 128px;
    position: fixed;
    z-index: 3;
    gap: 25%;
    transition: transform 0.3s ease-out;
    padding: 0px 80px;
  }

  .personal-photo {
    width: 64px;
    height: 64px;
    object-fit: cover;
    cursor: pointer;
  }

  .personal-photo:hover img {
    scale: 1.1;
    transition: all 0.2s ease-out;
  }

  .header-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .icon-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .icon-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.2s ease-out;
    position: relative;
  }

  .icon-button img {
    width: 24px;
    height: 24px;
    opacity: 0;
    transform: translateX(-55%);
    clip-path: inset(10px 20px 30px 40px);
    transition: all 0.2s ease-out;
  }

  .icon-button:hover img {
    opacity: 1;
    transform: translateX(-10%) scale(1.05);
    clip-path: inset(0);
  }

  .icon-button span {
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.2s ease-out;
  }

  .icon-button:hover span {
    opacity: 0;
  }

  .navigation-buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 280px;
    max-width: 320px;
    width: 100%;
  }

  .Lightbulb img {
    width: 64px;
    height: 64px;
    cursor: pointer;
    transition: transform 0.2s ease-out;
  }

  .Lightbulb:hover img {
    transform: scale(1.1);
  }

  .work {
    color: var(--Verde-claro);
  }

  .contact {
    color: var(--Gris);
  }
</style>
