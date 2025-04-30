<!-- src/lib/Footer.svelte -->
<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
</script>

<section class="footer">
    <div class="footer-content">
        <h2 class="footer-title">Do you like what you see?</h2>
        <p class="footer-text">
        Let's connect! I'd be happy to share my experience and discuss how my skills and expertise can contribute to your team.
        </p>
        <a href="mailto:you@example.com" class="footer-button">
            <img src="{base}/Recursos/Footer/Mail.svg" alt="About" /> Contact me
        </a>

        <div class="footer-icons">
        <a href="#"><i class="fa-solid fa-layer-group"></i></a>
        <a href="#"><i class="fa-brands fa-facebook"></i></a>
        <a href="#"><i class="fa-brands fa-instagram"></i></a>
        <a href="#"><i class="fa-brands fa-linkedin"></i></a>
        </div>
    </div>

    <div class="footer-gallery">
        <div class="gallery-image" style="background-image: url('/img1.jpg')"></div>
        <div class="gallery-image" style="background-image: url('/img2.jpg')"></div>
        <div class="gallery-image" style="background-image: url('/img3.jpg')"></div>
        <div class="gallery-image" style="background-image: url('/img4.jpg')"></div>
        <div class="gallery-image" style="background-image: url('/img5.jpg')"></div>
        <div class="gallery-image" style="background-image: url('/img6.jpg')"></div>
    </div>

    <p class="footer-copy">Copyright © 2025 Built By Me</p>
</section>

  <style>

.footer {
  background: linear-gradient(180deg, rgba(12, 0, 29, 1) 75%, rgba(59, 0, 153, 1) 130%);
  color: var(--Resalte-claro);
  text-align: center;
  padding: 4rem 1rem 0;
  font-family: 'Publica Sans', sans-serif;
  border-radius: 16px 16px 0px 0px;
  width: 100%;
  height: 100%;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
}

.footer-title {
  font-size: var(--font-size-XXXL);
  color: var(--Resalte);
  font-family: "Publica Sans thin";
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.footer-text {
  color: var(--blanco);
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: var(--font-size-S);
}

.footer-button {
  display: flex;
  padding: 32px 80px;
  background-color: white;
  color: var(--Resalte);
  border-radius: 16px;
  font-family: "Publica Sans", sans-serif;
  font-size: var(--font-size-S) !important;
  font-weight: 600 !important;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: all 0.3s;
  width: 300px;
}

.footer-button:hover {
  background-color: var(--Resalte-claro);
  color: white;
}

.footer-icons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}

.footer-icons a {
  color: var(--blanco);
  font-size: 1.25rem;
  transition: color 0.3s;
}

.footer-icons a:hover {
  color: var(--Resalte);
}

.footer-gallery {
  display: flex;
  overflow: hidden;
  margin-top: 3rem;
}

.gallery-image {
  flex: 1;
  height: 150px;
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
}

.footer-copy {
  color: var(--blanco);
  font-size: var(--font-size-XS);
  padding: 1rem;
}


  </style>
