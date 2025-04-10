// src/lib/glassTransition.js
import { goto } from '$app/navigation';
import * as THREE from 'three';
import gsap from 'gsap';

export function glassTransition(node) {
	let scene, camera, renderer, mesh, displacement;
	let triggered = false;
	let scrollProgress = 0;

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

					vec4 color = vec4(1.0, 1.0, 1.0, 0.0); // transparente
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

    function onWheel(e) {
        if (triggered) return;
    
        const scrollThreshold = 800;
    
        // 👇 Verificamos dirección
        if (e.deltaY > 0) {
            scrollProgress += Math.abs(e.deltaY);
        } else {
            scrollProgress -= Math.abs(e.deltaY);
        }
    
        // 🔒 Limita scrollProgress entre 0 y scrollThreshold
        scrollProgress = Math.max(0, Math.min(scrollProgress, scrollThreshold));
    
        // 🎚️ Mapea progresivamente el strength
        const strength = (scrollProgress / scrollThreshold) * 10;
        mesh.material.uniforms.uStrength.value = strength;
    
        // 🎭 Opacidad visual del contenido
        const fadeElement = document.querySelector('.hero');
        if (fadeElement) {
            fadeElement.style.opacity = `${1 - strength / 8}`; // ← Normalizado
        }
    
        // ✅ Dispara transición solo si llegamos al tope y no antes
        if (scrollProgress >= scrollThreshold && !triggered) {
            triggered = true;
    
            gsap.to(mesh.material.uniforms.uStrength, {
                value: 1,
                duration: 1.2,
                onUpdate: () => {
                    fadeElement?.classList.add('fade-out');
                },
                onComplete: () => {
                    goto('/Works');
                }
            });
        }
    }
    
    

	init();
	window.addEventListener('wheel', onWheel);

	return {
		destroy() {
			window.removeEventListener('wheel', onWheel);
			node.removeChild(renderer.domElement);
			renderer.dispose();
		}
	};
}
