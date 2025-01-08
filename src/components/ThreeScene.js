'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';
import {COUNT_OF_VERTEXES,ANIMATION_SPEED, LIL_GUI_COLOR, PARTICLE_GEOMETRY__COLOR} from '@/utils/constents'

export const ThreeRenderScene = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // 1. Create Scene
        const scene = new THREE.Scene();

        // 2. Get Canvas Element
        const canvas = canvasRef.current;

        // 3. Load Texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./images/water.jpg');

       

        // 5. Particles Geometry and Material
        const particlesGeometry = new THREE.BufferGeometry();
        const count =COUNT_OF_VERTEXES ;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5)*10;
            colors[i] = Math.random();
        }

        // Set particle attributes
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            sizeAttenuation: true,
            color: new THREE.Color(PARTICLE_GEOMETRY__COLOR),
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true, // Enable vertex colors
        });

        // Create particles
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // 6. Create GUI
        const gui = new GUI({
            title: 'Play With 3D Scene',
            closeFolders: true,
        });
        gui.close();

        const heightAndWidth = gui.addFolder('Height Width');
        const settings = gui.addFolder('Scene Settings');

        const prop = {
            radius: 1,
            widthSegments: 32,
            heightSegments: 32,
            color: LIL_GUI_COLOR,
        };

         // 4. Sphere Geometry and Material
         const sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1.5, 32, 32), // Sphere geometry
            new THREE.MeshBasicMaterial({ wireframe: true,   map:texture }) // Material with texture
        );
        scene.add(sphere);
        sphere.position.y=0.1

        settings.add(sphere.position, 'y').min(-3).max(3).step(0.1).name('PositionY');
        settings.add(sphere.position, 'x').min(-3).max(3).step(0.1).name('PositionX');
        settings.add(sphere.material, 'wireframe').name('Wireframe');
        settings.addColor(prop, 'color').onChange(() => {
            sphere.material.color.set(prop.color);
        });

        const updateGeometry = () => {
            sphere.geometry.dispose();
            sphere.geometry = new THREE.SphereGeometry(prop.radius, prop.widthSegments, prop.heightSegments);
        };

        heightAndWidth.add(prop, 'radius').min(0.1).max(10).step(0.1).name('Radius').onChange(updateGeometry);
        heightAndWidth.add(prop, 'widthSegments').min(3).max(64).step(1).name('Width Segments').onChange(updateGeometry);
        heightAndWidth.add(prop, 'heightSegments').min(3).max(64).step(1).name('Height Segments').onChange(updateGeometry);

        // 7. Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        // 8. Camera
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.z = 3;
        scene.add(camera);

        // 9. Controls
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;

        // 10. Renderer
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 11. Handle Window Resize
        window.addEventListener('resize', () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        });

        // 12. Animation
        const clock = new THREE.Clock();

        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            // Rotate particles and sphere
            particles.rotation.y = elapsedTime * ANIMATION_SPEED;
            sphere.rotation.y = elapsedTime * ANIMATION_SPEED;

            // Update controls
            controls.update();

            // Render the scene
            renderer.render(scene, camera);

            // Call tick again on the next frame
            window.requestAnimationFrame(tick);
        };

        tick();

        // Cleanup on unmount
        return () => {
            gui.destroy();
            window.removeEventListener('resize', () => {});
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} className="app" />;
};
