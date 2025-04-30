<!-- src/lib/Footer.svelte -->
<section class="footer">
    <div class="footer-content">
        <h2 class="footer-title">Do you like what you see?</h2>
        <p class="footer-text">
        Let's connect! I'd be happy to share my experience and discuss how my skills and expertise can contribute to your team.
        </p>
        <a href="mailto:you@example.com" class="footer-button">
        <span>✉️</span> Contact me
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
  border-radius: 16px 0px 16px 0px;
  width: 100%;
  height: 100%;
}

.footer-title {
  font-size: var(--font-size-XL);
  font-weight: 800;
  margin-bottom: 1rem;
  font-family: 'Thunder Extra', sans-serif;
}

.footer-text {
  color: var(--blanco);
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: var(--font-size-S);
}

.footer-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: white;
  color: var(--Resalte);
  border-radius: 0.75rem;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 2rem;
  transition: all 0.3s;
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
  background-color: var(--Resalte--muy-oscuro);
  color: var(--blanco);
  font-size: var(--font-size-XS);
  padding: 1rem;
}


  </style>
