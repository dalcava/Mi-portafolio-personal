<!-- src/lib/Footer.svelte -->
<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { base } from '$app/paths';

</script>
        <a href="mailto:dalcava96@gmail.com" class="footer-button">
            <img src="{base}/Recursos/Footer/Mail.svg" alt="About" /> Contact me
        </a>

        <div class="footer-icons">
            <a href="https://www.artstation.com/dalcava" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-layer-group"><img src="{base}/Recursos/Footer/Artstation.svg" alt="Artstation" /></i>
            </a>
            <a href="https://www.behance.net/davidlpez39" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-behance"><img src="{base}/Recursos/Footer/Behance.svg" alt="Behance" /></i>
            </a>
            <a href="https://www.linkedin.com/in/david-a-l%C3%B3pez/" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-linkedin"><img src="{base}/Recursos/Footer/linkedin.svg" alt="LinkedIn" /></i>
            </a>
            <a href="https://www.instagram.com/dalcava/" target="_blank" rel="noopener noreferrer">
                <i class="fa-brands fa-instagram"><img src="{base}/Recursos/Footer/instagram.svg" alt="Instagram" /></i>
            </a>
        </div>

  <style>

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
  gap: 16px;
  transition: all 0.3s;
  width: 300px;
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


@media (max-width: 1600px) {
  .footer-button {
    padding: 24px 64px;
    font-size: var(--font-size-XS) !important;
    width: 256px;
  }

  }

  </style>
