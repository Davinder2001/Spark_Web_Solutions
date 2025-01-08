'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

export const ThreeRenderScene = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();

        // Initial properties
        const initialProps = {
            color: '#F24B74',
            radius: 1.5,
            widthSegments: 35,
            heightSegments: 35,
            positionX: 0,
            positionY: 0.1,
        };

        const prop = { ...initialProps }; // Clone initial props

        // Create Geometry, Material, and Sphere
        let geometry = new THREE.SphereGeometry(prop.radius, prop.widthSegments, prop.heightSegments);
        const material = new THREE.MeshBasicMaterial({ color: prop.color });
        const sphere = new THREE.Mesh(geometry, material);
        material.wireframe = true;
        scene.add(sphere);

        sphere.position.x = prop.positionX;
        sphere.position.y = prop.positionY;

        // Create GUI
        const gui = new GUI({
            title: 'Play With 3D Scene',
            closeFolders: true,
        });
        gui.close();
        const heightAndWidth = gui.addFolder('Height Width');
        const settings = gui.addFolder('Scene Settings');

        settings.add(sphere.position, 'y').min(-3).max(3).step(0.1).name('PositionY');
        settings.add(sphere.position, 'x').min(-3).max(3).step(0.1).name('PositionX');
        settings.add(material, 'wireframe');
        settings.add(material, 'visible');
        settings.addColor(prop, 'color').onChange(() => {
            material.color.set(prop.color);
        });

        const updateGeometry = () => {
            sphere.geometry.dispose();
            sphere.geometry = new THREE.SphereGeometry(prop.radius, prop.widthSegments, prop.heightSegments);
        };

        heightAndWidth.add(prop, 'radius').min(0.1).max(10).step(0.1).name('Radius').onChange(updateGeometry);
        heightAndWidth.add(prop, 'widthSegments').min(3).max(64).step(1).name('Width Segments').onChange(updateGeometry);
        heightAndWidth.add(prop, 'heightSegments').min(3).max(64).step(1).name('Height Segments').onChange(updateGeometry);

        // Add Reset Button
        gui.add(
            {
                reset: () => {
                    // Reset properties to initial values
                    Object.assign(prop, initialProps);
                    material.color.set(prop.color);
                    sphere.geometry.dispose();
                    sphere.geometry = new THREE.SphereGeometry(prop.radius, prop.widthSegments, prop.heightSegments);
                    sphere.position.x = prop.positionX;
                    sphere.position.y = prop.positionY;

                    // Update GUI values
                    gui.controllers.forEach((controller) => controller.updateDisplay());
                },
            },
            'reset'
        ).name('Reset');

        // Set up the renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Set up the camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
        camera.position.z = 3;
        scene.add(camera);

        // Add OrbitControls
        const controls = new OrbitControls(camera, canvasRef.current);
        controls.enableDamping = true;

        // Resize handling
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize);

        // Animation loop
        const clock = new THREE.Clock();
        const tick = () => {
            const time = clock.getElapsedTime();
            sphere.rotation.x = time * 0.1;
            sphere.rotation.y = time * 0.1;

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };
        tick();

        // Cleanup on unmount
        return () => {
            gui.destroy();
            window.removeEventListener('resize', onWindowResize);
            renderer.dispose();
        };
    }, []);

    return <canvas ref={canvasRef} />;
};
