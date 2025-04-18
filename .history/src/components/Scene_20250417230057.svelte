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
    const glassMaterial = new THREE.MeshPhysicalMaterial({
        transmission: 1.55,
        transparent: true,
        opacity: 1, // NO < 1 si estás usando transmission
        roughness: 0,
        metalness: 0,
        thickness: 2, // prueba también con valores mayores
        ior: 1.5,
        reflectivity: 0.9,
        side: THREE.DoubleSide,
        envMapIntensity: 2.5,
        clearcoat: 1,
        clearcoatRoughness: 0,
        color: 0xffffff, // color base
        specularIntensity: 1,
        depthWrite: false, // 🔑 esto debe estar en false
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


    
    const backgroundEl = document.querySelector('.background');

    if (backgroundEl) {
      backgroundEl.addEventListener('scroll', () => {
        const scrollY = backgroundEl.scrollTop;
        const targetRotation = 3 + scrollY * -0.0015;

        if (model) {
          gsap.to(model.rotation, {
            y: targetRotation,
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
    max-width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(180px);
}
</style>

<div bind:this={container} class="scene-container"></div>