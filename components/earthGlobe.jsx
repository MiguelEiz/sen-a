'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { motion } from 'framer-motion';

export default function EarthGlobe({ showHUD = true, initialDistance = 2.5 }) {
    const containerRef = useRef(null);
    const [coordText, setCoordText] = useState('Haz clic en el planeta');
    const [autoRotate, setAutoRotate] = useState(true);
    
    const autoRotateRef = useRef(autoRotate);

    useEffect(() => {
        autoRotateRef.current = autoRotate;
    }, [autoRotate]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Escena, Cámara y Renderizador
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, initialDistance);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 2. Controles de órbita
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 1.3;
        controls.maxDistance = 6.0;
        controls.enablePan = false;

        // 3. Fondo de estrellas circulares, lejos de la cámara y del planeta.
        const starsGeometry = new THREE.BufferGeometry();
        const starsCount = 1800;
        const starPositions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount; i++) {
            const direction = new THREE.Vector3(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ).normalize();
            const distance = 80 + Math.random() * 70;
            direction.multiplyScalar(distance);
            direction.toArray(starPositions, i * 3);
        }
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

        const starCanvas = document.createElement('canvas');
        starCanvas.width = 32;
        starCanvas.height = 32;
        const starContext = starCanvas.getContext('2d');
        if (starContext) {
            const gradient = starContext.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.35, 'rgba(255,255,255,0.9)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            starContext.fillStyle = gradient;
            starContext.fillRect(0, 0, 32, 32);
        }
        const starTexture = new THREE.CanvasTexture(starCanvas);
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.75,
            map: starTexture,
            transparent: true,
            opacity: 0.95,
            sizeAttenuation: true,
            depthWrite: false,
        });
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(starField);

        // 4. Globo Terráqueo
        const earthGroup = new THREE.Group();
        scene.add(earthGroup);

        const radius = 1;
        const geometry = new THREE.SphereGeometry(radius, 64, 64);
        
        const earthMaterial = new THREE.MeshStandardMaterial({
            roughness: 0.8,
            metalness: 0.1
        });

        const earthMesh = new THREE.Mesh(geometry, earthMaterial);
        earthGroup.add(earthMesh);

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            '/earth.jpg',
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                earthMaterial.map = texture;
                earthMaterial.needsUpdate = true;
            },
            undefined,
            (error) => {
                console.error('Error al cargar /earth.jpg:', error);
            }
        );

        // 5. Iluminación
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
        sunLight.position.set(5, 3, 5);
        scene.add(sunLight);

        // 6. Marcadores interactivos
        const markersGroup = new THREE.Group();
        earthGroup.add(markersGroup);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handlePointerDown = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.clientWidth) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(earthMesh);

            if (intersects.length > 0) {
                const intersect = intersects[0];
                const point = intersect.point;

                const markerGeo = new THREE.SphereGeometry(0.025, 16, 16);
                const markerMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
                const marker = new THREE.Mesh(markerGeo, markerMat);
                
                earthGroup.worldToLocal(marker.position.copy(point));
                markersGroup.add(marker);

                const phi = Math.acos(Math.max(-1, Math.min(1, point.y / radius)));
                const theta = Math.atan2(point.z, point.x);
                const lat = (1.5707 - phi) * (180 / Math.PI);
                const lon = theta * (180 / Math.PI);

                setCoordText(`Lat: ${lat.toFixed(1)}° | Lon: ${lon.toFixed(1)}°`);
            }
        };

        const domElement = renderer.domElement;
        if (showHUD) {
            domElement.addEventListener('pointerdown', handlePointerDown);
        }

        // 7. Bucle de Animación
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (autoRotateRef.current) {
                earthGroup.rotation.y += 0.001;
            }
            starField.rotation.y += 0.0002;
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (showHUD) {
                domElement.removeEventListener('pointerdown', handlePointerDown);
            }
            cancelAnimationFrame(animationFrameId);
            if (container) container.removeChild(renderer.domElement);
            geometry.dispose();
            earthMaterial.dispose();
            starsGeometry.dispose();
            starsMaterial.dispose();
            starTexture.dispose();
        };
    }, [initialDistance, showHUD]);

    return (
        <div className="relative w-full h-full overflow-hidden font-sans">
            <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />

            {/* HUD opcional: solo se muestra si showHUD es true */}
            {showHUD && (
                <motion.div 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-cyan-500/35 text-white flex items-center gap-3 shadow-[0_0_20px_rgba(0,200,255,0.12)] z-20 pointer-events-auto"
                >
                    <div>
                        <div className="text-[9px] uppercase tracking-wider text-cyan-400 font-mono font-bold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            SENA // GeoGuessr
                        </div>
                        <div className="text-[11px] font-mono text-slate-300 mt-0.5">
                            {coordText}
                        </div>
                    </div>

                    <button 
                        onClick={() => setAutoRotate(!autoRotate)}
                        className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-medium py-1 px-2.5 rounded-xl transition-all cursor-pointer active:scale-95"
                    >
                        {autoRotate ? 'Pausar' : 'Girar'}
                    </button>
                </motion.div>
            )}
        </div>
    );
}