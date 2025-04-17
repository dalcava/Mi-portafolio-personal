import * as THREE from 'three';

export function glassTransition(node, params = {}) {
	let scene, camera, renderer, mesh, displacement;
	let triggered = false;
	const { onComplete, onReverse } = params; // función que se pasará desde el componente

	function init() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		scene = new THREE.Scene();
		camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
		camera.position.z = 1;

		const geometry = new THREE.PlaneGeometry(2, 2);

		const loader = new THREE.TextureLoader();
		displacement = loader.load('/Recursos/Displacement map.png');
		displacement.wrapS = displacement.wrapT = THREE.RepeatWrapping;

		const material = new THREE.ShaderMaterial({
			uniforms: {
				uDisp: { value: displacement },
				uStrength: { value: 0 },
				uTime: { value: 0.0 }
			},
			vertexShader: `
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform sampler2D uDisp;
				uniform float uStrength;
				uniform float uTime;
				varying vec2 vUv;

				void main() {
					vec2 distortedUv = vUv + (texture2D(uDisp, vUv).rg - 0.5) * uStrength;
					vec4 color = vec4(1.0, 1.0, 1.0, 0.0);
					gl_FragColor = mix(color, vec4(1.0, 1.0, 1.0, 1.0), length(distortedUv - vUv));
				}
			`,
			transparent: true
		});

		mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		renderer = new THREE.WebGLRenderer({ alpha: true });
		renderer.setSize(width, height);
		renderer.setPixelRatio(window.devicePixelRatio);
		node.appendChild(renderer.domElement);

		animate();
	}

	function animate() {
		requestAnimationFrame(animate);
		mesh.material.uniforms.uTime.value += 0.01;
		renderer.render(scene, camera);
	}

function onScroll() {
	const scrollY = node.scrollTop;
	const start = 800;
	const end = 1200;

	const fadeElement = document.querySelector('.hero');

	// Si scroll vuelve arriba del todo y estamos en el primer slide, dispara reversa
	if (triggered && scrollY < 10) {
		const isFirstSlide = isInFirstSwiperSlide();
		if (isFirstSlide && typeof onReverse === 'function') {
			onReverse();
			triggered = false;
		}
	}

	const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

	if (!mesh?.material?.uniforms) return;

	// Aplica siempre el progreso, incluso si ya se disparó (permite visual reverse)
	mesh.material.uniforms.uStrength.value = progress;
	scene.rotation.z = progress * 0.3;

	if (fadeElement) {
		fadeElement.style.opacity = `${1 - progress}`;
		fadeElement.classList.toggle('fade-out', progress >= 1);
	}

	// Solo dispara la animación si aún no fue activada
	if (!triggered && progress >= 1) {
		triggered = true;
		setTimeout(() => {
			if (typeof onComplete === 'function') {
				onComplete();
			}
		}, 300);
	}
}

	
	
	

	function isInFirstSwiperSlide() {
		const firstSlide = document.querySelector('.swiper-slide:first-child');
		return firstSlide?.classList.contains('swiper-slide-active');
	}

	init();
	node.addEventListener('scroll', onScroll);

	return {
		destroy() {
			node.removeEventListener('scroll', onScroll);
			node.removeChild(renderer.domElement);
			renderer.dispose();
		}
	};
}
