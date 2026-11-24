<script>
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import { base } from '$app/paths';
    import gsap from 'gsap';
  
    let cursorEl;
    let pointer;
    let rippleTimer;

    afterNavigate(({ from, to }) => {
      if (!cursorEl || from?.url.pathname === to?.url.pathname) return;
      clearTimeout(rippleTimer);
      gsap.killTweensOf(cursorEl);
      cursorEl.classList.remove('ripple');
      gsap.set(cursorEl, { clearProps: 'all' });
      if (pointer) gsap.set(cursorEl, { ...pointer, xPercent: -50, yPercent: -50, scale: 1 });
    });
  
    onMount(() => {
      const moveCursor = (x, y) => {
        gsap.to(cursorEl, {
          x,
          y,
          duration: 0.5,
          ease: "expoScale(0.5,7,none)"
        });
      };
  
      const updateStyle = (styleObj) => {
        Object.assign(cursorEl.style, styleObj);
      };
  
      function handleMouseMove(e) {
        const target = e.target;
        pointer = { x: e.clientX, y: e.clientY };
  
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
            mixBlendMode: "multiply",
            backgroundImage: "none",
            border: "1px solid var(--transparent)"
          });
  
          cursorEl.classList.add("ripple");
          clearTimeout(rippleTimer);
          rippleTimer = setTimeout(() => cursorEl.classList.remove("ripple"), 300);
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
            backgroundColor: "var(--Resalte-inverso)",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            zIndex: "15000",
            border: "1px solid var(--transparent)",
            backgroundImage: "none",
            mixBlendMode: "difference",
            scale: "1"
          });
        }
      }
      document.addEventListener('mousemove', handleMouseMove);
      const element = cursorEl;
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(rippleTimer);
        gsap.killTweensOf(element);
      };
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
      background-color: var(--Resalte-inverso);
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
