<script>
    import { onMount } from 'svelte';
    import { base } from '$app/paths';
    import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    import { Canvas } from '@threlte/core';
	import { useThrelte } from '@threlte/core';
	import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
	import { PMREMGenerator, EquirectangularReflectionMapping } from 'three';
    import { AnimationMixer, Clock } from 'three';
    import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
    import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
    import { Text } from 'troika-three-text';
    import gsap from 'gsap';
    
    

  
    let container;
    let mixer;
    const clock = new Clock();


    let model; // referencia global al modelo 3D
    let textMesh; // referencia global al texto 3D

    // Escalado responsivo
    const updateScale = () => {
      const baseWidth = 960;
      const scaleFactor = container.offsetWidth / baseWidth;
      if (model) {
        model.scale.setScalar(scaleFactor * 0.5);
      }

      if (textMesh) {
        textMesh.scale.setScalar(scaleFactor);
      };
    };


onMount(() => {
  const scene = new THREE.Scene();

  // Cámara
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 4);

  // Render
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // 💡 Ajusta la exposición aquí
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;


    container.appendChild(renderer.domElement);


    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    // ✅ Carga HDRI
    new RGBELoader()
      .setPath('/Recursos/') // Asegúrate que la ruta sea correcta
      .load('studio.hdr', (hdrTexture) => {
        const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture
        scene.environment = envMap
        scene.background = null // o new THREE.Color(0xeeeeee)
        hdrTexture.dispose()
        pmremGenerator.dispose()
      })


  // Luz
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(0, 3, 2);
    scene.add(directionalLight);
    directionalLight.castShadow = true;
    renderer.shadowMap.enabled = true;


// Texto
/*   const fontLoader = new FontLoader();
  fontLoader.load('/Fuentes/Thunder/Thunder ExtBd_Regular.json', (font) => {
    const textGeometry = new TextGeometry("I'm         avid", {
      font: font,
      size: 1.15,
      depth: 0,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.00001,
      bevelSize: 0.00001,
      bevelSegments: 1
    });

    textGeometry.computeBoundingBox();
    textGeometry.center();

    const textMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xBBBAE0, // var(--Verde-claro)
    });

    textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.set(-0.25, 1, -0.25); // ajusta según tu escena
    scene.add(textMesh);
    updateScale();
  }); */


  // Modelo

const loader = new GLTFLoader();
loader.load(
  '/Recursos/Sphere comb low pólly.glb',
  (gltf) => {
    model = gltf.scene;


    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      if (model) updateScale();
    });
    resizeObserver.observe(container);

    // Posición y rotación
    model.position.set(-0.25, 1, -0.25);
    model.rotation.set(0, 3, 0); // (x, y, z)

    // Material de vidrio tipo prisma ✨
const glassMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColor1: { value: new THREE.Color('#9effff') },
    uColor2: { value: new THREE.Color('#ff8cf4') },
    uIntensity: { value: 2.0 }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uIntensity;

    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPosition;

    // Rainbow hue shift
    vec3 hueShift(vec3 color, float shift) {
      const mat3 rgb2yiq = mat3(
        0.299,     0.587,     0.114,
        0.596,    -0.274,    -0.322,
        0.211,    -0.523,     0.312
      );
      const mat3 yiq2rgb = mat3(
        1.0,  0.956,  0.621,
        1.0, -0.272, -0.647,
        1.0, -1.106,  1.703
      );
      vec3 yiq = rgb2yiq * color;
      float hue = atan(yiq.z, yiq.y) + shift;
      float chroma = length(yiq.yz);
      yiq.y = chroma * cos(hue);
      yiq.z = chroma * sin(hue);
      return yiq2rgb * yiq;
    }

    void main() {
      float angle = dot(normalize(vNormal), normalize(vViewPosition));
      float fresnel = pow(1.0 - angle, 3.0) * uIntensity;

      // Time & view-based color shift
      vec3 baseColor = mix(uColor1, uColor2, 0.5 + 0.5 * sin(uTime * 2.0 + length(vWorldPosition) * 0.5));
      vec3 shiftedColor = hueShift(baseColor, uTime * 0.5 + uScroll * 0.01);

      vec3 glow = mix(baseColor, shiftedColor, fresnel);

      float alpha = fresnel + 0.2 + 0.2 * sin(uTime * 5.0 + angle * 10.0); // pulsing opacity

      gl_FragColor = vec4(glow, alpha);
    }
  `,
  transparent: true,
  depthWrite: false,
  side: THREE.DoubleSide
});

const pinkMaterial = new THREE.MeshStandardMaterial({
  color: 0xff00aa,
  roughness: 0.2,
  metalness: 0.5
});

const chromeMaterial = new THREE.MeshStandardMaterial({
  color: 0xaaaaaa,
  roughness: 0,
  metalness: 1
});


    // Asignar material a cada malla
    model.traverse((child) => {
      if (child.isMesh) {
        child.material = glassMaterial;
        child.renderOrder = 2; // asegura visibilidad sobre fondo/texto
        child.material.needsUpdate = true;
      }
    });

    // Animación embebida (si existe)
    if (gltf.animations && gltf.animations.length) {
      mixer = new AnimationMixer(model);
      // Itera sobre todas las animaciones y ejecútalas
      gltf.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
    }

    scene.add(model);
    model.visible = false;
    model.position.x = -3;



    
    const backgroundEl = document.querySelector('.background');

    let isAnimating = false;
    let isInsideRange = false;

    if (backgroundEl) {
      backgroundEl.addEventListener('scroll', () => {
        const scrollY = backgroundEl.scrollTop;
        const entryPoint = 5500;
        const exitPoint = 7000;

        const shouldBeVisible = scrollY >= entryPoint && scrollY <= exitPoint;

        // --- Entrada / Salida controlada ---
        if (model && !isAnimating && shouldBeVisible !== isInsideRange) {
          isAnimating = true;
          isInsideRange = shouldBeVisible;

          gsap.killTweensOf(model.position);
          gsap.killTweensOf(model.material);

          if (shouldBeVisible) {
            model.visible = true;

            gsap.to(model.position, {
              x: 0.5,
              duration: 1.2,
              ease: 'power3.out'
            });

            gsap.to(model.material, {
              opacity: 1,
              duration: 1.2,
              ease: 'power2.out',
              onComplete: () => {
                isAnimating = false;
              }
            });
          } else {
            gsap.to(model.position, {
              x: -10,
              duration: 1.5,
              ease: 'power4.inOut'
            });

            gsap.to(model.material, {
              opacity: 0,
              duration: 1.5,
              ease: 'power2.inOut',
              onComplete: () => {
                isAnimating = false;
              }
            });
          }
        }

        // --- Rotación independiente, solo si no se está animando entrada/salida ---
    // --- Rotación independiente, solo si no se está animando entrada/salida ---
    if (model && !isAnimating && isInsideRange) {
      const relativeScroll = scrollY - entryPoint;
      const desiredRotationY = 3 + relativeScroll * -0.005;
      const desiredRotationX = relativeScroll * 0.0005;

      const currentY = model.rotation.y;
      const currentX = model.rotation.x;

      // Máxima diferencia permitida por frame
      const maxDelta = 0.05;

      // Limitar velocidad de cambio
      const targetRotationY = currentY + Math.max(-maxDelta, Math.min(desiredRotationY - currentY, maxDelta));
      const targetRotationX = currentX + Math.max(-maxDelta, Math.min(desiredRotationX - currentX, maxDelta));

      gsap.to(model.rotation, {
        y: targetRotationY,
        x: targetRotationX,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

      });
    }







  },
  undefined,
  (error) => {
    console.error('Error al cargar el modelo:', error);
  }
);




  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateScale();
  });



 




  // Loop
  const animate = () => {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
};


  animate();
});
</script>

<style>
.scene-container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 0;
    max-width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(180px);
    z-index: 0;
    pointer-events: none;
}
</style>

<div bind:this={container} class="scene-container"></div>