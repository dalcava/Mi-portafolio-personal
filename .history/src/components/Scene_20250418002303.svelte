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

 
    const loader = new THREE.CubeTextureLoader();
const envMap = loader.load([
  '/textures/px.jpg', '/textures/nx.jpg',
  '/textures/py.jpg', '/textures/ny.jpg',
  '/textures/pz.jpg', '/textures/nz.jpg'
]);

scene.background = envMap;
scene.environment = envMap;

const glassMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uEnvMap: { value: envMap },
    uRefractionRatio: { value: 1.02 },
    uChromaticAberration: { value: 0.025 },
    uFresnelPower: { value: 3.5 },
    uTint: { value: new THREE.Color('#b587ff') } // violet/pinkish core
  },
  vertexShader: `
    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;

    void main() {
      vWorldNormal = normalize(mat3(modelMatrix) * normal);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    precision highp float;

    uniform samplerCube uEnvMap;
    uniform float uTime;
    uniform float uRefractionRatio;
    uniform float uChromaticAberration;
    uniform float uFresnelPower;
    uniform vec3 uTint;

    varying vec3 vWorldNormal;
    varying vec3 vWorldPosition;

    vec3 getRefraction(vec3 normal, float ratio, float shift) {
      vec3 viewDir = normalize(vWorldPosition - cameraPosition);
      vec3 refractDir = refract(viewDir, normal, ratio + shift);
      return textureCube(uEnvMap, refractDir).rgb;
    }

    void main() {
      float fresnel = pow(1.0 - dot(normalize(vWorldNormal), normalize(vWorldPosition - cameraPosition)), uFresnelPower);

      // RGB shifted refraction
      vec3 refR = getRefraction(vWorldNormal, uRefractionRatio,  uChromaticAberration);
      vec3 refG = getRefraction(vWorldNormal, uRefractionRatio,  0.0);
      vec3 refB = getRefraction(vWorldNormal, uRefractionRatio, -uChromaticAberration);
      vec3 chroma = vec3(refR.r, refG.g, refB.b);

      // Darker refracted base
      chroma *= 0.4;

      // Inner core glow
      float coreGlow = pow(dot(normalize(vWorldNormal), normalize(vWorldPosition - cameraPosition)), 2.0);
      vec3 glowColor = vec3(0.8, 0.4, 1.0) * coreGlow * 1.5;

      // Fresnel edge
      vec3 fresnelGlow = vec3(1.2, 0.7, 1.8) * fresnel;

      // Final blend
      vec3 color = mix(chroma, uTint, 0.3) + fresnelGlow + glowColor;
      color = pow(color, vec3(10.0 / 1.1)); // brighten mids

      float alpha = 0.99 + fresnel * 0.0004;

      gl_FragColor = vec4(color, alpha);
    }
  `,
  transparent: true,
  side: THREE.FrontSide,
  depthWrite: false
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