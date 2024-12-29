import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { TorusKnotGeometry, IcosahedronGeometry, OctahedronGeometry, DodecahedronGeometry } from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Scene setup with matching background color
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#121212', 0.015);
    scene.background = new THREE.Color('#121212');

    // Camera setup with wider perspective
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    camera.position.y = 2;

    // Renderer setup with better quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    containerRef.current.appendChild(renderer.domElement);

    // Add Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Add smooth damping
    controls.dampingFactor = 0.05; // Adjust damping factor
    controls.rotateSpeed = 0.8; // Adjust rotation speed
    controls.panSpeed = 0.8; // Adjust pan speed
    controls.zoomSpeed = 0.8; // Adjust zoom speed
    controls.enableZoom = true;
    controls.enablePan = false; // Disable panning for better UX
    controls.autoRotate = true; // Auto-rotate when not interacting
    controls.autoRotateSpeed = 0.5; // Slow auto-rotation speed
    controlsRef.current = controls;

    // Post-processing setup
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    composer.addPass(bloomPass);

    // Create glass material base
    const createGlassMaterial = (color: string, emissiveIntensity = 0.3) => {
      return new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.2,
        roughness: 0.15,
        transmission: 0.85,
        thickness: 0.5,
        envMapIntensity: 1.5,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        ior: 1.5,
        emissive: new THREE.Color(color),
        emissiveIntensity,
      });
    };

    // Create various geometric shapes
    const geometries = [
      new TorusKnotGeometry(1, 0.3, 100, 16),
      new IcosahedronGeometry(1, 0),
      new OctahedronGeometry(1, 0),
      new DodecahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.SphereGeometry(0.8, 32, 32),
    ];

    const vibrantColors = [
      '#ff0055', // Hot pink
      '#00ffaa', // Cyan
      '#ff9900', // Orange
      '#ff00ff', // Magenta
      '#00ff00', // Lime
      '#00ffff', // Aqua
    ];

    // Create background shapes
    const shapes: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const geometry = geometries[i % geometries.length];
      const material = createGlassMaterial(vibrantColors[i % vibrantColors.length], 0.4);
      const shape = new THREE.Mesh(geometry, material);
      
      // Position shapes in a more spread out pattern
      const spread = 30;
      shape.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * 15
      );
      
      // Random scale for variety
      const scale = 1 + Math.random() * 1;
      shape.scale.set(scale, scale, scale);
      
      scene.add(shape);
      shapes.push(shape);
    }

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Add multiple colored spotlights
    const spotLights: THREE.SpotLight[] = [];
    const spotColors = [0x4a9eff, 0xff1b6b, 0x00ff88];
    
    spotColors.forEach((color, index) => {
      const spotLight = new THREE.SpotLight(color, 300);
      const angle = (index * Math.PI * 2) / 3;
      const radius = 15;
      spotLight.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        10
      );
      spotLight.angle = Math.PI / 3;
      spotLight.penumbra = 0.2;
      spotLight.decay = 1.5;
      spotLight.distance = 50;
      scene.add(spotLight);
      spotLights.push(spotLight);
    });

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.003;

      // Update controls
      controls.update();

      // Animate shapes
      shapes.forEach((shape, index) => {
        // Gentle floating motion (reduced for better control)
        shape.position.y += Math.sin(time * 2 + index) * 0.01;
        shape.position.x += Math.cos(time * 2 + index) * 0.005;
        
        // Reduced individual rotation since we have orbit controls
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.001;
        
        // Pulse material properties
        const material = shape.material as THREE.MeshPhysicalMaterial;
        material.emissiveIntensity = 0.4 + Math.sin(time * 3 + index) * 0.2;
        material.transmission = 0.85 + Math.sin(time * 2 + index) * 0.1;
      });

      // Animate spotlights
      spotLights.forEach((light, index) => {
        const radius = 15;
        const angle = time + (index * Math.PI * 2) / 3;
        light.position.x = Math.cos(angle) * radius;
        light.position.z = Math.sin(angle) * radius + 10;
        light.intensity = 300 + Math.sin(time * 4 + index) * 100;
      });

      composer.render();
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      composer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      composer.dispose();
      controls.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing"
    />
  );
};

export default ThreeScene; 