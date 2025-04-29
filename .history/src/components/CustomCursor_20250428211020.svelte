<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import gsap from 'gsap';
	import { scale } from 'svelte/transition';
  
    let cursorEl;
  
    onMount(() => {
      const moveCursor = (x, y) => {
        gsap.to(cursorEl, {
          x,
          y,
          duration: 0.5,
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
            borderRadius: "24px",
            width: "24px",
            height: "24px",
            mixBlendMode: "color-dodge",
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
            backgroundImage: `url('${base}/Recursos/Cursor/Eye.svg')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",            
            backgroundColor: "#f6f6f600",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "32px",
            mixBlendMode: "color-dodge",
            border: "1px solid var(--Naranja)"
          });
        }
  
        // Blur zone
        else if (target.classList.contains("blur")) {
          updateStyle({
            width: "64px",
            height: "32px",
            backgroundImage: `url('${base}/Recursos/Cursor/scroll.svg')`,

            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundColor: "#f6f6f620",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "8px",
            mixBlendMode: "color-dodge",
            border: "1px solid var(--Naranja)"
          });
        }
  
        // Pointer elements
        else if (getComputedStyle(target).cursor === "pointer") {
          updateStyle({
            transform: "translate(-50%, -50%) scale(3.5)",
            borderRadius: "24px",
            width: "48px",
            height: "48px",
            backgroundColor: "#FF7F50",
            mixBlendMode: "difference",
            backgroundImage: "none",
            border: "1px solid var(--transparent)"
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
            height: "48px",
            backgroundColor: "#FF7F50",
            mixBlendMode: "multiply",
            borderRadius: "8px",
            border: "1px solid var(--Naranja)",
            backgroundImage: "none",
            mixBlendMode: "normal"
          });
        }
  
        // Default fallback
        else {
          updateStyle({
            transform: "translate(-50%, -50%) scale(1)",
            backgroundColor: "var(--Resalte)",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            zIndex: "15000",
            border: "1px solid var(--transparent)",
            backgroundImage: "none",
            mixBlendMode: "multiply",
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
      z-index: 12000;
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
  