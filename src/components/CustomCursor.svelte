<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
	import { scale } from 'svelte/transition';
  
    let cursorEl;
  
    onMount(() => {
      const moveCursor = (x, y) => {
        gsap.to(cursorEl, {
          x,
          y,
          duration: 0.3,
          ease: "power3.out"
        });
      };
  
      const updateStyle = (styleObj) => {
        Object.assign(cursorEl.style, styleObj);
      };
  
      document.addEventListener("mousemove", (e) => {
        const target = e.target;
  
        moveCursor(e.clientX, e.clientY);
  
        // Swiper bullet
        if (target.classList.contains("swiper-pagination-bullet")) {
          updateStyle({
            transform: "translate(-50%, -50%) scale(1.5)",
            backgroundColor: "var(--Verde-claro)",
            borderRadius: "24px",
            width: "24px",
            height: "24px",
            mixBlendMode: "difference",
            backgroundImage: "none"
          });
        }
  
        // Swiper slide
        else if (
          target.classList.contains("active-gif") ||
          (target.classList.contains("imagen-contenida") && !target.classList.contains("swiper-slide-next"))
        ) {
          updateStyle({
            width: "64px",
            height: "64px",
            backgroundImage: "url('/Recursos/Cursor/Eye.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",            
            backgroundColor: "#f6f6f620",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "32px",
            mixBlendMode: "difference"
          });
        }
  
        // Blur zone
        else if (target.classList.contains("blur")) {
          updateStyle({
            width: "64px",
            height: "32px",
            backgroundImage: "url('/Recursos/Cursor/scroll.svg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "#f6f6f620",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "8px",
            mixBlendMode: "difference"
          });
        }
  
        // Pointer elements
        else if (getComputedStyle(target).cursor === "pointer") {
          updateStyle({
            transform: "translate(-50%, -50%) scale(3.5)",
            backgroundColor: "#ED5570",
            borderRadius: "24px",
            width: "48px",
            height: "48px",
            mixBlendMode: "difference",
            backgroundImage: "none"
          });
  
          cursorEl.classList.add("ripple");
          setTimeout(() => cursorEl.classList.remove("ripple"), 300);
        }
  
        // Text elements
        else if (
          getComputedStyle(target).cursor === "text" ||
          ["P", "SPAN", "H1", "H2", "H3", "H4", "H5", "H6"].includes(target.tagName)
        ) {
          updateStyle({
            width: "4px",
            height: "58px",
            backgroundColor: "rgba(7, 126, 105, 0.15)",
            borderRadius: "8px",
            border: "1px solid var(--Verde-claro)",
            backgroundImage: "none",
            mixBlendMode: "normal"
          });
        }
  
        // Default fallback
        else {
          updateStyle({
            transform: "translate(-50%, -50%) scale(1)",
            backgroundColor: "#ED5570",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            zIndex: "1000",
            border: "1px solid #ED5570",
            backgroundImage: "none",
            mixBlendMode: "difference",
            scale: "1"
          });
        }
      });
    });
  </script>
  
  <div bind:this={cursorEl} class="custom-cursor"></div>
  
  <style>
    .custom-cursor {
      position: fixed;
      top: 0;
      left: 0;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(1);
      pointer-events: none;
      z-index: 1000;
      transition: width 0.25s ease, height 0.25s ease, border-radius 0.25s ease, background-color 0.3s ease, mix-blend-mode 0.3s ease;
      mix-blend-mode: difference;
    }
  
    .custom-cursor.ripple::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 64px;
      height: 64px;
      background: #ED5570;
      opacity: 0.2;
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(1);
      animation: ripple-effect 0.35s ease-out;
      pointer-events: none;
    }
  
    @keyframes ripple-effect {
      0% {
        transform: translate(-50%, -50%) scale(0.8);
        opacity: 0.4;
      }
      100% {
        transform: translate(-50%, -50%) scale(2.5);
        opacity: 0;
      }
    }
  </style>
  