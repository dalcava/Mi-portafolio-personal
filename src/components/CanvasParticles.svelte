<script>
    import { onMount, onDestroy } from 'svelte';
  
    let canvas;
    let ctx;
    let animationFrameId;
    let particlesArray = [];
    let mouse = { x: null, y: null, radius: 0 };
  
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = 'rgba(246, 246, 246, 0.5)';
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
  
      update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
  
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < mouse.radius) {
          let t = distance / mouse.radius;
          this.color = interpolateColor('#F6F6F6', '#044338', t);
        } else {
          this.color = '#D1D1D6';
        }
  
        if (distance < mouse.radius + this.size) {
          let angle = Math.atan2(dy, dx);
          let repelForce = 1.5;
          this.x -= Math.cos(angle) * repelForce;
          this.y -= Math.sin(angle) * repelForce;
        } else {
          this.x += (this.originX - this.x) * 0.1;
          this.y += (this.originY - this.y) * 0.1;
        }
  
        this.draw();
      }
    }
  
    function interpolateColor(color1, color2, t) {
      const c1 = hexToRgb(color1);
      const c2 = hexToRgb(color2);
      const r = Math.round(c1.r + (c2.r - c1.r) * t);
      const g = Math.round(c1.g + (c2.g - c1.g) * t);
      const b = Math.round(c1.b + (c2.b - c1.b) * t);
      return rgbToHex(r, g, b);
    }
  
    function hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
    }
  
    function rgbToHex(r, g, b) {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    }
  
    function initParticles() {
      particlesArray = [];
      const rows = 140;
      const cols = 32;
      const gridWidth = canvas.width / cols;
      const gridHeight = canvas.height / rows;
      const size = Math.min(canvas.width, canvas.height) * 0.00085;
  
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = col * gridWidth + gridWidth / 0.07535;
          let y = row * gridHeight + gridHeight / 2;
          let moveHorizontal = Math.random() > 0.5;
          let directionX = moveHorizontal ? (Math.random() * 0.2) - 0.1 : 0;
          let directionY = moveHorizontal ? 0 : (Math.random() * 0.2) - 0.1;
          particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
      }
    }
  
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particlesArray) p.update();
    }
  
    function checkCanvasSize() {
      if (window.innerWidth < 601) {
        cancelAnimationFrame(animationFrameId);
        canvas.style.display = 'none';
      } else {
        canvas.style.display = 'block';
        resizeCanvas();
        initParticles();
        animate();
      }
    }
  
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx = canvas.getContext('2d');
      mouse.radius = (canvas.height / 81) * (canvas.width / 81);
    }
  
    onMount(() => {
      resizeCanvas();
      checkCanvasSize();
  
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
      }, { passive: true });
  
      window.addEventListener('touchmove', (e) => {
        let touch = e.touches[0];
        mouse.x = touch.clientX;
        mouse.y = touch.clientY;
      }, { passive: true });
  
      window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
      });
  
      window.addEventListener('touchend', () => {
        mouse.x = undefined;
        mouse.y = undefined;
      });
  
      window.addEventListener('resize', () => {
        checkCanvasSize();
      });
  
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    });
  </script>
  
  <canvas id="canvas" bind:this={canvas}></canvas><!-- 
  <div class="blur-layer"></div> -->
  
  <style>
    #canvas {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: var(--blanco);
    }
  
/*     .blur-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
      background: var(--blanco);
      backdrop-filter: blur(1.5px);
      opacity: 0.1;
    } */
  </style>
  